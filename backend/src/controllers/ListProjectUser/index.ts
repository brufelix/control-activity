import { Response, Request } from "express";
import { ModelProject, ModelUser } from "../../model";

interface IResult { _id: string, username: String };

export default async (req: Request, res: Response) => {
  const { projectId } = req.body;

  try {

    let projects: any = await ModelProject.find(
      { _id: projectId },
      (err, result) => {
        if (err)
          return;

        return result;
      });

    if (projects.length) {
      const { users } = projects[0];
      let projectsArray: IResult[] = [];

      for (let i = 0; i < users.length; i++) {
        await ModelUser.find(
          { username: users[i] },
          (err, result) => {
            if (err) {
              return;
            }

            if (result.length) {
              projectsArray.push({ _id: result[0]._id, username: result[0].username });
            }
          });
      };

      res.status(200).send(projectsArray);
    } else {
      res.status(200).send({ message: "there_are_no_linked_users" })
    }

  } catch (error) {
    console.log(error);
  }
};
