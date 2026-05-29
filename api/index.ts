// api/index.ts
import { Request, Response } from 'express';
import { app } from '../src/app'; // Importando do código fonte original

export default (req: Request, res: Response) => {
  return app(req, res);
};