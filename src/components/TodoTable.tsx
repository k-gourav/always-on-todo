
import React from "react";
import { Todo } from "@/types/todo";
import { Check, Square } from "lucide-react";

interface TodoTableProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, onToggleComplete }) => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Fixed header */}
      <div className="grid grid-cols-12 text-sm font-medium border-b border-gray-200 py-2 px-2 bg-white">
        <div className="col-span-1 flex items-center justify-center">✓</div>
        <div className="col-span-2 flex items-center">Date</div>
        <div className="col-span-5 flex items-center">Task</div>
        <div className="col-span-4 flex items-center">Remarks</div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-400 italic">
            No tasks yet. Add one below.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id} 
              className={`grid grid-cols-12 border-b border-gray-100 py-2 px-2 text-sm hover:bg-gray-50 ${
                todo.completed ? "text-gray-400" : ""
              }`}
            >
              <div className="col-span-1 flex items-center justify-center">
                <button 
                  onClick={() => onToggleComplete(todo.id)}
                  className="focus:outline-none"
                >
                  {todo.completed ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Square className="h-4 w-4 text-gray-300" />
                  )}
                </button>
              </div>
              <div className="col-span-2 flex items-center">{todo.date}</div>
              <div className={`col-span-5 flex items-center ${todo.completed ? "line-through" : ""}`}>
                {todo.task}
              </div>
              <div className="col-span-4 flex items-center">{todo.remarks}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoTable;
