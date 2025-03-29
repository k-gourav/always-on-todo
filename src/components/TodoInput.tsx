
import React, { useState } from "react";

interface TodoInputProps {
  onAddTodo: (task: string, remarks: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Check if there's a remarks section (denoted by -- or ::)
    const separators = ["--", "::"];
    let task = input;
    let remarks = "";
    
    for (const separator of separators) {
      if (input.includes(separator)) {
        const parts = input.split(separator);
        task = parts[0].trim();
        remarks = parts.slice(1).join(separator).trim();
        break;
      }
    }
    
    onAddTodo(task, remarks);
    setInput("");
  };

  return (
    <div className="p-2 border-t border-gray-200 bg-white sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task (use -- or :: to add remarks)"
          className="flex-1 py-2 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TodoInput;
