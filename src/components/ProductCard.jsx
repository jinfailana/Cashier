import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(product)}
      className="w-[95px] h-[95px] bg-white rounded-xl shadow-md p-3 cursor-pointer flex flex-col items-center justify-between"
    >
      <div className="w-[18px] h-[18px] relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-center mt-2">
        <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProductCard;
