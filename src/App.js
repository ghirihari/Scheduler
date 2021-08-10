import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css'
import Now from './Now';
import WeeklyTable from './WeeklyTable';

export default function BasicTable() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/now" /></Route>
        <Route path='/weekly' component={WeeklyTable}/>
        <Route path='/now' component={Now}/>
      </Switch>
    </Router>
  );
  }
