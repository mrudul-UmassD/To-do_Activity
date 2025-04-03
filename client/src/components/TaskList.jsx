import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Task from './Task';

const TaskList = ({ todos, onToggleCompleted, onDeleteTodo }) => {
  return (
    <ListGroup className="mt-3">
      {todos.map((todo) => (
        <ListGroup.Item key={todo._id} className="p-0 border-0 mb-2">
          <Task todo={todo} onToggleCompleted={onToggleCompleted} onDeleteTodo={onDeleteTodo} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
