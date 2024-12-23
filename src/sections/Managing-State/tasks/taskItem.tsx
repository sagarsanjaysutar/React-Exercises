import { SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { InputRef, List, Button, Avatar, Input } from 'antd';
import { FC, useRef, useState } from 'react';
import { Task } from './taskProvider';
import { useTasksContextProvider } from './taskProvider';

type TaskProp = {
    task: Task;
};

const TaskItem: FC<TaskProp> = ({ task }) => {
    const { dispatchTask } = useTasksContextProvider();

    const inputRef = useRef<InputRef>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditValue] = useState('');
    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                    onClick={() => {
                        if (isEditing) {
                            dispatchTask({
                                type: 'edited',
                                payload: {
                                    ...task,
                                    title: editedTitle != '' ? editedTitle : task.title,
                                },
                            });
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
                    onClick={() => dispatchTask({ type: 'deleted', payload: task })}
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
                            onChange={(e) => {
                                const editedValue = e.target.value;
                                if (editedValue.length > 0) setEditValue(editedValue);
                            }}
                        />
                    ) : (
                        <p className="text-lg text-slate-200">
                            {task.key} | {task.title}
                        </p>
                    )
                }
                description={<p className="text-base text-slate-500">Random description</p>}
            />
        </List.Item>
    );
};

export default TaskItem;
