import React, { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './page/SearchPage';
import DetailsPage from './page/DetailsPage';

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path='/settings'>
          <SettingPage />
        </Route> */}
        <Route path='/details/:owner/:repo'>
          <DetailsPage />
        </Route>
        <Route path='/'>
          <SearchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
