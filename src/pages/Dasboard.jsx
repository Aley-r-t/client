import { Link } from 'react-router-dom';

export default function Dasboard() {
  return (
    <div>
      <nav>
      <Link to="/">Home</Link> | <Link to="/login">About</Link>  | <Link to="/dasboard">Dasboard</Link>  | <Link to="/facturas">Facturas</Link>
      </nav>
      <h1>Welcome to the Dashboard Page</h1>
    </div>
  );
}
