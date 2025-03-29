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

    // Always set dark mode
    document.documentElement.classList.add("dark");
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task: string) => {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })}`;
    
    const newTodo: Todo = {
      id: Date.now(),
      completed: false,
      date: formattedDate,
      task
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

  const updateTask = (id: number, newTask: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-gray-200 todo-app overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TodoTable 
          todos={todos} 
          onToggleComplete={toggleTodoComplete}
          onUpdateTask={updateTask}
        />
        <TodoInput onAddTodo={addTodo} />
      </div>
      <InstallPrompt />
    </div>
  );
};

export default Index;
