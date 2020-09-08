import { Request, Response, NextFunction } from "express";

function authenticationRequired(req: Request, res: Response, next: NextFunction) {
 if( req.isAuthenticated()) { return next(); }
 return res.status(401).send();
}

export default authenticationRequired;