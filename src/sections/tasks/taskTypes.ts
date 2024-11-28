export type Task = {
    key: number;
    title: string;
};

/**
 * An action object contains the type of actions & payload associated with that action.
 * e.g. An action object associated with adding a new task would contain:
 *  {
 *      type: "added"
 *      payload: { key: 1, title: "Newly added Task" }
 *  }
 */
export type TaskAction = {
    type: 'added' | 'edited' | 'deleted';
    payload: Task;
};
