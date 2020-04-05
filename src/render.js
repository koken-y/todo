import { projectContainer } from './objects.js';
import Data from './data.js'
import compareAsc from 'date-fns/compareAsc'
import parseISO from 'date-fns/parseISO'

const Render = (() => {
    const projectsElement = document.getElementById('projects');
    const todosElement = document.getElementById('todos');
    const todosHeadingElement = document.getElementById('todosHeading');

    const renderProjectsTableHeading = () => {
      projectsElement.appendChild(createHeaderElement('projects'));
    }

    const renderTodosTableHeading = () => {
      todosElement.appendChild(createHeaderElement('todos'));
    }

    const renderProjects = function (projects = []) {
        let projectIndex = 0;
        projectsElement.innerHTML = '';
        projectsElement.appendChild(createHeaderElement('projects'));

        projects.forEach(function (projectObject) {
          const newProjectElement = document.createElement('tr');
          newProjectElement.dataset.index = projectIndex;
          projectIndex++;
          newProjectElement.innerHTML = `
          <td>
            ${projectObject.name}
          </td>
          <td>
            ${projectObject.description}
          </td>
          `;

          newProjectElement.addEventListener('click', (e) => {
            projectContainer.setCurrentProjectIndex(e.target.parentNode.dataset.index);
            /* click to show todos in each project */
            if (projectContainer.projects.length !== 0) {
              renderTodos(projectContainer.getCurrentProject().todos);
            } else {
              renderTodos();
            }
            changeTodoText();
            /* true and false parameters are used to activate listener for viewing todos first,
            then the listener to remove a project (event bubbling) */
          }, true);

          /* Add a remove project button */
          const removeButtonContainerElement = document.createElement('td');
          const removeButtonElement = document.createElement('button');
          removeButtonElement.classList.add('button');
          removeButtonElement.innerText = 'Remove';

          /* Remove project from projectContainer and reRender projects */
          removeButtonElement.addEventListener('click', (e) => {
            projectContainer.removeProject(e.target.parentNode.dataset.index);
            renderProjects(projectContainer.projects);
            /* if you remove the last project on the list, set the current project (and thus todos displayed) to the second last project */
            if (projectContainer.getCurrentProjectIndex() >= projectContainer.projects.length) {
              projectContainer.setCurrentProjectIndex(projectContainer.getCurrentProjectIndex() - 1);
            }
            if (projectContainer.getCurrentProjectIndex() === -1) {
              renderTodos();
            } else {
              renderTodos(projectContainer.getCurrentProject().todos);
            }
            Data.saveToLocal(projectContainer);
          }, false);
          removeButtonContainerElement.appendChild(removeButtonElement);
          newProjectElement.appendChild(removeButtonElement);

          projectsElement.appendChild(newProjectElement);
        })
      };
      const renderTodos = function (todos = []) {
        let todoIndex = 0;
        todosElement.innerHTML = '';
        todosElement.appendChild(createHeaderElement('todos'));

        sortTodos(todos);
        todos.forEach(function (todoObject) {
          const newTodoElement = document.createElement('tr');
          newTodoElement.dataset.index = todoIndex;
          todoIndex++;
          newTodoElement.innerHTML = `
          <td>
            ${todoObject.title}
          </td>
          <td>
            ${todoObject.description}
          </td>
          <td>
            ${todoObject.dueDate}
          </td>
          <td>
            ${todoObject.priority}
          </td>
          <td>
            ${todoObject.completed}
          </td>
          `;

          /* Click anywhere on todo to toggle completion status */
          newTodoElement.addEventListener('click', (e) => {
            toggleTodoCompleted(e);
            renderTodos(projectContainer.getCurrentProject().todos);
          });

          document.getElementById('todos').appendChild(newTodoElement);
        })
      };
      const createHeaderElement = (projectsOrTodos = '') => {
        if (projectsOrTodos === 'projects') {
          const projectsHeaderElement = document.createElement('tr');
          projectsHeaderElement.innerHTML = `
          <th>
            Name
          </th>
          <th>
            Description
          </th>
          <th>
            Remove Project
          </th>
          `;
          return projectsHeaderElement;
        } else if (projectsOrTodos === 'todos') {
          const todosHeaderElement = document.createElement('tr');
          todosHeaderElement.innerHTML = `
          <th>
            Name
          </th>
          <th>
            Description
          </th>
          <th>
            Due Date
          </th>
          <th>
            Priority
          </th>
          <th>
            Completed
          </th>
          `;
          return todosHeaderElement;
        }
      };
      const sortTodos = (todos = []) => {
        /* sort according to priority then due date */
        todos.sort((a, b) => {
          if (a.priority === true && b.priority === false) {
            return -1;
          } else if (a.priority === false && b.priority === true) {
            return 1;
          } else {
            return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
          }
        });
      };
      const toggleTodoCompleted = (e) => {
        if (projectContainer.getCurrentProject().todos[e.target.parentNode.dataset.index].completed === true) {
          projectContainer.getCurrentProject().todos[e.target.parentNode.dataset.index].completed = false;
        } else {
          projectContainer.getCurrentProject().todos[e.target.parentNode.dataset.index].completed = true;
        }
      };
      const changeTodoText = () => {
        todosHeadingElement.textContent = `Todos (in ${projectContainer.getCurrentProject().name})`;
      };
    return {
      renderProjectsTableHeading,
      renderTodosTableHeading,
      renderProjects,
      renderTodos,
      changeTodoText
    };
})();

export default Render;
