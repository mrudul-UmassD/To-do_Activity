import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Task = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded">
      <div className="d-flex align-items-center">
        <Form.Check 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => onToggleCompleted(todo._id)}
          className="me-3"
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      </div>
      <Button variant="danger" size="sm" onClick={() => onDeleteTodo(todo._id)}>
        Delete
      </Button>
    </div>
  );
};

export default Task;
