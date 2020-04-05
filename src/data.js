import { projectContainer, project, todo } from './objects.js';

const Data = (() => {
  const saveToLocal = (projectContainerArgument) => {
    const data = JSON.stringify(projectContainerArgument);
    localStorage.setItem('todoData', data);
  };
  const initializeData = () => {
    /* populate projectContainer from local storage if there's data in it */
    if (localStorage.todoData) {
      const projectContainerCopy = JSON.parse(localStorage.getItem('todoData'));
      for (let i = 0; i < projectContainerCopy.projects.length; i++) {
        const copyOfProject = projectContainerCopy.projects[i];
        projectContainer.addProject(copyOfProject);
      }
    } else {
      /* Add some example projects */
      const projectJavascript = project('Programming', 'tasks to learn about programming');
      const projectC = project('Shopping', 'keeping track of things to buy');
      projectContainer.addProject(projectJavascript);
      projectContainer.addProject(projectC);

      /* Add some example todos */
      const todoExample = todo('todo app', 'complete a todo app for the odin project', '2020-03-16', false);
      const todoExample2 = todo('Groceries', 'Tomato, onions, beef', '2020-03-24', false);
      projectContainer.projects[0].addTodo(todoExample);
      projectContainer.projects[1].addTodo(todoExample2);
    };
  };

  return {
    initializeData,
    saveToLocal
  };
})();

export default Data;
