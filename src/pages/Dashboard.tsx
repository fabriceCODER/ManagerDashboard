
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/UI/StatsCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Box, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for charts
  const salesData = [
    { month: 'Jan', sales: 4000, purchases: 2400 },
    { month: 'Feb', sales: 3000, purchases: 1398 },
    { month: 'Mar', sales: 2000, purchases: 9800 },
    { month: 'Apr', sales: 2780, purchases: 3908 },
    { month: 'May', sales: 1890, purchases: 4800 },
    { month: 'Jun', sales: 2390, purchases: 3800 },
  ];

  const stockLevels = [
    { name: 'Electronics', value: 400, color: '#8884d8' },
    { name: 'Clothing', value: 300, color: '#82ca9d' },
    { name: 'Books', value: 200, color: '#ffc658' },
    { name: 'Home & Garden', value: 150, color: '#ff7c7c' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Sale', product: 'Laptop Pro X1', quantity: 2, amount: '$2,400', status: 'Completed' },
    { id: 2, type: 'Purchase', product: 'Office Chair', quantity: 10, amount: '$1,200', status: 'Pending' },
    { id: 3, type: 'Return', product: 'Wireless Mouse', quantity: 1, amount: '-$45', status: 'Processed' },
    { id: 4, type: 'Sale', product: 'Tablet Air', quantity: 3, amount: '$1,800', status: 'Completed' },
  ];

  const lowStockItems = [
    { product: 'iPhone 15 Pro', current: 5, minimum: 20, status: 'Critical' },
    { product: 'Samsung Galaxy S24', current: 12, minimum: 25, status: 'Low' },
    { product: 'MacBook Air M3', current: 8, minimum: 15, status: 'Low' },
    { product: 'AirPods Pro', current: 3, minimum: 30, status: 'Critical' },
  ];

  return (
    <div className="space-y-6 fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening in your inventory.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value="2,345"
          change={{ value: "+12%", type: "increase" }}
          icon={Box}
        />
        <StatsCard
          title="Low Stock Items"
          value="23"
          change={{ value: "+5%", type: "increase" }}
          icon={AlertTriangle}
          className="border-orange-200 dark:border-orange-800"
        />
        <StatsCard
          title="Total Value"
          value="$125,430"
          change={{ value: "+8%", type: "increase" }}
          icon={TrendingUp}
        />
        <StatsCard
          title="Active Suppliers"
          value="67"
          change={{ value: "+2%", type: "increase" }}
          icon={Users}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Purchases Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales vs Purchases</CardTitle>
            <CardDescription>Monthly comparison of sales and purchase orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="purchases" fill="#10b981" name="Purchases" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Distribution</CardTitle>
            <CardDescription>Current inventory by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockLevels}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest inventory movements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'Sale' ? 'bg-green-100 text-green-600' :
                      transaction.type === 'Purchase' ? 'bg-blue-100 text-blue-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'Sale' ? <ArrowUp className="h-4 w-4" /> :
                       transaction.type === 'Purchase' ? <ArrowDown className="h-4 w-4" /> :
                       <ArrowUp className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.product}</p>
                      <p className="text-sm text-gray-500">Qty: {transaction.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className={`text-xs ${
                      transaction.status === 'Completed' ? 'text-green-600' :
                      transaction.status === 'Pending' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Low Stock Alerts</span>
            </CardTitle>
            <CardDescription>Items that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-gray-500">
                      Current: {item.current} | Minimum: {item.minimum}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Critical' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
