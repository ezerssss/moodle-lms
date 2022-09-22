import React from 'react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { AssignmentSliceInterface } from '../../interfaces/Redux/Assignments';
import { getAssignments } from '../../services/assignments';
import { selectActivities } from '../../slices/activitiesSlice';
import { selectAuth } from '../../slices/authSlice';
import { FullScreenWrapper } from '../../styles/globalStyles';

function AssignmentsPage() {
  const { moodleBaseURL, token } = useAppSelector(selectAuth);
  const { assign } = useAppSelector(selectActivities);

  const [assignments, setAssignments] = useState<AssignmentSliceInterface[]>(
    [],
  );

  function isAssignmentInRedux(cmid: number) {
    return assign.some((activity) => activity.cmid === cmid);
  }

  useEffect(() => {
    async function asyncGetAssignments() {
      const data = await getAssignments(moodleBaseURL, token);
      setAssignments(
        data.map((course) => {
          course.assignments = course.assignments.filter((assignment) =>
            isAssignmentInRedux(assignment.cmid),
          );

          return course;
        }),
      );
    }

    asyncGetAssignments();
  }, []);

  const renderAssignments = assignments.map((course) => (
    <React.Fragment key={course.shortname}>
      <p>{course.shortname}</p>
      <div className="ml-5">
        {course.assignments.map((assignment) => (
          <p key={assignment.name}>
            {assignment.name} - {assignment.duedate}
          </p>
        ))}
      </div>
    </React.Fragment>
  ));

  return (
    <FullScreenWrapper centerItems flex>
      <div className="w-[90%] max-w-[500px] min-h-[400px] md:max-h-[600px] md:overflow-auto rounded-xl border-[2px] border-gray-200 bg-slate-100 p-4 drop-shadow-md">
        <p className="text-xl font-bold">Assignments</p>
        <div className="h-8 w-full" />
        <div className="grid grid-cols-1 gap-4">{renderAssignments}</div>
      </div>
    </FullScreenWrapper>
  );
}

export default AssignmentsPage;
