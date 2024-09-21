"use client";

import React from "react";
import Button from "@/components/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (task: {
    id: number;
    title: string;
    completed: boolean;
  }) => void;
};

export default function TaskModal({
  isOpen,
  onClose,
  onTaskAdded,
}: ModalProps) {
  const [taskTitle, setTaskTitle] = React.useState(""); // Estado para armazenar o título da nova tarefa

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
      };

      onTaskAdded(newTask);

      setTaskTitle("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={(e) => e.preventDefault()}>
        <h3>Nova tarefa</h3>
        <div className="input-modal">
          <label htmlFor="titulo">Título</label>
          <input
            className="input"
            type="text"
            id="titulo"
            placeholder="Digite"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className="buttons-modal">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={addTask}>Adicionar</Button>
        </div>
      </form>
    </div>
  );
}
