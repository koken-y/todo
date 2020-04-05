import { projectContainer } from './objects.js';
import Dom from './dom.js';
import Data from './data.js';
import Render from './render.js'
import compareAsc from 'date-fns/compareAsc'
import parseISO from 'date-fns/parseISO'
import './style.css';
import './normalize.css';
import './skeleton.css';

/* Adds some default projects and todos */
Data.initializeData();
Dom.addListeners();
if (projectContainer.projects.length !== 0) {
    Render.changeTodoText();
    Render.renderProjects(projectContainer.projects);
    Render.renderTodos(projectContainer.projects[projectContainer.getCurrentProjectIndex()].todos);
} else {
    Render.renderProjectsTableHeading();
    Render.renderTodosTableHeading();
}
Data.saveToLocal(projectContainer);
