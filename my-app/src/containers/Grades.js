import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import { getAssignments, getSubmissionsBySection, getSubmissions } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner, Form } from "react-bootstrap";
import { getCourses, getCourseSections } from "../redux/actions/coursesActions";
import TableLayout from "../components/TableLayout";
import GradeRow from "../components/GradeRow";
import _ from 'lodash'

const Grades = (props) => {
  const [filtered, setFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState(null)
  
  const { assignments, courses, match: { params }  } = props;
  const user = JSON.parse(localStorage.getItem('rems_user_profile'));

  useEffect(() => {
    const { match: { params }  } = props;
    props.fetchAssignments(params.courseId);
    props.fetchCourses();
    setIsLoading(true)
    props.getCourseSections(params.courseId, setIsLoading);
  }, []);

  useEffect(() => {
    props.getSubmissionsBySection(section)
  }, [section]);

  const allAssignments = assignments.values.filter(({isPublished, isGradable}) => isPublished === true && isGradable === true);

  useEffect(() => {
    setFilter(allAssignments);
  }, [assignments.values]);

  const course = courses.values.length > 0 ? courses.values.filter(({id}) => id === params.courseId) : [];
  const title = !course[0] ? '' : `${course[0].name} > Grades`;

  localStorage.setItem('courseId', params.courseId);
  if (course.length > 0) localStorage.setItem('courseName', course[0].name);

  const loading  = assignments.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={assignments.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : "No Data found";

  const headers = user.role === 'instructor' && filtered.length > 0 ? filtered.map(({assignmentName}) => {
    return assignmentName
  }) : [];

  const studentIds= assignments.submissions.map(({studentId}) => {
    return studentId;
  });


  const result = [];
  _.forEach(studentIds, (val) => {
      if(result.indexOf(val) < 0) {
          result.push(val);
      }
  });

  const submissionFilter = (stId) => {
    return assignments.submissions.filter(({studentId}) => studentId === stId)
  }
  const y = courses.sections.length > 0 && section === null ? setSection(_.last(courses.sections).sectionId) : null;
  const changeSection = (val) => setSection(val);

  return (
    <SpecificCourse page={title} submenu="Grades" >

      <div className="col-md-10">
      <h4 className="page-title pb-3">Grades</h4>
     <div className="pl-2">
      <Form.Group>
        <Form.Control as="select" value={section} onChange={e => changeSection(e.target.value)}>
          <option disabled>Select a Section</option>
          {
            courses.sections.length > 0 ? courses.sections.map(({sectionId, sectionName}) =>
            <option key={sectionId} value={sectionId}> {sectionName}</option>
            )
            : null
          }
        </Form.Control>
      </Form.Group>
     </div>
      <div className={user.role === 'student' ? 'carded-table-scroll' : 'carded-table-scroll large-table' }> 
    {/* Table  Start*/}
      <TableLayout headers={['Name', ...headers, 'Current Marks', 'Percentage']}>      
          {
            result.length > 0
            ? result.map((id) => 
              <tr key={id}>
                <td>{submissionFilter(id)[0].fullName}</td>
                <GradeRow stId={id} assignments={filtered} submissions={assignments.submissions} />

              </tr>
            )
          :
          loading
          }
          </TableLayout>
      {/* Table End */}

        </div>
        </div>
    </SpecificCourse>
  );
}

const mapStateToProps = ({ assignments, courses, firebase }) => ({
  courses,
  assignments,
  userProfile: firebase.profile,
});

export default connect(mapStateToProps, {
  fetchAssignments: getAssignments,
  fetchCourses: getCourses,
  fetchSubmissions: getSubmissions,
  getSubmissionsBySection: getSubmissionsBySection,
  getCourseSections: getCourseSections,
})(Grades);