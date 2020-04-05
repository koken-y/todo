const projectContainer = (() => {
  const projects = [];
  let _currentProjectIndex = 0;

  const addProject = (project) => {
    projects.push(project);
  };
  const getCurrentProjectIndex = () => {
    return _currentProjectIndex;
  }
  const setCurrentProjectIndex = (index /* = Number */) => {
    _currentProjectIndex = index;
  };
  const getCurrentProject = () => {
    return projects[_currentProjectIndex];
  };
  const removeProject = (index /* = Number */) => {
    projects.splice(index, 1);
  }

  return {
    projects,
    addProject,
    getCurrentProjectIndex,
    setCurrentProjectIndex,
    getCurrentProject,
    removeProject
  };
})();

const project = (name = 'string', description = 'string') => {
  const todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  return {
    name,
    description,
    todos,
    addTodo
  };
};

const todo = (title = 'string', description = 'string', dueDate, priority = false, completed = false) => {
  return {
    title,
    description,
    dueDate,
    priority,
    completed
  };
};

export {
  projectContainer,
  project,
  todo
};
