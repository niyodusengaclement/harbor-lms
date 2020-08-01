import React from 'react';

const GradeRow = ({ submissions, stId, assignments }) => {
  const totalFinder = () => {
    let marks = 0;
    let total = 0;
    const student = submissions.length > 0 ? submissions.filter(({studentId}) => studentId === stId) : [];
    const tot = assignments.length > 0 ? assignments.map(({points}) => total = +total + +points) : [];
    const studentGrades = student.length > 0 ? student.map(sub => {
      const ass =  assignments.length > 0 ?  assignments.find(x => x.id === sub.assignmentId && sub.studentId === stId) : [];
      marks = +marks + +sub.grade;
      return ass;
  }) : [];
  const totalMarks = {
    marks,
    total
  }
  return totalMarks;
  }
  const submissionFilter = (assId) => {
    const data = submissions.filter(({studentId, assignmentId}) => studentId === stId && assignmentId === assId)
    if(data.length > 0) return data;
    return [{grade: ''}]
  }
  return (
    <>
      {
        assignments.length > 0 ? assignments.map(({id}, idx) => 
        <td key={idx}> {submissionFilter(id)[0].grade} </td>
        ) : null
      }
      <td>{totalFinder().marks} / {totalFinder().total}  </td>
      <td>{(totalFinder().marks/totalFinder().total*100).toFixed(2)}%</td>
    </>
  )
}
export default GradeRow;
