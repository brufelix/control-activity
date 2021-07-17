import { Response, Request } from "express";
import { ModelProject, ModelUser } from "../../model";

interface IResult { _id: string, title: String };

export default async (req: Request, res: Response) => {

    try {
        let user: any = await ModelUser.find(
            { username: req.body.username },
            (err, user) => {
                if (err)
                    res.send({ code: 501, message: "error_getting_user_in_project_list" });

                return user;
            });

        const [username] = user;
        const { projects } = username;

        if (projects.length) {
            let projectsArray: IResult[] = [];

            for (let i = 0; i < projects.length; i++) {
                await ModelProject.findOne({ _id: projects[i] }, null, null, (err, result) => {
                    if (err)
                        return;
                    projectsArray.push({ _id: result._id, title: result.title });
                });
            }
            res.status(200).send(projectsArray);
        } else {
            res.status(200).send({ code: 200, message: "there_are_no_linked_projects" })
        }

    } catch (error) {
        throw error;
    }
};
