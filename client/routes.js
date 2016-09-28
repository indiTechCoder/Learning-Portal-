import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainIndex from './pages/MainIndex';
import ViewResources from './pages/ViewResources'
import App from './pages/App';
import ProjectsIndex from './pages/ProjectsIndex';
import ProjectsNew from './pages/ProjectsNew';
import ProjectsShow from './pages/ProjectsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AssignPorject from './pages/AssignPorject'
import SearchResource from './pages/SearchResource'
import ManageResource from './pages/ManageResource';
import ProjectsManage from './pages/ProjectsManage';
import EditProfile from './pages/EditProfile';
import ViewAssignProject from './pages/ViewAssignProject';
import ViewUserProject from './pages/ViewUserProject';

export default (
  <Route path="/" component={App}>

  <IndexRoute component={MainIndex} />
  <Route path="/viewemployee"  component={ViewResources}/>
  <Route path="/searchemployee" component={SearchResource}/>
  <Route path="/manageemployee" component={ManageResource}/>

  <Route path="projects" component={ProjectsIndex} />
  <Route path="projects/new" component={ProjectsNew} />
  <Route path="projects/:id" component={ProjectsShow} />
 <Route path="projectsmanage" component={ProjectsManage} />

  <Route path="assign" component={AssignPorject} />
  <Route path="viewassign" component={ViewAssignProject} />

  <Route path="/signin" component={SignIn} />
  <Route path="/signup" component={SignUp} />

  <Route path="/profile" component={Profile} />
  <Route path="viewuserproject" component={ViewUserProject} />
  <Route path="/editprofile" component={EditProfile} />
  </Route>
  );
