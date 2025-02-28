import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

const InputGroup = styled.div`
  margin: 16px 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #1e293b;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  
  &.primary {
    background: #2563eb;
    color: white;
    
    &:hover {
      background: #1d4ed8;
    }
  }
  
  &.secondary {
    background: #e2e8f0;
    color: #1e293b;
    
    &:hover {
      background: #cbd5e1;
    }
  }
`;

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [taskContent, setTaskContent] = useState('');
  const [endTime, setEndTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskContent.trim() && endTime) {
      onAdd({
        content: taskContent,
        endTime: endTime
      });
      setTaskContent('');
      setEndTime('');
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Task Description</Label>
            <Input
              type="text"
              value={taskContent}
              onChange={e => setTaskContent(e.target.value)}
              placeholder="Enter task description"
              autoFocus
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>End by Time</Label>
            <Input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              required
            />
          </InputGroup>
          <ButtonGroup>
            <Button type="button" className="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="primary">
              Add Task
            </Button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTaskModal;