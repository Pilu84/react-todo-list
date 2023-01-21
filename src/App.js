import React, { useState, useRef, useCallback } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState(null)
  const todoNameRef = useRef()

  if (todos == null) {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos([...storedTodos])
    }
  }

  //toggle between complete and incomplete
  function toggleTodo(id) {
    const newTodos = [...todos] ?? []
    if (newTodos.length !== 0) {
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
    }

  }

  const handleAddTodo = useCallback(
    (e) => {
      const name = todoNameRef.current.value
      if (name === '') return
      const prevTodos = todos ? [...todos] : [];
      prevTodos.push({ id: uuid(), name: name, complete: false });
      setTodos(prevTodos);
      todoNameRef.current.value = null
    },
    [todos]
  )

  const handleClearTodos = useCallback(
    () => {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    },
    [todos]
  );

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todo</button>

      {(todos && todos.length === 0) || !todos &&
        <div>
          <p>No Todo!</p>
        </div>
      }
      {todos && todos.length !== 0 &&
        <div>{todos.filter(todo => !todo.complete).length} left Todo</div>
      }
    </>
  )
}

export default App;
