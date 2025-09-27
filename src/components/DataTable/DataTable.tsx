import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  className?: string;
  rowKey?: keyof T | ((record: T) => string | number);
  onRowClick?: (record: T, index: number) => void;
  striped?: boolean;
  hoverable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  order: SortOrder;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
  className,
  rowKey = 'id',
  onRowClick,
  striped = false,
  hoverable = true,
  size = 'md',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortState, setSortState] = useState<SortState>({ column: null, order: null });

  // Get row key function
  const getRowKey = useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: T) => record[rowKey] as string | number;
  }, [rowKey]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.order) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;
      
      let comparison = 0;
      if (aValue == null) comparison = -1;
      else if (bValue == null) comparison = 1;
      else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = aValue < bValue ? -1 : 1;
      }

      return sortState.order === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState, columns]);

  // Handle column sort
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prev => {
      if (prev.column === column.key) {
        // Cycle through: asc -> desc -> null
        const nextOrder: SortOrder = prev.order === 'asc' ? 'desc' : prev.order === 'desc' ? null : 'asc';
        return { column: nextOrder ? column.key : null, order: nextOrder };
      } else {
        return { column: column.key, order: 'asc' };
      }
    });
  };

  // Handle row selection
  const handleRowSelect = (record: T, checked: boolean) => {
    const key = getRowKey(record);
    const newSelectedRows = new Set(selectedRows);
    
    if (checked) {
      newSelectedRows.add(key);
    } else {
      newSelectedRows.delete(key);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedRecords = data.filter(item => newSelectedRows.has(getRowKey(item)));
      onRowSelect(selectedRecords);
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(data.map(getRowKey));
      setSelectedRows(allKeys);
      onRowSelect?.(data);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };

  // Check if all rows are selected
  const isAllSelected = data.length > 0 && selectedRows.size === data.length;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const paddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isActive = sortState.column === column.key;
    const order = isActive ? sortState.order : null;

    return (
      <span className="ml-2 inline-flex flex-col">
        <ChevronUp 
          className={clsx('w-3 h-3 -mb-1', {
            'text-primary-600': order === 'asc',
            'text-gray-400': order !== 'asc',
          })} 
        />
        <ChevronDown 
          className={clsx('w-3 h-3', {
            'text-primary-600': order === 'desc',
            'text-gray-400': order !== 'desc',
          })} 
        />
      </span>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-lg font-medium mb-2">No Data</p>
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('w-full overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {selectable && (
                <th className={clsx('border-b border-gray-200 dark:border-gray-600', paddingClasses[size])}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'border-b border-gray-200 dark:border-gray-600 font-semibold text-gray-900 dark:text-gray-100',
                    paddingClasses[size],
                    sizeClasses[size],
                    {
                      'text-left': column.align === 'left' || !column.align,
                      'text-center': column.align === 'center',
                      'text-right': column.align === 'right',
                      'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-600': column.sortable,
                    }
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.title}</span>
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {sortedData.map((record, index) => {
              const key = getRowKey(record);
              const isSelected = selectedRows.has(key);
              
              return (
                <tr
                  key={key}
                  className={clsx(
                    'transition-colors duration-150',
                    {
                      'bg-gray-50 dark:bg-gray-700': striped && index % 2 === 1,
                      'hover:bg-gray-50 dark:hover:bg-gray-700': hoverable,
                      'bg-primary-50 dark:bg-primary-900/20': isSelected,
                      'cursor-pointer': onRowClick,
                    }
                  )}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {selectable && (
                    <td className={clsx('border-b border-gray-200 dark:border-gray-600', paddingClasses[size])}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(record, e.target.checked)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = record[column.dataIndex];
                    const content = column.render ? column.render(value, record, index) : value;
                    
                    return (
                      <td
                        key={column.key}
                        className={clsx(
                          'border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100',
                          paddingClasses[size],
                          sizeClasses[size],
                          {
                            'text-left': column.align === 'left' || !column.align,
                            'text-center': column.align === 'center',
                            'text-right': column.align === 'right',
                          }
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Selection summary */}
      {selectable && selectedRows.size > 0 && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {selectedRows.size} of {data.length} row{data.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

export default DataTable;