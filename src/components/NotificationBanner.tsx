type Props = {
  message: string;
};

export default function NotificationBanner({ message }: Props) {
  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
      {message}
    </div>
  );
}

