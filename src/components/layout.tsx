import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Navigation from './navigation';

export default function Layout() {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
