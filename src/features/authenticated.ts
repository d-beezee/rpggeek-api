import express from "express";

const authenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) return res.sendStatus(401); // No token present

  // @ts-ignore
  res.password = token;
  next();
};

export { authenticated };
