describe("Todo App", () => {
  // Загружаем приложение перед каждым тестом
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // Тест на загрузку приложения
  it("should load the app", () => {
    // Проверяем, что приложение загрузилось и отображается текст "Add todo"
    cy.contains("Add todo").should("be.visible");
  });

  // Тест на проверку формы
  it("should have a form", () => {
    // Проверяем, что поле ввода пустое и кнопка содержит правильный текст
    cy.get('[data-testid="todo-input"]').should("have.value", "");
    cy.get('[data-testid="add-todo-btn"]').should("have.text", "Add todo");
  });

  // Тест на добавление задачи
  it("should add tasks", () => {
    // Вводим задачу и проверяем, что она добавлена в список
    cy.get('[data-testid="todo-input"]').type("Learn React");
    cy.get('[data-testid="add-todo-btn"]').click();

    cy.get("li span:first-of-type").should("have.text", "Learn React");
    cy.get('[data-testid="todo-input"]').should("have.value", "");

    // Добавляем еще одну задачу
    cy.get('[data-testid="todo-input"]')
      .type("Learn Redux")
      .should("have.value", "Learn Redux");
    cy.get('[data-testid="add-todo-btn"]').click();

    cy.get("li:last-child span:first-of-type").should(
      "have.text",
      "Learn Redux"
    );
    cy.get('[data-testid="todo-input"]').should("have.value", "");
  });

  // Тест на удаление задачи
  it("should delete tasks", () => {
    // Добавляем две задачи перед проверкой
    cy.get('[data-testid="todo-input"]').type("Learn React");
    cy.get('[data-testid="add-todo-btn"]').click();

    cy.get('[data-testid="todo-input"]').type("Learn Redux");
    cy.get('[data-testid="add-todo-btn"]').click();

    // Убедимся, что две задачи добавлены
    cy.get("li").should("have.length", 2);

    // Клик по кнопке удаления задачи
    cy.get("li:last-child [data-testid='delete-todo']").click();

    // Проверяем, что осталась одна задача
    cy.get("li").should("have.length", 1);
  });

  // Тест на переключение статуса задачи
  it("should toggle task status", () => {
    // Добавляем задачу перед проверкой
    cy.get('[data-testid="todo-input"]').type("Learn Testing");
    cy.get('[data-testid="add-todo-btn"]').click();

    // Убедимся, что задача добавлена
    cy.get("li").should("have.length", 1);

    // Проверяем, что задача не выполнена, затем переключаем статус на выполненную
    cy.get("li input[type='checkbox']")
      .should("not.be.checked")
      .click()
      .should("be.checked");
  });
});
