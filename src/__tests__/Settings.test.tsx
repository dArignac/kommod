import '@testing-library/jest-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../renderer/Settings';
import mockWindow from '../mocks/mocks';

describe('Settings', () => {
  beforeAll(() => {
    mockWindow();
  });

  it('should save API token', async () => {
    const { rerender } = render(<Settings />);

    const input = screen.getByTestId('token') as HTMLInputElement;
    const submit = screen.getByTestId('submit') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'sample-token' } });

    await waitFor(() => fireEvent.click(submit));

    rerender(<Settings />);
    expect((screen.getByTestId('token') as HTMLInputElement).value).toBe(
      'sample-token'
    );
  });
});
