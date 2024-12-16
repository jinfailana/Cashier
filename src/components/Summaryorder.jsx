import React, { useState } from "react";
import { motion } from "framer-motion";
import PaymentModal from "./PaymentModal";

const SummaryOrder = ({
  items,
  orderType,
  onOrderTypeChange,
  onQuantityChange,
  onRemoveItem,
}) => {
  console.log('Items in SummaryOrder:', items);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Calculate total for a single item including quantity
  const calculateItemTotal = (item) => {
    if (item.category === "Pastry") {
      return item.price * item.quantity;
    }
    const sizePrice = item.sizePrice || 0;
    const addonsTotal = item.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
    return (sizePrice + addonsTotal) * item.quantity;
  };

  // Calculate grand total
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  // Update quantity handling
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      onRemoveItem(itemId);
      return;
    }
    onQuantityChange(itemId, newQuantity);
  };

  // Add handleRemoveItem function
  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId); // Call the parent component's remove function
    setHoveredItem(null); // Reset hover state after removing
  };

  return (
    <div className="w-[390px] h-screen bg-white flex flex-col shadow-lg">
      {/* Fixed Header Section */}
      <div className="p-4 h-[180px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#8B4513">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h1 className="text-xl font-semibold text-[#8B4513]">Summary</h1>
        </div>

        {/* Order Type Switch */}
        <div className="relative flex mb-5 bg-gray-100 rounded-lg p-2">
          <motion.div
            className="absolute h-[80%] top-[10%] rounded-md bg-primary shadow-sm"
            initial={false}
            animate={{
              x: orderType === "In-Cafe" ? 0 : "100%",
              width: "48%"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => onOrderTypeChange("In-Cafe")}
            className={`flex-1 py-2 text-sm relative z-10 ${
              orderType === "In-Cafe" ? "text-white font-medium" : "text-primary"
            }`}
          >
            In-Cafe
          </button>
          <button
            onClick={() => onOrderTypeChange("To-go")}
            className={`flex-1 py-2 text-sm relative z-10 ${
              orderType === "To-go" ? "text-white font-medium" : "text-primary"
            }`}
          >
            To-go
          </button>
        </div>

        {/* Order Type Display */}
        <div className="mb-4">
          <p className="text-[#8B4513] text-sm font-medium">
            {orderType === "In-Cafe" ? "( In-Cafe Order )" : "( To-go Order )"}
          </p>
        </div>
      </div>

      {/* Items List Header */}
      <p className="text-gray-600 px-4">Items :</p>

      {/* Scrollable Items List */}
      <div className="flex-1 overflow-y-auto px-4 h-[calc(100vh-280px)] 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-start py-1.5"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex-1">
                {/* Product Name */}
                <h3 className="text-xs font-medium text-gray-800">
                  {item.name}
                </h3>
                
                {/* Product Details and Customization */}
                <div className="text-[11px] text-gray-500 space-y-0.5">
                  {item.category === "Pastry" ? (
                    // Display for pastries
                    <p className="font-medium text-gray-700">
                      Price: ₱{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  ) : (
                    // Display for other items
                    <>
                      {/* Size and Price */}
                      {item.size && (
                        <p>Size: {item.size} (₱{item.sizePrice.toFixed(2)})</p>
                      )}
                      
                      {/* Add-ons with Prices */}
                      {item.addons && item.addons.length > 0 && (
                        <div>
                          <p>Add-ons:</p>
                          {item.addons.map((addon, index) => (
                            <p key={index} className="ml-2">
                              • {addon.name} (₱{addon.price.toFixed(2)})
                            </p>
                          ))}
                        </div>
                      )}
                      
                      {/* Sugar Level */}
                      {item.sugarLevel && (
                        <p>Sugar Level: {item.sugarLevel}</p>
                      )}

                      {/* Simple line separator */}
                      <div className="border-t border-gray-200 mt-1"></div>

                      {/* Total Price Display */}
                      <p className="font-medium text-gray-700">
                        Total: ₱{calculateItemTotal(item).toFixed(2)} × {item.quantity}
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="text-gray-400 hover:text-[#8B4513] text-xs px-1"
                  >
                    -
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="text-gray-400 hover:text-[#8B4513] text-sm px-1"
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-grey-400 hover:text-grey-500 transition-colors"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Total */}
      <div className="border-t border-gray-200 p-4 bg-white h-[200px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-lg font-semibold text-[#8B4513]">
            ₱{calculateTotalAmount().toFixed(2)}
          </span>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsPaymentModalOpen(true)}
          disabled={items.length === 0}
          className={`w-full py-3 rounded-lg text-center text-sm font-medium transition-all duration-200
            ${items.length === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#8B4513] text-white hover:bg-[#723A0F]'
            }`}
        >
          Proceed to payment
        </motion.button>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          items={items}
          orderType={orderType}
          totalAmount={calculateTotalAmount()}
        />
      </div>
    </div>
  );
};

export default SummaryOrder;