<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}

// Include config file
require_once "db_config.php";

// Fetch total products count
$sql_count = "SELECT COUNT(*) as total FROM products";
$result_count = mysqli_query($link, $sql_count);
$total_products = 0;
if ($result_count) {
    $row = mysqli_fetch_assoc($result_count);
    $total_products = $row['total'];
}

// Fetch recent products
$sql_recent = "SELECT name, price, created_at FROM products ORDER BY created_at DESC LIMIT 5";
$result_recent = mysqli_query($link, $sql_recent);

// Include header
require_once "layout/header.php";
?>

<div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-800">داشبورد</h2>
    <p class="text-gray-600 mt-2">خوش آمدید، <strong><?php echo htmlspecialchars($_SESSION["username"]); ?></strong>. خلاصه وضعیت سیستم شما در اینجا نمایش داده می‌شود.</p>
</div>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Card 1: Total Products -->
    <div class="bg-white rounded-button shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">محصولات کل</h3>
            <div class="p-2 bg-emerald-100 rounded-button text-emerald-600">
                <i class="fas fa-box fa-lg"></i>
            </div>
        </div>
        <div class="flex items-end justify-between">
            <span class="text-3xl font-bold text-gray-800"><?php echo $total_products; ?></span>
            <span class="text-emerald-500 text-sm font-medium bg-emerald-50 px-2 py-1 rounded">+2 جدید</span>
        </div>
    </div>

    <!-- Card 2: Users (Dummy) -->
    <div class="bg-white rounded-button shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">کاربران فعال</h3>
            <div class="p-2 bg-blue-100 rounded-button text-blue-600">
                <i class="fas fa-users fa-lg"></i>
            </div>
        </div>
        <div class="flex items-end justify-between">
            <span class="text-3xl font-bold text-gray-800">1</span>
            <span class="text-blue-500 text-sm font-medium bg-blue-50 px-2 py-1 rounded">مدیر</span>
        </div>
    </div>

    <!-- Card 3: Visits (Dummy) -->
    <div class="bg-white rounded-button shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">بازدید امروز</h3>
            <div class="p-2 bg-purple-100 rounded-button text-purple-600">
                <i class="fas fa-eye fa-lg"></i>
            </div>
        </div>
        <div class="flex items-end justify-between">
            <span class="text-3xl font-bold text-gray-800">1,240</span>
            <span class="text-green-500 text-sm font-medium flex items-center">
                <i class="fas fa-arrow-up mr-1"></i> 12%
            </span>
        </div>
    </div>

    <!-- Card 4: Server Status -->
    <div class="bg-white rounded-button shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">وضعیت سرور</h3>
            <div class="p-2 bg-orange-100 rounded-button text-orange-600">
                <i class="fas fa-server fa-lg"></i>
            </div>
        </div>
        <div class="flex items-end justify-between">
            <span class="text-3xl font-bold text-gray-800">Online</span>
            <span class="text-gray-400 text-xs">PHP <?php echo phpversion(); ?></span>
        </div>
    </div>
</div>

<!-- Recent Products Table -->
<div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 class="font-bold text-gray-800">آخرین محصولات اضافه شده</h3>
        <a href="products.php" class="text-emerald-600 hover:text-emerald-700 text-sm font-medium">مشاهده همه</a>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-right">
            <thead class="bg-gray-50 text-gray-500 text-sm">
                <tr>
                    <th class="px-6 py-3 font-medium">نام محصول</th>
                    <th class="px-6 py-3 font-medium">قیمت</th>
                    <th class="px-6 py-3 font-medium">تاریخ ایجاد</th>
                    <th class="px-6 py-3 font-medium">وضعیت</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <?php if ($result_recent && mysqli_num_rows($result_recent) > 0): ?>
                    <?php while ($row = mysqli_fetch_assoc($result_recent)): ?>
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 ml-3">
                                        <i class="fas fa-image"></i>
                                    </div>
                                    <span class="font-medium text-gray-800"><?php echo htmlspecialchars($row['name']); ?></span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-gray-600"><?php echo number_format($row['price']); ?> تومان</td>
                            <td class="px-6 py-4 text-gray-500 text-sm" dir="ltr"><?php echo htmlspecialchars($row['created_at']); ?></td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">فعال</span>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="4" class="px-6 py-8 text-center text-gray-500">هیچ محصولی یافت نشد.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php
// Include footer
require_once "layout/footer.php";
?>
