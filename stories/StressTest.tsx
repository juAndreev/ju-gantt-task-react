import React, {
  useCallback,
  useState,
} from "react";

import addDays from "date-fns/addDays";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  Gantt,
  OnChangeTasks,
  Task,
  TaskOrEmpty,
} from "../src";

import {
  onAddTask,
  onEditTask,
} from "./helper";

import "../dist/index.css";

const NUMBER_OF_ROOTS = 100;
const NUMBER_OF_SUBTASKS = 5;

type AppProps = {
  ganttHeight?: number;
};

const initTasks = () => {
  const res: Task[] = [];

  const firstStartDate = new Date();
  const firstEndDate = addDays(firstStartDate, NUMBER_OF_SUBTASKS);

  for (let i = 0; i < NUMBER_OF_ROOTS; ++i) {
    const projectStartDate = addDays(firstStartDate, i);
    const projectEndDate = addDays(firstEndDate, i);

    const projectId = `project_${i + 1}`;
    const projectName = `Project #${i + 1}`;

    const project: Task = {
      start: projectStartDate,
      end: projectEndDate,
      name: projectName,
      id: projectId,
      progress: 25,
      type: "project",
    };

    res.push(project);

    for (let j = 0; j < NUMBER_OF_SUBTASKS; ++j) {
      const taskId = `${projectId}/task_${j + 1}`;
      const taskName = `Task ${i + 1}.${j + 1}`;

      const task: Task = {
        start: addDays(projectStartDate, j),
        end: addDays(projectStartDate, j + 1),
        name: taskName,
        id: taskId,
        progress: 45,
        type: "task",
        parent: projectId,
      };
      res.push(task);
    }
  }

  return res;
};

export const StressTest: React.FC<AppProps> = (props) => {
  const [tasks, setTasks] = useState<readonly TaskOrEmpty[]>(initTasks);

  const onChangeTasks = useCallback<OnChangeTasks>((nextTasks, action) => {
    switch (action.type) {
      case "delete_relation":
        if (window.confirm(`Do yo want to remove relation between ${action.payload.taskFrom.name} and ${action.payload.taskTo.name}?`)) {
          setTasks(nextTasks);
        }
        break;

      case "delete_task":
        if (window.confirm(`Are you sure about ${action.payload.task.name}?`)) {
          setTasks(nextTasks);
        }
        break;

      default:
        setTasks(nextTasks);
        break;
    }
  }, []);

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Gantt
        {...props}
        onAddTask={onAddTask}
        onChangeTasks={onChangeTasks}
        onDoubleClick={handleDblClick}
        onEditTask={onEditTask}
        onClick={handleClick}
        tasks={tasks}
      />
    </DndProvider>
  );
};