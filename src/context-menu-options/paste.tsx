import type { ContextMenuOptionType } from "../types/public-types";
import { GanttLocale } from "../types/public-types";

export const createPasteOption = (locale: GanttLocale): ContextMenuOptionType => ({
  action: ({
    getCopyParentTasks,
    getCopyTasksWithDescendants,
    getCutParentTasks,
    handleAddChilds,
    handleMoveTasksInside,
    makeCopies,
    resetSelectedTasks: resetSelectedTasksAction,
    task,
  }) => {
    if (task.type !== "project" && task.type !== "task") {
      return;
    }

    const cutParentTasks = getCutParentTasks();

    if (cutParentTasks.length > 0) {
      handleMoveTasksInside(task, cutParentTasks);
      resetSelectedTasksAction();
      return;
    }

    const copyParentTasks = getCopyParentTasks();

    if (copyParentTasks.length > 0) {
      const tasksForCopy = getCopyTasksWithDescendants();
      const copiedTasks = makeCopies(tasksForCopy);

      handleAddChilds(task, copiedTasks);
      resetSelectedTasksAction();
    }
  },

  checkIsAvailable: ({ checkHasCopyTasks, checkHasCutTasks, task }) => {
    if (task.type === "empty" || task.type === "milestone") {
      return false;
    }

    if (!checkHasCopyTasks() && !checkHasCutTasks()) {
      return false;
    }

    return true;
  },
  icon: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" />
      </svg>
    </>
  ),
  label: locale.context.paste,
});
