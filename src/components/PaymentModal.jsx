import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvoiceModal from './InvoiceModal';

const PaymentModal = ({ isOpen, onClose, items, orderType, totalAmount }) => {
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [cashAmount, setCashAmount] = useState('0');
  const [invoiceNumber] = useState('INV1122-001');
  const [showInvoice, setShowInvoice] = useState(false);

  const MAXIMUM_AMOUNT = 100000;

  const calculateChange = () => {
    const cash = parseFloat(cashAmount) || 0;
    return Math.max(0, cash - totalAmount);
  };

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
    if (method === 'GCash') {
      setCashAmount('0');
    } else {
      setCashAmount('200');
    }
  };

  // Handle number input
  const handleNumberInput = (value) => {
    if (selectedPayment === 'Cash') {
      if (value === 'backspace') {
        setCashAmount(prev => prev.slice(0, -1));
      } else {
        setCashAmount(prev => prev + value);
      }
    }
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isOpen || selectedPayment !== 'Cash') return;

      // Prevent default behavior for numeric keys and backspace
      event.preventDefault();

      const key = event.key;
      const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

      if (validNumbers.includes(key)) {
        handleNumberInput(key);
      } else if (key === 'Backspace') {
        handleNumberInput('backspace');
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, selectedPayment]);

  const handlePrintInvoice = () => {
    setShowInvoice(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {!showInvoice ? (
        <AnimatePresence>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg w-[800px] h-[700px]"
            >
              <div className="flex relative h-full">
                {/* Left Section */}
                <div className="flex-1 flex flex-col h-full">
                  {/* Fixed Header */}
                  <div className="p-10 pb-2">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-gray-600 text-lg">Invoice: </span>
                        <span className="text-[#8B4513] text-lg">{invoiceNumber}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Items:</p>
                    <p className="text-gray-500 text-sm">({orderType} order)</p>
                  </div>

                  {/* Scrollable Items Section */}
                  <div className="flex-1 overflow-y-auto px-6 text-xs">
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div key={index} className="flex justify-between text-lg py-2">
                          <span>{item.quantity} {item.name}</span>
                          <span>₱ {item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fixed Totals Section */}
                  <div className="p-6 pt-2 border-t border-gray-200 bg-white">
                    <div className="flex justify-between text-lg text-gray-600">
                      <span>Total items:</span>
                      <span>{items.length}</span>
                    </div>
                    <div className="flex justify-between font-medium text-xl mt-2">
                      <span>Total:</span>
                      <span>₱ {totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Vertical Line Separator */}
                <div className="w-[1px] bg-gray-200 absolute top-6 bottom-6 right-[288px]"></div>

                {/* Right Section */}
                <div className="w-[288px] p-6 flex flex-col">
                  {/* Close Button */}
                  <div className="flex justify-end mb-6">
                    <button onClick={onClose} className="text-gray-400">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <p className="text-lg mb-4">Select payment method:</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handlePaymentChange('Cash')}
                        className={`flex-1 py-2 px-4 rounded-lg text-lg transition-colors ${
                          selectedPayment === 'Cash'
                            ? 'bg-gray-100 text-[#8B4513]'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Cash
                      </button>
                      <button
                        onClick={() => handlePaymentChange('GCash')}
                        className={`flex-1 py-2 px-4 rounded-lg text-lg transition-colors ${
                          selectedPayment === 'GCash'
                            ? 'bg-gray-100 text-[#8B4513]'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        GCash
                      </button>
                    </div>
                  </div>

                  {/* Cash Amount and Change */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-3 text-lg">
                      <span>Cash:</span>
                      <span>₱{cashAmount}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Change:</span>
                      <span>₱{calculateChange().toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Keypad Section with Fixed Height */}
                  <div className="h-[296px] mb-6">
                    {selectedPayment === 'Cash' ? (
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleNumberInput(num.toString())}
                            className="w-14 h-14 flex items-center justify-center rounded 
                                     hover:bg-gray-100 text-xl relative group"
                          >
                            {num}
                            {/* Keyboard hint overlay */}
                            <span className="absolute top-1 right-1 text-xs text-gray-400 opacity-0 
                                           group-hover:opacity-100 transition-opacity">
                              {num}
                            </span>
                          </button>
                        ))}
                        <button
                          onClick={() => handleNumberInput('backspace')}
                          className="w-14 h-14 flex items-center justify-center rounded 
                                   hover:bg-gray-100 text-xl relative group"
                        >
                          ⌫
                          {/* Keyboard hint overlay */}
                          <span className="absolute top-1 right-1 text-xs text-gray-400 opacity-0 
                                         group-hover:opacity-100 transition-opacity">
                            ⌫
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <p className="mb-2">Please scan the GCash QR code</p>
                          <p>to complete your payment</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Print Invoice Button */}
                  <button
                    onClick={handlePrintInvoice}
                    className="w-full bg-[#8B4513] text-white py-4 rounded-lg hover:bg-[#723A0F] text-lg mt-auto"
                  >
                    Print invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      ) : (
        <InvoiceModal
          isOpen={showInvoice}
          onClose={() => {
            setShowInvoice(false);
            onClose();
          }}
          items={items}
          orderType={orderType}
          totalAmount={totalAmount}
          paymentMethod={selectedPayment}
          cashAmount={cashAmount}
          change={calculateChange()}
          invoiceNumber={invoiceNumber}
        />
      )}
    </>
  );
};

export default PaymentModal;
