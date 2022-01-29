import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        getToken(name: string): string;
        setToken(name: string, value: string): void;
        once(channel: string, func: (arg: string) => void): void;
      };
    };
  }
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
