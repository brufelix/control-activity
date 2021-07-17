import { Response, Request } from "express";
import { ModelProject, ModelUser } from "../../model";

interface IResult { _id: string, username: String };

export default async (req: Request, res: Response) => {
  const { projectId } = req.body;

  try {

    let projects: any = await ModelProject.findOne(
      { _id: projectId },
      null, null,
      (err, result) => {
        if (err)
          return;

        return result;
      });

    if (projects) {
      const { users } = projects;
      let projectsArray: IResult[] = [];

      for (let i = 0; i < users.length; i++) {
        await ModelUser.findOne(
          { username: users[i] },
          null, null, (err, result) => {
            if (err)
              return;

            projectsArray.push({ _id: result._id, username: result.username });
          });
      };

      res.status(200).send(projectsArray);
    } else {
      res.send({ code: 501, message: "there_are_no_linked_users" })
    }

  } catch (error) {
    console.log(error);
  }
};
