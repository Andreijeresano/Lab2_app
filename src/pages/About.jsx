import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const values = [
  { icon: 'users', color: 'mint', title: 'People come first.', description: 'A community is built one connection at a time. Find familiar faces and discover the people learning alongside you.' },
  { icon: 'sparkles', color: 'peach', title: 'Curiosity belongs here.', description: 'From your first line of code to your next big project, every course is an invitation to see what is possible.' },
  { icon: 'globe', color: 'lavender', title: 'Room to grow.', description: 'Three connected programs. Many different paths. Explore the knowledge and skills that fit your ambitions.' },
];

export default function About() {
  return (
    <div className="about-page page-enter">
      <header className="page-header"><span className="eyebrow">A LITTLE ABOUT US</span><h1>A place for every <span className="text-accent">possibility.</span></h1><p>Your campus, a little more connected. A simple home for the people, programs, and ideas that make our community.</p></header>
      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story-visual" aria-hidden="true"><div className="about-emblem"><Icon name="graduation" size={80} strokeWidth={1.25} /></div><span className="about-visual-label">LEARN. CONNECT. GROW.</span><span className="about-orbit about-orbit-one" /><span className="about-orbit about-orbit-two" /></div>
        <div className="about-story-copy"><span className="eyebrow">ONE CAMPUS. MANY STORIES.</span><h2 id="about-story-title">Good things happen<br />when we connect.</h2><p>College is about the people you meet and the ideas you make your own. This student portal brings both a little closer, with an easy way to explore our community and discover what to learn next.</p><p>Browse student profiles, get to know our programs, and find the courses that spark your interest. Your next chapter starts with a little curiosity.</p><Link className="text-link" to="/students">Meet the community <Icon name="arrow-right" size={18} /></Link></div>
      </section>
      <section className="about-section" aria-labelledby="values-title">
        <div className="section-heading"><div><span className="eyebrow">WHAT BRINGS US TOGETHER</span><h2 id="values-title">Built around you.</h2></div></div>
        <div className="values-grid">{values.map(value => <article className="value-card" key={value.title}><span className={`feature-icon tone-${value.color}`}><Icon name={value.icon} size={23} /></span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div>
      </section>
      <section className="demo-notice" aria-labelledby="demo-title"><Icon name="info" size={22} /><div><h2 id="demo-title">A learning project, made with care.</h2><p>This portal is a React laboratory project demonstrating reusable components and page navigation with React Router. All student profiles and course details are fictional sample data. Search and filters run in your browser; there is no account system, database, or course registration.</p></div></section>
      <section className="about-cta" aria-labelledby="about-cta-title"><div><h2 id="about-cta-title">There is more to discover.</h2><p>Start with a new connection or a new idea.</p></div><Link className="button button-primary" to="/courses">Explore courses <Icon name="arrow-up-right" size={18} /></Link></section>
    </div>
  );
}
