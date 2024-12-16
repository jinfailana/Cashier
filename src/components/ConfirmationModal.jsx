const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-medium mb-4">Complete order</h2>
          
          <p className="text-gray-600 mb-2">
            Are you sure you want to mark this order as picked up? This will:
          </p>
          
          <ul className="text-gray-600 mb-6 list-disc pl-5">
            <li>Confirm the customer has collected the order</li>
            <li>Deduct the ingredients from inventory</li>
          </ul>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#793E1D] transition-colors"
            >
              Complete order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 