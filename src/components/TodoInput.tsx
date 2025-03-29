
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
    <div className="p-2 border-t-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 py-2 px-3 text-sm border-2 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-200"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TodoInput;
