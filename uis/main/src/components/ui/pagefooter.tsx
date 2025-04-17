import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationFooter = ({
  page,
  totalPages,
  perPage,
  totalRecords,
  onPageChange,
  onPerPageChange
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-[#F6F3FF] text-sm text-gray-700 rounded-xl">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-1 disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>
        <span>{page}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-1 disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span>Per page</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 bg-white"
        >
          {[10, 20, 50, 100].map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <span>Records</span>
      </div>

      <span>
        {Math.min((page - 1) * perPage + 1, totalRecords)} - {Math.min(page * perPage, totalRecords)} out of {totalRecords} records
      </span>
    </div>
  );
};

export default PaginationFooter;