import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer__inner">
          <strong>eShop</strong>
          <p>Curated goods for everyday living.</p>
        </div>
      </footer>
    </div>
  );
}
