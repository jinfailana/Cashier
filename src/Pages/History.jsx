import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const DateRangeDropdown = ({ isOpen, onClose, onSelect }) => {
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const renderCalendar = () => {
    const { daysInMonth, firstDay } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-7" />);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className="h-7 w-7 text-xs hover:bg-gray-100 rounded-full"
        >
          {day}
        </button>
      );
    }

    return days;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg p-3.5 w-[288px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <button 
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-xs font-medium">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-2">
        {days.map(day => (
          <div key={day} className="h-7 flex items-center justify-center text-[11px] text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {renderCalendar()}
      </div>
    </div>
  );
};

const FilterDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg py-1 z-10">
      <div className="px-4 py-2 text-sm text-gray-600 border-b">Both Order</div>
      <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">In-Store</div>
      <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Pick-up</div>
      <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Cash</div>
      <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">GCash</div>
    </div>
  );
};

const History = () => {
  const [dateRange, setDateRange] = useState('Nov 13, 2024 - Nov 13, 2024');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const transactions = [
    {
      invoiceNo: 'INV1122-001',
      totalItems: 3,
      totalPrice: 150,
      orderMethod: 'In-Store',
      date: '11-13-2024',
    },
    {
      invoiceNo: 'INV1121-002',
      totalItems: 1,
      totalPrice: 50,
      orderMethod: 'Pick-up',
      date: '11-13-2024',
    },
  ];

  const totalSales = transactions.reduce((sum, transaction) => sum + transaction.totalPrice, 0);
  const totalTransactions = transactions.length;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Main Header */}
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-base font-medium text-[#8B4513]">History</h1>
          <p className="text-xs text-gray-500">Reviewing past transactions and order history</p>
        </div>

        {/* Content Area */}
          <div>
            <div className="p-6">
              {/* Invoices Header and Controls */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Invoices</h2>
                  
                  {/* Export Button */}
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:border-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export as PDF
                  </button>
                </div>

                {/* Metrics and Controls */}
                <div className="flex justify-between items-center mb-6">
                  {/* Metrics */}
                  <div className="flex gap-4">
                    <div className="bg-white px-4 py-2 rounded border border-gray-100">
                      <span className="text-sm text-gray-600">Total Sales : </span>
                      <span className="text-sm font-medium">₱{totalSales}</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded border border-gray-100">
                      <span className="text-sm text-gray-600">Total Transactions : </span>
                      <span className="text-sm font-medium">{totalTransactions}</span>
                    </div>
                  </div>

                  {/* Date Range and Filter */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button 
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-md border border-gray-200"
                      >
                        <svg className="text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="text-sm text-gray-600">{dateRange}</span>
                      </button>
                      <DateRangeDropdown 
                        isOpen={isCalendarOpen}
                        onClose={() => setIsCalendarOpen(false)}
                        onSelect={(range) => {
                          if (range.start && range.end) {
                            setDateRange(`${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`);
                          }
                        }}
                      />
                    </div>

                    <div className="relative inline-block">
                      <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-200 rounded-md hover:border-gray-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className="text-sm">Filter</span>
                      </button>
                      <FilterDropdown 
                        isOpen={isFilterOpen} 
                        onClose={() => setIsFilterOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Invoice no.</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total Items</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Order Method</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((transaction) => (
                      <tr key={transaction.invoiceNo} className="border-t">
                        <td className="px-4 py-2 text-sm text-gray-600">{transaction.invoiceNo}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{transaction.totalItems}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₱{transaction.totalPrice}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{transaction.orderMethod}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{transaction.date}</td>
                        <td className="px-4 py-2">
                          <button 
                            className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1 hover:border-gray-300"
                            onClick={() => handleViewDetails(transaction.invoiceNo)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default History; 