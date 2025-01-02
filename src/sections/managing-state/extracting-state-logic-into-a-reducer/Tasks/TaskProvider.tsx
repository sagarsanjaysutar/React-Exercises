import React, { createContext, FC, useContext, useReducer } from 'react';

export type Task = {
    key: number;
    title: string;
};

/**
 * @brief An action object contains the type of actions & payload associated with that action.
 * e.g. An action object associated with adding a new task would contain:
 *  {
 *      type: "added"
 *      payload: { key: 1, title: "Newly added Task" }
 *  }
 */
type TaskAction = {
    type: 'added' | 'edited' | 'deleted';
    payload: Task;
};

/**
 * @brief A reducer is a function with consolidated state update logic.
 * It is created when the state update logic gets too complex.
 *
 * Prior usecase:
 *      1. Create a state: const [tasks, setTasks] = useState<Task[]>(initialTasks);
 *      2. Define multiple state updater function:
 *          const addTask = (addedTask: Task) => {
 *              setTasks([addedTask, ...tasks]);
 *          };
 *          const editTask = (editedTask: Task) => {
 *              setTasks(
 *                  tasks.map((task) => {
 *                      if (task.key == editedTask.key) return editedTask;
 *                      return task;
 *                  })
 *              );
 *          };
 *          const deleteTask = (deletedTaskKey: number) => {
 *              setTasks(tasks.filter((task) => task.key !== deletedTaskKey));
 *          };
 *
 *      Writing all the above functions in the main TaskContainer would flood the code as it grows.
 *
 * With reducers:
 *      1. Create reducer function consolidating the state update logic.
 *      2. Initialize reducer: const [tasks, dispatchTask] = useReducer(TaskReducer, initialTasks);
 *      3. Call dispatchTask for mutating the state like
 *              dispatch({ type: 'added', payload: addedTask })
 *              dispatch({ type: 'edited', payload: addedTask })
 *              dispatch({ type: 'deleted', payload: addedTask })
 *      4. From setting state via a setter to dispatching actions.
 *
 * Advantages:
 *      1. Separation of concerns. Event Handlers in the component dispatch actions & reducers mutate the state.
 *      2. Readability.
 *
 * @note It's important to remember, just like state setter, reducer would run during rendering.
 * Thus it needs to be "pure" function & not touch any UI.
 *
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

/**
 * @brief Creating a ContextProvider for the task.
 *
 * Tasks and it's mutating functions are accessed across various components.
 * Rather than passing them from the parent to all the children component, we are creating a ContextProvider.
 * ContextProvider will provide the value of tasks to all the nested components.
 */
const initialTasks: Task[] = [
    { key: 0, title: 'Fire the plants.' },
    { key: 1, title: 'Cut the water.' },
    { key: 2, title: 'Break the dishes.' },
];

type TasksContextProviderProp = {
    tasks: Task[];
    dispatchTask: (action: TaskAction) => void;
};

const TasksContextProvider = createContext<TasksContextProviderProp>({
    tasks: initialTasks,
    dispatchTask: (action: TaskAction) => console.log('Tasks Context Provider not available.'),
});

export const useTasksContextProvider = (): TasksContextProviderProp => {
    return useContext(TasksContextProvider);
};

/**
 * @brief A wrapper function for ContextProvider.
 * All the children of TaskProvider will have access to task & it's mutating functions.
 */
type TaskProviderProp = {
    children: React.ReactNode;
};

export const TaskProvider: FC<TaskProviderProp> = ({ children }) => {
    const [tasks, dispatchTask] = useReducer(TaskReducer, initialTasks);

    return (
        <TasksContextProvider.Provider value={{ tasks, dispatchTask }}>
            {children}
        </TasksContextProvider.Provider>
    );
};
