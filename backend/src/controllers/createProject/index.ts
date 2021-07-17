import { Response, Request } from "express";

import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
  try {
    const { username, title } = req.body;

    const newProject = new ModelProject({ title, maintainer: username, users: [username] });

    await newProject.save();

    const user = await ModelUser.findOne(
      { username: username },
      null, null,
      (err, user) => {
        if (err)
          res.send({ code: 501, message: "error_getting_user_in_project_create" });

        return user;
      }
    );

    if (user) {
      const { projects } = user;

      projects.push(newProject._id);

      ModelUser.updateOne(
        { username },
        { $set: { projects: projects } },
        null,
        (err, _) => {
          if (err)
            return

          res.status(200).json({ code: 200, projectId: newProject._id, message: `project_created` });
        }
      );
    } else {
      res.json({ code: 501, message: "error_create_project" })
    }
  } catch (error) {
    console.log(error);
  }
};