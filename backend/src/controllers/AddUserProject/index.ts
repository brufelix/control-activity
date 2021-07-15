import { Response, Request } from "express";

import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
  try {
    const { username, projectId } = req.body;

    const user = await ModelUser.find({ username }, (err, result) => {
      if (err)
        return;

      return result;
    });

    if (user.length) {
      await ModelUser.updateOne(
        { username },
        { $push: { projects: projectId } },
        null,
        (err, _) => {
          if (err) res.json({ code: 501, message: `error_add_project` });
        });

      await ModelProject.updateOne(
        { _id: projectId },
        { $push: { users: username } },
        null,
        (err, _) => {
          if (err) res.json({ code: 501, message: `error_add_user` });
        });

      res.status(200).json({ code: 200, message: `user_added` });

    } else {
      res.json({ code: 501, message: `error_add_user` });
    }
  } catch (error) {
    console.log(error);
  }
};