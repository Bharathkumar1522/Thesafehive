import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ActionProps {
  text: string;
  to: string;
  icon: ReactNode;
  secondaryIcon?: ReactNode;
  variant?: 'primary' | 'secondary';
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
  className?: string;
}

const ActionButton: React.FC<{ action: ActionProps }> = ({ action }) => {
  const buttonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
    const base = 'inline-flex items-center px-8 py-4 font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1';
    return variant === 'primary'
      ? `${base} bg-white text-green-600 hover:bg-gray-100`
      : `${base} bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600`;
  };

  // Check if it's an anchor link (starts with #)
  const isAnchorLink = action.to.startsWith('#');
  
  const content = (
    <>
      {action.icon}
      <span className="mx-2">{action.text}</span>
      {action.secondaryIcon}
    </>
  );

  if (isAnchorLink) {
    return (
      <a 
        href={action.to} 
        className={buttonClasses(action.variant)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link 
      to={action.to} 
      className={buttonClasses(action.variant)}
    >
      {content}
    </Link>
  );
};

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  return (
    <section className={`py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-xl text-green-100 mb-8">{description}</p>
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryAction && <ActionButton action={primaryAction} />}
              {secondaryAction && <ActionButton action={secondaryAction} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
