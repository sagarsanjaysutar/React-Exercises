import React, { FC, useReducer, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, InputRef, List, Space } from 'antd';
import { Task } from './taskTypes';
import TaskReducer from './taskReducer';

/**
 * @brief UI Description: TaskList component containing TaskItem component.
 */
type TaskProp = {
    task: Task;
    onTaskEdit?: (editedTask: Task) => void;
    onTaskDelete: (deletedTask: Task) => void;
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
                    onClick={() => onTaskDelete(task)}
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

// These default values are placed outside the component as we do not want them to re-render.
const initialTask: Task = { key: -1, title: '' };

const initialTasks: Task[] = [
    { key: 0, title: 'Pick up water.' },
    { key: 1, title: 'Cut grass.' },
    { key: 2, title: 'Wash dishes.' },
];

const TaskList: FC = () => {
    // #00. A state for task list. These corresponding "task"/state handlers would grow as component gets complex.
    // This is why it's best to move state handler into a reducer component.
    
    // const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // const addTask = (addedTask: Task) => {
    //     setTasks([addedTask, ...tasks]);
    // };

    // const editTask = (editedTask: Task) =>
    //     setTasks(
    //         tasks.map((task) => {
    //             if (task.key == editedTask.key) return editedTask;
    //             return task;
    //         })
    //     );

    // const deleteTask = (deletedTaskKey: number) =>
    //     setTasks(tasks.filter((task) => task.key !== deletedTaskKey));

    // #01. Using reducer functions. The code got cleaner.
    const [tasks, dispatch] = useReducer(TaskReducer, initialTasks);
    const addTask = (addedTask: Task) => dispatch({ type: 'added', payload: addedTask });
    const editTask = (editedTask: Task) => dispatch({ type: 'edited', payload: editedTask });
    const deleteTask = (deletedTask: Task) => dispatch({ type: 'deleted', payload: deletedTask });

    // A state for new task.
    const [newTask, setNewTask] = useState<Task>(initialTask);

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
                                    addTask?.(newTask);
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
                                    addTask?.(newTask);
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
                    <TaskItem task={item} onTaskEdit={editTask} onTaskDelete={deleteTask} />
                )}
            />
        </div>
    );
};

export default TaskList;
