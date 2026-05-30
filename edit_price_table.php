<?php
include_once 'layout/header.php';
require_once "db_config.php";

$table_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($table_id == 0) {
    echo "<script>window.location.href = 'price_tables.php';</script>";
    exit;
}

// Fetch initial data to ensure table exists
$sql = "SELECT * FROM price_tables WHERE id = ?";
if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $table_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $table = mysqli_fetch_assoc($result);
    if (!$table) {
        echo "<script>window.location.href = 'price_tables.php';</script>";
        exit;
    }
}
?>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
            <a href="price_tables.php" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-arrow-right text-xl"></i>
            </a>
            <h1 class="text-2xl font-bold text-gray-800">ویرایش جدول قیمت</h1>
        </div>
        <div class="flex gap-2">
            <button id="add-default-btn" class="hidden bg-brand-secondary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-button shadow transition duration-200">
                <i class="fas fa-magic ml-2"></i> افزودن ستون‌های پیش‌فرض
            </button>
            <button id="add-column-btn" class="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-button shadow transition duration-200">
                <i class="fas fa-columns ml-2"></i> افزودن ستون
            </button>
            <button id="add-row-btn" class="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-button shadow transition duration-200">
                <i class="fas fa-plus ml-2"></i> افزودن ردیف
            </button>
        </div>
    </div>

    <!-- Title Input -->
    <div class="mb-8 bg-white p-6 rounded-card shadow-md border border-gray-100">
        <label for="table-title" class="block text-gray-700 text-sm font-bold mb-2">عنوان جدول:</label>
        <div class="flex gap-4">
            <input type="text" id="table-title" value="<?php echo htmlspecialchars($table['title']); ?>" class="flex-grow shadow appearance-none border rounded-button py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-brand-primary transition duration-200 text-lg">
            <button id="save-title-btn" class="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-6 rounded-button shadow transition duration-200">
                ذخیره عنوان
            </button>
        </div>
    </div>

    <!-- Dynamic Table -->
    <div class="bg-white rounded-card shadow-lg overflow-hidden border border-gray-200 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200" id="price-table">
            <thead class="bg-gray-50">
                <tr id="table-header-row">
                    <!-- Columns will be injected here -->
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" id="table-body">
                <!-- Rows will be injected here -->
            </tbody>
        </table>
        
        <div id="empty-state" class="hidden p-12 text-center text-gray-500">
            <i class="fas fa-table text-4xl mb-4 text-gray-300"></i>
            <p>این جدول هنوز هیچ ستونی ندارد. برای شروع یک ستون اضافه کنید.</p>
        </div>
    </div>
    
    <div class="mt-4 text-gray-500 text-sm">
        <i class="fas fa-info-circle ml-1"></i> تغییرات سلول‌ها به صورت خودکار ذخیره می‌شوند.
    </div>
</div>

<!-- Add Column Modal -->
<div id="columnModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-sm w-full overflow-hidden">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h3 class="text-lg font-bold text-gray-800">افزودن ستون جدید</h3>
        </div>
        <div class="p-6">
            <input type="hidden" id="column-id">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">نام ستون</label>
                <input type="text" id="new-column-name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="مثلاً: قیمت">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">مقدار پیش‌فرض</label>
                <input type="text" id="new-column-default" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="اختیاری">
                <p class="text-xs text-gray-500 mt-1">این مقدار برای ردیف‌های جدید (اگر از ردیف بالا کپی نشوند) استفاده می‌شود.</p>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">نوع داده</label>
                <select id="new-column-type" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">
                    <option value="text">متن ساده</option>
                    <option value="price">قیمت (تومان)</option>
                    <option value="status">وضعیت (موجودی)</option>
                    <option value="select">انتخابی (دراپ‌داون سفارشی)</option>
                    <option value="number">عدد</option>
                </select>
            </div>
            <div id="column-options-container" class="mb-6 hidden">
                <label class="block text-gray-700 text-sm font-bold mb-2">گزینه‌ها (با کاما جدا کنید)</label>
                <input type="text" id="new-column-options" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="مثلاً: قرمز، آبی، سبز">
                <p class="text-xs text-gray-500 mt-1">گزینه‌هایی که می‌خواهید در لیست کشویی نمایش داده شوند را با کاما (،) از هم جدا کنید.</p>
            </div>
            <div class="flex justify-end gap-2">
                <button onclick="document.getElementById('columnModal').classList.add('hidden')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">انصراف</button>
                <button id="confirm-add-column" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">ذخیره</button>
            </div>
        </div>
    </div>
</div>

<!-- Loading Overlay -->
<div id="loading-overlay" class="fixed inset-0 bg-white bg-opacity-70 z-40 flex items-center justify-center hidden">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    const tableId = <?php echo $table_id; ?>;
    let columns = [];
    let rows = [];

    $(document).ready(function() {
        loadTableData();

        // Update Title
        $('#save-title-btn').click(function() {
            const title = $('#table-title').val();
            showLoading();
            $.post('api_price_table.php', {
                action: 'update_table_title',
                table_id: tableId,
                title: title
            }, function(response) {
                hideLoading();
                if (response.success) {
                    // Show toast or alert
                    alert('عنوان جدول ذخیره شد.');
                } else {
                    alert('خطا: ' + response.message);
                }
            }, 'json');
        });

        // Show Add Column Modal
        $('#add-column-btn').click(function() {
            $('#column-id').val('');
            $('#new-column-name').val('');
            $('#new-column-default').val('');
            $('#new-column-type').val('text').prop('disabled', false);
            $('#new-column-options').val('');
            $('#column-options-container').addClass('hidden');
            
            // Update title
            $('#columnModal h3').text('افزودن ستون جدید');
            
            $('#columnModal').removeClass('hidden');
            $('#new-column-name').focus();
        });

        // Toggle options input based on type
        $('#new-column-type').change(function() {
            if ($(this).val() === 'select') {
                $('#column-options-container').removeClass('hidden');
            } else {
                $('#column-options-container').addClass('hidden');
            }
        });

        // Confirm Add/Edit Column
        $('#confirm-add-column').click(function() {
            const id = $('#column-id').val();
            const name = $('#new-column-name').val();
            const defaultValue = $('#new-column-default').val();
            const type = $('#new-column-type').val();
            const options = $('#new-column-options').val();
            
            if (!name) return;
            
            $('#columnModal').addClass('hidden');
            showLoading();
            
            if (id) {
                // Update
                $.post('api_price_table.php', {
                    action: 'update_column',
                    table_id: tableId,
                    column_id: id,
                    name: name,
                    default_value: defaultValue,
                    type: type,
                    options: options
                }, function(response) {
                    if (response.success) {
                        loadTableData();
                    } else {
                        hideLoading();
                        alert('خطا: ' + response.message);
                    }
                }, 'json');
            } else {
                // Add
                $.post('api_price_table.php', {
                    action: 'add_column',
                    table_id: tableId,
                    name: name,
                    default_value: defaultValue,
                    type: type,
                    options: options
                }, function(response) {
                    if (response.success) {
                        loadTableData();
                    } else {
                        hideLoading();
                        alert('خطا: ' + response.message);
                    }
                }, 'json');
            }
        });

        // Add Default Columns
        $('#add-default-btn').click(function() {
            if (columns.length > 0) {
                if (!confirm('آیا مطمئن هستید؟ افزودن ستون‌های پیش‌فرض به ستون‌های موجود اضافه می‌شود.')) return;
            }
            
            showLoading();
            $.post('api_price_table.php', {
                action: 'add_default_columns',
                table_id: tableId
            }, function(response) {
                if (response.success) {
                    loadTableData();
                } else {
                    hideLoading();
                    alert('خطا: ' + response.message);
                }
            }, 'json');
        });

        // Add Row
        $('#add-row-btn').click(function() {
            if (columns.length === 0) {
                alert('لطفاً ابتدا حداقل یک ستون ایجاد کنید.');
                return;
            }
            
            showLoading();
            $.post('api_price_table.php', {
                action: 'add_row',
                table_id: tableId
            }, function(response) {
                if (response.success) {
                    loadTableData();
                } else {
                    hideLoading();
                    alert('خطا: ' + response.message);
                }
            }, 'json');
        });
    });

    function loadTableData() {
        showLoading();
        $.post('api_price_table.php', {
            action: 'get_table_data',
            table_id: tableId
        }, function(response) {
            hideLoading();
            if (response.success) {
                columns = response.columns;
                rows = response.rows; // rows now contain 'cells' object
                renderTable();
            } else {
                alert('خطا در دریافت اطلاعات جدول');
            }
        }, 'json');
    }

    function renderTable() {
        const $headerRow = $('#table-header-row');
        const $tbody = $('#table-body');
        
        $headerRow.empty();
        $tbody.empty();

        if (columns.length === 0) {
            $('#empty-state').removeClass('hidden');
            $('#price-table').addClass('hidden');
            $('#add-default-btn').removeClass('hidden');
            return;
        } else {
            $('#empty-state').addClass('hidden');
            $('#price-table').removeClass('hidden');
            $('#add-default-btn').addClass('hidden');
        }

        // Render Header
        // Add row number column header
        $headerRow.append('<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-16">#</th>');
        
        columns.forEach(col => {
            $headerRow.append(`
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider group relative">
                    <div class="flex items-center justify-between">
                        <span class="cursor-pointer hover:text-brand-primary" onclick="editColumn(${col.id})">${col.name}</span>
                        <button onclick="deleteColumn(${col.id})" class="text-status-error/70 hover:text-status-error opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </th>
            `);
        });
        
        // Actions column header
        $headerRow.append('<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-16">عملیات</th>');

        // Render Rows
        rows.forEach((row, index) => {
            let tr = `<tr class="hover:bg-gray-50 transition-colors">`;
            
            // Row Number
            tr += `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">${index + 1}</td>`;
            
            columns.forEach(col => {
                const cellValue = (row.cells && row.cells[col.id]) ? row.cells[col.id] : '';
                let inputHtml = '';
                
                if (col.type === 'status') {
                    const statusMap = {
                        'موجود': 'موجود',
                        'ناموجود': 'ناموجود',
                        'محدود': 'محدود',
                        'تماس بگیرید': 'تماس بگیرید'
                    };
                    
                    inputHtml = `<select 
                        class="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-brand-primary focus:outline-none transition-colors py-1 cursor-pointer"
                        onchange="updateCell(${row.id}, ${col.id}, this)"
                    >`;
                    inputHtml += `<option value="">انتخاب...</option>`;
                    for (const [key, val] of Object.entries(statusMap)) {
                        const selected = cellValue === key ? 'selected' : '';
                        inputHtml += `<option value="${key}" ${selected}>${val}</option>`;
                    }
                    inputHtml += `</select>`;
                } else if (col.type === 'select') {
                    inputHtml = `<select 
                        class="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors py-1 cursor-pointer"
                        onchange="updateCell(${row.id}, ${col.id}, this)"
                    >`;
                    inputHtml += `<option value="">انتخاب...</option>`;
                    
                    let options = [];
                    if (col.options) {
                        // Handle comma separated options (Persian or English comma)
                        options = col.options.split(/[,،]/).map(opt => opt.trim());
                    }
                    
                    options.forEach(opt => {
                        if (opt) {
                            const selected = cellValue === opt ? 'selected' : '';
                            inputHtml += `<option value="${opt}" ${selected}>${opt}</option>`;
                        }
                    });
                    inputHtml += `</select>`;
                } else if (col.type === 'price') {
                    inputHtml = `<input type="text" 
                        class="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors py-1 text-left"
                        value="${cellValue}"
                        placeholder="0"
                        onchange="updateCell(${row.id}, ${col.id}, this)"
                        onkeyup="this.value=addCommas(this.value.replace(/[^0-9]/g, ''))"
                    >`;
                } else {
                    inputHtml = `<input type="text" 
                        class="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors py-1"
                        value="${cellValue}"
                        onchange="updateCell(${row.id}, ${col.id}, this)"
                    >`;
                }

                tr += `
                    <td class="px-6 py-4 whitespace-nowrap">
                        ${inputHtml}
                    </td>
                `;
            });
            
            // Delete Row Action
            tr += `
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="deleteRow(${row.id})" class="text-status-error hover:text-status-error-dark transition-colors bg-status-error/5 p-2 rounded-full hover:bg-status-error/10">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            
            tr += `</tr>`;
            $tbody.append(tr);
        });
    }

    function editColumn(id) {
        const col = columns.find(c => c.id == id);
        if (!col) return;

        $('#column-id').val(col.id);
        $('#new-column-name').val(col.name);
        $('#new-column-default').val(col.default_value || '');
        $('#new-column-type').val(col.type || 'text');
        
        // Handle options
        if (col.type === 'select') {
            $('#column-options-container').removeClass('hidden');
            $('#new-column-options').val(col.options || '');
        } else {
            $('#column-options-container').addClass('hidden');
            $('#new-column-options').val('');
        }

        // Update title
        $('#columnModal h3').text('ویرایش ستون');
        
        $('#columnModal').removeClass('hidden');
        $('#new-column-name').focus();
    }

    function deleteColumn(id) {
        if (!confirm('آیا از حذف این ستون اطمینان دارید؟ تمام داده‌های این ستون حذف خواهد شد.')) return;
        
        showLoading();
        $.post('api_price_table.php', {
            action: 'delete_column',
            table_id: tableId,
            column_id: id
        }, function(response) {
            if (response.success) {
                loadTableData();
            } else {
                hideLoading();
                alert('خطا: ' + response.message);
            }
        }, 'json');
    }
    


    function deleteRow(id) {
        if (!confirm('آیا از حذف این ردیف اطمینان دارید؟')) return;
        
        showLoading();
        $.post('api_price_table.php', {
            action: 'delete_row',
            table_id: tableId,
            row_id: id
        }, function(response) {
            if (response.success) {
                loadTableData();
            } else {
                hideLoading();
                alert('خطا: ' + response.message);
            }
        }, 'json');
    }

    function updateCell(rowId, colId, element) {
        // Don't show full loading overlay for cell updates to keep it snappy
        // Show a small indicator on the cell
        const value = $(element).val();
        const $cell = $(element).closest('td');
        
        $cell.addClass('bg-yellow-50');
        
        $.post('api_price_table.php', {
            action: 'update_cell',
            table_id: tableId,
            row_id: rowId,
            column_id: colId,
            value: value
        }, function(response) {
            $cell.removeClass('bg-yellow-50');
            if (response.success) {
                $cell.addClass('bg-green-100 transition-colors duration-500');
                setTimeout(() => {
                    $cell.removeClass('bg-green-100');
                }, 1000);
            } else {
                alert('خطا در ذخیره مقدار: ' + response.message);
                $cell.addClass('bg-red-100');
            }
        }, 'json').fail(function() {
             $cell.removeClass('bg-yellow-50').addClass('bg-red-100');
             alert('خطا در برقراری ارتباط با سرور');
        });
    }

    function showLoading() {
        $('#loading-overlay').removeClass('hidden');
    }

    function hideLoading() {
        $('#loading-overlay').addClass('hidden');
    }

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
</script>

</body>
</html>