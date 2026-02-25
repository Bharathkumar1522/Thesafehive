import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CoreValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export const CoreValueCard: React.FC<CoreValueCardProps> = ({
  icon: Icon,
  title,
  description,
  index = 0,
}) => {
  const TERRACOTTA = '#B85C38';
  const CHARCOAL = '#22211F';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white p-7 rounded-2xl border transition-all duration-400 h-full flex items-center space-x-5 group hover-card"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        borderColor: 'rgba(34,33,31,0.06)'
      }}
    >
      <div
        className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-400 group-hover:bg-[#B85C38]"
        style={{ background: 'rgba(184,92,56,0.12)' }}
      >
        <Icon
          className="h-6 w-6 transition-colors duration-400 group-hover:text-white"
          style={{ color: TERRACOTTA }}
          strokeWidth={1.5}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-heading mb-1.5" style={{ color: CHARCOAL }}>{title}</h3>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(34,33,31,0.68)' }}>{description}</p>
      </div>
    </motion.div>
  );
};

interface CoreValuesGridProps {
  values: ReadonlyArray<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  className?: string;
}

export const CoreValuesGrid: React.FC<CoreValuesGridProps> = ({ values, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {values.map((value, index) => (
        <CoreValueCard key={value.title} index={index} {...value} />
      ))}
    </div>
  );
};
