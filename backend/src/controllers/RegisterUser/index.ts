import { Response, Request } from "express";
import bcrypt from "bcrypt";

import { ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
    const { username, password: pass } = req.body;
    const salt = bcrypt.genSaltSync()
    const password = bcrypt.hashSync(pass, salt)

    try {
        await ModelUser.find({ username: username }, (err, result) => {
            if (err) {
                res.status(501).send({ message: "erro on query" });
            };

            if (result.length) {
                res.send({ message: "user_already_exists" });
            } else {
                const newUser = new ModelUser({
                    username, password,
                });

                newUser.save();
                res.status(200).send({ created: true, message: "Usuário criado com sucesso." });
            }
        }).catch(error => { throw error });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error
        });
    };
};