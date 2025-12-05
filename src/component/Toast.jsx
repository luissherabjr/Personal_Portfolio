import React, { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Let parent know it's dismissed
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`absolute mt-2 z-50 px-4 py-2 rounded shadow text-sm text-white
        ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
      `}
    >
      {message}
    </div>
  );
}
