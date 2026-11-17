import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import DetailDialog from '../components/DetailDialog';
import Icon from '../components/Icon';
import { courses, programs } from '../data/portal';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const requestedDepartment = searchParams.get('department') || '';
  const department = programs.includes(requestedDepartment) ? requestedDepartment : '';
  const [selectedCourse, setSelectedCourse] = useState(null);
  const updateFilter = (key, value) => {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace: key === 'q' });
  };
  const resetFilters = () => setSearchParams({});
  const filteredCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    return courses.filter(course => (!search || [course.id, course.title, course.instructor].some(value => value.toLowerCase().includes(search))) && (!department || course.department === department));
  }, [query, department]);
  const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
  const hasFilters = Boolean(query || department);

  return (
    <div className="directory-page page-enter">
      <header className="page-header"><span className="eyebrow">THE COURSE CATALOG</span><h1>Find your next <span className="text-accent">big idea.</span></h1><p>Follow your curiosity. Explore courses that build your skills, challenge your thinking, and open new doors.</p></header>
      <section aria-label="Course catalog">
        <div className="filter-bar">
          <div className="search-field"><Icon name="search" size={20} /><label className="sr-only" htmlFor="course-search">Search by course name, code, or instructor</label><input id="course-search" type="search" value={query} onChange={event => updateFilter('q', event.target.value)} placeholder="Search courses, codes, or instructors..." /></div>
          <div className="select-field"><label className="sr-only" htmlFor="course-department">Filter by department</label><select id="course-department" value={department} onChange={event => updateFilter('department', event.target.value)}><option value="">All departments</option>{programs.map(item => <option key={item} value={item}>{item}</option>)}</select><Icon name="chevron-down" size={16} /></div>
        </div>
        <div className="results-summary"><p role="status"><strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}{hasFilters ? ' found' : ' to explore'} <span className="results-divider">/</span> {totalCredits} credits</p>{hasFilters && <button className="reset-button" type="button" onClick={resetFilters}>Reset filters</button>}</div>
        {filteredCourses.length > 0 ? <div className="card-grid">{filteredCourses.map(course => <CourseCard key={course.id} course={course} onView={setSelectedCourse} />)}</div> : <div className="empty-state"><Icon name="book" size={32} /><h2>No courses found</h2><p>Try a different keyword or explore all departments.</p><button className="button button-primary" type="button" onClick={resetFilters}>Clear all filters</button></div>}
      </section>
      <p className="sample-note"><Icon name="info" size={14} />A sample catalog for discovering what’s possible.</p>
      {selectedCourse && <DetailDialog title={selectedCourse.title} eyebrow={`${selectedCourse.id} · ${selectedCourse.department}`} onClose={() => setSelectedCourse(null)}>
        <p>{selectedCourse.description}</p>
        <dl className="detail-list"><div><dt>Instructor</dt><dd>{selectedCourse.instructor}</dd></div><div><dt>Credits</dt><dd>{selectedCourse.credits} academic credits</dd></div><div><dt>Schedule</dt><dd>{selectedCourse.schedule}</dd></div><div><dt>Classroom</dt><dd>{selectedCourse.room}</dd></div></dl>
        <h3>What you will explore</h3><ul className="topic-list">{selectedCourse.topics.map(topic => <li key={topic}><Icon name="check" size={17} /><span>{topic}</span></li>)}</ul>
        <p className="detail-note"><Icon name="info" size={16} />This is a sample catalog. Course registration is not available in this demo.</p>
      </DetailDialog>}
    </div>
  );
}
