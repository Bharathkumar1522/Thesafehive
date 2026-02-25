import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ActionProps {
  text: string;
  to: string;
  icon: ReactNode;
  secondaryIcon?: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
  className?: string;
}

const ActionButton: React.FC<{ action: ActionProps }> = ({ action }) => {
  const buttonClasses = (variant: 'primary' | 'secondary' = 'primary', className?: string) => {
    const base = 'inline-flex items-center px-10 py-5 font-medium rounded transition-all duration-700 shadow-md hover:shadow-xl transform hover:-translate-y-1 text-sm tracking-widest uppercase';
    const variantClass = variant === 'primary'
      ? 'bg-cream text-charcoal hover:bg-white'
      : 'bg-transparent text-cream border border-taupe/40 hover:bg-taupe/10';
    return `${base} ${variantClass} ${className || ''}`.trim();
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
        className={buttonClasses(action.variant, action.className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={action.to}
      className={buttonClasses(action.variant, action.className)}
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
    <section className={`py-24 md:py-32 bg-charcoal relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-cream mb-8 tracking-tight">{title}</h2>
          <p className="text-xl md:text-2xl text-cream/70 mb-12 font-light leading-relaxed">{description}</p>

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
