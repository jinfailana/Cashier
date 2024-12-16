import React from 'react';

const InvoiceModal = ({ isOpen, onClose, items, totalPrice, orderType, cashAmount, change, invoiceNumber }) => {
  if (!isOpen) return null;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;

  const getOrderTypeDisplay = () => {
    return orderType === 'In-Cafe' ? 'In-cafe' : 'To-go';
  };

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-[#8B4513] text-[15px] font-medium">{invoiceNumber}</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-[14px] font-medium">Whisked Cafe - By Ericka</h3>
          <p className="text-[12px] text-gray-500">Blk 18 Lot 21 Congress Extension , Caloocan, Philippines</p>
        </div>

        <div className="flex justify-between text-[13px] text-gray-600 mb-4">
          <div>
            <p>Cashier : BJ Cabaat</p>
            <p>Mode of payment : Cash</p>
          </div>
          <div className="text-right">
            <p>{getOrderTypeDisplay()}</p>
            <p>Issued on : {formattedDate}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[13px] mb-2">Items:</p>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-[13px]">
                <div className="flex gap-3">
                  <span>{item.quantity}</span>
                  <span>{item.name}</span>
                </div>
                <span>₱ {item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between mb-2">
            <span className="text-[13px]">Total items: {items.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[15px] font-medium">Total :</span>
              <span className="text-[15px]">₱ {totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px]">Cash :</span>
              <span className="text-[13px]">₱ {Number(cashAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px]">Change :</span>
              <span className="text-[13px]">₱ {change > 0 ? change.toLocaleString() : '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
