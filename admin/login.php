<?php
// session_start() را در ابتدای تمام فایل‌هایی که با session کار می‌کنند، قرار می‌دهیم.
// Session مکانیزمی است که به PHP اجازه می‌دهد اطلاعات کاربر را در صفحات مختلف به خاطر بسپارد.
session_start();

// اگر کاربر از قبل لاگین کرده بود، او را به صفحه اصلی پنل هدایت کن.
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: index.php");
    exit;
}

// فایل تنظیمات اتصال به پایگاه داده را فراخوانی کن.
require_once "db_config.php";

// متغیرها را با مقدار خالی اولیه تعریف کن.
$username = $password = "";
$username_err = $password_err = $login_err = "";

// بررسی اینکه آیا فرم ارسال شده است یا نه (با متد POST)
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // بررسی اینکه آیا نام کاربری خالی است یا نه
    if(empty(trim($_POST["username"]))){
        $username_err = "لطفاً نام کاربری را وارد کنید.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // بررسی اینکه آیا رمز عبور خالی است یا نه
    if(empty(trim($_POST["password"]))){
        $password_err = "لطفاً رمز عبور را وارد کنید.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // اگر خطایی در ورودی‌ها وجود نداشت
    if(empty($username_err) && empty($password_err)){
        // آماده‌سازی دستور SQL برای جلوگیری از SQL Injection
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            $param_username = $username;
            
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                
                // اگر کاربری با این نام کاربری وجود داشت
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        // اینجا مهم‌ترین بخش امنیتی است:
                        // مقایسه رمز عبور وارد شده با رمز عبور هش شده در پایگاه داده
                        if(password_verify($password, $hashed_password)){
                            // اگر رمز عبور صحیح بود، یک session جدید شروع کن
                            session_start();
                            
                            // ذخیره اطلاعات در متغیرهای session
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // هدایت کاربر به صفحه اصلی پنل مدیریت
                            header("location: index.php");
                        } else{
                            // اگر رمز عبور اشتباه بود
                            $login_err = "نام کاربری یا رمز عبور نامعتبر است.";
                        }
                    }
                } else{
                    // اگر کاربری با این نام کاربری وجود نداشت
                    $login_err = "نام کاربری یا رمز عبور نامعتبر است.";
                }
            } else{
                echo "خطا! لطفاً بعداً دوباره تلاش کنید.";
            }

            mysqli_stmt_close($stmt);
        }
    }
    
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ورود به پنل مدیریت</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Vazirmatn Font -->
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    <style>
        body {
            font-family: 'Vazirmatn', sans-serif;
            background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
        }
        .glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.5);
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen">
    <div class="absolute inset-0 bg-black opacity-50 z-0"></div>
    
    <div class="relative z-10 w-full max-w-md p-8 glass rounded-card shadow-2xl transform transition-all hover:scale-[1.01]">
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 shadow-inner">
                <i class="fas fa-lock text-2xl text-emerald-600"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800">خوش آمدید</h2>
            <p class="text-gray-500 mt-2">لطفاً برای دسترسی به پنل وارد شوید</p>
        </div>
        
        <?php 
        if(!empty($login_err)){
            echo '<div class="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm flex items-center" role="alert">';
            echo '<i class="fas fa-exclamation-circle ml-2 text-xl"></i>';
            echo '<p>' . $login_err . '</p>';
            echo '</div>';
        }        
        ?>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" class="space-y-6">
            <div class="relative">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">نام کاربری</label>
                <div class="relative">
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        <i class="fas fa-user"></i>
                    </span>
                    <input type="text" name="username" class="w-full pr-10 pl-3 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 <?php echo (!empty($username_err)) ? 'border-red-500 ring-1 ring-red-500' : ''; ?>" value="<?php echo $username; ?>" placeholder="نام کاربری خود را وارد کنید">
                </div>
                <span class="text-red-500 text-xs mt-1 block"><?php echo $username_err; ?></span>
            </div>    
            
            <div class="relative">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">رمز عبور</label>
                <div class="relative">
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        <i class="fas fa-key"></i>
                    </span>
                    <input type="password" name="password" class="w-full pr-10 pl-3 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 <?php echo (!empty($password_err)) ? 'border-red-500 ring-1 ring-red-500' : ''; ?>" placeholder="رمز عبور خود را وارد کنید">
                </div>
                <span class="text-red-500 text-xs mt-1 block"><?php echo $password_err; ?></span>
            </div>
            
            <div class="flex items-center justify-between mt-4">
                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer">
                    <label for="remember-me" class="mr-2 block text-sm text-gray-900 cursor-pointer">
                        مرا به خاطر بسپار
                    </label>
                </div>
                <!-- <div class="text-sm">
                    <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500">رمز عبور را فراموش کردید؟</a>
                </div> -->
            </div>

            <div>
                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-button shadow-md text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-300 transform hover:-translate-y-0.5">
                    ورود به سیستم
                </button>
            </div>
        </form>
        
        <div class="mt-8 text-center text-sm text-gray-500">
            <p>&copy; <?php echo date("Y"); ?> تمامی حقوق محفوظ است.</p>
        </div>
    </div>
</body>
</html>
