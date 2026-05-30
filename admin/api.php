<?php
require_once "db_config.php";
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$request = isset($_GET['request']) ? $_GET['request'] : 'products';

function absolute_url($path) {
    if (empty($path)) return '';
    if (preg_match('#^https?://#', $path)) return $path;
    
    // If path starts with /, assume it is relative to site root (public)
    // and we want to return it as is or with the domain but WITHOUT /admin prefix
    if (strpos($path, '/') === 0) {
        // If we are on localhost/admin/api.php, we want localhost/path
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        return $scheme . '://' . $host . $path;
    }

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $base = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    $base = $base === '/' ? '' : $base;
    return $scheme . '://' . $host . $base . '/' . ltrim($path, '/');
}

switch ($request) {
    case 'products':
        $type = isset($_GET['type']) ? mysqli_real_escape_string($link, $_GET['type']) : null;
        
        $sql = "SELECT p.*, c.name as category_name, c.id as category_id_ref FROM products p LEFT JOIN categories c ON p.category_id = c.id";
        if ($type) {
            $sql .= " WHERE p.type = '$type'";
        }
        $sql .= " ORDER BY p.created_at DESC";
        
        $result = mysqli_query($link, $sql);
        $products = [];
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $stockStatusMap = [
                    'instock' => 'in-stock',
                    'outofstock' => 'out-of-stock',
                    'call' => 'call-for-price'
                ];
                
                $products[] = [
                    'id' => (int)$row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'] ?? '',
                    'price' => isset($row['price']) ? (int)$row['price'] : null,
                    'image_url' => absolute_url($row['image_path'] ?? ''),
                    'created_at' => $row['created_at'] ?? null,
                    'brand' => $row['brand'] ?? '',
                    'thickness' => $row['thickness'] ?? '',
                    'dimensions' => $row['dimensions'] ?? '',
                    'stockStatus' => $stockStatusMap[$row['stock_status']] ?? 'in-stock',
                    'badge' => !empty($row['badge']) ? $row['badge'] : null,
                    'type' => $row['type'] ?? 'product',
                    'category' => $row['category_name'] ? [
                        'id' => (int)$row['category_id_ref'],
                        'name' => $row['category_name'],
                        'slug' => $row['category_name'] // simple slug for now
                    ] : null,
                    'orderButton' => [ 'link' => 'https://wa.me/989123456789' ],
                ];
            }
            mysqli_free_result($result);
        }
        echo json_encode(['status' => 'success', 'data' => $products], JSON_UNESCAPED_UNICODE);
        break;

    case 'content':
        $content = [];
        $sql = "SELECT content_key, content_value FROM site_content";
        if ($result = mysqli_query($link, $sql)) {
            while ($row = mysqli_fetch_assoc($result)) {
                $content[$row['content_key']] = $row['content_value'];
            }
            mysqli_free_result($result);
        }
        echo json_encode(['status' => 'success', 'data' => $content], JSON_UNESCAPED_UNICODE);
        break;

    case 'categories':
        $sql = "SELECT id, name, description FROM categories ORDER BY name";
        $result = mysqli_query($link, $sql);
        $categories = [];
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $categories[] = [
                    'id' => (int)$row['id'],
                    'name' => $row['name'],
                    'description' => $row['description'] ?? ''
                ];
            }
            mysqli_free_result($result);
        }
        echo json_encode(['status' => 'success', 'data' => $categories], JSON_UNESCAPED_UNICODE);
        break;

    case 'slider':
        $slides = [];
        $sql = "SELECT * FROM slider_slides ORDER BY order_index ASC";
        if ($result = mysqli_query($link, $sql)) {
            while ($row = mysqli_fetch_assoc($result)) {
                // For slider images stored in public/uploads/slider (starting with /), absolute_url will handle them correctly now
                $slides[] = [
                    'id' => (int)$row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'image_url' => absolute_url($row['image_path']),
                    'link' => $row['link'],
                    'order_index' => (int)$row['order_index']
                ];
            }
            mysqli_free_result($result);
        }
        echo json_encode(['status' => 'success', 'data' => $slides], JSON_UNESCAPED_UNICODE);
        break;

    case 'price_tables':
        // Fetch all tables
        $tables_sql = "SELECT * FROM price_tables ORDER BY id DESC";
        $tables_res = mysqli_query($link, $tables_sql);
        $tables = [];
        
        while ($table = mysqli_fetch_assoc($tables_res)) {
            $table_id = $table['id'];
            
            // Fetch columns
            $cols_sql = "SELECT * FROM price_table_columns WHERE table_id = $table_id ORDER BY order_index ASC";
            $cols_res = mysqli_query($link, $cols_sql);
            $columns = [];
            while ($col = mysqli_fetch_assoc($cols_res)) {
                $columns[] = $col;
            }
            $table['columns'] = $columns;
            
            // Fetch rows
            $rows_sql = "SELECT * FROM price_table_rows WHERE table_id = $table_id ORDER BY order_index ASC";
            $rows_res = mysqli_query($link, $rows_sql);
            $rows = [];
            while ($row = mysqli_fetch_assoc($rows_res)) {
                $row_id = $row['id'];
                // Fetch cells for this row
                $cells_sql = "SELECT * FROM price_table_cells WHERE row_id = $row_id";
                $cells_res = mysqli_query($link, $cells_sql);
                $cells = [];
                while ($cell = mysqli_fetch_assoc($cells_res)) {
                    $cells[$cell['column_id']] = $cell['value'];
                }
                $row['cells'] = $cells;
                $rows[] = $row;
            }
            $table['rows'] = $rows;
            
            $tables[] = $table;
        }
        
        echo json_encode(['status' => 'success', 'data' => $tables], JSON_UNESCAPED_UNICODE);
        break;

    default:
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid request'], JSON_UNESCAPED_UNICODE);
        break;
}
?>