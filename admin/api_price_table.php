<?php
header('Content-Type: application/json');
require_once "db_config.php";

// Check if user is logged in (you might want to enhance security here)
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'get_table_data':
        $table_id = intval($_POST['table_id']);
        
        // Fetch Table Info
        $table_sql = "SELECT * FROM price_tables WHERE id = $table_id";
        $table_res = mysqli_query($link, $table_sql);
        $table = mysqli_fetch_assoc($table_res);
        
        if (!$table) {
            echo json_encode(['success' => false, 'message' => 'Table not found']);
            exit;
        }
        
        // Fetch Columns
        $cols_sql = "SELECT * FROM price_table_columns WHERE table_id = $table_id ORDER BY order_index ASC";
        $cols_res = mysqli_query($link, $cols_sql);
        $columns = [];
        while ($row = mysqli_fetch_assoc($cols_res)) {
            $columns[] = $row;
        }
        
        // Fetch Rows
        $rows_sql = "SELECT * FROM price_table_rows WHERE table_id = $table_id ORDER BY order_index ASC";
        $rows_res = mysqli_query($link, $rows_sql);
        $rows = [];
        while ($row = mysqli_fetch_assoc($rows_res)) {
            // Fetch Cells for this row
            $cells_sql = "SELECT * FROM price_table_cells WHERE row_id = " . $row['id'];
            $cells_res = mysqli_query($link, $cells_sql);
            $cells = [];
            while ($cell = mysqli_fetch_assoc($cells_res)) {
                $cells[$cell['column_id']] = $cell['value'];
            }
            $row['cells'] = $cells;
            $rows[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'table' => $table,
            'columns' => $columns,
            'rows' => $rows
        ]);
        break;

    case 'add_column':
        $table_id = intval($_POST['table_id']);
        $name = trim($_POST['name']);
        $type = isset($_POST['type']) ? $_POST['type'] : 'text';
        $options = isset($_POST['options']) ? trim($_POST['options']) : '';
        
        if (empty($name)) {
            echo json_encode(['success' => false, 'message' => 'Column name is required']);
            exit;
        }
        
        // Get max order index
        $order_sql = "SELECT MAX(order_index) as max_order FROM price_table_columns WHERE table_id = $table_id";
        $order_res = mysqli_query($link, $order_sql);
        $max_order = mysqli_fetch_assoc($order_res)['max_order'];
        $new_order = $max_order !== null ? $max_order + 1 : 0;
        
        $sql = "INSERT INTO price_table_columns (table_id, name, type, options, order_index) VALUES (?, ?, ?, ?, ?)";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "isssi", $table_id, $name, $type, $options, $new_order);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
            }
        }
        break;

    case 'add_default_columns':
        $table_id = intval($_POST['table_id']);
        
        $default_columns = [
            ['name' => 'نام محصول', 'type' => 'text'],
            ['name' => 'برند', 'type' => 'text'],
            ['name' => 'ضخامت', 'type' => 'text'],
            ['name' => 'ابعاد', 'type' => 'text'],
            ['name' => 'قیمت', 'type' => 'price'],
            ['name' => 'وضعیت', 'type' => 'status']
        ];
        
        // Get current max order
        $order_sql = "SELECT MAX(order_index) as max_order FROM price_table_columns WHERE table_id = $table_id";
        $order_res = mysqli_query($link, $order_sql);
        $max_order = mysqli_fetch_assoc($order_res)['max_order'];
        $start_order = $max_order !== null ? $max_order + 1 : 0;
        
        $success = true;
        foreach ($default_columns as $index => $col) {
            $sql = "INSERT INTO price_table_columns (table_id, name, type, order_index) VALUES (?, ?, ?, ?)";
            if ($stmt = mysqli_prepare($link, $sql)) {
                $order = $start_order + $index;
                mysqli_stmt_bind_param($stmt, "issi", $table_id, $col['name'], $col['type'], $order);
                if (!mysqli_stmt_execute($stmt)) {
                    $success = false;
                }
            }
        }
        
        echo json_encode(['success' => $success]);
        break;

    case 'delete_column':
        $column_id = intval($_POST['column_id']);
        $sql = "DELETE FROM price_table_columns WHERE id = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $column_id);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
            }
        }
        break;

    case 'update_column':
        $column_id = intval($_POST['column_id']);
        $name = trim($_POST['name']);
        
        $sql = "UPDATE price_table_columns SET name = ? WHERE id = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "si", $name, $column_id);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
            }
        }
        break;

    case 'add_row':
        $table_id = intval($_POST['table_id']);
        
        // Get max order index
        $order_sql = "SELECT MAX(order_index) as max_order FROM price_table_rows WHERE table_id = $table_id";
        $order_res = mysqli_query($link, $order_sql);
        $max_order = mysqli_fetch_assoc($order_res)['max_order'];
        $new_order = $max_order !== null ? $max_order + 1 : 0;
        
        $sql = "INSERT INTO price_table_rows (table_id, order_index) VALUES (?, ?)";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "ii", $table_id, $new_order);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
            }
        }
        break;

    case 'delete_row':
        $row_id = intval($_POST['row_id']);
        $sql = "DELETE FROM price_table_rows WHERE id = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $row_id);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
            }
        }
        break;

    case 'update_cell':
        $row_id = intval($_POST['row_id']);
        $column_id = intval($_POST['column_id']);
        $value = $_POST['value'];
        
        // Check if cell exists
        $check_sql = "SELECT id FROM price_table_cells WHERE row_id = ? AND column_id = ?";
        if ($stmt = mysqli_prepare($link, $check_sql)) {
            mysqli_stmt_bind_param($stmt, "ii", $row_id, $column_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            
            if (mysqli_stmt_num_rows($stmt) > 0) {
                // Update
                $update_sql = "UPDATE price_table_cells SET value = ? WHERE row_id = ? AND column_id = ?";
                if ($update_stmt = mysqli_prepare($link, $update_sql)) {
                    mysqli_stmt_bind_param($update_stmt, "sii", $value, $row_id, $column_id);
                    mysqli_stmt_execute($update_stmt);
                }
            } else {
                // Insert
                $insert_sql = "INSERT INTO price_table_cells (row_id, column_id, value) VALUES (?, ?, ?)";
                if ($insert_stmt = mysqli_prepare($link, $insert_sql)) {
                    mysqli_stmt_bind_param($insert_stmt, "iis", $row_id, $column_id, $value);
                    mysqli_stmt_execute($insert_stmt);
                }
            }
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
        }
        break;
        
    case 'update_table_title':
        $table_id = intval($_POST['table_id']);
        $title = trim($_POST['title']);
        
        $sql = "UPDATE price_tables SET title = ? WHERE id = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "si", $title, $table_id);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => mysqli_error($link)]);
            }
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}
?>