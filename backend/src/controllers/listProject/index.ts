import { Response, Request } from "express";
import { IProject } from "../../interface";
import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {

    try {
        let user: any = await ModelUser.find({ username: req.body.username }, (err, user) => {
            if (err)
                res.status(401).send();

            return user;
        });

        const [username] = user;
        const { projects } = username;

        if (projects.length) {
            let projects: IProject[][] = [];

            for (let i = 0; i < projects.length; i++) {
                await ModelProject.find({ _id: projects[i] }, (err, result) => {
                    if (err)
                        return

                    projects.push(result);
                });
            }

            res.status(200).send(projects);
        } else {
            res.status(200).send({ message: "there_are_no_linked_projects" })
        }

    } catch (error) {
        throw error;
    }
};
