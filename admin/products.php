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

// Define filtering
$filter_type = isset($_GET['type']) ? $_GET['type'] : '';

// Attempt to select products from the database
$sql = "SELECT id, name, price, stock_status, type, created_at FROM products";
if (!empty($filter_type)) {
    $sql .= " WHERE type = '" . mysqli_real_escape_string($link, $filter_type) . "'";
}
$sql .= " ORDER BY created_at DESC";
$result = mysqli_query($link, $sql);

// Include header
require_once "layout/header.php";
?>

<div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
    <h2 class="text-3xl font-bold text-gray-800">مدیریت محصولات</h2>
    
    <div class="flex items-center gap-4">
        <form action="" method="get" class="flex items-center gap-2">
            <select name="type" onchange="this.form.submit()" class="border border-gray-300 rounded-button px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">همه موارد</option>
                <option value="product" <?php echo $filter_type === 'product' ? 'selected' : ''; ?>>محصولات عادی</option>
                <option value="price_list" <?php echo $filter_type === 'price_list' ? 'selected' : ''; ?>>لیست قیمت</option>
            </select>
        </form>

        <a href="create_product.php" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-button shadow transition duration-300 flex items-center">
            <i class="fas fa-plus ml-2"></i> افزودن جدید
        </a>
    </div>
</div>

<div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-right">
            <thead class="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <tr>
                    <th class="px-6 py-4 font-medium">#</th>
                    <th class="px-6 py-4 font-medium">نام محصول</th>
                    <th class="px-6 py-4 font-medium">نوع</th>
                    <th class="px-6 py-4 font-medium">وضعیت</th>
                    <th class="px-6 py-4 font-medium">قیمت</th>
                    <th class="px-6 py-4 font-medium">تاریخ ایجاد</th>
                    <th class="px-6 py-4 font-medium text-center">عملیات</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <?php if ($result && mysqli_num_rows($result) > 0): ?>
                    <?php while ($row = mysqli_fetch_assoc($result)): ?>
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 text-gray-400"><?php echo htmlspecialchars($row['id']); ?></td>
                            <td class="px-6 py-4">
                                <span class="font-medium text-gray-800"><?php echo htmlspecialchars($row['name']); ?></span>
                            </td>
                            <td class="px-6 py-4">
                                <?php if(isset($row['type']) && $row['type'] == 'price_list'): ?>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">لیست قیمت</span>
                                <?php else: ?>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">محصول</span>
                                <?php endif; ?>
                            </td>
                            <td class="px-6 py-4">
                                <?php 
                                    $status_classes = [
                                        'instock' => 'bg-green-100 text-green-800',
                                        'outofstock' => 'bg-red-100 text-red-800',
                                        'call' => 'bg-yellow-100 text-yellow-800'
                                    ];
                                    $status_labels = [
                                        'instock' => 'موجود',
                                        'outofstock' => 'ناموجود',
                                        'call' => 'تماس بگیرید'
                                    ];
                                    $status = $row['stock_status'] ?? 'instock';
                                ?>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium <?php echo $status_classes[$status] ?? 'bg-gray-100 text-gray-800'; ?>">
                                    <?php echo $status_labels[$status] ?? $status; ?>
                                </span>
                            </td>
                            <td class="px-6 py-4 text-gray-600 font-medium"><?php echo number_format($row['price']); ?> تومان</td>
                            <td class="px-6 py-4 text-gray-500 text-sm" dir="ltr"><?php echo htmlspecialchars($row['created_at']); ?></td>
                            <td class="px-6 py-4 text-center">
                                <div class="flex justify-center space-x-3 space-x-reverse">
                                    <a href="update_product.php?id=<?php echo $row['id']; ?>" class="text-blue-500 hover:text-blue-700 transition-colors" title="ویرایش">
                                        <i class="fas fa-edit fa-lg"></i>
                                    </a>
                                    <a href="delete_product.php?id=<?php echo $row['id']; ?>" class="text-red-500 hover:text-red-700 transition-colors" title="حذف" onclick="return confirm('آیا از حذف این محصول مطمئن هستید؟');">
                                        <i class="fas fa-trash-alt fa-lg"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                    <?php mysqli_free_result($result); ?>
                <?php else: ?>
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                            <div class="flex flex-col items-center justify-center">
                                <i class="fas fa-box-open text-gray-300 text-4xl mb-3"></i>
                                <p>هیچ محصولی یافت نشد.</p>
                            </div>
                        </td>
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
