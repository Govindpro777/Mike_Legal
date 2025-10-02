import { Modal, Input, Select, Form as AntForm } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../store/tasksSlice';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const taskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: Yup.string(),
  date: Yup.string().required('Date is required'),
  category: Yup.string()
    .required('Category is required')
    .oneOf(['success', 'warning', 'error', 'default'], 'Invalid category'),
});

const TaskFormModal = ({ visible, onClose, initialValues, selectedDate }) => {
  const dispatch = useDispatch();

  const defaultValues = initialValues || {
    title: '',
    description: '',
    date: selectedDate || dayjs().format('YYYY-MM-DD'),
    category: 'default',
  };

  const handleSubmit = (values, { resetForm }) => {
    if (initialValues && initialValues.id) {
      dispatch(updateTask({ ...values, id: initialValues.id }));
    } else {
      dispatch(addTask(values));
    }
    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={taskSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue, handleSubmit, resetForm }) => (
        <Modal
          title={initialValues ? 'Edit Task' : 'Add New Task'}
          open={visible}
          onOk={handleSubmit}
          onCancel={() => {
            resetForm();
            onClose();
          }}
          okText={initialValues ? 'Update' : 'Add'}
        >
          <Form className="space-y-4">
            <AntForm.Item
              label="Title"
              validateStatus={errors.title && touched.title ? 'error' : ''}
              help={errors.title && touched.title ? errors.title : ''}
              required
            >
              <Field name="title">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter task title"
                    status={errors.title && touched.title ? 'error' : ''}
                  />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item label="Description">
              <Field name="description">
                {({ field }) => (
                  <TextArea
                    {...field}
                    rows={4}
                    placeholder="Enter task description (optional)"
                  />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item
              label="Date"
              validateStatus={errors.date && touched.date ? 'error' : ''}
              help={errors.date && touched.date ? errors.date : ''}
              required
            >
              <Field name="date">
                {({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    status={errors.date && touched.date ? 'error' : ''}
                  />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item
              label="Category"
              validateStatus={errors.category && touched.category ? 'error' : ''}
              help={errors.category && touched.category ? errors.category : ''}
              required
            >
              <Select
                value={values.category}
                onChange={(value) => setFieldValue('category', value)}
                placeholder="Select category"
                status={errors.category && touched.category ? 'error' : ''}
              >
                <Option value="success">Success</Option>
                <Option value="warning">Warning</Option>
                <Option value="error">Issue</Option>
                <Option value="default">Info</Option>
              </Select>
            </AntForm.Item>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default TaskFormModal;



