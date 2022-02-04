import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import mockWindow from '../mocks/mocks';
import App from '../renderer/App';

describe('App', () => {
  beforeAll(() => {
    mockWindow();
  });

  it('should render home page', () => {
    const result = render(
      <Router>
        <App />
      </Router>
    );
    expect(result).toBeTruthy();
    expect(screen.getByText(/Welcome to el-toggl/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please ensure your toggle API key is set in the/i)
    ).toBeInTheDocument();
  });

  it('should render settings page', () => {
    const result = render(
      <Router initialEntries={['/settings']}>
        <App />
      </Router>
    );
    expect(result).toBeTruthy();
    expect(screen.getByText(/API Token/)).toBeInTheDocument();
  });
});
