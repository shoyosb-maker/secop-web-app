import { Router, Request, Response } from 'express';
import { aggregate } from '../services/secop.service.js';

export const aggregateRoutes = Router();

aggregateRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const { entity_nit, from_date, to_date } = req.body;
    
    if (!entity_nit) {
      res.status(400).json({ error: 'entity_nit es requerido' });
      return;
    }
    
    const result = await aggregate(entity_nit, from_date, to_date);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});