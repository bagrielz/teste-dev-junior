"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Tasks from "@/components/tasks";
import TaskModal from "@/components/task-modal";
import ConfirmModal from "@/components/confirm-modal";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  // Estados para controlar o modal de adicionar tarefa, modal de confirmação e a lista de tarefas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Efeito para carregar as tarefas do localStorage ao montar o componente
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Função para abrir o modal de adicionar tarefa
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal de adicionar tarefa
  const closeModal = () => setIsModalOpen(false);

  // Função para abrir o modal de confirmação de exclusão de tarefa
  const openConfirmModal = (task: Task) => {
    setTaskToDelete(task);
    setIsConfirmModalOpen(true);
  };

  // Função para fechar o modal de confirmação
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  // Função para excluir a tarefa selecionada
  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskToDelete.id)
      );
    }
    closeConfirmModal();
  };

  // Função para atualizar a lista de tarefas após adicionar uma nova tarefa
  const updateTasks = (newTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div>
      <Header />
      <Tasks
        onOpenModal={openModal}
        tasks={tasks}
        setTasks={setTasks}
        onTaskDelete={openConfirmModal}
      />
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onTaskAdded={updateTasks}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDeleteTask}
        taskTitle={taskToDelete?.title ?? ""}
      />
    </div>
  );
}
