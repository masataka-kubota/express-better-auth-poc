import { notifications } from '@mantine/notifications';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Show a success notification with a green accent and a success icon.
 *
 * @param title - The notification title.
 * @param message - The notification message.
 */
export const showSuccessNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    color: 'green',
    icon: <CheckCircle2 size={18} />,
  });
};

/**
 * Show an error notification with a red accent and an error icon.
 *
 * @param title - The notification title.
 * @param message - The notification message.
 */
export const showErrorNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    color: 'red',
    icon: <AlertCircle size={18} />,
  });
};
