<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    borderRadius: {
                        'card': 'var(--radius-card)',
                        'button': 'var(--radius-button)',
                    },
                    colors: {
                        brand: {
                            primary: 'var(--brand-primary)',
                            secondary: 'var(--brand-secondary)',
                            accent: 'var(--brand-accent)',
                        },
                        status: {
                            success: '#3fa34d',
                            warning: '#e0a800',
                            error: '#c0392b',
                            info: '#2980b9',
                        }
                    }
                }
            }
        }
    </script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Vazirmatn Font -->
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    
    <?php
    // Fetch theme settings for dynamic styling
    require_once __DIR__ . "/../db_config.php";
    $theme_sql = "SELECT content_key, content_value FROM site_content WHERE content_key LIKE 'theme_%'";
    $theme_result = mysqli_query($link, $theme_sql);
    $theme_vals = [];
    if ($theme_result) {
        while ($row = mysqli_fetch_assoc($theme_result)) {
            $theme_vals[$row['content_key']] = $row['content_value'];
        }
    }
    ?>
    <style>
        :root {
            --brand-primary: <?php echo $theme_vals['theme_color_primary'] ?? '#2563EB'; ?>;
            --brand-secondary: <?php echo $theme_vals['theme_color_secondary'] ?? '#64748B'; ?>;
            --brand-accent: <?php echo $theme_vals['theme_color_accent'] ?? '#3B82F6'; ?>;
            --radius-card: <?php echo ($theme_vals['theme_radius_card'] ?? '0.5') . 'rem'; ?>;
            --radius-button: <?php echo ($theme_vals['theme_radius_button'] ?? '0.375') . 'rem'; ?>;
        }
        body {
            font-family: 'Vazirmatn', sans-serif;
            background-color: #f3f4f6;
        }
        .sidebar-link {
            transition: all 0.3s ease;
        }
        .sidebar-link:hover, .sidebar-link.active {
            background-color: rgba(255, 255, 255, 0.1);
            border-right: 4px solid var(--brand-primary);
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">

<div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white hidden md:flex flex-col shadow-xl z-20">
        <div class="h-16 flex items-center justify-center border-b border-gray-800 bg-gray-900 shadow-md">
            <h1 class="text-xl font-bold text-white">
                <i class="fas fa-user-shield ml-2 text-brand-primary"></i>
                <span>پنل مدیریت</span>
            </h1>
        </div>
        
        <nav class="flex-1 overflow-y-auto py-4">
            <ul class="space-y-2 px-2">
                <li>
                    <a href="index.php" class="sidebar-link flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-button <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active bg-gray-800 text-white' : ''; ?>">
                        <i class="fas fa-tachometer-alt w-6 ml-2"></i>
                        <span>داشبورد</span>
                    </a>
                </li>
                <li>
                    <a href="products.php" class="sidebar-link flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-button <?php echo basename($_SERVER['PHP_SELF']) == 'products.php' ? 'active bg-gray-800 text-white' : ''; ?>">
                        <i class="fas fa-box-open w-6 ml-2"></i>
                        <span>مدیریت محصولات</span>
                    </a>
                </li>
                <li>
                    <a href="content_management.php" class="sidebar-link flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-button <?php echo basename($_SERVER['PHP_SELF']) == 'content_management.php' ? 'active bg-gray-800 text-white' : ''; ?>">
                        <i class="fas fa-edit w-6 ml-2"></i>
                        <span>مدیریت محتوا</span>
                    </a>
                </li>
                <li>
                    <a href="slider_management.php" class="sidebar-link flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-button <?php echo basename($_SERVER['PHP_SELF']) == 'slider_management.php' ? 'active bg-gray-800 text-white' : ''; ?>">
                        <i class="fas fa-images w-6 ml-2"></i>
                        <span>مدیریت اسلایدر</span>
                    </a>
                </li>
                <li>
                    <a href="price_tables.php" class="sidebar-link flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-button <?php echo basename($_SERVER['PHP_SELF']) == 'price_tables.php' ? 'active bg-gray-800 text-white' : ''; ?>">
                        <i class="fas fa-table w-6 ml-2"></i>
                        <span>مدیریت جداول قیمت</span>
                    </a>
                </li>
                <li>
                    <a href="account_settings.php" class="sidebar-link flex items-center px-4 py-3 text-gray-300 hover:text-white rounded-button <?php echo basename($_SERVER['PHP_SELF']) == 'account_settings.php' ? 'active bg-gray-800 text-white' : ''; ?>">
                        <i class="fas fa-user-cog w-6 ml-2"></i>
                        <span>تنظیمات حساب</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Top Navbar -->
        <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
            <div class="flex items-center md:hidden">
                <button id="sidebar-toggle" class="text-gray-600 focus:outline-none">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
            
            <div class="flex items-center mr-auto">
                <div class="relative group" id="user-menu-container">
                    <button id="user-menu-button" class="flex items-center space-x-2 space-x-reverse text-gray-700 focus:outline-none">
                        <img src="https://ui-avatars.com/api/?name=<?php echo urlencode($_SESSION['username']); ?>&background=<?php echo str_replace('#', '', $theme_vals['theme_color_primary'] ?? '10b981'); ?>&color=fff" alt="User Avatar" class="w-8 h-8 rounded-full ml-2">
                        <span class="font-medium"><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                        <i class="fas fa-chevron-down text-xs mr-1 text-gray-400"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="user-dropdown" class="absolute left-0 mt-2 w-48 bg-white rounded-button shadow-lg py-1 hidden transition-all duration-200 border border-gray-100 z-50">
                        <a href="account_settings.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i class="fas fa-user-circle ml-2"></i> پروفایل
                        </a>
                        <a href="theme_settings.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i class="fas fa-paint-brush ml-2"></i> تنظیمات ظاهر
                        </a>
                        <div class="border-t border-gray-100"></div>
                        <a href="logout.php" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <i class="fas fa-sign-out-alt ml-2"></i> خروج
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <script>
            // User Menu Dropdown Toggle
            const userMenuButton = document.getElementById('user-menu-button');
            const userDropdown = document.getElementById('user-dropdown');
            const userMenuContainer = document.getElementById('user-menu-container');

            if (userMenuButton && userDropdown) {
                userMenuButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userDropdown.classList.toggle('hidden');
                });

                document.addEventListener('click', (e) => {
                    if (!userMenuContainer.contains(e.target)) {
                        userDropdown.classList.add('hidden');
                    }
                });
            }

            // Sidebar Toggle for Mobile
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const sidebar = document.querySelector('aside');
            if (sidebarToggle && sidebar) {
                sidebarToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('hidden');
                    sidebar.classList.toggle('flex');
                });
            }
        </script>

        <!-- Page Content -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
