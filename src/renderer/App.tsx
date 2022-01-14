import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

const Home = () => {
  return (
    <main className="container">
      <article>el-toggl</article>
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
