
import React, { useState } from "react";
import { Todo } from "@/types/todo";
import { Check, Edit } from "lucide-react";

interface TodoTableProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onUpdateTask: (id: number, newTask: string) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ 
  todos, 
  onToggleComplete,
  onUpdateTask
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.task);
  };

  const saveEdit = () => {
    if (editingId && editValue.trim()) {
      onUpdateTask(editingId, editValue.trim());
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col border border-gray-200">
      {/* Fixed header */}
      <div className="grid grid-cols-10 text-sm font-medium border-b border-gray-200 py-2 px-2 bg-white">
        <div className="col-span-1 flex items-center justify-center">✅</div>
        <div className="col-span-2 flex items-center">Date</div>
        <div className="col-span-6 flex items-center">Task</div>
        <div className="col-span-1 flex items-center justify-center">Edit</div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-400 italic border-b border-gray-100">
            No tasks yet. Add one below.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`grid grid-cols-10 border-b border-gray-100 py-2 px-2 text-sm hover:bg-gray-50 ${
                todo.completed ? "text-gray-400" : ""
              }`}
            >
              <div className="col-span-1 flex items-center justify-center">
                <button 
                  onClick={() => onToggleComplete(todo.id)}
                  className="focus:outline-none"
                >
                  {todo.completed ? (
                    <span className="text-green-500 text-lg">✅</span>
                  ) : (
                    <span className="text-gray-300 border border-gray-300 w-4 h-4 inline-block"></span>
                  )}
                </button>
              </div>
              <div className="col-span-2 flex items-center border-r border-gray-100 h-full">{todo.date}</div>
              <div className={`col-span-6 flex items-center border-r border-gray-100 h-full ${todo.completed ? "line-through" : ""}`}>
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    className="w-full py-1 px-2 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  todo.task
                )}
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <button
                  onClick={() => startEditing(todo)}
                  className="focus:outline-none text-gray-400 hover:text-gray-600"
                  disabled={editingId !== null}
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoTable;
