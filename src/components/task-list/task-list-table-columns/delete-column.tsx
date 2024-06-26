import React, { useCallback } from "react";

import { ColumnProps } from "../../../types";

import styles from "./button-column.module.css";
import { DeleteIcon } from "../../icons/delete-icon";

export const DeleteColumn: React.FC<ColumnProps> = ({
  data: { handleDeleteTasks, icons, task },
}) => {
  const onClick = useCallback(() => {
    handleDeleteTasks([task]);
  }, [task, handleDeleteTasks]);

  return (
    <button
      type="button"
      onContextMenu={e => {
        e.stopPropagation();
      }}
      onClick={onClick}
      className={styles.button}
    >
      {icons?.renderDeleteIcon ? icons.renderDeleteIcon() : <DeleteIcon />}
    </button>
  );
};
