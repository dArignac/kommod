import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
