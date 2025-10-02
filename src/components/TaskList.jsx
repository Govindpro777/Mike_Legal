import { List, Tag, Button, Popconfirm, Empty } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/tasksSlice';
import dayjs from 'dayjs';

const categoryColors = {
  success: 'green',
  warning: 'orange',
  error: 'red',
  default: 'blue',
};

const categoryLabels = {
  success: 'Success',
  warning: 'Warning',
  error: 'Issue',
  default: 'Info',
};

const TaskList = ({ selectedDate, onEditTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-[#E2E8EF] shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
      <h2 className="text-xl font-semibold mb-4">
        Tasks for {dayjs(selectedDate).format('MMMM D, YYYY')}
      </h2>

      {filteredTasks.length === 0 ? (
        <Empty description="No tasks for this date" />
      ) : (
        <List
          dataSource={filteredTasks}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button
                  key="edit"
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => onEditTask(task)}
                >
                  Edit
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => handleDelete(task.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div className="flex items-center gap-2">
                    <span>{task.title}</span>
                    <Tag color={categoryColors[task.category]}>
                      {categoryLabels[task.category]}
                    </Tag>
                  </div>
                }
                description={task.description || 'No description'}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default TaskList;
