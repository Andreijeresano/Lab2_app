import { NavLink, Link } from 'react-router-dom';
import Icon from './Icon';

const links = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/students', label: 'Students', icon: 'users' },
  { to: '/courses', label: 'Courses', icon: 'book' },
  { to: '/about', label: 'About', icon: 'info' },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="navbar">
        <Link to="/" className="brand" aria-label="Campus home">
          <span className="brand-mark"><Icon name="graduation" size={26} /></span>
          <span>campus<span className="brand-dot">.</span></span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon name={icon} size={17} /> {label}
            </NavLink>
          ))}
        </nav>
        <span className="nav-label"><span className="live-dot" />Your learning community</span>
      </div>
    </header>
  );
}
