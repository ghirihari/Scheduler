import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css'
import Now from './Today';
import WeeklyTable from './WeeklyTable';
import SwipeableTemporaryDrawer from './Drawer'
import Button from '@material-ui/core/Button';

export default function BasicTable() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to='/drawer'/></Route>
        <Route path='/weekly' component={WeeklyTable}/>
        <Route path='/now' component={Now}/>
        <Route path='/drawer' component={SwipeableTemporaryDrawer}/>
      </Switch>
    </Router>
  );
  }
