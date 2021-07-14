import { Response, Request } from "express";

import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
  try {
    const { username, title } = req.body;

    const newProject = new ModelProject({ title, maintainer: username, users: [username] });

    await newProject.save();

    ModelUser.updateOne(
      { username },
      { $push: { projects: newProject._id } },
      null,
      (err, _) => {
        if (err)
          return

        res.status(200).json({ code: 200, idProject: newProject._id, message: `project_created` });
      });

  } catch (error) {
    console.log(error);
  }
};