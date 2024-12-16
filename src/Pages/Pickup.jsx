import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import PickupHeader from '../components/PickupHeader';
import ConfirmationModal from '../components/ConfirmationModal';

const Pickup = () => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [orderToComplete, setOrderToComplete] = useState(null);

  // Sample data - you can replace this with actual data
  const orders = [
    {
      invoiceNo: 'INV1112-002',
      name: 'Jin Dela Cruz',
      pickupTime: '10:00 AM',
      status: 'ready'
    },
    {
      invoiceNo: 'INV1121-003',
      name: 'Irheli Sanay',
      pickupTime: '11:30 AM',
      status: 'processing'
    },
  ];

  const handleStatusChange = (invoiceNo, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.invoiceNo === invoiceNo 
        ? { ...order, status: newStatus }
        : order
    );
    // Update your orders state here
  };

  const handleCompleteOrderClick = (order) => {
    setOrderToComplete(order);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmComplete = () => {
    if (orderToComplete) {
      handleStatusChange(orderToComplete.invoiceNo, 'completed');
      setIsConfirmModalOpen(false);
      setOrderToComplete(null);
    }
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setIsConfirmModalOpen(false));

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <PickupHeader />
        
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-base font-medium mb-4">Pick-up Orders</h2>
              
              {/* Tabs and Search container */}
              <div className="flex items-start justify-between mb-6 relative">
                <div className="flex gap-11 relative w-full border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('Orders')}
                    className={`pb-2 px-2 text-xs font-medium relative ${
                      activeTab === 'Orders'
                        ? 'text-[#8B4513] border-b-2 border-[#8B4513] -mb-[2px]'
                        : 'text-gray-500'
                    }`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('Processing')}
                    className={`pb-2 px-2 text-xs font-medium relative ${
                      activeTab === 'Processing'
                        ? 'text-[#8B4513] border-b-2 border-[#8B4513] -mb-[2px]'
                        : 'text-gray-500'
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => setActiveTab('Ready')}
                    className={`pb-2 px-2 text-xs font-medium relative ${
                      activeTab === 'Ready'
                        ? 'text-[#8B4513] border-b-2 border-[#8B4513] -mb-[2px]'
                        : 'text-gray-500'
                    }`}
                  >
                    Ready for pickup
                  </button>
                </div>

                {/* Search - adjusted position higher */}
                <div className="absolute right-0 -mt-4 mr-[7%]">
                  <input
                    type="text"
                    placeholder="Search name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-1 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#8B4513]"
                  />
                  <svg
                    className="absolute left-2.5 top-2 text-gray-400"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-20 py-2.5 text-left text-xs font-medium text-gray-500">Invoice no.</th>
                    <th className="px-16 py-2.5 text-left text-xs font-medium text-gray-500">Name</th>
                    <th className="px-20 py-2.5 text-left text-xs font-medium text-gray-500">Pick-up Time</th>
                    <th className="px-20 py-2.5 text-left text-xs font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders
                    .filter(order => {
                      if (activeTab === 'Processing') return order.status === 'processing';
                      if (activeTab === 'Ready') return order.status === 'ready';
                      return true;
                    })
                    .filter(order => 
                      order.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((order) => (
                      <tr key={order.invoiceNo} className="border-t">
                        <td className="px-16 py-1.5 text-sm text-gray-600">{order.invoiceNo}</td>
                        <td className="px-12 py-2.5 text-sm text-gray-600">{order.name}</td>
                        <td className="px-20 py-2.5 text-sm text-gray-600">{order.pickupTime}</td>
                        <td className="px-11 py-2.5">
                          {order.status === 'completed' ? (
                            <span className="text-xs text-gray-500">Completed</span>
                          ) : activeTab === 'Ready' ? (
                            <button 
                              onClick={() => handleCompleteOrderClick(order)}
                              className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:border-gray-300"
                            >
                              Complete Order
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleStatusChange(order.invoiceNo, 'processing')}
                              className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:border-gray-300"
                            >
                              Process Order
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setOrderToComplete(null);
        }}
        onConfirm={handleConfirmComplete}
        ref={modalRef}
      />
    </div>
  );
};

export default Pickup; 