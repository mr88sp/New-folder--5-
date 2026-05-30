'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation, FiTruck, FiInfo } from 'react-icons/fi';
import { RiTreasureMapLine, RiParkingBoxLine, RiBusFill, RiTrainFill } from 'react-icons/ri';

/**
 * کامپوننت MapSection - نقشه و موقعیت
 */
const MapSection = ({ siteContent }: { siteContent: any }) => {
  const mapTitle = siteContent.contact_page_map_title || 'موقعیت ما روی نقشه';
  const mapAddress = siteContent.contact_page_address || 'تهران، شهرک صنعتی خاوران، سایت چوب فروشان، خیابان صنوبر یکم';
  const googleMapsLink = siteContent.google_maps_link || 'https://goo.gl/maps/xyz';
  
  const metroTitle = siteContent.contact_page_metro_title || 'مترو';
  const metroStation = siteContent.contact_page_metro_station || 'ندارد';
  const busTitle = siteContent.contact_page_bus_title || 'اتوبوس';
  const busStation = siteContent.contact_page_bus_station || 'ایستگاه خاوران';
  const parkingTitle = siteContent.contact_page_parking_title || 'پارکینگ';
  const parkingName = siteContent.contact_page_parking_name || 'پارکینگ اختصاصی';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-card shadow-lg p-6 mb-12 h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-card flex items-center justify-center flex-shrink-0">
          <FiMapPin className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{mapTitle}</h3>
      </div>

      <div className="relative h-[450px] rounded-button overflow-hidden bg-gray-100 mb-6 border border-gray-100">
        <iframe 
          title="map-iframe" 
          src="https://neshan.org/maps/iframe/places/_bQyaiNxyuM4#c35.552-51.608-20z-0p/35.55191342622059/51.60738955888411" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy"
        ></iframe>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-button border border-gray-100">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
            <RiTrainFill size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500">{metroTitle}</p>
            <p className="text-xs font-bold text-gray-900">{metroStation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-button border border-gray-100">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
            <RiBusFill size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500">{busTitle}</p>
            <p className="text-xs font-bold text-gray-900">{busStation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-button border border-gray-100">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
            <RiParkingBoxLine size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500">{parkingTitle}</p>
            <p className="text-xs font-bold text-gray-900">{parkingName}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <a 
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary text-white font-bold rounded-button hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20"
        >
          <FiNavigation size={18} />
          مسیریابی با گوگل مپ
        </a>
      </div>
    </motion.div>
  );
};

export default MapSection;
