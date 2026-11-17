import Icon from './Icon';

const departmentIcons = { 'Computer Science': 'code', 'Information Technology': 'globe', 'Information Systems': 'layers' };

export default function CourseCard({ course, onView }) {
  return (
    <article className="course-card card">
      <div className="course-card-top"><span className={`course-icon tone-${course.color}`}><Icon name={departmentIcons[course.department] || 'book'} size={24} /></span><span className="course-code">{course.id}</span></div>
      <div className="course-card-body">
        <p className="course-department">{course.department}</p>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        <div className="course-meta"><span className="meta-item"><Icon name="book" size={16} />{course.credits} credits</span><span className="meta-item"><Icon name="clock" size={16} />{course.schedule}</span></div>
      </div>
      <div className="card-footer"><button className="text-button" type="button" onClick={() => onView(course)} aria-label={`View details for ${course.title}`}>Course details<Icon name="arrow-up-right" size={17} /></button></div>
    </article>
  );
}
