import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <article>
      <h2>Welcome to el-toggl!</h2>
      Please ensure your toggle API key is set in the{' '}
      <Link to="/settings">settings</Link>.
    </article>
  );
};

export default Home;
