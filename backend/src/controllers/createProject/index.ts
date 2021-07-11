import { Response, Request } from "express";

import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
    try {
        const { username, title } = req.body;

        const newProject = new ModelProject({ title, maintainer: username, users: [] });

        await newProject.save();

        ModelUser.updateOne(
            { username },
            { $push: { projects: newProject } },
            null,
            (err, _) => {
                if (err)
                    res.status(501).send({ error: err });

                return;
            }
        );

        res.status(200).json({ code: 200, idProject: newProject._id, message: `project_created` });

    } catch (error) {
        console.log(error);
    }
};