import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  try {
    const newGroup = new ModelGroup({
      title: req.body.title,
      activities: [],
    });

    newGroup.save();
  } catch (error) {
    res.status(404).json({
      code: 404,
      message: error
    });
  }

  res.status(200).json({
    code: 200,
    message: `group created`
  });
};