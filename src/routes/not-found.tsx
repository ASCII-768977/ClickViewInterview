import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main>
      <h1>404 Not found</h1>
      <p>You must be lost, <Link to='/'>click here</Link> to go home.</p>
    </main>
  )
}