const NewTodoForm = ({ value, updateText, handleAction }) => {
  return (
    <label>
      <input
        type="text"
        placeholder="new todo"
        value={value}
        onChange={(e) => updateText(e.target.value)}
        data-testid="todo-input" 
      />
      <button onClick={handleAction} data-testid="add-todo-btn">
        Add todo
      </button>
    </label>
  );
};

export default NewTodoForm;
