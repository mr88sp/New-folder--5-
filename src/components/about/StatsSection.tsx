'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatsSectionProps {
  siteContent: any;
}

/**
 * کامپوننت StatsSection - آمار و ارقام
 * منطبق بر ساختار stats-section در about.html
 */
const StatsSection = ({ siteContent }: StatsSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="bg-gradient-to-r from-brand-primary to-brand-dark rounded-card p-8 md:p-12 mb-16" ref={ref}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {siteContent.stats_items?.map((stat: any, index: number) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center text-white"
          >
            <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">
              {inView ? (
                <CountUp
                  end={parseInt(stat.number)}
                  duration={2.5}
                  separator=","
                  suffix={stat.number.includes('+') ? '+' : ''}
                />
              ) : (
                stat.number
              )}
            </div>
            <div className="text-sm md:text-base text-white/80">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;