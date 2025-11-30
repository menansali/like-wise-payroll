'use client';

import { X, Bell } from 'lucide-react';
import { useState } from 'react';
import AlertBanner from '@/components/ui/AlertBanner';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Payroll Reminder',
    message: 'Payroll due in 7 days for your team',
    time: '2 hours ago',
    type: 'info',
    read: false,
  },
  {
    id: '2',
    title: 'FX Rate Alert',
    message: 'Save 2% more. Convert USD → INR now.',
    time: '5 hours ago',
    type: 'success',
    read: false,
  },
  {
    id: '3',
    title: 'Budget Created',
    message: 'Budget for Q1 2025 has been created successfully',
    time: '1 day ago',
    type: 'success',
    read: true,
  },
];

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full border border-emerald-200 p-2 text-emerald-600 hover:bg-emerald-50 transition-colors"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[99]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-[100] w-80 rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-colors hover:bg-slate-50 ${
                        !notification.read ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            )}
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {notification.time}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

