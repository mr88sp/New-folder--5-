<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}
require_once "db_config.php";

// Define theme keys and their default values/labels
$theme_settings = [
    'theme_color_primary' => ['label' => 'رنگ اصلی (Primary)', 'default' => '#2563EB', 'type' => 'color'],
    'theme_color_secondary' => ['label' => 'رنگ ثانویه (Secondary)', 'default' => '#64748B', 'type' => 'color'],
    'theme_color_accent' => ['label' => 'رنگ تاکید (Accent)', 'default' => '#3B82F6', 'type' => 'color'],
    'theme_color_dark' => ['label' => 'رنگ تیره/هدر (Dark)', 'default' => '#1E3A8A', 'type' => 'color'],
    'theme_color_background' => ['label' => 'رنگ پس‌زمینه (Background)', 'default' => '#F8FAFC', 'type' => 'color'],
    'theme_color_surface' => ['label' => 'رنگ سطح/کارت (Surface)', 'default' => '#FFFFFF', 'type' => 'color'],
    'theme_color_text_main' => ['label' => 'رنگ متن اصلی', 'default' => '#0F172A', 'type' => 'color'],
    'theme_color_text_light' => ['label' => 'رنگ متن روشن', 'default' => '#64748B', 'type' => 'color'],
    'theme_radius_card' => ['label' => 'گردی لبه کارت‌ها (rem)', 'default' => '1', 'type' => 'number', 'step' => '0.1', 'min' => '0', 'max' => '5'],
    'theme_radius_button' => ['label' => 'گردی لبه دکمه‌ها (rem)', 'default' => '0.5', 'type' => 'number', 'step' => '0.1', 'min' => '0', 'max' => '5'],
];

// Ensure keys exist in database
foreach ($theme_settings as $key => $info) {
    $check_sql = "SELECT content_key FROM site_content WHERE content_key = '$key'";
    $check_res = mysqli_query($link, $check_sql);
    if (mysqli_num_rows($check_res) == 0) {
        $insert_sql = "INSERT INTO site_content (content_key, content_value) VALUES (?, ?)";
        if ($stmt = mysqli_prepare($link, $insert_sql)) {
            mysqli_stmt_bind_param($stmt, "ss", $key, $info['default']);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
    }
}

$update_success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "UPDATE site_content SET content_value = ? WHERE content_key = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
        foreach ($_POST as $key => $value) {
            if ($key === 'submit') continue;
            if (array_key_exists($key, $theme_settings)) {
                $param_value = $value;
                $param_key = $key;
                mysqli_stmt_bind_param($stmt, "ss", $param_value, $param_key);
                mysqli_stmt_execute($stmt);
            }
        }
        mysqli_stmt_close($stmt);
        $update_success = true;
    }
}

// Fetch current values
$current_values = [];
$sql = "SELECT content_key, content_value FROM site_content WHERE content_key LIKE 'theme_%'";
if ($result = mysqli_query($link, $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
        $current_values[$row['content_key']] = $row['content_value'];
    }
    mysqli_free_result($result);
}

require_once "layout/header.php";
?>

<div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">تنظیمات تم و رنگ‌بندی</h2>
        <a href="index.php" class="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
            <i class="fas fa-arrow-right ml-2"></i> بازگشت
        </a>
    </div>

    <div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 class="text-lg font-bold text-gray-800">پالت رنگی سایت</h3>
            <p class="text-gray-500 text-sm mt-1">رنگ‌های اصلی سایت را از اینجا تغییر دهید. این تغییرات در کل سایت اعمال می‌شوند.</p>
        </div>
        
        <div class="p-6">
            <?php if($update_success): ?>
                <div class="mb-6 px-4 py-3 rounded-button bg-status-success/10 text-status-success border border-status-success/20 flex items-center">
                    <i class="fas fa-check-circle ml-2"></i>
                    تنظیمات تم با موفقیت ذخیره شد.
                </div>
            <?php endif; ?>

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" class="space-y-8">
                <!-- بخش رنگ‌ها -->
                <div class="border-b border-gray-100 pb-6">
                    <h4 class="text-md font-bold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-palette ml-2 text-brand-primary"></i> پالت رنگی
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <?php foreach ($theme_settings as $key => $info): 
                            if ($info['type'] !== 'color') continue;
                            $val = $current_values[$key] ?? $info['default'];
                        ?>
                            <div class="relative group">
                                <label for="<?php echo $key; ?>" class="block text-sm font-medium text-gray-700 mb-2">
                                    <?php echo $info['label']; ?>
                                </label>
                                <div class="flex items-center gap-3">
                                    <div class="relative w-12 h-12 rounded-button overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                                        <input type="color" 
                                               id="<?php echo $key; ?>" 
                                               name="<?php echo $key; ?>" 
                                               value="<?php echo $val; ?>" 
                                               class="absolute -top-2 -left-2 w-16 h-16 p-0 border-0 cursor-pointer">
                                    </div>
                                    <input type="text" 
                                           value="<?php echo $val; ?>" 
                                           class="flex-1 px-4 py-2 border border-gray-300 rounded-button text-sm font-mono text-gray-600 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary uppercase"
                                           onchange="document.getElementById('<?php echo $key; ?>').value = this.value">
                                </div>
                                <p class="text-xs text-gray-400 mt-1">کد رنگ: <?php echo $val; ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- بخش انحنای لبه‌ها -->
                <div>
                    <h4 class="text-md font-bold text-gray-700 mb-6 flex items-center">
                        <i class="fas fa-vector-square ml-2 text-brand-primary"></i> تنظیمات انحنای لبه‌ها (Border Radius)
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <?php foreach ($theme_settings as $key => $info): 
                            if ($info['type'] !== 'number') continue;
                            $val = $current_values[$key] ?? $info['default'];
                        ?>
                            <div class="relative group">
                                <label for="<?php echo $key; ?>" class="block text-sm font-medium text-gray-700 mb-2">
                                    <?php echo $info['label']; ?>
                                </label>
                                <div class="flex items-center gap-3">
                                    <input type="range" 
                                           id="range_<?php echo $key; ?>" 
                                           min="<?php echo $info['min']; ?>" 
                                           max="<?php echo $info['max']; ?>" 
                                           step="<?php echo $info['step']; ?>" 
                                           value="<?php echo $val; ?>" 
                                           class="flex-1 h-2 bg-gray-200 rounded-button appearance-none cursor-pointer accent-brand-primary"
                                           oninput="document.getElementById('<?php echo $key; ?>').value = this.value">
                                    <input type="number" 
                                           id="<?php echo $key; ?>" 
                                           name="<?php echo $key; ?>" 
                                           value="<?php echo $val; ?>" 
                                           step="<?php echo $info['step']; ?>"
                                           class="w-20 px-3 py-2 border border-gray-300 rounded-button text-center text-sm font-mono text-gray-600 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                                           oninput="document.getElementById('range_<?php echo $key; ?>').value = this.value">
                                </div>
                                <p class="text-xs text-gray-400 mt-2">مقدار فعلی: <?php echo $val; ?>rem</p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="pt-6 border-t border-gray-100 flex justify-end">
                    <button type="submit" class="bg-brand-primary hover:bg-brand-dark text-white px-8 py-3 rounded-button font-bold shadow-lg shadow-brand-primary/20 transition-all transform hover:-translate-y-1">
                        <i class="fas fa-save ml-2"></i> ذخیره تغییرات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php require_once "layout/footer.php"; ?>
