<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}
require_once "db_config.php";

// Define expected keys and their default values/labels grouped by category
$content_categories = [
    'general' => [
        'title' => 'تنظیمات عمومی',
        'icon' => 'fas fa-cog',
        'fields' => [
            'brand_name' => ['label' => 'نام برند', 'default' => 'سهیلی وود', 'type' => 'text'],
            'footer_about' => ['label' => 'توضیحات فوتر', 'default' => 'سهیلی وود با بیش از ۱۵ سال تجربه در صنعت چوب...', 'type' => 'textarea'],
        ]
    ],
    'contact' => [
        'title' => 'تماس و شبکه‌های اجتماعی',
        'icon' => 'fas fa-address-book',
        'fields' => [
            'contact_page_phone' => ['label' => 'شماره تماس', 'default' => '09123456789', 'type' => 'text'],
            'contact_page_address' => ['label' => 'آدرس کامل', 'default' => 'تهران، شهرک صنعتی خاوران، سایت چوب فروشان، خیابان صنوبر یکم، پلاک ۱۱۰۵', 'type' => 'textarea'],
            'whatsapp_link' => ['label' => 'لینک واتساپ', 'default' => 'https://wa.me/989123456789', 'type' => 'text'],
            'instagram_link' => ['label' => 'لینک اینستاگرام', 'default' => 'https://instagram.com/soheiliwood', 'type' => 'text'],
            'telegram_link' => ['label' => 'لینک تلگرام', 'default' => '', 'type' => 'text'],
        ]
    ],
    'home' => [
        'title' => 'صفحه اصلی',
        'icon' => 'fas fa-home',
        'fields' => [
            'hero_section_title' => ['label' => 'عنوان اصلی (Hero)', 'default' => 'آماده دریافت سفارش شما هستیم', 'type' => 'text'],
            'hero_section_description' => ['label' => 'توضیحات (Hero)', 'default' => 'برای استعلام قیمت، مشاوره تخصصی و ثبت سفارش، همین حالا با ما تماس بگیرید', 'type' => 'textarea'],
            'why_us_image' => ['label' => 'تصویر بخش چرا ما (URL)', 'default' => '/images/why-us.jpg', 'type' => 'text'],
        ]
    ],
    'price' => [
        'title' => 'تنظیمات قیمت و ماژول‌ها',
        'icon' => 'fas fa-tag',
        'fields' => [
            'price_page_title' => ['label' => 'عنوان صفحه قیمت', 'default' => 'استعلام قیمت روزانه', 'type' => 'text'],
            'price_update_date' => ['label' => 'تاریخ آخرین به‌روزرسانی قیمت‌ها', 'default' => date('Y-m-d'), 'type' => 'date'],
            'show_price_summary' => ['label' => 'نمایش خلاصه قیمت‌ها (ماژول جدید)', 'default' => '1', 'type' => 'toggle'],
            'show_brand_comparison' => ['label' => 'نمایش مقایسه برندها', 'default' => '1', 'type' => 'toggle'],
            'show_thickness_guide' => ['label' => 'نمایش راهنمای ضخامت', 'default' => '1', 'type' => 'toggle'],
            'show_material_selector' => ['label' => 'نمایش انتخاب سریع متریال', 'default' => '1', 'type' => 'toggle'],
        ]
    ]
];

// Flatten for database checks and updates
$default_content = [];
foreach ($content_categories as $cat) {
    foreach ($cat['fields'] as $key => $info) {
        $default_content[$key] = $info;
    }
}

// Ensure keys exist in database
foreach ($default_content as $key => $info) {
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
            // Only update if key exists in our expected list to avoid injection of random keys
            if (array_key_exists($key, $default_content)) {
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

// Fetch all content
$content_map = [];
$sql = "SELECT content_key, content_value FROM site_content";
if ($result = mysqli_query($link, $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
        $content_map[$row['content_key']] = $row['content_value'];
    }
    mysqli_free_result($result);
}

require_once "layout/header.php";
?>

<div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">مدیریت محتوای سایت</h2>
        <a href="index.php" class="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
            <i class="fas fa-arrow-right ml-2"></i> بازگشت
        </a>
    </div>

    <div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <div class="flex items-center gap-4">
                <i class="fas fa-sliders-h text-brand-primary text-xl"></i>
                <div>
                    <h3 class="text-lg font-bold text-gray-800">تنظیمات بخش‌های مختلف</h3>
                    <p class="text-gray-500 text-sm mt-1">محتوا و وضعیت ماژول‌های سایت را مدیریت کنید.</p>
                </div>
            </div>
            <div class="flex gap-2">
                <a href="slider_management.php" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-button text-sm font-medium transition-colors flex items-center">
                    <i class="fas fa-images ml-2"></i> مدیریت اسلایدر
                </a>
            </div>
        </div>
        
        <div class="p-0">
            <?php if($update_success): ?>
                <div class="m-6 px-4 py-3 rounded-button bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center">
                    <i class="fas fa-check-circle ml-2"></i>
                    تغییرات با موفقیت ذخیره شد.
                </div>
            <?php endif; ?>

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" id="settingsForm">
                <div class="flex flex-col md:flex-row">
                    <!-- Sidebar Tabs -->
                    <div class="w-full md:w-64 bg-gray-50 border-l border-gray-100">
                        <div class="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
                            <?php $first = true; foreach ($content_categories as $id => $cat): ?>
                                <button type="button" 
                                        onclick="showTab('<?php echo $id; ?>')" 
                                        id="tab-btn-<?php echo $id; ?>"
                                        class="tab-btn flex items-center gap-3 px-6 py-4 text-sm font-bold text-gray-600 hover:bg-white hover:text-brand-primary transition-all border-b md:border-b-0 md:border-r-4 border-transparent whitespace-nowrap <?php echo $first ? 'active bg-white text-brand-primary border-brand-primary' : ''; ?>">
                                    <i class="<?php echo $cat['icon']; ?> w-5"></i>
                                    <?php echo $cat['title']; ?>
                                </button>
                            <?php $first = false; endforeach; ?>
                        </div>
                    </div>

                    <!-- Tab Contents -->
                    <div class="flex-1 p-6 lg:p-8">
                        <?php $first = true; foreach ($content_categories as $id => $cat): ?>
                            <div id="tab-content-<?php echo $id; ?>" class="tab-content <?php echo $first ? '' : 'hidden'; ?> space-y-6">
                                <div class="mb-6">
                                    <h4 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <i class="<?php echo $cat['icon']; ?> text-brand-primary opacity-50"></i>
                                        <?php echo $cat['title']; ?>
                                    </h4>
                                    <div class="h-1 w-12 bg-brand-primary/20 mt-2 rounded-full"></div>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <?php foreach ($cat['fields'] as $key => $field): ?>
                                        <?php $value = isset($content_map[$key]) ? $content_map[$key] : $field['default']; ?>
                                        <div class="bg-white rounded-xl border border-gray-100 p-4 hover:border-brand-primary/20 transition-all group">
                                            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div class="flex-1">
                                                    <label class="block text-sm font-bold text-gray-700 mb-1" for="<?php echo $key; ?>">
                                                        <?php echo $field['label']; ?>
                                                    </label>
                                                    <p class="text-xs text-gray-400 mb-2">شناسه: <?php echo $key; ?></p>
                                                </div>
                                                
                                                <div class="w-full lg:w-2/3">
                                                    <?php if ($field['type'] === 'textarea'): ?>
                                                        <textarea name="<?php echo $key; ?>" rows="3" class="w-full px-4 py-3 rounded-button border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition duration-200"><?php echo htmlspecialchars($value); ?></textarea>
                                                    
                                                    <?php elseif ($field['type'] === 'toggle'): ?>
                                                        <label class="relative inline-flex items-center cursor-pointer">
                                                            <input type="hidden" name="<?php echo $key; ?>" value="0">
                                                            <input type="checkbox" name="<?php echo $key; ?>" value="1" <?php echo $value == '1' ? 'checked' : ''; ?> class="sr-only peer">
                                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                                            <span class="mr-3 text-sm font-medium text-gray-600"><?php echo $value == '1' ? 'فعال' : 'غیرفعال'; ?></span>
                                                        </label>

                                                    <?php elseif ($field['type'] === 'date'): ?>
                                                        <input type="date" name="<?php echo $key; ?>" value="<?php echo htmlspecialchars($value); ?>" class="w-full lg:w-48 px-4 py-2 rounded-button border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition duration-200">

                                                    <?php else: ?>
                                                        <input type="text" name="<?php echo $key; ?>" value="<?php echo htmlspecialchars($value); ?>" class="w-full px-4 py-2 rounded-button border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition duration-200">
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        <?php $first = false; endforeach; ?>
                    </div>
                </div>

                <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <p class="text-sm text-gray-500">
                        <i class="fas fa-info-circle ml-1"></i> تمامی تغییرات پس از ذخیره در سایت اعمال خواهند شد.
                    </p>
                    <button type="submit" name="submit" class="bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-10 rounded-button shadow-lg shadow-brand-primary/20 transition duration-300 flex items-center transform hover:-translate-y-1">
                        <i class="fas fa-save ml-2"></i> ذخیره تمامی تغییرات
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function showTab(tabId) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show selected content
    document.getElementById('tab-content-' + tabId).classList.remove('hidden');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'text-brand-primary', 'border-brand-primary');
        btn.classList.add('text-gray-600', 'border-transparent');
    });
    
    // Set active button
    const activeBtn = document.getElementById('tab-btn-' + tabId);
    activeBtn.classList.add('active', 'bg-white', 'text-brand-primary', 'border-brand-primary');
    activeBtn.classList.remove('text-gray-600', 'border-transparent');
}
</script>
</div>

<?php
require_once "layout/footer.php";
?>