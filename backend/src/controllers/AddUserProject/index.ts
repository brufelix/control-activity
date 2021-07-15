import { Response, Request } from "express";

import { ModelUser } from "../../model";

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
          if (err)
            return;

          res.status(200).json({ code: 200, message: `user_added` });
        });
    } else {
      res.json({ code: 501, message: `error_add_user` });
    }
  } catch (error) {
    console.log(error);
  }
};