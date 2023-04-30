import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import ClickViewLogo from './clickview-logo';

function getNavLinkClassName({ isActive }: { isActive: boolean }) {
  return `nav-link ${isActive ? 'active' : ''}`;
}

export default function Navigation() {
  return (
    <Navbar bg='light' expand='lg' className='mb-4'>
      <Container>
        <Link to='/' className='navbar-brand me-5' style={{ width: '150px' }}>
          <ClickViewLogo />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/playlists' className={getNavLinkClassName}>
              Playlists
            </NavLink>
            <NavLink to='/videos' className={getNavLinkClassName}>
              Videos
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}