import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { students, courses, programs } from '../data/portal';

const programDetails = [
  { code: 'BSCS', icon: 'code', color: 'mint', description: 'Turn curiosity into code. Build the foundations of tomorrow’s technology.' },
  { code: 'BSIT', icon: 'globe', color: 'peach', description: 'Connect people and possibilities through practical, real-world technology.' },
  { code: 'BSIS', icon: 'layers', color: 'lavender', description: 'Bring business and technology together to make better things happen.' },
];

export default function Home() {
  return (
    <div className="home-page page-enter">
      <div className="welcome-line"><span><span className="tiny-sun">✳</span> A good day to learn something new.</span><span className="welcome-label">THE STUDENT PORTAL</span></div>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="live-dot" /> CONNECTED BY CURIOSITY</span>
          <h1>Your campus.<br />A world of <span>possibilities.</span></h1>
          <p>The people you meet. The things you learn. The future you build.<br className="desktop-break" /> Find it all in one connected space.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/students">Explore students <Icon name="arrow-right" size={18} /></Link>
            <Link className="button button-secondary" to="/courses">Browse courses <Icon name="book" size={18} /></Link>
          </div>
          <div className="hero-community">
            <div className="avatar-stack" aria-hidden="true">{students.slice(0, 4).map(student => <span key={student.id} className={`mini-avatar avatar-${student.color}`}>{student.initials}</span>)}</div>
            <span>Different paths. <strong>One community.</strong></span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <span className="visual-spark spark-one">✳</span><span className="visual-spark spark-two">✦</span>
          <div className="floating-note"><span className="note-check"><Icon name="check" size={15} /></span> Your next chapter starts here</div>
          <div className="visual-card">
            <div className="visual-card-top"><span className="visual-tag">THE POSSIBILITIES ARE ENDLESS</span><Icon name="arrow-up-right" size={20} /></div>
            <div className="cap-illustration"><Icon name="graduation" size={98} strokeWidth={1.25} /></div>
            <div className="visual-card-bottom"><span>Stay curious.<br /><strong>Go places.</strong></span><span className="visual-number">01—∞</span></div>
          </div>
          <div className="floating-subject"><span><Icon name="book" size={21} /></span><div>Made for your journey<small>A little learning, every day.</small></div><Icon name="sparkles" size={18} /></div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Portal at a glance">
        <Link to="/students" className="stat-card"><span className="stat-icon tone-mint"><Icon name="users" size={23} /></span><div><span className="stat-number">{String(students.length).padStart(2, '0')}</span><span className="stat-label">Students in our community</span></div><Icon name="arrow-up-right" size={20} /></Link>
        <Link to="/courses" className="stat-card"><span className="stat-icon tone-peach"><Icon name="book" size={23} /></span><div><span className="stat-number">{String(courses.length).padStart(2, '0')}</span><span className="stat-label">Courses to spark your curiosity</span></div><Icon name="arrow-up-right" size={20} /></Link>
        <Link to="/about" className="stat-card"><span className="stat-icon tone-lavender"><Icon name="graduation" size={23} /></span><div><span className="stat-number">{String(programs.length).padStart(2, '0')}</span><span className="stat-label">Programs. Endless possibilities.</span></div><Icon name="arrow-up-right" size={20} /></Link>
      </section>

      <section className="programs-section">
        <div className="section-heading"><div><span className="eyebrow">FIND YOUR DIRECTION</span><h2>Big ideas start here.</h2></div><Link className="text-link" to="/courses">Explore all courses <Icon name="arrow-right" size={17} /></Link></div>
        <div className="program-grid">{programs.map((program, index) => {
          const detail = programDetails[index];
          return <Link to={`/courses?department=${encodeURIComponent(program)}`} className="program-card" key={program}><div className="program-card-top"><span className={`program-icon tone-${detail.color}`}><Icon name={detail.icon} size={24} /></span><span className="program-code">{detail.code}</span></div><h3>{program}</h3><p>{detail.description}</p><span className="program-card-bottom">Discover the program <Icon name="arrow-up-right" size={18} /></span></Link>;
        })}</div>
      </section>

      <section className="community-banner"><span className="community-banner-icon"><Icon name="heart" size={28} /></span><div><h2>More than a portal. A place to belong.</h2><p>Get to know the community behind every bright idea.</p></div><Link className="text-link" to="/about">A little about us <Icon name="arrow-right" size={18} /></Link></section>
    </div>
  );
}
