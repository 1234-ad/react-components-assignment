import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DataTable from './DataTable';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-05',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-05-12',
  },
];

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15, rating: 4.8 },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 50, rating: 4.2 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 199.99, stock: 8, rating: 4.5 },
  { id: 4, name: 'Desk Lamp', category: 'Furniture', price: 49.99, stock: 25, rating: 4.0 },
  { id: 5, name: 'Coffee Mug', category: 'Kitchen', price: 12.99, stock: 100, rating: 4.7 },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, selection, and customizable rendering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onRowSelect: { action: 'rows selected' },
    onRowClick: { action: 'row clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic user columns
const userColumns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof User,
    sortable: true,
    render: (status: string) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate' as keyof User,
    sortable: true,
  },
];

// Product columns with custom rendering
const productColumns = [
  {
    key: 'name',
    title: 'Product',
    dataIndex: 'name' as keyof Product,
    sortable: true,
  },
  {
    key: 'category',
    title: 'Category',
    dataIndex: 'category' as keyof Product,
    sortable: true,
  },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price' as keyof Product,
    sortable: true,
    align: 'right' as const,
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    key: 'stock',
    title: 'Stock',
    dataIndex: 'stock' as keyof Product,
    sortable: true,
    align: 'center' as const,
    render: (stock: number) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          stock > 20
            ? 'bg-green-100 text-green-800'
            : stock > 10
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {stock}
      </span>
    ),
  },
  {
    key: 'rating',
    title: 'Rating',
    dataIndex: 'rating' as keyof Product,
    sortable: true,
    align: 'center' as const,
    render: (rating: number) => (
      <div className="flex items-center justify-center">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">{rating}</span>
      </div>
    ),
  },
];

// Interactive wrapper for selection stories
const SelectableTable = (args: any) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  
  return (
    <div>
      <DataTable
        {...args}
        onRowSelect={setSelectedRows}
      />
      {selectedRows.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold mb-2">Selected Users:</h4>
          <ul className="text-sm">
            {selectedRows.map(user => (
              <li key={user.id}>{user.name} ({user.email})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

export const WithSelection: Story = {
  render: SelectableTable,
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
};

export const CustomRendering: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={userColumns}
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={userColumns}
          size="md"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={userColumns}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const StripedAndHoverable: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    striped: true,
    hoverable: true,
  },
};

export const ClickableRows: Story = {
  render: () => {
    const [clickedRow, setClickedRow] = useState<User | null>(null);
    
    return (
      <div>
        <DataTable
          data={sampleUsers}
          columns={userColumns}
          onRowClick={(user) => setClickedRow(user)}
          hoverable
        />
        {clickedRow && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold">Clicked Row:</h4>
            <p>{clickedRow.name} - {clickedRow.email}</p>
          </div>
        )}
      </div>
    );
  },
};

export const AllFeatures: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Product[]>([]);
    const [clickedRow, setClickedRow] = useState<Product | null>(null);
    
    return (
      <div>
        <DataTable
          data={sampleProducts}
          columns={productColumns}
          selectable
          striped
          hoverable
          size="md"
          onRowSelect={setSelectedRows}
          onRowClick={(product) => setClickedRow(product)}
        />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedRows.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Selected Products:</h4>
              <ul className="text-sm space-y-1">
                {selectedRows.map(product => (
                  <li key={product.id}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {clickedRow && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Last Clicked:</h4>
              <div className="text-sm">
                <p><strong>Product:</strong> {clickedRow.name}</p>
                <p><strong>Category:</strong> {clickedRow.category}</p>
                <p><strong>Price:</strong> ${clickedRow.price}</p>
                <p><strong>Stock:</strong> {clickedRow.stock}</p>
                <p><strong>Rating:</strong> {clickedRow.rating}★</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};