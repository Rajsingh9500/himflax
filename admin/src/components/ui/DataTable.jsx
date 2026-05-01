import { memo } from 'react';
import { motion } from 'framer-motion';

const DataTable = memo(function DataTable({ columns, data, loading, emptyMessage = 'No data available' }) {
  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] shadow-sm border border-secondary-100 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-16 bg-secondary-50 border-b border-secondary-100" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex h-20 items-center px-6 border-b border-secondary-50">
              <div className="h-4 bg-secondary-200 rounded w-1/4 mr-4" />
              <div className="h-4 bg-secondary-200 rounded w-1/4 mr-4" />
              <div className="h-4 bg-secondary-200 rounded w-1/4 mr-4" />
              <div className="h-4 bg-secondary-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] shadow-sm border border-secondary-100 p-16 text-center">
        <div className="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="text-3xl text-secondary-300">📋</div>
        </div>
        <p className="text-lg font-bold text-secondary-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-secondary-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary-50/80 border-b border-secondary-100">
              {columns.map((col, i) => (
                <th key={i} className="px-8 py-5 text-xs font-bold text-secondary-500 uppercase tracking-wider whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-50">
            {data.map((row, rowIndex) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
                key={rowIndex} 
                className="hover:bg-secondary-50/50 transition-colors group"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-8 py-5 text-sm font-medium text-secondary-700 whitespace-nowrap">
                    {col.accessor ? row[col.accessor] : col.render(row)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default DataTable;
