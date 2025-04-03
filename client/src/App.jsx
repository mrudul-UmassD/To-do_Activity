import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050/api/todos';

  // Fetch todos from backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(backendUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return; // Prevent adding empty todos

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText }),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]); // Add new todo to state
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      const updatedTodo = { ...todos.find((todo) => todo._id === id) };
      updatedTodo.completed = !updatedTodo.completed;

      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h1 className="text-center mb-0">Todo List</h1>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <div className="d-flex">
                  <Form.Control 
                    type="text" 
                    placeholder="Add a new task..." 
                    value={newTodoText} 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />
                  <Button variant="primary" onClick={handleAddTodo} className="ms-2">
                    Add
                  </Button>
                </div>
              </Form.Group>
              <TaskList 
                todos={todos} 
                onToggleCompleted={handleToggleCompleted} 
                onDeleteTodo={handleDeleteTodo} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
