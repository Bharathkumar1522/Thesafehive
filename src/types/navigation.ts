// Navigation types for the application

export type Page = 
  | 'home'
  | 'about'
  | 'blog'
  | 'learn'
  | 'contact'
  | 'login';

export interface NavigationItem {
  name: string;
  href: Page;
  current: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}
