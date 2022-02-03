import { Router, Response, Request } from "express";
const publicRouter = Router();

publicRouter.get("/", (req: Request, res: Response) => {
  res.render("login");
});

export default publicRouter;
