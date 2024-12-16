import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import SummaryOrder from "../components/Summaryorder";
import Head from "../components/Head";
import ProductCard from "../components/ProductCard";
import PaymentModal from "../components/PaymentModal";
import CustomizeModal from '../components/CustomizeModal';

// Define base prices for products by category
const categoryPrices = {
  "Hot Coffee": 100,
  "Iced Coffee": 110,
  "Non Coffee": 100,
  "Premium": 130,
  "Pastry": 50,
  "Milk tea": 120,
  "Matcha": 130
};

const products = [
  { id: "1", name: "Amerikano", image: "/images/amerikano.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "2", name: "Black Coffee", image: "/images/black_coffee.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "3", name: "Cappuccino", image: "/images/cappuccino.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "4", name: "Vanilla Latte", image: "/images/vanilla_latte.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "5", name: "Sea Salt Cafe", image: "/images/sea_salt_cafe.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "6", name: "Cafe Mocha", image: "/images/cafe_mocha.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "7", name: "White Coffee", image: "/images/white_coffee.png", category: "Hot Coffee", price: categoryPrices["Hot Coffee"] },
  { id: "8", name: "Spanish Latte", image: "/images/spanish_latte.png", category: "Iced Coffee", price: categoryPrices["Iced Coffee"] },
  { id: "9", name: "Iced Latte", image: "/images/iced_latte.png", category: "Iced Coffee", price: categoryPrices["Iced Coffee"] },
  { id: "10", name: "Iced Cappuccino", image: "/images/iced_cappuccino.png", category: "Iced Coffee", price: categoryPrices["Iced Coffee"] },
  { id: "11", name: "Iced Mocha", image: "/images/iced_mocha.png", category: "Iced Coffee", price: categoryPrices["Iced Coffee"] },
  { id: "12", name: "Iced Vanilla", image: "/images/iced_vanilla.png", category: "Iced Coffee", price: categoryPrices["Iced Coffee"] },
  { id: "13", name: "Iced Hazelnut", image: "/images/iced_hazelnut.png", category: "Iced Coffee", price: categoryPrices["Iced Coffee"] },
  { id: "14", name: "Strawberry", image: "/images/strawberry.png", category: "Premium", price: categoryPrices["Premium"] },
  { id: "15", name: "Signature Choco", image: "/images/signature_choco.png", category: "Premium", price: categoryPrices["Premium"] },
  { id: "16", name: "Taro Milktea", image: "/images/taro_milktea.png", category: "Milk tea", price: categoryPrices["Milk tea"] },
  { id: "17", name: "Boba Milktea", image: "/images/boba_milktea.png", category: "Milk tea", price: categoryPrices["Milk tea"] },
  { id: "18", name: "Iced Lemonade", image: "/images/iced_lemonade.png", category: "Non Coffee", price: categoryPrices["Non Coffee"] },
  { id: "19", name: "Green Apple", image: "/images/green_apple.png", category: "Non Coffee", price: categoryPrices["Non Coffee"] },
  { id: "20", name: "Triple Choco Mocha", image: "/images/triple_choco_mocha.png", category: "Premium", price: categoryPrices["Premium"] },
  { id: "21", name: "Caramel Macchiato", image: "/images/caramel_macchiato.png", category: "Premium", price: categoryPrices["Premium"] },
  { id: "22", name: "Matcha Latte", image: "/images/matcha_latte.png", category: "Matcha Edition", price: categoryPrices["Matcha"] },
  { id: "23", name: "Okinawa", image: "/images/okinawa.png", category: "Milk tea", price: categoryPrices["Milk tea"] },
  { id: "24", name: "Matcha", image: "/images/matcha.png", category: "Matcha Edition", price: categoryPrices["Matcha"] },
  { id: "25", name: "Choco Chip", image: "/images/choco_chip.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "26", name: "Crossini", image: "/images/crossini.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "27", name: "Bun", image: "/images/bun.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "28", name: "Syrup Choco", image: "/images/syrup_choco.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "29", name: "Cookie", image: "/images/cookie.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "30", name: "Ham & Cheese", image: "/images/ham_cheese.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "31", name: "Hopia", image: "/images/hopia.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "32", name: "Red Velvet Cookie", image: "/images/red_velvet_cookie.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "33", name: "Hotdog Bun", image: "/images/hotdog_bun.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "34", name: "Oatmeal Raisins", image: "/images/oatmeal_raisins.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "35", name: "Dark Choco Chip", image: "/images/dark_choco_chip.png", category: "Pastry", price: categoryPrices["Pastry"] },
  { id: "36", name: "White Choco Chip", image: "/images/white_choco_chip.png", category: "Pastry", price: categoryPrices["Pastry"] },
].map(product => ({
  ...product,
  price: categoryPrices[product.category]
}));

const Pos = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [items, setItems] = useState([]);
  const [orderType, setOrderType] = useState("In-Cafe");
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "All Category",
    "Hot Coffee",
    "Iced Coffee",
    "Non Coffee",
    "Premium",
    "Pastry",
    "Milk tea",
    "Matcha"
  ];

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Category") return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  // Handle product click
  const handleProductClick = (product) => {
    if (product.category === "Pastry") {
      // For pastries, add directly to cart without customization
      const existingItemIndex = items.findIndex(item => item.name === product.name);

      if (existingItemIndex !== -1) {
        // If pastry exists, increase its quantity
        setItems(currentItems =>
          currentItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // If pastry doesn't exist, add it with quantity 1
        setItems(currentItems => [
          ...currentItems,
          { ...product, quantity: 1 }
        ]);
      }
    } else {
      // For non-pastries, open customize modal
      setSelectedProduct(product);
      setIsCustomizeModalOpen(true);
    }
  };

  // Handle order type change
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  // Handle quantity change
  const handleQuantityChange = (itemName, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity becomes 0, remove the item
      handleRemoveItem(itemName);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.name === itemName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  // Handle customization complete
  const handleCustomizationComplete = (customizedProduct) => {
    setIsCustomizeModalOpen(false);
    
    // Check if the product already exists in items
    const existingItemIndex = items.findIndex(
      item => item.name === customizedProduct.name
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase its quantity
      setItems(currentItems =>
        currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If item doesn't exist, add it with quantity 1
      setItems(currentItems => [
        ...currentItems,
        { ...customizedProduct, quantity: 1 }
      ]);
    }
  };

  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      
      <div className="flex-1 flex flex-col">
        <Head />
        
        <div className="flex-1 flex">
          <div className="flex-1 ">
            {/* Category Dropdown */}
            <div className="p-4">
              <div className="relative inline-block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white border rounded-lg text-gray-700 text-sm hover:bg-gray-50"
                >
                  <span>{selectedCategory}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-48 mt-2 bg-white rounded-lg shadow-lg border"
                    >
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                            selectedCategory === category ? 'text-[#8B4513] font-medium bg-gray-50' : 'text-gray-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div> 
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-9 gap-4 p-4 overflow-y-auto">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </div>
          
          <SummaryOrder
            items={items}
            orderType={orderType}
            onOrderTypeChange={handleOrderTypeChange}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>

      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
        product={selectedProduct}
        onProceed={handleCustomizationComplete}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        items={items}
        orderType={orderType}
      />
    </div>
  );
};

export default Pos;