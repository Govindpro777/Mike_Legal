import { useState } from 'react';
import TaskCalendar from './components/TaskCalendar';
import TaskFormModal from './components/TaskFormModal';
import TaskList from './components/TaskList';
import TaskChart from './components/TaskChart';
import { useSelector } from 'react-redux';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const selectedDate = useSelector(state => state.tasks.selectedDate);

  const handleDateSelect = (date) => {
    setModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-black/15 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Task Manager</h1>
            <button
              onClick={() => setModalVisible(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#357AF6] rounded-md hover:bg-[#2968E5] focus:outline-none transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline cursor-pointer">Add Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <TaskCalendar onDateSelect={handleDateSelect} />
          </div>

          <div className="space-y-6">
            <TaskList
              selectedDate={selectedDate}
              onEditTask={handleEditTask}
            />
          </div>
        </div>

        <TaskChart />
      </main>

      <TaskFormModal
        visible={modalVisible}
        onClose={handleCloseModal}
        initialValues={editingTask}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;
