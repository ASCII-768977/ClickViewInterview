import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

function renderApp() {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe('App component', () => {

  it('renders NotFound for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    const notFoundText = screen.getByText('404 Not found');
    expect(notFoundText).toBeInTheDocument();
  });

});
