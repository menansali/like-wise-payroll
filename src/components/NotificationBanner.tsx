import AlertBanner from './ui/AlertBanner';

type Props = {
  message: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
};

export default function NotificationBanner({
  message,
  variant = 'info',
  title,
}: Props) {
  return <AlertBanner message={message} variant={variant} title={title} />;
}

