import { useState } from 'react';

const PickupHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[#8B4513] text-xl font-medium mb-1">Pick-up</h1>
          <p className="text-sm text-gray-500">Track and manage orders for customer pick-up.</p>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 rounded-lg bg-white shadow-lg z-10">
              <ul className="text-xs text-gray-700">
                <li>
                  <button
                    onClick={closeDropdown}
                    className="w-full px-3 py-1 text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={closeDropdown}
                    className="w-full px-3 py-1 text-left hover:bg-gray-100"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={closeDropdown}
                    className="w-full px-3 py-1 text-left hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickupHeader; 