import { Link } from 'react-router-dom';

export default function Facturas() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">About</Link>  | <Link to="/dasboard">Dasboard</Link>  | <Link to="/facturas">Facturas</Link> 
      </nav>
      <h1>Welcome to the Facturas Page</h1>
    </div>
  );
}
