"use client";

import React from "react";
import Button from "@/components/button";
import Image from "next/image";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TasksProps = {
  onOpenModal: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onTaskDelete: (task: Task) => void;
};

export default function Tasks({
  onOpenModal,
  tasks,
  setTasks,
  onTaskDelete,
}: TasksProps) {
  // Efeito para carregar as tarefas do localStorage quando o componente é montado
  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, [setTasks]);

  // Função para alternar a conclusão da tarefa
  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Filtra as tarefas em concluídas e ativas
  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <main className="tasks-container">
      <div className="tasks">
        <h2>Suas tarefas de hoje</h2>
        {activeTasks.length > 0 ? (
          <ul>
            {activeTasks.map((task) => (
              <li className="task" key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className="custom-checkbox"></span>
                  {task.title}
                </label>
                <Image
                  src={"/icons/trash.svg"}
                  alt="Excluir tarefa"
                  width={24}
                  height={24}
                  priority
                  onClick={() => onTaskDelete(task)}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma tarefa adicionada ainda</p>
        )}

        <h2>Tarefas finalizadas</h2>
        {completedTasks.length > 0 ? (
          <ul>
            {completedTasks.map((task) => (
              <li className="task marked" key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className="custom-checkbox"></span>
                  {task.title}
                </label>
                <Image
                  src={"/icons/trash.svg"}
                  alt="Excluir tarefa"
                  width={24}
                  height={24}
                  priority
                  onClick={() => onTaskDelete(task)}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma tarefa finalizada ainda</p>
        )}

        <Button onClick={onOpenModal}>Adicionar nova tarefa</Button>
      </div>
    </main>
  );
}
