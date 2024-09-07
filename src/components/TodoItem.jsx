import { useDispatch } from "react-redux";
import { toggleComplete, removeTodo } from "../store/todoSlice";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete({ id }))}
      />
      <span>{text}</span>
      {/* Добавляем data-testid для элемента удаления */}
      <span
        onClick={() => dispatch(removeTodo({ id }))}
        data-testid="delete-todo"
        style={{ cursor: "pointer" }} 
      >
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
