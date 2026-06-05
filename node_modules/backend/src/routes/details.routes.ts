import { Router, Request, Response } from 'express';
import { getDetails } from '../services/secop.service.js';

export const detailsRoutes = Router();

detailsRoutes.get('/:processId', async (req: Request, res: Response) => {
  try {
    const processId = req.params.processId as string;
    
    if (!processId) {
      res.status(400).json({ error: 'processId es requerido' });
      return;
    }
    
    const result = await getDetails(processId);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});