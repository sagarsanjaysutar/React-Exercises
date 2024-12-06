/**
 * @brief Extracting State Logic into a Reducer & Scaling Up with Reducer and Context
 * @ref https://react.dev/learn/extracting-state-logic-into-a-reducer
 * @ref https://react.dev/learn/scaling-up-with-reducer-and-context
 */
import React, { FC } from 'react';
import { TaskProvider } from './taskProvider';
import TaskList from './taskList';

/**
 * @brief TaskList renders TaskItem for each Task. There is also a AddTask component.
 * TaskProvider provides the value of tasks & it's mutating functions like add, edit, delete to all the children component.
 */
const TaskContainer: FC = () => {
    return (
        <TaskProvider>
            <TaskList />
        </TaskProvider>
    );
};

export default TaskContainer;
