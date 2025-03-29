
import React, { useState } from "react";
import { Todo } from "@/types/todo";
import { Check } from "lucide-react";

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
    <div className="flex-1 overflow-hidden flex flex-col border border-gray-300">
      {/* Fixed header */}
      <div className="grid grid-cols-9 text-sm font-medium border-b border-gray-300 py-2 px-2 bg-white">
        <div className="col-span-1 flex items-center justify-center border-r border-gray-300">✅</div>
        <div className="col-span-2 flex items-center border-r border-gray-300 px-2">Date</div>
        <div className="col-span-6 flex items-center px-2">Task</div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-400 italic border-b border-gray-300">
            No tasks yet. Add one below.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`grid grid-cols-9 border-b border-gray-300 py-2 px-2 text-sm hover:bg-gray-50 ${
                todo.completed ? "text-gray-400" : ""
              }`}
            >
              <div className="col-span-1 flex items-center justify-center border-r border-gray-300">
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
              <div className="col-span-2 flex items-center border-r border-gray-300 px-2">{todo.date}</div>
              <div 
                className={`col-span-6 flex items-center px-2 ${todo.completed ? "line-through" : ""}`}
                onClick={() => !todo.completed && startEditing(todo)}
              >
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    className="w-full py-1 px-1 focus:outline-none border border-blue-400"
                    autoFocus
                  />
                ) : (
                  <div className="w-full cursor-pointer">
                    {todo.task}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoTable;
