// ============================================
// Google Sheets Service para SECOP - Actividad Reciente
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbz_CFAsrWhVGIRbBW4OOhwL9pHmFaQ2ZxRDlPEWgnTKi8iKIJGrnGG-ZBPxHlZzckqixg/exec';

export interface RecentActivity {
  timestamp: string;
  process_id: string;
  entity: string;
  title: string;
  modality: string;
  base_value: number;
  status: string;
  user_session: string;
}

// Guardar actividad en Google Sheets
export const saveActivity = async (activity: RecentActivity): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Guardar también en localStorage como respaldo
      saveToLocalBackup(activity);
      return { success: true, message: 'Actividad guardada en Google Sheets' };
    } else {
      throw new Error(result.error || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    // Fallback a localStorage
    saveToLocalBackup(activity);
    return { success: false, message: 'Guardado localmente (sin conexión a Google Sheets)' };
  }
};

// Respaldo local
const saveToLocalBackup = (activity: RecentActivity) => {
  const saved = localStorage.getItem('secop_recent_activity_backup');
  let backup = saved ? JSON.parse(saved) : [];
  // Evitar duplicados por ID
  backup = backup.filter((a: RecentActivity) => a.process_id !== activity.process_id);
  backup = [activity, ...backup].slice(0, 50);
  localStorage.setItem('secop_recent_activity_backup', JSON.stringify(backup));
};

// Obtener actividad reciente desde Google Sheets
export const getRecentActivity = async (): Promise<RecentActivity[]> => {
  try {
    const response = await fetch(`${API_URL}?t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback a respaldo local
    return getLocalBackup();
  } catch (error) {
    console.error('Error getting recent activity:', error);
    return getLocalBackup();
  }
};

// Obtener respaldo local
const getLocalBackup = (): RecentActivity[] => {
  const saved = localStorage.getItem('secop_recent_activity_backup');
  return saved ? JSON.parse(saved) : [];
};

// Sincronizar respaldo local con Google Sheets
export const syncLocalBackup = async (): Promise<void> => {
  const backup = getLocalBackup();
  if (backup.length === 0) return;
  
  console.log(`Sincronizando ${backup.length} actividades pendientes...`);
  
  for (const activity of backup) {
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });
    } catch (error) {
      console.error('Error syncing activity:', error);
    }
  }
  
  // Limpiar backup después de sincronizar
  localStorage.removeItem('secop_recent_activity_backup');
  console.log('Sincronización completada');
};