import { List } from 'antd';
import AddTask from './addTask';
import tasks from './taskContainer';
import { useTasksContextProvider } from './taskProvider';
import React, { FC } from 'react';
import TaskItem from './taskItem';

const TaskList: FC = () => {
    const { tasks } = useTasksContextProvider();
    return (
        <div className="bg-slate-500" style={{ width: '50vw', height: 'auto' }}>
            <List
                header={<AddTask />}
                footer={<>{tasks.length} tasks in total.</>}
                itemLayout="horizontal"
                bordered
                dataSource={tasks}
                renderItem={(task) => <TaskItem task={task} />}
            />
        </div>
    );
};

export default TaskList;
