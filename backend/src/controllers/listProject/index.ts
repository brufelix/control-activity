import { Response, Request } from "express";
import { ModelProject, ModelUser } from "../../model";

export default async (req: Request, res: Response) => {

    const { username } = req.body;
    try {
        let user: any = await ModelUser.find({ username }, (err, user) => {
            if (err) {
                res.status(401).send();
            };

            return user;
        });

        console.log(user);

        if (user[0].projects.length) {
            const projects: any = [];

            await user.projects.forEach(async (idProject: string) => {
                await ModelProject.find({ _id: idProject }, (err, result) => {
                    if (err)
                        return

                    projects.push(result);
                })
            })
            res.status(200).send(projects);
        } else {
            res.status(200).send({ message: "there_are_no_linked_projects" })
        }

    } catch (error) {
        throw error;
    }
};
