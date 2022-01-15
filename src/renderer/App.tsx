import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './Home';
import Navigation from './Navigation';
import Settings from './Settings';

export default function App() {
  return (
    <Router>
      <main className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </Router>
  );
}
