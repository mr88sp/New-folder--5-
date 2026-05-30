<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'soheili_wood_db');

// اتصال به سرور بدون نام دیتابیس برای مدیریت موارد عدم وجود پایگاه‌داده
$link = @mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if ($link === false) {
    die("ERROR: Could not connect to MySQL. " . mysqli_connect_error());
}

// تلاش برای انتخاب پایگاه‌داده، و در صورت عدم وجود، ایجاد آن
if (!@mysqli_select_db($link, DB_NAME)) {
    $createDbSql = "CREATE DATABASE `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci";
    if (!mysqli_query($link, $createDbSql)) {
        die("ERROR: Could not create database '" . DB_NAME . "'. " . mysqli_error($link));
    }
    if (!mysqli_select_db($link, DB_NAME)) {
        die("ERROR: Could not select database '" . DB_NAME . "'. " . mysqli_error($link));
    }
}

// تنظیم کاراکترست
mysqli_set_charset($link, "utf8mb4");

// ایجاد جداول مورد نیاز در صورت عدم وجود
$schemaStatements = [
    "CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(64) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS products (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price INT UNSIGNED NOT NULL DEFAULT 0,
        image_path VARCHAR(512),
        brand VARCHAR(100),
        thickness VARCHAR(50),
        dimensions VARCHAR(100),
        stock_status ENUM('instock', 'outofstock', 'call') DEFAULT 'instock',
        badge VARCHAR(50),
        type ENUM('product', 'price_list') DEFAULT 'product',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS categories (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS site_content (
        content_key VARCHAR(128) PRIMARY KEY,
        content_value TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS slider_slides (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        image_path VARCHAR(512) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        link VARCHAR(512),
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS price_tables (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS price_table_columns (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        table_id INT UNSIGNED NOT NULL,
        name VARCHAR(255) NOT NULL,
        order_index INT DEFAULT 0,
        type ENUM('text', 'price', 'status', 'number') DEFAULT 'text',
        FOREIGN KEY (table_id) REFERENCES price_tables(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS price_table_rows (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        table_id INT UNSIGNED NOT NULL,
        order_index INT DEFAULT 0,
        FOREIGN KEY (table_id) REFERENCES price_tables(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS price_table_cells (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        row_id INT UNSIGNED NOT NULL,
        column_id INT UNSIGNED NOT NULL,
        value TEXT,
        FOREIGN KEY (row_id) REFERENCES price_table_rows(id) ON DELETE CASCADE,
        FOREIGN KEY (column_id) REFERENCES price_table_columns(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
];

foreach ($schemaStatements as $sql) {
    if (!mysqli_query($link, $sql)) {
        die("ERROR: Schema initialization failed. " . mysqli_error($link));
    }
}

// Check and add new columns if they don't exist
$columns_to_check = [
    'brand' => "ALTER TABLE products ADD COLUMN brand VARCHAR(100)",
    'thickness' => "ALTER TABLE products ADD COLUMN thickness VARCHAR(50)",
    'dimensions' => "ALTER TABLE products ADD COLUMN dimensions VARCHAR(100)",
    'stock_status' => "ALTER TABLE products ADD COLUMN stock_status ENUM('instock', 'outofstock', 'call') DEFAULT 'instock'",
    'badge' => "ALTER TABLE products ADD COLUMN badge VARCHAR(50)",
    'type' => "ALTER TABLE products ADD COLUMN type ENUM('product', 'price_list') DEFAULT 'product'",
    'category_id' => "ALTER TABLE products ADD COLUMN category_id INT UNSIGNED"
];

$check_columns_query = "SHOW COLUMNS FROM products";
$result = mysqli_query($link, $check_columns_query);
if ($result) {
    $existing_columns = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $existing_columns[] = $row['Field'];
    }
    
    foreach ($columns_to_check as $column => $alter_query) {
        if (!in_array($column, $existing_columns)) {
            mysqli_query($link, $alter_query);
        } else {
            // Force update for ENUM columns to ensure new values are available
            if ($column == 'stock_status') {
                mysqli_query($link, "ALTER TABLE products MODIFY COLUMN stock_status ENUM('instock', 'outofstock', 'call') DEFAULT 'instock'");
            }
            if ($column == 'type') {
                 mysqli_query($link, "ALTER TABLE products MODIFY COLUMN type ENUM('product', 'price_list') DEFAULT 'product'");
            }
        }
    }
}

// Check and add new columns for price_table_columns if they don't exist
$pt_columns_to_check = [
    'type' => "ALTER TABLE price_table_columns ADD COLUMN type ENUM('text', 'price', 'status', 'number', 'select') DEFAULT 'text'",
    'options' => "ALTER TABLE price_table_columns ADD COLUMN options TEXT"
];

$check_pt_columns_query = "SHOW COLUMNS FROM price_table_columns";
$pt_result = mysqli_query($link, $check_pt_columns_query);
if ($pt_result) {
    $existing_pt_columns = [];
    while ($row = mysqli_fetch_assoc($pt_result)) {
        $existing_pt_columns[] = $row['Field'];
    }
    
    foreach ($pt_columns_to_check as $column => $alter_query) {
        if (!in_array($column, $existing_pt_columns)) {
            mysqli_query($link, $alter_query);
        } else {
             if ($column == 'type') {
                 mysqli_query($link, "ALTER TABLE price_table_columns MODIFY COLUMN type ENUM('text', 'price', 'status', 'number', 'select') DEFAULT 'text'");
            }
        }
    }
}

// درج کاربر پیش‌فرض در صورت نبود کاربر
$checkUsers = mysqli_query($link, "SELECT COUNT(*) AS c FROM users");
if ($checkUsers) {
    $row = mysqli_fetch_assoc($checkUsers);
    if (isset($row['c']) && (int)$row['c'] === 0) {
        $defaultUsername = 'admin';
        $defaultPasswordHash = password_hash('admin', PASSWORD_DEFAULT);
        $stmt = mysqli_prepare($link, "INSERT INTO users (username, password) VALUES (?, ?)");
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ss", $defaultUsername, $defaultPasswordHash);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
    }
}

// Auto-update address to new location if it matches old defaults
$new_address = 'تهران، شهرک صنعتی خاوران، سایت چوب فروشان، خیابان صنوبر یکم، پلاک ۱۱۰۵';
$old_addresses = [
    'تهران، ...',
    'تهران، خیابان ولیعصر، نرسیده به میدان ولیعصر، پلاک ۱۲۳۴',
    'تهران، خیابان سهروردی شمالی، پلاک 123'
];

$check_addr = mysqli_query($link, "SELECT content_value FROM site_content WHERE content_key = 'contact_page_address'");
if ($check_addr && mysqli_num_rows($check_addr) > 0) {
    $row = mysqli_fetch_assoc($check_addr);
    if (in_array($row['content_value'], $old_addresses)) {
        mysqli_query($link, "UPDATE site_content SET content_value = '$new_address' WHERE content_key = 'contact_page_address'");
    }
} else {
    mysqli_query($link, "INSERT INTO site_content (content_key, content_value) VALUES ('contact_page_address', '$new_address')");
}

?>
