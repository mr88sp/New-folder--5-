'use client';

import { FiInfo, FiAlertCircle, FiClock } from 'react-icons/fi';

/**
 * کامپوننت PriceNotes - توضیحات و نکات مهم قیمت‌ها
 * منطبق بر ساختار price-notes در price.html
 */
interface PriceNotesProps {
  siteContent: any;
}

const PriceNotes = ({ siteContent }: PriceNotesProps) => {
  const notes = [
    {
      icon: <FiInfo className="text-status-info" size={20} />,
      text: siteContent.price_note_1 || 'قیمت‌ها به تومان و برای هر ورق کامل محاسبه شده‌اند.',
    },
    {
      icon: <FiAlertCircle className="text-status-warning" size={20} />,
      text: siteContent.price_note_2 || 'برای خرید عمده و پالت، با واحد فروش تماس بگیرید.',
    },
    {
      icon: <FiInfo className="text-gray-500" size={20} />,
      text: siteContent.price_note_3 || 'قیمت‌ها بدون احتساب مالیات بر ارزش افزوده می‌باشند.',
    },
    {
      icon: <FiClock className="text-status-success" size={20} />,
      text: siteContent.price_note_4 || 'موجودی انبار روزانه بروزرسانی می‌شود.',
    },
    {
      icon: <FiAlertCircle className="text-status-error" size={20} />,
      text: siteContent.price_note_5 || 'قیمت‌ها ممکن است بدون اطلاع قبلی تغییر کنند.',
    },
  ];

  return (
    <div className="bg-gray-50 rounded-card p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-brand-primary/10 rounded-button flex items-center justify-center">
          <FiInfo className="text-brand-primary" size={16} />
        </div>
        <h4 className="text-lg font-bold text-gray-900">
          {siteContent.price_notes_title || 'توضیحات مهم:'}
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-0.5">{note.icon}</div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceNotes;