import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { mainId, groupId } = req.body;
  try {
    ModelGroup.updateOne(
      { _id: groupId },
      { $pull: { activities: { mainId } } },
      null,
      (err, _) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        };

        res.status(200).json({
          code: 200,
          message: `activity deleted`
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      error: error
    });
  };
};
