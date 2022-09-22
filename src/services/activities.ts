import axios from 'axios';
import { ActivityInterface } from '../interfaces/Redux/Activites';

export async function getActivitiesByCourse(
  moodleURL: string,
  token: string,
  courseID: number,
  userID: number,
): Promise<ActivityInterface[]> {
  const URL = `${moodleURL}/webservice/rest/server.php`;

  const resp = await axios.get(URL, {
    params: {
      moodlewsrestformat: 'json',
      wstoken: token,
      wsfunction: 'core_completion_get_activities_completion_status',
      courseid: courseID,
      userid: userID,
    },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.statuses.filter(
    (activity: ActivityInterface) => activity.state !== 1,
  );
}
