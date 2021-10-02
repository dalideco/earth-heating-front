import React from 'react';
import Form from './pages/Form';
import { Route, Switch } from 'react-router';
import HomePage from './pages/HomePage';

const routes = [
  { path:"/home", Component:HomePage, name:"home" },
  { path:"/", Component:Form, name:'form'}
]

function App() {
  return (
    <div className="App">
      <Switch>
      {
        routes.map(({path,Component})=>(
          <Route path={path}>
            <Component/>
          </Route>
        ))
      }
      </Switch>
    </div>
  );
}

export default App;
