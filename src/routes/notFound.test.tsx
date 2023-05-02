import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './not-found';


// Given NotFound component
function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
}

describe('When NotFound component', () => {
  it('Then renders 404 Not found', () => {
    renderNotFound();
    const notFoundText = screen.getByText('404 Not found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Then renders "You must be lost" message', () => {
    renderNotFound();
    const messageText = screen.getByText(/You must be lost,/i);
    expect(messageText).toBeInTheDocument();
  });

  it('Then renders a link to the home page', () => {
    renderNotFound();
    const homeLink = screen.getByRole('link', { name: /click here/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
