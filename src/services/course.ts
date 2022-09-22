import axios from 'axios';
import { CourseSliceInterface } from '../interfaces/Redux/Courses';

export async function getCourses(
  moodleURL: string,
  token: string,
  userID: number,
): Promise<CourseSliceInterface[]> {
  const URL = `${moodleURL}/webservice/rest/server.php`;

  const resp = await axios.get(URL, {
    params: {
      moodlewsrestformat: 'json',
      wstoken: token,
      wsfunction: 'core_enrol_get_users_courses',
      userid: userID,
    },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.map((course: any) => {
    const { id, shortname, displayname } = course;

    return { id, shortname, displayname };
  });
}
