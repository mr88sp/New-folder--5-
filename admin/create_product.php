<?php
// Include config file
require_once "db_config.php";

// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}

// Define variables and initialize with empty values
$name = $description = $price = $brand = $thickness = $dimensions = $badge = "";
$stock_status = "instock";
$type = "product";
$category_id = "";
$name_err = $description_err = $price_err = $image_err = "";

// Fetch categories
$categories = [];
$cat_sql = "SELECT id, name FROM categories ORDER BY name";
if($cat_result = mysqli_query($link, $cat_sql)){
    while($cat_row = mysqli_fetch_assoc($cat_result)){
        $categories[] = $cat_row;
    }
}

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validate name
    $input_name = trim($_POST["name"]);
    if (empty($input_name)) {
        $name_err = "لطفا نام محصول را وارد کنید.";
    } else {
        $name = $input_name;
    }

    // Validate description
    $input_description = trim($_POST["description"]);
    $description = $input_description; // Optional

    // Validate other fields
    $brand = trim($_POST["brand"] ?? "");
    $thickness = trim($_POST["thickness"] ?? "");
    $dimensions = trim($_POST["dimensions"] ?? "");
    $badge = trim($_POST["badge"] ?? "");
    $stock_status = $_POST["stock_status"] ?? "instock";
    $type = $_POST["type"] ?? "product";
    $category_id = !empty($_POST["category_id"]) ? $_POST["category_id"] : null;

    // Validate price
    $input_price = trim($_POST["price"]);
    if (empty($input_price)) {
        $price_err = "لطفا قیمت محصول را وارد کنید.";
    } elseif (!ctype_digit($input_price)) {
        $price_err = "لطفا یک مقدار عددی صحیح وارد کنید.";
    } else {
        $price = $input_price;
    }

    // Validate and process image upload
    $image_path = "";
    // Check if file was uploaded without errors
    if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
        $target_dir = "uploads/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        
        $file_extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
        $file_extension = strtolower($file_extension);
        
        // Allowed file types
        $allowed_types = array("jpg", "jpeg", "png", "gif", "webp");
        
        if (in_array($file_extension, $allowed_types)) {
            // Generate unique filename
            $new_filename = uniqid() . '.' . $file_extension;
            $target_file = $target_dir . $new_filename;
            
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                $image_path = $target_file;
            } else {
                $image_err = "متاسفانه در هنگام آپلود فایل خطایی رخ داد.";
            }
        } else {
            $image_err = "فقط فایل‌های با فرمت JPG, JPEG, PNG, GIF, WEBP مجاز هستند.";
        }
    } else {
        $image_err = "لطفا یک تصویر برای محصول انتخاب کنید.";
    }

    // Check input errors before inserting in database
    if (empty($name_err) && empty($price_err) && empty($image_err)) {
        // Prepare an insert statement
        $sql = "INSERT INTO products (name, description, price, image_path, brand, thickness, dimensions, stock_status, badge, type, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        if ($stmt = mysqli_prepare($link, $sql)) {
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssisssssssi", $param_name, $param_description, $param_price, $param_image_path, $param_brand, $param_thickness, $param_dimensions, $param_stock_status, $param_badge, $param_type, $param_category_id);

            // Set parameters
            $param_name = $name;
            $param_description = $description;
            $param_price = $price;
            $param_image_path = $image_path;
            $param_brand = $brand;
            $param_thickness = $thickness;
            $param_dimensions = $dimensions;
            $param_stock_status = $stock_status;
            $param_badge = $badge;
            $param_type = $type;
            $param_category_id = $category_id;

            // Attempt to execute the prepared statement
            if (mysqli_stmt_execute($stmt)) {
                // Records created successfully. Redirect to landing page
                header("location: products.php");
                exit();
            } else {
                echo "مشکلی پیش آمد. لطفا بعدا دوباره تلاش کنید.";
            }
             // Close statement
             mysqli_stmt_close($stmt);
        }
    }
}

// Include header
require_once "layout/header.php";
?>

<div class="max-w-3xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">افزودن محصول جدید</h2>
        <a href="products.php" class="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
            <i class="fas fa-arrow-right ml-2"></i> بازگشت
        </a>
    </div>

    <div class="bg-white rounded-button shadow-sm border border-gray-100 overflow-hidden p-8">
        <p class="text-gray-500 mb-6">لطفا فرم زیر را برای افزودن محصول جدید پر کنید.</p>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" enctype="multipart/form-data" class="space-y-6">
            
            <!-- Name -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">نام محصول</label>
                <input type="text" name="name" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 <?php echo (!empty($name_err)) ? 'border-red-500 ring-1 ring-red-500' : ''; ?>" value="<?php echo $name; ?>" placeholder="نام محصول را وارد کنید">
                <span class="text-red-500 text-xs mt-1 block"><?php echo $name_err; ?></span>
            </div>

            <!-- Description -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">توضیحات</label>
                <textarea name="description" rows="4" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 <?php echo (!empty($description_err)) ? 'border-red-500 ring-1 ring-red-500' : ''; ?>" placeholder="توضیحات محصول را وارد کنید"><?php echo $description; ?></textarea>
                <span class="text-red-500 text-xs mt-1 block"><?php echo $description_err; ?></span>
            </div>

            <!-- Price -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="price">قیمت (تومان)</label>
                <input type="text" name="price" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 <?php echo (!empty($price_err)) ? 'border-red-500 ring-1 ring-red-500' : ''; ?>" value="<?php echo $price; ?>" placeholder="مثلا: 150000">
                <span class="text-red-500 text-xs mt-1 block"><?php echo $price_err; ?></span>
            </div>

            <!-- Image -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="image">تصویر محصول</label>
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-button cursor-pointer bg-gray-50 hover:bg-gray-100 <?php echo (!empty($image_err)) ? 'border-red-500 bg-red-50' : ''; ?>">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
                            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">برای آپلود کلیک کنید</span> یا فایل را اینجا رها کنید</p>
                            <p class="text-xs text-gray-500">JPG, PNG, GIF, WEBP</p>
                        </div>
                        <input id="dropzone-file" name="image" type="file" class="hidden" accept="image/*" onchange="previewImage(event)" />
                    </label>
                </div>
                <div id="image-preview" class="mt-4 hidden text-center">
                    <p class="text-sm text-gray-500 mb-2">پیش‌نمایش:</p>
                    <img id="preview-img" src="#" alt="Preview" class="max-h-48 mx-auto rounded-button shadow-sm border border-gray-200">
                </div>
                <span class="text-red-500 text-xs mt-1 block"><?php echo $image_err; ?></span>
            </div>

            <!-- New Fields Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Type -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="type">نوع آیتم</label>
                    <select name="type" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200">
                        <option value="product" <?php echo ($type == 'product') ? 'selected' : ''; ?>>محصول عادی</option>
                        <option value="price_list" <?php echo ($type == 'price_list') ? 'selected' : ''; ?>>لیست قیمت</option>
                    </select>
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="category_id">دسته‌بندی</label>
                    <select name="category_id" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200">
                        <option value="">بدون دسته‌بندی</option>
                        <?php foreach($categories as $cat): ?>
                            <option value="<?php echo $cat['id']; ?>" <?php echo ($category_id == $cat['id']) ? 'selected' : ''; ?>><?php echo htmlspecialchars($cat['name']); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <!-- Stock Status -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="stock_status">وضعیت موجودی</label>
                    <select name="stock_status" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200">
                        <option value="instock" <?php echo ($stock_status == 'instock') ? 'selected' : ''; ?>>موجود</option>
                        <option value="outofstock" <?php echo ($stock_status == 'outofstock') ? 'selected' : ''; ?>>ناموجود</option>
                        <option value="call" <?php echo ($stock_status == 'call') ? 'selected' : ''; ?>>تماس بگیرید</option>
                    </select>
                </div>

                <!-- Brand -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="brand">برند</label>
                    <input type="text" name="brand" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200" value="<?php echo $brand; ?>" placeholder="مثلا: سلیمی">
                </div>

                <!-- Thickness -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="thickness">ضخامت</label>
                    <input type="text" name="thickness" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200" value="<?php echo $thickness; ?>" placeholder="مثلا: 16 میل">
                </div>

                <!-- Dimensions -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="dimensions">ابعاد</label>
                    <input type="text" name="dimensions" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200" value="<?php echo $dimensions; ?>" placeholder="مثلا: 183*366">
                </div>

                <!-- Badge -->
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="badge">نشان (Badge)</label>
                    <input type="text" name="badge" class="w-full px-4 py-3 rounded-button border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200" value="<?php echo $badge; ?>" placeholder="مثلا: جدید، تخفیف">
                </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-button shadow transition duration-300 flex justify-center items-center transform hover:-translate-y-0.5">
                    <i class="fas fa-save ml-2"></i> ذخیره محصول
                </button>
                <a href="products.php" class="block text-center mt-4 text-gray-500 hover:text-gray-700 text-sm">انصراف</a>
            </div>
        </form>
    </div>
</div>

<script>
    function previewImage(event) {
        const input = event.target;
        const previewDiv = document.getElementById('image-preview');
        const previewImg = document.getElementById('preview-img');

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                previewDiv.classList.remove('hidden');
            }
            
            reader.readAsDataURL(input.files[0]);
        } else {
            previewDiv.classList.add('hidden');
        }
    }
</script>

<?php
// Include footer
require_once "layout/footer.php";
?>
