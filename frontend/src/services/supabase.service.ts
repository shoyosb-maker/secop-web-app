import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tipos
export interface Process {
  process_id: string;
  reference: string;
  entity: string;
  title: string;
  description?: string;
  modality?: string;
  phase?: string;
  status?: string;
  base_value: number;
  publication_date?: string;
  deadline?: string;
  url?: string;
  unspsc_code?: string;
}

export interface RecentActivity {
  user_session: string;
  process_id: string;
  entity: string;
  title: string;
  modality: string;
  base_value: number;
  status: string;
  viewed_at?: string;
}

export interface Alert {
  user_session: string;
  name: string;
  query: string;
  filters: any;
  last_count?: number;
  last_check?: string;
}

// ============================================
// PROCESOS
// ============================================

// Guardar proceso en Supabase
export const saveProcess = async (process: Process) => {
  const { data, error } = await supabase
    .from('procesos')
    .upsert(process, { onConflict: 'process_id' })
    .select();
  
  if (error) console.error('Error saving process:', error);
  return { data, error };
};

// Buscar procesos
export const searchProcesses = async (query: string, limit: number = 50) => {
  const { data, error } = await supabase
    .from('procesos')
    .select('*')
    .ilike('title', `%${query}%`)
    .limit(limit);
  
  return { data, error };
};

// ============================================
// ACTIVIDAD RECIENTE
// ============================================

// Guardar actividad reciente
export const saveRecentActivity = async (activity: RecentActivity) => {
  const { data, error } = await supabase
    .from('recent_activity')
    .insert(activity);
  
  return { data, error };
};

// Obtener actividad reciente
export const getRecentActivity = async (userSession: string) => {
  const { data, error } = await supabase
    .from('recent_activity')
    .select('*')
    .eq('user_session', userSession)
    .order('viewed_at', { ascending: false })
    .limit(10);
  
  return { data, error };
};

// ============================================
// ALERTAS
// ============================================

// Guardar alerta
export const saveAlert = async (alert: Alert) => {
  const { data, error } = await supabase
    .from('alerts')
    .insert(alert)
    .select();
  
  return { data, error };
};

// Obtener alertas del usuario
export const getUserAlerts = async (userSession: string) => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_session', userSession);
  
  return { data, error };
};

// Eliminar alerta
export const deleteAlert = async (id: number, userSession: string) => {
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', id)
    .eq('user_session', userSession);
  
  return { error };
};

// Actualizar contador de alerta
export const updateAlertCount = async (id: number, count: number) => {
  const { error } = await supabase
    .from('alerts')
    .update({ last_count: count, last_check: new Date().toISOString() })
    .eq('id', id);
  
  return { error };
};

// ============================================
// PROCESOS GUARDADOS (FAVORITOS)
// ============================================

// Guardar proceso como favorito
export const saveSavedProcess = async (userSession: string, processId: string) => {
  const { data, error } = await supabase
    .from('saved_processes')
    .insert({ user_session: userSession, process_id: processId });
  
  return { data, error };
};

// Eliminar proceso favorito
export const removeSavedProcess = async (userSession: string, processId: string) => {
  const { error } = await supabase
    .from('saved_processes')
    .delete()
    .eq('user_session', userSession)
    .eq('process_id', processId);
  
  return { error };
};

// Obtener procesos favoritos del usuario
export const getSavedProcesses = async (userSession: string) => {
  const { data, error } = await supabase
    .from('saved_processes')
    .select('process_id')
    .eq('user_session', userSession);
  
  return { data, error };
};

// ============================================
// FUNCIÓN PARA OBTENER SESSION ID
// ============================================

export const getSessionId = () => {
  let sessionId = localStorage.getItem('secop_session_id');
  if (!sessionId) {
    sessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    localStorage.setItem('secop_session_id', sessionId);
  }
  return sessionId;
};