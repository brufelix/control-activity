import { Response, Request } from "express";

import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
  try {
    const { username, projectId } = req.body;

    const user = await ModelUser.findOne(
      { username },
      null, null,
      (err, result) => {
        if (err)
          return;

        return result;
      }
    );

    const project: any = await ModelProject.findOne(
      { _id: projectId },
      null, null,
      (err, result) => {
        if (err)
          return;

        return result;
      }
    );

    const { users } = project;

    if (!(users.includes(username))) {
      if (user && project) {

        const { projects } = user;

        projects.push(projectId);

        await ModelUser.updateOne(
          { username },
          { $set: { projects: projects } },
          null,
          (err, _) => {
            if (err) res.json({ code: 501, message: `error_add_project` });
          }
        );

        users.push(username);

        await ModelProject.updateOne(
          { _id: projectId },
          { $set: { users: users } },
          null,
          (err, _) => {
            if (err) res.json({ code: 501, message: `error_add_user` });
          }
        );

        res.status(200).json({ code: 200, message: `user_added` });

      } else {
        res.json({ code: 501, message: `error_add_user` });
      }
    } else {
      res.json({ code: 501, message: `user_already_exists` });
    }
  } catch (error) {
    console.log(error);
  }
};