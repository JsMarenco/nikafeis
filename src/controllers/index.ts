import { Request, Response } from "express"

export const welcome = (req: Request, res: Response) => {
  res.send("Welcome to the backend!")
}