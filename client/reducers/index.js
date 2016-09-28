import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import AssignProjectReducer from './reducer_assign';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  projects: ProjectsReducer, //<-- Bills
  assignProject : AssignProjectReducer,
  form: formReducer // <-- redux-form
});

export default rootReducer;
