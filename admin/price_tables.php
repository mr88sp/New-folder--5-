<?php
// Include header
include_once 'layout/header.php';
require_once "db_config.php";

// Handle Delete Request
if (isset($_POST['delete_id'])) {
    $delete_id = $_POST['delete_id'];
    $sql = "DELETE FROM price_tables WHERE id = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $delete_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_msg = "جدول با موفقیت حذف شد.";
        } else {
            $error_msg = "خطا در حذف جدول: " . mysqli_error($link);
        }
        mysqli_stmt_close($stmt);
    }
}

// Handle Create Request
if (isset($_POST['create_table'])) {
    $title = trim($_POST['title']);
    if (!empty($title)) {
        $sql = "INSERT INTO price_tables (title) VALUES (?)";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "s", $title);
            if (mysqli_stmt_execute($stmt)) {
                $new_id = mysqli_insert_id($link);
                // Redirect to edit page
                echo "<script>window.location.href = 'edit_price_table.php?id=" . $new_id . "';</script>";
                exit;
            } else {
                $error_msg = "خطا در ایجاد جدول: " . mysqli_error($link);
            }
            mysqli_stmt_close($stmt);
        }
    } else {
        $error_msg = "لطفاً عنوان جدول را وارد کنید.";
    }
}

// Fetch Price Tables
$tables = [];
$sql = "SELECT * FROM price_tables ORDER BY id DESC";
if ($result = mysqli_query($link, $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Count rows and columns for info
        $table_id = $row['id'];
        
        $col_sql = "SELECT COUNT(*) as count FROM price_table_columns WHERE table_id = $table_id";
        $col_res = mysqli_query($link, $col_sql);
        $col_count = mysqli_fetch_assoc($col_res)['count'];
        
        $row_sql = "SELECT COUNT(*) as count FROM price_table_rows WHERE table_id = $table_id";
        $row_res = mysqli_query($link, $row_sql);
        $row_count = mysqli_fetch_assoc($row_res)['count'];
        
        $row['col_count'] = $col_count;
        $row['row_count'] = $row_count;
        $tables[] = $row;
    }
}
?>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">مدیریت جداول قیمت</h1>
        <button onclick="document.getElementById('createModal').classList.remove('hidden')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 flex items-center">
            <i class="fas fa-plus ml-2"></i> ایجاد جدول جدید
        </button>
    </div>

    <?php if (isset($success_msg)): ?>
        <div class="bg-green-100 border-r-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm" role="alert">
            <p class="font-bold">موفقیت!</p>
            <p><?php echo $success_msg; ?></p>
        </div>
    <?php endif; ?>

    <?php if (isset($error_msg)): ?>
        <div class="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm" role="alert">
            <p class="font-bold">خطا!</p>
            <p><?php echo $error_msg; ?></p>
        </div>
    <?php endif; ?>

    <!-- Tables List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php if (empty($tables)): ?>
            <div class="col-span-full text-center py-12 bg-white rounded-button shadow">
                <p class="text-gray-500 text-lg">هنوز هیچ جدول قیمتی ایجاد نشده است.</p>
                <button onclick="document.getElementById('createModal').classList.remove('hidden')" class="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                    ایجاد اولین جدول
                </button>
            </div>
        <?php else: ?>
            <?php foreach ($tables as $table): ?>
                <div class="bg-white rounded-button shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-xl font-bold text-gray-800 truncate" title="<?php echo htmlspecialchars($table['title']); ?>">
                                <?php echo htmlspecialchars($table['title']); ?>
                            </h3>
                            <div class="flex gap-2">
                                <a href="edit_price_table.php?id=<?php echo $table['id']; ?>" class="text-blue-500 hover:text-blue-700 p-1" title="ویرایش">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <form method="POST" onsubmit="return confirm('آیا از حذف این جدول اطمینان دارید؟ تمام داده‌های آن حذف خواهد شد.');" class="inline">
                                    <input type="hidden" name="delete_id" value="<?php echo $table['id']; ?>">
                                    <button type="submit" class="text-red-500 hover:text-red-700 p-1" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                            <div class="text-center">
                                <span class="block font-bold text-lg text-gray-800"><?php echo $table['col_count']; ?></span>
                                <span class="text-xs">ستون</span>
                            </div>
                            <div class="text-center border-r border-gray-200">
                                <span class="block font-bold text-lg text-gray-800"><?php echo $table['row_count']; ?></span>
                                <span class="text-xs">ردیف</span>
                            </div>
                        </div>
                        
                        <div class="text-xs text-gray-400 text-left" dir="ltr">
                            Last updated: <?php echo date('Y/m/d H:i', strtotime($table['updated_at'])); ?>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                        <a href="edit_price_table.php?id=<?php echo $table['id']; ?>" class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                            مدیریت سطرها و ستون‌ها <i class="fas fa-arrow-left mr-1"></i>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>

<!-- Create Modal -->
<div id="createModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-button shadow-xl max-w-md w-full overflow-hidden transform transition-all">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800">ایجاد جدول قیمت جدید</h3>
            <button onclick="document.getElementById('createModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <form method="POST" class="p-6">
            <div class="mb-4">
                <label for="title" class="block text-gray-700 text-sm font-bold mb-2">عنوان جدول:</label>
                <input type="text" id="title" name="title" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-200" placeholder="مثلاً: لیست قیمت ورق‌های MDF سفید">
            </div>
            <div class="flex justify-end gap-3 mt-6">
                <button type="button" onclick="document.getElementById('createModal').classList.add('hidden')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200">
                    انصراف
                </button>
                <button type="submit" name="create_table" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition duration-200">
                    ایجاد جدول
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    // Close modal when clicking outside
    window.onclick = function(event) {
        var modal = document.getElementById('createModal');
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    }
</script>

</body>
</html>