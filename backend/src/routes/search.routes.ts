import { Router, Request, Response } from 'express';
import { search } from '../services/secop.service.js';

export const searchRoutes = Router();

searchRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const params = req.body;
    
    // ============================================
    // LOGS DE DEPURACIÓN - Ver qué llega al backend
    // ============================================
    console.log('');
    console.log('🔍 ========== NUEVA BÚSQUEDA ==========');
    console.log('📋 Parámetros recibidos:');
    console.log('  - query:', params.query || '(vacío)');
    console.log('  - modality:', params.modality || '(vacío)');
    console.log('  - phase:', params.phase || '(vacío)');
    console.log('  - status:', params.status || '(vacío)');
    console.log('  - entity_name:', params.entity_name || '(vacío)');
    console.log('  - from_date:', params.from_date || '(vacío)');
    console.log('  - to_date:', params.to_date || '(vacío)');
    console.log('  - min_value:', params.min_value || '(vacío)');
    console.log('  - max_value:', params.max_value || '(vacío)');
    console.log('  - limit:', params.limit || 20);
    console.log('========================================');
    console.log('');
    
    const result = await search(params);
    res.json(result);
  } catch (error: any) {
    console.error('❌ Error en search:', error.message);
    res.status(500).json({ error: error.message });
  }
});