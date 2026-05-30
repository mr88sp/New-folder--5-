<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}
require_once "db_config.php";

$new_username = $new_password = $confirm_password = "";
$new_username_err = $new_password_err = $confirm_password_err = "";
$update_success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty(trim($_POST["new_username"]))) {
        $new_username_err = "لطفا نام کاربری جدید را وارد کنید.";
    } else {
        $sql = "SELECT id FROM users WHERE username = ? AND id != ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            $param_username = trim($_POST["new_username"]);
            $param_id = $_SESSION["id"];
            mysqli_stmt_bind_param($stmt, "si", $param_username, $param_id);
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1) {
                    $new_username_err = "این نام کاربری قبلا استفاده شده است.";
                } else {
                    $new_username = $param_username;
                }
            }
            mysqli_stmt_close($stmt);
        }
    }

    if (!empty(trim($_POST["new_password"]))) {
        if (strlen(trim($_POST["new_password"])) < 6) {
            $new_password_err = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
        }
    }

    if (!empty(trim($_POST["new_password"]))) {
        $confirm_password = trim($_POST["confirm_password"]);
        if (empty($confirm_password)) {
            $confirm_password_err = "لطفا رمز عبور را تایید کنید.";
        } else {
            if (trim($_POST["new_password"]) !== $confirm_password) {
                $confirm_password_err = "رمزهای عبور مطابقت ندارند.";
            }
        }
    }

    if (empty($new_username_err) && empty($new_password_err) && empty($confirm_password_err)) {
        $sql = "UPDATE users SET username = ?" . (!empty(trim($_POST["new_password"])) ? ", password = ?" : "") . " WHERE id = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            if (!empty(trim($_POST["new_password"]))) {
                $hashed = password_hash(trim($_POST["new_password"]), PASSWORD_DEFAULT);
                mysqli_stmt_bind_param($stmt, "ssi", $new_username, $hashed, $_SESSION["id"]);
            } else {
                mysqli_stmt_bind_param($stmt, "si", $new_username, $_SESSION["id"]);
            }
            if (mysqli_stmt_execute($stmt)) {
                $_SESSION["username"] = $new_username;
                $update_success = true;
            }
            mysqli_stmt_close($stmt);
        }
    }
}

require_once "layout/header.php";
?>
<div class="max-w-xl mx-auto">
    <div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-xl font-bold text-gray-800">تنظیمات حساب کاربری</h2>
            <p class="text-gray-500 text-sm mt-1">نام کاربری و رمز عبور خود را به‌روز کنید.</p>
        </div>
        <div class="p-6">
            <?php if($update_success): ?>
                <div class="mb-4 px-4 py-3 rounded-button bg-emerald-50 text-emerald-700 border border-emerald-100">اطلاعات حساب با موفقیت به‌روز شد.</div>
            <?php endif; ?>
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">نام کاربری جدید</label>
                    <input type="text" name="new_username" value="<?php echo htmlspecialchars($_SESSION['username']); ?>" class="w-full px-4 py-3 rounded-button border <?php echo (!empty($new_username_err)) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'; ?> focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <span class="text-red-500 text-xs mt-1 block"><?php echo $new_username_err; ?></span>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">رمز عبور جدید (اختیاری)</label>
                    <input type="password" name="new_password" class="w-full px-4 py-3 rounded-button border <?php echo (!empty($new_password_err)) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'; ?> focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <span class="text-red-500 text-xs mt-1 block"><?php echo $new_password_err; ?></span>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور جدید</label>
                    <input type="password" name="confirm_password" class="w-full px-4 py-3 rounded-button border <?php echo (!empty($confirm_password_err)) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'; ?> focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <span class="text-red-500 text-xs mt-1 block"><?php echo $confirm_password_err; ?></span>
                </div>
                <div class="flex justify-end space-x-3 space-x-reverse">
                    <a href="index.php" class="px-4 py-2 rounded-button border border-gray-300 text-gray-700 hover:bg-gray-50">بازگشت</a>
                    <button type="submit" class="px-4 py-2 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white">ذخیره تغییرات</button>
                </div>
            </form>
        </div>
    </div>
</div>
<?php
require_once "layout/footer.php";
?>
