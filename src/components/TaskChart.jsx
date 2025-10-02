import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Select, Button, Space } from 'antd';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Option } = Select;

const categoryColors = {
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  default: '#1890ff',
};

const categoryLabels = {
  success: 'Success',
  warning: 'Warning',
  error: 'Issue',
  default: 'Info',
};

const TaskChart = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [selectedCategories, setSelectedCategories] = useState(['success', 'warning', 'error', 'default']);
  const [chartType, setChartType] = useState('bar');

  const chartData = useMemo(() => {
    const categoryCounts = tasks.reduce((acc, task) => {
      if (selectedCategories.includes(task.category)) {
        acc[task.category] = (acc[task.category] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category: categoryLabels[category],
      count,
      color: categoryColors[category],
    }));
  }, [tasks, selectedCategories]);

  const handleReset = () => {
    setSelectedCategories(['success', 'warning', 'error', 'default']);
  };

  const totalTasks = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
          Task Statistics
        </h2>
        <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm text-gray-600">Total Tasks: </span>
          <span className="text-lg font-bold text-blue-600">{totalTasks}</span>
        </div>
      </div>

      <Space className="mb-6" wrap>
        <Select
          mode="multiple"
          placeholder="Filter by category"
          value={selectedCategories}
          onChange={setSelectedCategories}
          style={{ minWidth: 220 }}
          className="rounded-lg"
        >
          <Option value="success">✓ Success</Option>
          <Option value="warning">⚠ Warning</Option>
          <Option value="error">✗ Issue</Option>
          <Option value="default">ℹ Info</Option>
        </Select>

        <Select
          value={chartType}
          onChange={setChartType}
          style={{ width: 140 }}
          className="rounded-lg"
        >
          <Option value="bar">📊 Bar Chart</Option>
          <Option value="pie">🥧 Pie Chart</Option>
        </Select>

        <Button
          onClick={handleReset}
          className="rounded-lg font-medium hover:scale-105 transition-transform duration-200"
          type="primary"
        >
          Reset Filters
        </Button>
      </Space>

      {chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4 opacity-30">📊</div>
          <div className="text-lg text-gray-400 font-medium">No data to display</div>
          <div className="text-sm text-gray-400 mt-2">Select categories to view statistics</div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <ResponsiveContainer width="100%" height={320}>
            {chartType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="category"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="count"
                  name="Task Count"
                  radius={[8, 8, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, count, percent }) =>
                    `${category}: ${count} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={110}
                  dataKey="count"
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TaskChart;

