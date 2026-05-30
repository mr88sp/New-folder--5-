<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}
require_once "db_config.php";

if (isset($_POST["id"]) && !empty($_POST["id"])) {
    $id = trim($_POST["id"]);
    $image_to_delete = "";

    $sql_select_image = "SELECT image_path FROM products WHERE id = ?";
    if ($stmt_select = mysqli_prepare($link, $sql_select_image)) {
        mysqli_stmt_bind_param($stmt_select, "i", $id);
        if (mysqli_stmt_execute($stmt_select)) {
            $result = mysqli_stmt_get_result($stmt_select);
            if ($result && mysqli_num_rows($result) === 1) {
                $row = mysqli_fetch_assoc($result);
                $image_to_delete = $row['image_path'];
            }
        }
        mysqli_stmt_close($stmt_select);
    }

    $sql = "DELETE FROM products WHERE id = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $id);
        if (mysqli_stmt_execute($stmt)) {
            if (!empty($image_to_delete) && file_exists($image_to_delete)) {
                unlink($image_to_delete);
            }
            header("location: products.php");
            exit();
        } else {
            $error_message = "خطایی رخ داد.";
        }
        mysqli_stmt_close($stmt);
    }
}

if (!isset($_GET["id"]) || empty(trim($_GET["id"]))) {
    header("location: products.php?error=no_id");
    exit();
}

require_once "layout/header.php";
?>
<div class="max-w-xl mx-auto">
    <div class="bg-white border border-red-200 rounded-button shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-red-100 bg-red-50 flex items-center">
            <i class="fas fa-triangle-exclamation text-red-600 ml-2"></i>
            <h1 class="text-lg font-bold text-red-700">حذف محصول</h1>
        </div>
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" class="p-6 space-y-6">
            <input type="hidden" name="id" value="<?php echo trim($_GET['id']); ?>" />
            <p class="text-gray-700">آیا از حذف این محصول مطمئن هستید؟ این عمل غیرقابل بازگشت است.</p>
            <div class="flex justify-end space-x-3 space-x-reverse">
                <a href="products.php" class="px-4 py-2 rounded-button border border-gray-300 text-gray-700 hover:bg-gray-50">انصراف</a>
                <button type="submit" class="px-4 py-2 rounded-button bg-red-600 hover:bg-red-700 text-white">بله، حذف کن</button>
            </div>
        </form>
    </div>
</div>
<?php
require_once "layout/footer.php";
?>
