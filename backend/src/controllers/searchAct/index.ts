import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default async (req: Request, res: Response) => {
  const { search } = req.body;
  try {
    ModelGroup.aggregate([
      { $unwind: '$activities' },
      { $match: { "activities.description": new RegExp(search, "i") } },
      { $group: { _id: '$_id', activities: { $push: '$activities' } } }
    ])
      .exec(function (err, result) {
        if (err)
          res.send(err);
        else
          res.status(200).send(result);
      })
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: error
    });
  }
};
