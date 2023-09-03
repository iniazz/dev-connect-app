import React, { useEffect } from 'react';
import { Toast } from 'react-bootstrap';

interface ToastNotificationProps {
  show: boolean;
  onClose: () => void;
  message: string;
  success: boolean;
  delay?: number;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  show,
  onClose,
  message,
  success,
  delay = 3000,
}) => {
  const bgColor = success ? 'success' : 'danger';
  const textColor = 'text-white';
  const toastStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    minWidth: '10px',
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (show) {
      timeout = setTimeout(() => {
        onClose();
      }, delay);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [show, onClose, delay]);

  return (
    <Toast show={show} onClose={onClose} bg={bgColor} style={toastStyle} delay={delay} autohide>
      <Toast.Body className={`px-2 py-1 ${textColor}`}>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
