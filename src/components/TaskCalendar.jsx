import { Calendar, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../store/tasksSlice';
import dayjs from 'dayjs';

const TaskCalendar = ({ onDateSelect }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const getTasksForDate = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    return tasks.filter(task => task.date === dateStr);
  };

  const dateCellRender = (value) => {
    const dateTasks = getTasksForDate(value);

    return (
      <ul className="events">
        {dateTasks.slice(0, 3).map((task) => (
          <li key={task.id}>
            <Badge
              status={task.category}
              text={task.title.length > 15 ? task.title.substring(0, 15) + '...' : task.title}
            />
          </li>
        ))}
        {dateTasks.length > 3 && (
          <li className="text-xs text-gray-500">+{dateTasks.length - 3} more</li>
        )}
      </ul>
    );
  };

  const onSelect = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    dispatch(setSelectedDate(dateStr));
    onDateSelect(dateStr);
  };

  return (
    <div className=" p-4 bg-white rounded-lg border border-[#E2E8EF] shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
      <Calendar
        cellRender={dateCellRender}
        onSelect={onSelect}
      />
    </div>
  );
};

export default TaskCalendar;
