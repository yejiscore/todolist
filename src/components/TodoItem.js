// TodoItem.js

import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const Time = styled.div`
  font-size: 15px;
  color: ${props => (props.done ? '#ced4da' : '#495057')};
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
  margin-left: 20px;
`;

function TodoItem({ id, done, text, time }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  
  const handleToggle = (e) => {
    // 이벤트 버블링 방지
    e.stopPropagation();
    onToggle();
  };

  const handleRemove = (e) => {
    // 이벤트 버블링 방지
    e.stopPropagation();
    onRemove();
  };

  return (
    <TodoItemBlock>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircle done={done} onClick={handleToggle}>
          {done && <MdDone />}
        </CheckCircle>
        <Text done={done}>{text}</Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Time done={done}>{time}</Time>
        <Remove onClick={handleRemove}>
          <MdDelete />
        </Remove>
      </div>
    </TodoItemBlock>
  );
}

export default TodoItem;
