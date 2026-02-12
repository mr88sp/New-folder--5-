/**
 * توابع کمکی برای واتساپ
 */

/**
 * تولید لینک واتساپ با متن سفارش
 * @param phoneNumber شماره تلفن (بدون صفر و کد کشور)
 * @param message متن پیام
 * @returns لینک واتساپ
 */
export const generateWhatsAppLink = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * تولید متن سفارش محصول
 * @param productName نام محصول
 * @param thickness ضخامت
 * @param dimensions ابعاد
 * @param brand برند
 * @param quantity تعداد
 * @param price قیمت
 * @returns متن آماده برای واتساپ
 */
export const generateOrderMessage = (
  productName: string,
  thickness: number,
  dimensions: string,
  brand: string,
  quantity: number = 1,
  price?: number
): string => {
  let message = `سلام،\n\n`;
  message += `از سایت Soheili Wood سفارش دارم:\n`;
  message += `------------------------\n`;
  message += `🪵 محصول: ${productName}\n`;
  message += `📏 ضخامت: ${thickness}mm\n`;
  message += `📐 ابعاد: ${dimensions}\n`;
  message += `🏭 برند: ${brand}\n`;
  message += `🔢 تعداد: ${quantity} ورق\n`;
  
  if (price) {
    const total = price * quantity;
    message += `💰 قیمت واحد: ${price.toLocaleString('fa-IR')} تومان\n`;
    message += `💵 جمع کل: ${total.toLocaleString('fa-IR')} تومان\n`;
  }
  
  message += `------------------------\n`;
  message += `لطفاً جهت تکمیل سفارش راهنمایی بفرمایید.`;
  
  return message;
};

/**
 * تولید متن استعلام قیمت
 * @param productName نام محصول
 * @returns متن استعلام قیمت
 */
export const generatePriceInquiryMessage = (productName: string): string => {
  let message = `سلام،\n\n`;
  message += `از سایت Soheili Wood استعلام قیمت دارم:\n`;
  message += `------------------------\n`;
  message += `🪵 محصول: ${productName}\n`;
  message += `------------------------\n`;
  message += `لطفاً قیمت و موجودی را اعلام بفرمایید.`;
  
  return message;
};