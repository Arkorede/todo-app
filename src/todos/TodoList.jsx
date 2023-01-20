import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem.jsx";
import NewTodoForm from "./NewTodoForm.jsx";
import "./TodoList.css";
import { connect } from "react-redux";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";

function TodoList({
  todos = [],
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>loading todos...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      {Array.from(todos).map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
