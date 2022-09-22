import axios from 'axios';
import { AssignmentSliceInterface } from '../interfaces/Redux/Assignments';
import { convertUnixToDate } from '../utils/date';

export async function getAssignments(
  moodleURL: string,
  token: string,
): Promise<AssignmentSliceInterface[]> {
  const URL = `${moodleURL}/webservice/rest/server.php`;

  const resp = await axios.get(URL, {
    params: {
      moodlewsrestformat: 'json',
      wstoken: token,
      wsfunction: 'mod_assign_get_assignments',
    },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.courses.map((course: any) => {
    course.assignments = course.assignments.map((assignment: any) => {
      assignment.duedate = convertUnixToDate(assignment.duedate);

      return assignment;
    });

    return course;
  });
}
