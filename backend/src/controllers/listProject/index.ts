import { Response, Request } from "express";
import { ModelProject, ModelUser } from "../../model";

interface IResult { _id: string, title: String };

export default async (req: Request, res: Response) => {

    try {
        let user: any = await ModelUser.find({ username: req.body.username }, (err, user) => {
            if (err)
                res.status(501).send();

            return user;
        });

        const [username] = user;
        const { projects } = username;

        if (projects.length) {
            let projectsArray: IResult[] = [];

            for (let i = 0; i < projects.length; i++) {
                await ModelProject.find({ _id: projects[i] }, (err, result) => {
                    if (err)
                        return
                    if (result.length) {
                        projectsArray.push({ _id: result[0]._id, title: result[0].title });
                    } else {
                        console.log(result);
                    }
                });
            }

            res.status(200).send(projectsArray);
        } else {
            res.status(200).send({ message: "there_are_no_linked_projects" })
        }

    } catch (error) {
        throw error;
    }
};
