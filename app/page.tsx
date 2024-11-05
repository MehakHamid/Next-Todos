"use client"
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
};

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [idCounter, setIdCounter] = useState<number>(1);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: input };
    setTodoList([...todoList, newTodo]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const TodoItem = ({ id, text, index }: { id: number; text: string; index: number }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const handleEdit = () => {
      setIsEditing(!isEditing);
      if (isEditing) editTodo(id, editText);
    };

    return (
      <div className="flex items-center gap-4 border-b py-2">
        <span className="text-gray-600">{index + 1}.</span>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <span className="flex-grow text-gray-800">{text}</span>
        )}
        <button
          onClick={handleEdit}
          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => deleteTodo(id)}
          className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">To-Do App</h1>
      <div className="flex gap-4 mb-4 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a to-do"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>
      <div className=" cursor-pointer grid-cols-5 gap-4 w-full max-w-md">
        {todoList.map((todo, index) => (
          <TodoItem key={todo.id} id={todo.id} text={todo.text} index={index} />
        ))}
      </div>
    </div>
  );
}

