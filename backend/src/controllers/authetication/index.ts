import { Response, Request } from "express";
import bcrypt from "bcrypt";

import { ModelUser } from "../../model";

export default async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {

        let [user] = await ModelUser.find({ username: username }, (err, user) => {
            if (err) { return };

            return user;
        });

        if (user) {
            const valid: boolean = bcrypt.compareSync(password, user.password)
            if (valid) {
                res.status(200).send({ valid, username: user.username })
            }
        } else {
            res.status(200).send({ valid: false, message: "not_autorized" });
        }

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error
        });
    };
};