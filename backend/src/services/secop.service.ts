import { SocrataClient, searchProcesses, getProcessDetails, aggregateByEntity, validateConfig } from '@secop/shared';
import type { SearchParams } from '@secop/shared';

let client: SocrataClient | null = null;

function getClient(): SocrataClient {
  if (!client) {
    const config = validateConfig({
      SOCRATA_APP_TOKEN: process.env.SOCRATA_APP_TOKEN || '',
      SOCRATA_BASE_URL: process.env.SOCRATA_BASE_URL || 'https://www.datos.gov.co',
      SOCRATA_DATASET_ID: process.env.SOCRATA_DATASET_ID || 'p6dx-8zbt',
      REQUEST_TIMEOUT_MS: Number(process.env.REQUEST_TIMEOUT_MS) || 30000,
      RETRY_ATTEMPTS: Number(process.env.RETRY_ATTEMPTS) || 3,
      SOCRATA_API_KEY: process.env.SOCRATA_API_KEY,
      SOCRATA_API_SECRET: process.env.SOCRATA_API_SECRET,
    });
    
    client = new SocrataClient(config);
  }
  return client;
}

export async function search(params: SearchParams) {
  const client = getClient();
  return await searchProcesses(client, params);
}

export async function getDetails(processId: string) {
  const client = getClient();
  return await getProcessDetails(client, processId);
}

export async function aggregate(entityNit: string, fromDate?: string, toDate?: string) {
  const client = getClient();
  return await aggregateByEntity(client, {
    entity_nit: entityNit,
    from_date: fromDate,
    to_date: toDate,
  });
}