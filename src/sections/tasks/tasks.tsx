import React, { FC, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, InputRef, List, Space } from 'antd';

type Task = {
    key: number;
    title: string;
};

type TaskProp = {
    task: Task;
    onTaskEdit?: (editedTask: Task) => void;
    onTaskDelete: (deletedTaskKey: number) => void;
};

const TaskItem: FC<TaskProp> = ({ task, onTaskEdit, onTaskDelete }) => {
    const inputRef = useRef<InputRef>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditValue] = useState('');
    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                    onClick={() => {
                        if (isEditing) {
                            onTaskEdit?.({ ...task, title: editedValue });
                            setIsEditing(false);
                        } else {
                            setIsEditing(true);
                            inputRef.current?.focus({ cursor: 'end' });
                        }
                    }}
                />,
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onTaskDelete(task.key)}
                />,
            ]}
        >
            <List.Item.Meta
                avatar={
                    <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${task.key}`} />
                }
                title={
                    isEditing ? (
                        <Input
                            ref={inputRef}
                            defaultValue={task.title}
                            onChange={(e) => setEditValue(e.target.value)}
                        />
                    ) : (
                        <p>
                            {task.key} | {task.title}
                        </p>
                    )
                }
                description={<p>Random description</p>}
            />
        </List.Item>
    );
};

const initialTask: Task = { key: -1, title: '' };

const initialTasks: Task[] = [
    { key: 0, title: 'Pick up water.' },
    { key: 1, title: 'Cut grass.' },
    { key: 2, title: 'Wash dishes.' },
];

const TaskList: FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [newTask, setNewTask] = useState<Task>(initialTask);

    const onTaskAdded = (addedTask: Task) => {
        setTasks([addedTask, ...tasks]);
    };

    const onTaskEdit = (editedTask: Task) =>
        setTasks(
            tasks.map((task) => {
                if (task.key == editedTask.key) return editedTask;
                return task;
            })
        );

    const onTaskDelete = (deletedTaskKey: number) =>
        setTasks(tasks.filter((task) => task.key !== deletedTaskKey));

    return (
        <div className="bg-slate-500" style={{ width: '50vw', height: 'auto' }}>
            <List
                header={
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            size="large"
                            placeholder="Add Tasks..."
                            value={newTask.title}
                            onPressEnter={() => {
                                if (newTask.title.length !== 0) {
                                    onTaskAdded?.(newTask);
                                    setNewTask(initialTask);
                                }
                            }}
                            onChange={(e) =>
                                setNewTask({ key: tasks.length, title: e.target.value })
                            }
                        />
                        <Button
                            size="large"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                if (newTask.title.length !== 0) {
                                    onTaskAdded?.(newTask);
                                    setNewTask(initialTask);
                                }
                            }}
                            disabled={newTask.title.length == 0}
                        />
                    </Space.Compact>
                }
                footer={<>{tasks.length} tasks in total.</>}
                itemLayout="horizontal"
                bordered
                dataSource={tasks}
                renderItem={(item) => (
                    <TaskItem task={item} onTaskEdit={onTaskEdit} onTaskDelete={onTaskDelete} />
                )}
            />
        </div>
    );
};

export default TaskList;
