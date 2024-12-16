import React, { useState } from 'react';

const CustomizeModal = ({ isOpen, onClose, product, onProceed }) => {
  const [selectedSize, setSelectedSize] = useState('12oz');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [sugarLevel, setSugarLevel] = useState('Default (100%)');

  if (!isOpen || !product) return null;

  const sizes = [
    { size: '12oz', price: 50 },
    { size: '16oz', price: 60 },
    { size: '22oz', price: 80 },
  ];

  // Define all possible add-ons
  const ALL_ADDONS = {
    ESPRESSO_SHOT: { name: 'Espresso Shot', price: 35 },
    HEAVY_CREAM: { name: 'Heavy Cream', price: 25 },
    COFFEE_JELLY: { name: 'Coffee Jelly', price: 30 },
    PEARL: { name: 'Pearl', price: 25 },
  };

  // Define category-specific add-ons
  const CATEGORY_ADDONS = {
    'Hot Coffee': [
      ALL_ADDONS.ESPRESSO_SHOT,
      ALL_ADDONS.HEAVY_CREAM,
    ],
    'Iced Coffee': [
      ALL_ADDONS.ESPRESSO_SHOT,
      ALL_ADDONS.HEAVY_CREAM,
      ALL_ADDONS.COFFEE_JELLY,
    ],
    'Non-Coffee': [],
    'Milk tea': [
      ALL_ADDONS.PEARL,
    ],
    'Matcha Edition': [
      ALL_ADDONS.ESPRESSO_SHOT,
      ALL_ADDONS.HEAVY_CREAM,
    ],
    'Premium': [],
    'Pastry': [],
  };

  // Get available add-ons for the current product category
  const availableAddons = CATEGORY_ADDONS[product.category] || [];

  const handleAddonToggle = (addon) => {
    if (selectedAddons.find(item => item.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter(item => item.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    const sizePrice = selectedSize === '16oz' ? 60 : selectedSize === '22oz' ? 80 : 50;
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return sizePrice + addonsTotal;
  };

  const handleProceed = () => {
    const sizePrice = selectedSize === '16oz' ? 60 : selectedSize === '22oz' ? 80 : 50;
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const customizationTotal = sizePrice + addonsTotal;

    const customization = {
      size: selectedSize,
      sizePrice: sizePrice,
      addons: selectedAddons,
      sugarLevel: sugarLevel,
      total: customizationTotal
    };
    
    onProceed({
      ...product,
      ...customization,
      price: customizationTotal,
    });

    setSelectedSize('12oz');
    setSelectedAddons([]);
    setSugarLevel('Default (100%)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[320px]">
        <div className="p-3">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-base font-medium text-[#8B4513]">Customize</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">
              ×
            </button>
          </div>
          <p className="text-[13px] text-gray-600">{product.name}</p>
        </div>

        <div className="px-3 pb-3">
          {/* Size Selection */}
          <div className="mb-4 bg-[#FDF7F4] rounded-lg p-3">
            <h3 className="text-[13px] font-medium mb-2">Size</h3>
            <div className="space-y-2">
              {sizes.map(({ size, price }) => (
                <label key={size} className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="text-[#8B4513] focus:ring-[#8B4513]"
                  />
                  <span className="ml-2 text-[13px]">{size}</span>
                  <span className="ml-auto text-[13px]">₱{price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons Selection */}
          {availableAddons.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[13px] font-medium">Add-ons</h3>
              </div>
              <div className="space-y-2">
                {availableAddons.map((addon) => (
                  <label key={addon.name} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAddons.some(item => item.name === addon.name)}
                      onChange={() => handleAddonToggle(addon)}
                      className="text-[#8B4513] focus:ring-[#8B4513]"
                    />
                    <span className="ml-2 text-[13px]">{addon.name}</span>
                    <span className="ml-auto text-[13px]">+₱{addon.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Sugar Level Selection */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[13px] font-medium">Sugar Level</h3>
              <span className="text-[13px] text-gray-400">Free</span>
            </div>
            <select
              value={sugarLevel}
              onChange={(e) => setSugarLevel(e.target.value)}
              className="w-full text-[13px] border rounded-lg px-2 py-1.5 focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513]"
            >
              <option value="Default (100%)">Default (100%)</option>
              <option value="75% Sugar Level">75% Sugar Level</option>
              <option value="50% Sugar Level">50% Sugar Level</option>
              <option value="25% Sugar Level">25% Sugar Level</option>
            </select>
          </div>

          {/* Total Price Display */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium">Customization Total:</span>
              <span className="text-[13px] font-medium text-[#8B4513]">
                ₱{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="w-full py-2 bg-[#8B4513] text-white rounded-lg text-[13px] font-medium hover:bg-[#723A0F] transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;