import React from "react";

interface TokenExpiredDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const TokenExpiredDialog: React.FC<TokenExpiredDialogProps> = ({
  isOpen,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-2">Session Expired</h2>
        <p className="text-sm text-gray-600 mb-6">
          Your session has expired. Please login again to continue.
        </p>
        <button
          onClick={onConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default TokenExpiredDialog;
