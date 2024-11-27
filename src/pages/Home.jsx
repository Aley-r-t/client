import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

export default function Home() {
  return (
    <div>
      <MainLayout >
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">About</Link>  | <Link to="/dasboard">Dasboard</Link>  | <Link to="/facturas">Facturas</Link>
        </nav>
        <h1>Welcome to the Home Page</h1>

      </MainLayout>
    </div>
  );
}
