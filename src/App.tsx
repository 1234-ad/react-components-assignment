import React, { useState } from 'react';
import { InputField, DataTable } from './components';
import type { Column } from './components';

// Sample data for demo
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

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
];

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
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
    dataIndex: 'joinDate',
    sortable: true,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    search: '',
  });
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleClear = (field: string) => () => {
    setFormData(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                React Components Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                InputField and DataTable components showcase
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          {/* InputField Demo */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              InputField Component
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="space-y-6">
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  clearable
                  onClear={handleClear('name')}
                  helperText="This will be displayed on your profile"
                />

                <InputField
                  type="email"
                  label="Email Address"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  variant="filled"
                  clearable
                  onClear={handleClear('email')}
                  helperText="We'll never share your email"
                />
              </div>

              <div className="space-y-6">
                <InputField
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  variant="outlined"
                  clearable
                  onClear={handleClear('password')}
                  helperText="Must be at least 8 characters"
                />

                <InputField
                  label="Search Users"
                  placeholder="Type to search..."
                  value={formData.search}
                  onChange={handleInputChange('search')}
                  variant="ghost"
                  size="lg"
                  clearable
                  onClear={handleClear('search')}
                />
              </div>
            </div>

            {/* Input States Demo */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Disabled State"
                placeholder="Disabled input"
                value="Cannot edit this"
                disabled
                variant="outlined"
              />
              
              <InputField
                label="Error State"
                placeholder="Invalid input"
                value="invalid@email"
                invalid
                errorMessage="Please enter a valid email"
                variant="outlined"
              />
              
              <InputField
                label="Loading State"
                placeholder="Loading..."
                value="Processing..."
                loading
                variant="outlined"
              />
            </div>
          </section>

          {/* DataTable Demo */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              DataTable Component
            </h2>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <DataTable
                data={sampleUsers}
                columns={columns}
                selectable
                striped
                hoverable
                onRowSelect={setSelectedUsers}
                onRowClick={(user) => {
                  alert(`Clicked on ${user.name} (${user.email})`);
                }}
              />

              {/* Selection Summary */}
              {selectedUsers.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Selected Users ({selectedUsers.length})
                  </h3>
                  <div className="space-y-1">
                    {selectedUsers.map(user => (
                      <div key={user.id} className="text-sm text-blue-800 dark:text-blue-200">
                        {user.name} - {user.email} ({user.role})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Features Summary */}
          <section className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  InputField Features
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>✅ Multiple variants (filled, outlined, ghost)</li>
                  <li>✅ Different sizes (sm, md, lg)</li>
                  <li>✅ Validation states (error, disabled, loading)</li>
                  <li>✅ Clear button functionality</li>
                  <li>✅ Password toggle visibility</li>
                  <li>✅ Dark mode support</li>
                  <li>✅ Full accessibility (ARIA labels)</li>
                  <li>✅ TypeScript support</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  DataTable Features
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>✅ Column sorting functionality</li>
                  <li>✅ Row selection (single/multiple)</li>
                  <li>✅ Loading and empty states</li>
                  <li>✅ Custom cell rendering</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Row click handlers</li>
                  <li>✅ Striped and hoverable rows</li>
                  <li>✅ Full TypeScript generics</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;