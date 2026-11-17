import { useMemo, useState } from 'react';
import StudentCard from '../components/StudentCard';
import DetailDialog from '../components/DetailDialog';
import Icon from '../components/Icon';
import { students, courses, programs } from '../data/portal';

export default function Students() {
  const [query, setQuery] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const filteredStudents = useMemo(() => {
    const search = query.trim().toLowerCase();
    return students.filter(student =>
      (!search || [student.name, student.id, student.email].some(value => value.toLowerCase().includes(search))) &&
      (!program || student.program === program) && (!year || String(student.year) === year));
  }, [query, program, year]);
  const hasFilters = Boolean(query || program || year);
  const resetFilters = () => { setQuery(''); setProgram(''); setYear(''); };

  return (
    <div className="directory-page page-enter">
      <header className="page-header"><span className="eyebrow">OUR COMMUNITY</span><h1>Meet the student <span className="text-accent">community.</span></h1><p>Different perspectives. Shared ambitions. Get to know the people making their next chapter happen.</p></header>
      <section aria-label="Student directory">
        <div className="filter-bar">
          <div className="search-field"><Icon name="search" size={20} /><label className="sr-only" htmlFor="student-search">Search students by name, ID, or email</label><input id="student-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search students by name, ID, or email..." /></div>
          <div className="select-field"><label className="sr-only" htmlFor="student-program">Filter by program</label><select id="student-program" value={program} onChange={event => setProgram(event.target.value)}><option value="">All programs</option>{programs.map(item => <option key={item} value={item}>{item}</option>)}</select><Icon name="chevron-down" size={16} /></div>
          <div className="select-field"><label className="sr-only" htmlFor="student-year">Filter by year level</label><select id="student-year" value={year} onChange={event => setYear(event.target.value)}><option value="">All year levels</option>{[1, 2, 3, 4].map(item => <option key={item} value={item}>Year {item}</option>)}</select><Icon name="chevron-down" size={16} /></div>
        </div>
        <div className="results-summary"><p role="status"><strong>{filteredStudents.length}</strong> {filteredStudents.length === 1 ? 'student' : 'students'}{hasFilters ? ' found' : ' in our community'}</p>{hasFilters && <button className="reset-button" type="button" onClick={resetFilters}>Reset filters</button>}</div>
        {filteredStudents.length > 0 ? <div className="card-grid">{filteredStudents.map(student => <StudentCard key={student.id} student={student} onView={setSelectedStudent} />)}</div> : <div className="empty-state"><Icon name="search" size={32} /><h2>No students found</h2><p>Try another name or choose a different program or year.</p><button className="button button-primary" type="button" onClick={resetFilters}>Clear all filters</button></div>}
      </section>
      <p className="sample-note"><Icon name="info" size={14} />Meet our sample community. All student records are fictional.</p>
      {selectedStudent && <DetailDialog title={selectedStudent.name} eyebrow="STUDENT PROFILE" onClose={() => setSelectedStudent(null)}>
        <p>{selectedStudent.bio}</p>
        <dl className="detail-list"><div><dt>Student ID</dt><dd>{selectedStudent.id}</dd></div><div><dt>Program</dt><dd>{selectedStudent.program}</dd></div><div><dt>Year level</dt><dd>Year {selectedStudent.year}</dd></div><div><dt>Status</dt><dd>{selectedStudent.status}</dd></div></dl>
        <p className="detail-contact"><Icon name="mail" size={18} />{selectedStudent.email}</p>
        <h3>Current courses</h3>
        <ul className="detail-courses">{courses.filter(course => selectedStudent.courseIds.includes(course.id)).map(course => <li key={course.id}><span className="course-code">{course.id}</span><span>{course.title}</span><span className="course-credits">{course.credits} credits</span></li>)}</ul>
      </DetailDialog>}
    </div>
  );
}
