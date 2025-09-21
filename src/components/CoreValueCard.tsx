import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CoreValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'green' | 'blue' | 'yellow' | 'purple' | 'pink';
  index?: number;
}

export const CoreValueCard: React.FC<CoreValueCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  index = 0,
}) => {
  const colorVariants = {
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full flex items-center space-x-4"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className={`${colorVariants[color].bg} flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center`}
      >
        <Icon className={`h-7 w-7 ${colorVariants[color].text}`} />
      </motion.div>
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-heading font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  );
};

interface CoreValuesGridProps {
  values: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    color: 'green' | 'blue' | 'yellow' | 'purple' | 'pink';
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
