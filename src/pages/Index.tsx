
import React, { useState, useEffect } from "react";
import TodoTable from "@/components/TodoTable";
import TodoInput from "@/components/TodoInput";
import InstallPrompt from "@/components/InstallPrompt";
import { Todo } from "@/types/todo";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Failed to parse saved todos", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task: string, remarks: string = "") => {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })}`;
    
    const newTodo: Todo = {
      id: Date.now(),
      completed: false,
      date: formattedDate,
      task,
      remarks
    };
    
    setTodos([...todos, newTodo]);
  };

  const toggleTodoComplete = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 todo-app">
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <TodoTable todos={todos} onToggleComplete={toggleTodoComplete} />
        <TodoInput onAddTodo={addTodo} />
      </div>
      <InstallPrompt />
    </div>
  );
};

export default Index;
