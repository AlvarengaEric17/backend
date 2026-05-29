// api/index.ts
import { Request, Response } from 'express';
import { app } from '../dist/app'; // Ajuste o caminho conforme o seu build

// Aplicando os tipos Request e Response do Express
export default (req: Request, res: Response) => {
  return app(req, res);
};