<?php
session_start();

if (isset($_SESSION['test_views'])) {
    $_SESSION['test_views'] = $_SESSION['test_views'] + 1;
} else {
    $_SESSION['test_views'] = 1;
}

echo "<h1>تست جلسه (Session)</h1>";
echo "<p>شما این صفحه را " . $_SESSION['test_views'] . " بار مشاهده کرده‌اید.</p>";
echo "<p>برای تست، این صفحه را چند بار رفرش کنید. عدد باید افزایش یابد.</p>";
echo "<p><a href='http://localhost/admin/session_test.php'>رفرش صفحه</a></p>";
echo "<hr>";
echo "<h2>اطلاعات جلسه فعلی:</h2>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";
?>