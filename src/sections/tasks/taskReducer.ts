/**
 * @brief A reducer is created when the state setter logic gets too complex.
 * Here is how to think of it:
 *      1. From setting state via a setter to dispatching actions.
 *      2. Write reducer functions
 *      3. Use reducers instead of state handlers.
 *      4. It's important to remember, just like state setter, reducer would run during rendering.
 *         Thus it needs to be "pure" function & not touch any UI.
 * Advantages:
 *      1. Separation of concerns. Event Handlers in the component dispatch actions & reducers mutate the state.
 *      2. Readability.
 */
import { TaskAbortError } from '@reduxjs/toolkit';
import { Task, TaskAction } from './taskTypes';

/**
 * @brief Takes in the current state & desired action and returns a new state.
 */
const TaskReducer = (tasks: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case 'added':
            // Adds the new task mentioned in the payload.
            return [...tasks, action.payload];
        case 'edited':
            // Finds the task to edit via the payload key, replaces it edited task mentioned in the payload
            // & returns all the tasks.
            return tasks.map((task) => {
                if (task.key == action.payload.key) return action.payload;
                return task;
            });
        case 'deleted':
            // Returns all the tasks, except the one mentioned in the payload.
            return tasks.filter((task) => task.key !== action.payload.key);
        default:
            // Returns the current state if the action type is not recognized.
            return tasks;
    }
};

export default TaskReducer;
