import { Response, Request } from "express";
import { ModelProject } from "../../model";

export default async (req: Request, res: Response) => {
  const { username, projectId } = req.body;

  try {
    await ModelProject.updateOne(
      { _id: projectId },
      { $pull: { users: { username } } },
      null,
      (err, _) => {
        if (err) res.send({ code: 501, message: err });

        return;
      }
    );

    res.status(200).json({ code: 200, message: `user_removed_project` });

  } catch (error) {
    console.log(error);
  };
};
