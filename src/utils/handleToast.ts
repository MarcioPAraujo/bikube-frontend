import { toast } from 'react-toastify';

export const notifyError = (message: string) =>
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
  });

export const notifySuccess = (message: string) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
  });

