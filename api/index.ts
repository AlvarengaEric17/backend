// api/index.ts
import { app } from '../src/app'; 

// A Vercel espera que a exportação padrão seja uma função (req, res) => void
// O Express (app) já possui essa assinatura, então basta exportá-lo como default
export default app;