"use client";

import { useState, useEffect } from 'react';
import { StockManager, StockInfo } from '@/lib/stockManager';
import { allProducts } from '@/lib/allProducts';

interface StockDashboardProps {
  isAdmin?: boolean;
}

function StockDashboard({ isAdmin = false }: StockDashboardProps) {
  const [stockData, setStockData] = useState<StockInfo[]>([]);
  const [lowStockItems, setLowStockItems] = useState<StockInfo[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<StockInfo[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'low-stock' | 'out-of-stock' | 'all'>('overview');
  
  const stockManager = StockManager.getInstance();

  useEffect(() => {
    const allStock = stockManager.exportStockReport();
    const lowStock = stockManager.getLowStockProducts();
    const outOfStock = stockManager.getOutOfStockProducts();
    
    setStockData(allStock);
    setLowStockItems(lowStock);
    setOutOfStockItems(outOfStock);
  }, []);

  const handleStockUpdate = (productId: string, newQuantity: number, variantId?: string) => {
    if (stockManager.updateStock(productId, newQuantity, variantId)) {
      // Refresh data
      const allStock = stockManager.exportStockReport();
      const lowStock = stockManager.getLowStockProducts();
      const outOfStock = stockManager.getOutOfStockProducts();
      
      setStockData(allStock);
      setLowStockItems(lowStock);
      setOutOfStockItems(outOfStock);
    }
  };

  const getProductName = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    return product?.name || productId;
  };

  const getTotalValue = () => {
    return stockData.reduce((total, item) => {
      const product = allProducts.find(p => p.id === item.productId);
      return total + (item.quantity * (product?.price || 0));
    }, 0);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
        <p className="text-2xl font-bold text-gray-900">{allProducts.length}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Total Stock Value</h3>
        <p className="text-2xl font-bold text-gray-900">kr {getTotalValue().toLocaleString()}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
        <p className="text-2xl font-bold text-orange-600">{lowStockItems.length}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
        <p className="text-2xl font-bold text-red-600">{outOfStockItems.length}</p>
      </div>
    </div>
  );

  const renderStockTable = (items: StockInfo[], title: string) => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Low Stock Threshold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Time
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={`${item.productId}-${item.variantId || 'default'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getProductName(item.productId)}
                  </div>
                  {item.variantId && (
                    <div className="text-sm text-gray-500">Variant: {item.variantId}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.quantity === 0 ? 'bg-red-100 text-red-800' :
                    item.quantity <= item.lowStockThreshold ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.lowStockThreshold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.supplier || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.leadTime ? `${item.leadTime} days` : 'N/A'}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <input
                      type="number"
                      min="0"
                      defaultValue={item.quantity}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      onBlur={(e) => {
                        const newQuantity = parseInt(e.target.value) || 0;
                        if (newQuantity !== item.quantity) {
                          handleStockUpdate(item.productId, newQuantity, item.variantId);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleStockUpdate(item.productId, item.quantity + 10, item.variantId)}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      +10
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Stock Management Dashboard</h1>
        <p className="text-gray-600">Monitor and manage inventory for all {allProducts.length} products</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'low-stock', label: `Low Stock (${lowStockItems.length})` },
            { key: 'out-of-stock', label: `Out of Stock (${outOfStockItems.length})` },
            { key: 'all', label: 'All Products' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {selectedTab === 'overview' && (
        <>
          {renderOverview()}
          {lowStockItems.length > 0 && (
            <div className="mb-8">
              {renderStockTable(lowStockItems.slice(0, 5), 'Recent Low Stock Alerts')}
            </div>
          )}
        </>
      )}

      {selectedTab === 'low-stock' && renderStockTable(lowStockItems, 'Low Stock Items')}
      {selectedTab === 'out-of-stock' && renderStockTable(outOfStockItems, 'Out of Stock Items')}
      {selectedTab === 'all' && renderStockTable(stockData, 'All Products Stock Status')}

      {/* Quick Actions */}
      {isAdmin && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Export Stock Report
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Bulk Stock Update
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Generate Purchase Orders
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Stock Forecast
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockDashboard;
