import Icon from './Icon';

export default function StudentCard({ student, onView }) {
  return (
    <article className="student-card card">
      <div className="student-card-top">
        <span className={`avatar avatar-${student.color}`} aria-hidden="true">{student.initials}</span>
        <span className="status-badge"><span aria-hidden="true" />{student.status}</span>
      </div>
      <div className="student-card-body">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-id">Student ID · {student.id}</p>
        <div className="student-meta">
          <p className="meta-item"><Icon name="graduation" size={17} />{student.program}</p>
          <p className="meta-item"><Icon name="calendar" size={17} />Year {student.year} · {student.programCode}</p>
        </div>
      </div>
      <div className="card-footer">
        <button className="text-button" type="button" onClick={() => onView(student)} aria-label={`View profile of ${student.name}`}>View profile<Icon name="arrow-up-right" size={17} /></button>
      </div>
    </article>
  );
}
