import React, { useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  position: relative; /* 부모 요소 위치 지정 */
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px; /* 페이지 번호가 버튼과 겹치지 않도록 위로 조금 올림 */
  position: absolute; /* 페이지 번호 위치 지정 */
  bottom: 70px; /* 페이지 번호가 하단에 위치하도록 설정 */
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 가운데 정렬 */
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: ${props => (props.active ? '#20c997' : '#dee2e6')};
  color: ${props => (props.active ? 'white' : 'black')};
`;

function TodoList() {
  const todos = useTodoState();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7; // 한 페이지에 보여질 항목 수

  // 현재 페이지에 해당하는 Todo 항목 가져오기
  const currentPageTodos = todos.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 페이지 수 계산
  const pageCount = Math.ceil(todos.length / pageSize);

  // 페이지 번호 목록 생성
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // 페이지 변경 함수
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <TodoListBlock>
      {currentPageTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          time={todo.time}
        />
      ))}
      <Pagination>
        {pageNumbers.map(number => (
          <PageButton
            key={number}
            active={currentPage === number}
            onClick={() => changePage(number)}
          >
            {number}
          </PageButton>
        ))}
      </Pagination>
    </TodoListBlock>
  );
}

export default TodoList;