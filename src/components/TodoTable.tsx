
import React, { useState } from "react";
import { Todo } from "@/types/todo";

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
    <div className="flex-1 overflow-hidden flex flex-col border-2 border-gray-300 dark:border-gray-700">
      {/* Fixed header */}
      <div className="grid grid-cols-7 text-sm font-medium border-b-2 border-gray-300 dark:border-gray-700 py-2 px-2 bg-white dark:bg-gray-800 dark:text-gray-200">
        <div className="col-span-1 flex items-center justify-center border-r-2 border-gray-300 dark:border-gray-700">✅</div>
        <div className="col-span-2 flex items-center border-r-2 border-gray-300 dark:border-gray-700 px-2">Date</div>
        <div className="col-span-4 flex items-center px-2">Task</div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-400 dark:text-gray-500 italic border-b-2 border-gray-300 dark:border-gray-700">
            No tasks yet. Add one below.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`grid grid-cols-7 border-b-2 border-gray-300 dark:border-gray-700 py-2 px-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 h-10 ${
                todo.completed ? "text-gray-400 dark:text-gray-500" : "dark:text-gray-200"
              }`}
            >
              <div className="col-span-1 flex items-center justify-center border-r-2 border-gray-300 dark:border-gray-700">
                <button 
                  onClick={() => onToggleComplete(todo.id)}
                  className="focus:outline-none w-6 h-6 flex items-center justify-center"
                >
                  {todo.completed ? (
                    <span className="text-green-500">✅</span>
                  ) : (
                    <span className="text-gray-300 dark:text-gray-600 border-2 border-gray-300 dark:border-gray-600 w-5 h-5 flex items-center justify-center rounded-sm"></span>
                  )}
                </button>
              </div>
              <div className="col-span-2 flex items-center border-r-2 border-gray-300 dark:border-gray-700 px-2">{todo.date}</div>
              <div 
                className={`col-span-4 flex items-center px-2 ${todo.completed ? "line-through" : ""} cursor-pointer`}
                onClick={() => !todo.completed && startEditing(todo)}
              >
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    className="w-full py-1 px-1 focus:outline-none border border-blue-400 dark:border-blue-600 dark:bg-gray-800 dark:text-gray-200"
                    autoFocus
                  />
                ) : (
                  <div className="w-full">
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
