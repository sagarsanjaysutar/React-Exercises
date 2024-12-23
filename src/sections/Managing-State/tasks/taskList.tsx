import { List } from 'antd';
import AddTask from './addTask';
import { useTasksContextProvider } from './taskProvider';
import React, { FC } from 'react';
import TaskItem from './taskItem';

const TaskList: FC = () => {
    const { tasks } = useTasksContextProvider();
    return (
        <List
            header={<AddTask />}
            footer={<p className="text-base text-slate-200">{tasks.length} tasks in total.</p>}
            itemLayout="horizontal"
            dataSource={tasks}
            renderItem={(task) => <TaskItem task={task} />}
        />
    );
};

export default TaskList;