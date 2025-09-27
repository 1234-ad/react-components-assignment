import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from './DataTable';

// Sample data for testing
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
];

const sampleColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as const, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as const, sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' as const },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Moderator')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
      />
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <DataTable
        data={[]}
        columns={sampleColumns}
        loading
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument(); // Loading spinner
  });

  it('shows empty state', () => {
    render(
      <DataTable
        data={[]}
        columns={sampleColumns}
        emptyMessage="No users found"
      />
    );
    
    expect(screen.getByText('No Data')).toBeInTheDocument();
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('handles column sorting', async () => {
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
      />
    );
    
    const nameHeader = screen.getByText('Name');
    
    // Click to sort ascending
    fireEvent.click(nameHeader);
    
    // Check if data is sorted (Bob should come first alphabetically)
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson');
    
    // Click again to sort descending
    fireEvent.click(nameHeader);
    
    // John should come first in descending order
    const rowsDesc = screen.getAllByRole('row');
    expect(rowsDesc[1]).toHaveTextContent('John Doe');
  });

  it('handles row selection', () => {
    const handleRowSelect = vi.fn();
    
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    // Find and click the first row checkbox
    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1]; // Skip the "select all" checkbox
    
    fireEvent.click(firstRowCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith([sampleData[0]]);
  });

  it('handles select all functionality', () => {
    const handleRowSelect = vi.fn();
    
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    fireEvent.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(sampleData);
  });

  it('handles row clicks', () => {
    const handleRowClick = vi.fn();
    
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        onRowClick={handleRowClick}
      />
    );
    
    const firstRow = screen.getAllByRole('row')[1]; // Skip header row
    fireEvent.click(firstRow);
    
    expect(handleRowClick).toHaveBeenCalledWith(sampleData[0], 0);
  });

  it('renders custom cell content', () => {
    const customColumns = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name' as const,
        render: (value: string) => <strong>{value}</strong>,
      },
    ];
    
    render(
      <DataTable
        data={sampleData}
        columns={customColumns}
      />
    );
    
    expect(screen.getByText('John Doe').tagName).toBe('STRONG');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        size="sm"
      />
    );
    
    let table = screen.getByRole('table');
    expect(table.querySelector('td')).toHaveClass('text-sm');
    
    rerender(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        size="lg"
      />
    );
    
    table = screen.getByRole('table');
    expect(table.querySelector('td')).toHaveClass('text-lg');
  });

  it('shows selection summary', () => {
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        selectable
      />
    );
    
    // Select first row
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    
    expect(screen.getByText('1 of 3 rows selected')).toBeInTheDocument();
  });

  it('handles different row key types', () => {
    const dataWithStringKeys = [
      { key: 'user1', name: 'John', email: 'john@example.com' },
      { key: 'user2', name: 'Jane', email: 'jane@example.com' },
    ];
    
    const handleRowSelect = vi.fn();
    
    render(
      <DataTable
        data={dataWithStringKeys}
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name' as const },
        ]}
        rowKey="key"
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    
    expect(handleRowSelect).toHaveBeenCalledWith([dataWithStringKeys[0]]);
  });

  it('handles function-based row keys', () => {
    const getRowKey = (record: any) => `user-${record.id}`;
    
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        rowKey={getRowKey}
        selectable
      />
    );
    
    // Should render without errors
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('applies striped styling', () => {
    render(
      <DataTable
        data={sampleData}
        columns={sampleColumns}
        striped
      />
    );
    
    const rows = screen.getAllByRole('row');
    // Third row (index 2, second data row) should have striped styling
    expect(rows[2]).toHaveClass('bg-gray-50');
  });

  it('handles column alignment', () => {
    const alignedColumns = [
      { key: 'name', title: 'Name', dataIndex: 'name' as const, align: 'left' as const },
      { key: 'email', title: 'Email', dataIndex: 'email' as const, align: 'center' as const },
      { key: 'role', title: 'Role', dataIndex: 'role' as const, align: 'right' as const },
    ];
    
    render(
      <DataTable
        data={sampleData}
        columns={alignedColumns}
      />
    );
    
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveClass('text-left');
    expect(headers[1]).toHaveClass('text-center');
    expect(headers[2]).toHaveClass('text-right');
  });
});