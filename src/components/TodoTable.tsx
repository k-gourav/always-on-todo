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
    <div className="flex-1 overflow-hidden flex flex-col border border-[#1e2230] bg-[#151922]">
      {/* Fixed header */}
      <div className="grid grid-cols-12 text-sm font-medium border-b border-[#1e2230] py-3 px-2 bg-[#1a1f2c] text-gray-300">
        <div className="col-span-1 flex items-center justify-center border-r border-[#1e2230]">✅</div>
        <div className="col-span-2 flex items-center border-r border-[#1e2230] px-2">Date</div>
        <div className="col-span-9 flex items-center px-2">Task</div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-500 italic border-b border-[#1e2230] text-base">
            No tasks yet. Add one below.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`grid grid-cols-12 border-b border-[#1e2230] py-3 px-2 text-base hover:bg-[#1a1f2c] min-h-[48px] ${
                todo.completed ? "text-gray-500" : "text-gray-300"
              }`}
            >
              <div 
                className="col-span-1 flex items-center justify-center border-r border-[#1e2230] cursor-pointer"
                onClick={() => onToggleComplete(todo.id)}
              >
                {todo.completed ? (
                  <span className="text-green-500 text-xl">✅</span>
                ) : (
                  <span className="border border-[#2a3041] w-6 h-6 flex items-center justify-center rounded-sm"></span>
                )}
              </div>
              <div className="col-span-2 flex items-center border-r border-[#1e2230] px-2 text-sm">{todo.date}</div>
              <div 
                className={`col-span-9 flex items-start px-2 py-1 ${todo.completed ? "line-through" : ""} cursor-pointer`}
                onClick={() => !todo.completed && startEditing(todo)}
              >
                {editingId === todo.id ? (
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={handleKeyDown}
                    className="w-full py-1 px-1 focus:outline-none border border-[#2a3041] bg-[#151922] text-gray-300 resize-none text-base"
                    autoFocus
                    rows={Math.min(5, editValue.split('\n').length)}
                    style={{ minHeight: '24px' }}
                  />
                ) : (
                  <div className="w-full whitespace-pre-wrap break-words">
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
