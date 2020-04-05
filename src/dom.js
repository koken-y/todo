import { projectContainer, project, todo } from './objects.js';
import Data from './data.js';
import Render from './render.js';

const Dom = (() => {
  const projectModalElement = document.getElementById('projectModal');
  const todoModalElement = document.getElementById('todoModal');
  const modalOverlayElement = document.getElementById('modal-overlay');
  const projectNameElement = document.getElementById('projectName');
  const projectDescriptionElement = document.getElementById('projectDescription');
  const todoNameElement = document.getElementById('todoName');
  const todoDescriptionElement = document.getElementById('todoDescription');
  const todoDueDateElement = document.getElementById('todoDueDate');
  const todoPriorityElement = document.getElementById('todoPriority');
  // const Render = Render();
  // const Data = Data();

  const addListeners = () => {
    const buttons = document.getElementsByTagName('input');
    for (const button of buttons) {
      button.addEventListener('click', buttonSwitch);
    }

    function buttonSwitch (event) {
      switch (event.target.id) {
        case 'newProject':
          toggleProjectModal();
          toggleModalOverlay();
          break;
        case 'cancelProject':
          toggleProjectModal();
          toggleModalOverlay();
          clearProjectModal();
          break;
          case 'addProject':
          if (projectNameElement.validity.valueMissing === false) {
            addProject();
            Data.saveToLocal(projectContainer);
            Render.renderProjects(projectContainer.projects);
            toggleProjectModal();
            toggleModalOverlay();
            clearProjectModal();
          }
            break;
        case 'newTodo':
          toggleTodoModal();
          toggleModalOverlay();
          break;
        case 'cancelTodo':
          toggleTodoModal();
          toggleModalOverlay();
          clearTodoModal();
          break;
        case 'addTodo':
          if (projectContainer.projects.length !== 0) {
            addTodo();
            Data.saveToLocal(projectContainer);
            Render.renderTodos(projectContainer.getCurrentProject().todos);
            toggleTodoModal();
            toggleModalOverlay();
            clearTodoModal();
          }
          break;
        case 'clearCompleted':
          deleteCompletedTodos(projectContainer.getCurrentProject().todos);
          Render.renderTodos(projectContainer.getCurrentProject().todos);
          Data.saveToLocal(projectContainer);
          break;
      }
    }
  };
  /* buttonSwitch helper methods */
  const toggleProjectModal = () => {
    projectModalElement.classList.toggle('closed');
  };
  const toggleTodoModal = () => {
    todoModalElement.classList.toggle('closed');
  };
  const toggleModalOverlay = () => {
    modalOverlayElement.classList.toggle('closed');
  };
  const addProject = () => {
    if (_isProjectModalValid()) {
      const newProject = project(projectNameElement.value, projectDescriptionElement.value);
      projectContainer.addProject(newProject);
    }
  };
  const addTodo = () => {
    if (_isTodoModalValid()) {
      const newTodo = todo(todoNameElement.value, todoDescriptionElement.value, todoDueDateElement.value, todoPriorityElement.checked, false);
      /* Can't use project/todo methods because they don't survive being JSON'd */
      /* A workaround would be to attach the method to the prototype of the constructor */
      projectContainer.getCurrentProject().todos.push(newTodo);
    }
  };
  const _isProjectModalValid = () => {
    if (projectNameElement.value.length !== 0 && projectDescriptionElement.value.length !== 0) {
      return true;
    }
    return false;
  };
  const _isTodoModalValid = () => {
    if (todoNameElement.value.length !== 0 && todoDescriptionElement.value.length !== 0 && todoDueDateElement.value.length !== 0 && todoPriorityElement.value.length !== 0) {
      return true;
    }
    return false;
  }
  const clearProjectModal = () => {
    projectNameElement.value = '';
    projectDescriptionElement.value = '';
  };
  const clearTodoModal = () => {
    todoNameElement.value = '';
    todoDescriptionElement.value = '';
  };
  const deleteCompletedTodos = (todos = []) => {
    const filteredTodos = todos.filter((todo) => todo.completed === false);
    projectContainer.getCurrentProject().todos = filteredTodos;
  };

  return {
    addListeners
  };
})();

export default Dom;
