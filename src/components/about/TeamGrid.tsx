'use client';

import { motion } from 'framer-motion';
import CustomImage from '@/components/ui/CustomImage';
import { FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';

interface TeamGridProps {
  siteContent: any;
}

/**
 * کامپوننت TeamGrid - اعضای تیم
 * منطبق بر ساختار team-grid در about.html
 */
const TeamGrid = ({ siteContent }: TeamGridProps) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {siteContent.team_title || "تیم ما"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {siteContent.team_description || "متخصصان با تجربه ما که پشتیبان شما هستند"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(siteContent.team_items || siteContent.team_members || []).map((member: any, index: number) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-card shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
          >
            {/* عکس پروفایل */}
            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
              {member.image ? (
                <CustomImage
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-brand-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}

              {/* شبکه‌های اجتماعی */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-colors shadow-lg"
                  >
                    <FiLinkedin size={18} />
                  </a>
                )}
                {member.social?.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-pink-600 hover:text-white transition-colors shadow-lg"
                  >
                    <FiInstagram size={18} />
                  </a>
                )}
                <a
                  href={`mailto:${member.name}@soheiliwood.ir`}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-secondary hover:text-white transition-colors shadow-lg"
                >
                  <FiMail size={18} />
                </a>
              </div>
            </div>

            {/* اطلاعات */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-brand-primary font-medium mb-3">
                {member.position}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;    