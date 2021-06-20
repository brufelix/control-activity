import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { _id } = req.body;
  try {
    ModelGroup.deleteOne(
      { _id },
      (err) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        };

        res.status(200).json({
          message: `group deleted`
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      error: error
    });
  };
};
