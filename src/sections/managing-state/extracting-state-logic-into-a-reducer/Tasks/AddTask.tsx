import { Button, Input, Space } from 'antd';
import React, { FC, useState } from 'react';
import { useTasksContextProvider, Task } from './TaskProvider';
import { PlusOutlined } from '@ant-design/icons';

const AddTask: FC = () => {
    const { tasks, dispatchTask } = useTasksContextProvider();

    // A state for new task.
    const initialTask: Task = { key: -1, title: '' };
    const [newTask, setNewTask] = useState<Task>(initialTask);

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input
                size="large"
                placeholder="Add Tasks..."
                value={newTask.title}
                onPressEnter={() => {
                    if (newTask.title.length !== 0) {
                        dispatchTask({ type: 'added', payload: newTask });
                        setNewTask(initialTask);
                    }
                }}
                onChange={(e) => setNewTask({ key: tasks.length, title: e.target.value })}
            />
            <Button
                size="large"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    if (newTask.title.length !== 0) {
                        dispatchTask({ type: 'added', payload: newTask });
                        setNewTask(initialTask);
                    }
                }}
                disabled={newTask.title.length == 0}
            />
        </Space.Compact>
    );
};

export default AddTask;
