import { Response, Request } from "express";
import { ModelProject } from "../../model";

export default async (req: Request, res: Response) => {
  const { username, projectId } = req.body;

  try {
    let project: any = await ModelProject.findOne(
      { _id: projectId },
      null, null,
      (err, result) => {
        if (err)
          return;

        return result;
      }
    );

    const { users, maintainer } = project;

    if (maintainer !== username) {
      if (project) {
        const remainingUsers = users
          .filter((name: string) => name !== username)
          .map((user: string) => user);

        await ModelProject.updateOne(
          { _id: projectId },
          { $set: { users: remainingUsers } },
          null,
          (err, _) => {
            if (err) res.send({ code: 501, message: err });

            return;
          }
        );
        res.status(200).json({ code: 200, message: `user_removed_project` });
      }
    } else {
      res.json({ code: 403, message: `cannot_remove_maintainer` });
    }
  } catch (error) {
    console.log(error);
  };
};
