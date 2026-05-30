<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}
require_once "db_config.php";

// Create uploads directory if not exists
$target_dir = "../public/uploads/slider/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$success_msg = "";
$error_msg = "";

// Handle Delete
if (isset($_POST['delete_id'])) {
    $id = $_POST['delete_id'];
    
    // Get image path to delete file
    $sql = "SELECT image_path FROM slider_slides WHERE id = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $image_path);
        mysqli_stmt_fetch($stmt);
        mysqli_stmt_close($stmt);
        
        if ($image_path && file_exists("../public" . $image_path)) {
            unlink("../public" . $image_path);
        }
        
        $sql = "DELETE FROM slider_slides WHERE id = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $id);
            if (mysqli_stmt_execute($stmt)) {
                $success_msg = "اسلاید با موفقیت حذف شد.";
            } else {
                $error_msg = "خطا در حذف اسلاید.";
            }
            mysqli_stmt_close($stmt);
        }
    }
}

// Handle Add
if (isset($_POST['add_slide'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $link_url = $_POST['link'];
    $order_index = (int)$_POST['order_index'];
    
    // File upload
    if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
        $file_extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
        $new_filename = uniqid() . '.' . $file_extension;
        $target_file = $target_dir . $new_filename;
        
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $db_image_path = "/uploads/slider/" . $new_filename;
            
            $sql = "INSERT INTO slider_slides (title, description, link, order_index, image_path) VALUES (?, ?, ?, ?, ?)";
            if ($stmt = mysqli_prepare($link, $sql)) {
                mysqli_stmt_bind_param($stmt, "sssis", $title, $description, $link_url, $order_index, $db_image_path);
                if (mysqli_stmt_execute($stmt)) {
                    $success_msg = "اسلاید جدید با موفقیت اضافه شد.";
                } else {
                    $error_msg = "خطا در ذخیره در دیتابیس.";
                }
                mysqli_stmt_close($stmt);
            }
        } else {
            $error_msg = "خطا در آپلود تصویر.";
        }
    } else {
        $error_msg = "لطفا یک تصویر انتخاب کنید.";
    }
}

// Fetch Slides
$slides = [];
$sql = "SELECT * FROM slider_slides ORDER BY order_index ASC";
if ($result = mysqli_query($link, $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
        $slides[] = $row;
    }
    mysqli_free_result($result);
}

require_once "layout/header.php";
?>

<div class="max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">مدیریت اسلایدر صفحه اصلی</h2>
        <a href="content_management.php" class="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
            <i class="fas fa-arrow-right ml-2"></i> بازگشت به مدیریت محتوا
        </a>
    </div>

    <?php if($success_msg): ?>
        <div class="mb-6 px-4 py-3 rounded-button bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center">
            <i class="fas fa-check-circle ml-2"></i> <?php echo $success_msg; ?>
        </div>
    <?php endif; ?>
    
    <?php if($error_msg): ?>
        <div class="mb-6 px-4 py-3 rounded-button bg-red-50 text-red-700 border border-red-100 flex items-center">
            <i class="fas fa-exclamation-circle ml-2"></i> <?php echo $error_msg; ?>
        </div>
    <?php endif; ?>

    <!-- Add New Slide Form -->
    <div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 class="text-lg font-bold text-gray-800">افزودن اسلاید جدید</h3>
        </div>
        <div class="p-6">
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" enctype="multipart/form-data" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">عنوان اسلاید</label>
                    <input type="text" name="title" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">لینک (اختیاری)</label>
                    <input type="text" name="link" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="مثلا: /products">
                </div>
                
                <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-gray-700 mb-2">توضیحات</label>
                    <textarea name="description" rows="2" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">تصویر</label>
                    <input type="file" name="image" required class="w-full px-4 py-2 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <p class="text-xs text-gray-500 mt-1">بهترین سایز: 1200x600 پیکسل</p>
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">ترتیب نمایش</label>
                    <input type="number" name="order_index" value="0" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                </div>
                
                <div class="md:col-span-2 flex justify-end">
                    <button type="submit" name="add_slide" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-button shadow transition duration-300 flex items-center">
                        <i class="fas fa-plus ml-2"></i> افزودن اسلاید
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Slides List -->
    <div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 class="text-lg font-bold text-gray-800">لیست اسلایدها</h3>
        </div>
        
        <?php if (empty($slides)): ?>
            <div class="p-8 text-center text-gray-500">
                هنوز هیچ اسلایدی ثبت نشده است.
            </div>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="w-full text-right">
                    <thead class="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                            <th class="py-4 px-6">تصویر</th>
                            <th class="py-4 px-6">عنوان</th>
                            <th class="py-4 px-6">توضیحات</th>
                            <th class="py-4 px-6">ترتیب</th>
                            <th class="py-4 px-6">عملیات</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <?php foreach ($slides as $slide): ?>
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="py-4 px-6">
                                    <img src="..<?php echo htmlspecialchars($slide['image_path']); ?>" alt="Slide" class="h-16 w-24 object-cover rounded-button shadow-sm">
                                </td>
                                <td class="py-4 px-6 font-medium text-gray-800">
                                    <?php echo htmlspecialchars($slide['title']); ?>
                                </td>
                                <td class="py-4 px-6 text-gray-600 text-sm max-w-xs truncate">
                                    <?php echo htmlspecialchars($slide['description']); ?>
                                </td>
                                <td class="py-4 px-6 text-gray-600">
                                    <?php echo $slide['order_index']; ?>
                                </td>
                                <td class="py-4 px-6">
                                    <form method="post" onsubmit="return confirm('آیا از حذف این اسلاید اطمینان دارید؟');">
                                        <input type="hidden" name="delete_id" value="<?php echo $slide['id']; ?>">
                                        <button type="submit" class="text-red-500 hover:text-red-700 transition-colors" title="حذف">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php
require_once "layout/footer.php";
?>