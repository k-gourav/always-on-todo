
import React, { useState, useEffect } from "react";
import TodoTable from "@/components/TodoTable";
import TodoInput from "@/components/TodoInput";
import InstallPrompt from "@/components/InstallPrompt";
import { Todo } from "@/types/todo";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

    // Load theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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
    <div className="h-screen w-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 todo-app overflow-hidden">
      <div className="flex items-center justify-end p-2 bg-white dark:bg-gray-900">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
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
