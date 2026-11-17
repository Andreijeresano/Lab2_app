import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Icon from './components/Icon';
import Home from './pages/Home';
import Students from './pages/Students';
import Courses from './pages/Courses';
import About from './pages/About';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles = { '/': 'Home', '/students': 'Students', '/courses': 'Courses', '/about': 'About' };
    document.title = `${titles[pathname] || 'Page not found'} | Campus`;
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={
            <section className="not-found">
              <span className="eyebrow">A LITTLE OFF CAMPUS</span>
              <h1>This page took a study break.</h1>
              <p>We couldn’t find that page. Let’s get you back to familiar ground.</p>
              <Link className="button button-primary" to="/">Back to home <Icon name="arrow-right" size={18} /></Link>
            </section>
          } />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <Link to="/" className="footer-brand"><Icon name="graduation" size={21} /> campus<span>.</span></Link>
          <p>A little connection. A world of possibilities.</p>
          <span className="footer-note">Student information portal <span>·</span> Demo</span>
        </div>
      </footer>
    </>
  );
}
