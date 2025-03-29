
import React, { useState } from "react";

interface TodoInputProps {
  onAddTodo: (task: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    onAddTodo(input.trim());
    setInput("");
  };

  return (
    <div className="p-2 border-t border-gray-300 bg-white sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TodoInput;
