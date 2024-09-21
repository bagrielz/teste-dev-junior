"use client";
import React from "react";
import Button from "@/components/button";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Deletar tarefa</h3>
        <p>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className="buttons-modal">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
}
