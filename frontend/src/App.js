import React  from 'react';
import { useRoutes } from 'react-router-dom';
import Routes
 from './routes';
function App() {
  let element = useRoutes(Routes);
  return <div className="site-wrap">{element}</div>;
}

export default App;



