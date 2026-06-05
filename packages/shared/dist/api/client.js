"use strict";
/**
 * Cliente HTTP para la API de Socrata (datos.gov.co)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocrataClient = void 0;
const axios_1 = __importDefault(require("axios"));
class SocrataClient {
    client;
    config;
    constructor(config) {
        this.config = config;
        this.client = axios_1.default.create({
            baseURL: config.SOCRATA_BASE_URL,
            timeout: config.REQUEST_TIMEOUT_MS,
            headers: {
                'X-App-Token': config.SOCRATA_APP_TOKEN,
                'Accept': 'application/json',
            },
        });
        if (config.SOCRATA_API_KEY && config.SOCRATA_API_SECRET) {
            this.client.defaults.auth = {
                username: config.SOCRATA_API_KEY,
                password: config.SOCRATA_API_SECRET,
            };
        }
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.client.interceptors.response.use((response) => response, async (error) => {
            const config = error.config;
            if (!config || !this.shouldRetry(error)) {
                throw this.transformError(error);
            }
            const currentRetry = config._retryCount ?? 0;
            if (currentRetry >= this.config.RETRY_ATTEMPTS) {
                throw this.transformError(error);
            }
            const newRetryCount = currentRetry + 1;
            config._retryCount = newRetryCount;
            const exponent = newRetryCount - 1;
            const delayMs = Math.pow(2, exponent) * 1000;
            // Delay simple - setTimeout funciona en Node.js con @types/node instalado
            await new Promise((resolve) => {
                setTimeout(resolve, delayMs);
            });
            return this.client(config);
        });
    }
    shouldRetry(error) {
        if (!error.response) {
            return true;
        }
        const status = error.response.status;
        return status === 429 || status >= 500;
    }
    transformError(error) {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            const message = data?.message || error.message;
            if (status === 401 || status === 403) {
                return new Error(`AUTH_ERROR: ${message}`);
            }
            if (status === 429) {
                return new Error(`RATE_LIMIT_ERROR: ${message}`);
            }
            if (status >= 500) {
                return new Error(`API_ERROR: ${message}`);
            }
            return new Error(`HTTP_${status}: ${message}`);
        }
        if (error.code === 'ECONNABORTED') {
            return new Error(`TIMEOUT_ERROR: Excedió ${this.config.REQUEST_TIMEOUT_MS}ms`);
        }
        return new Error(`NETWORK_ERROR: ${error.message}`);
    }
    async query(params) {
        const response = await this.client.get(`/resource/${this.config.SOCRATA_DATASET_ID}.json`, { params });
        return response.data;
    }
}
exports.SocrataClient = SocrataClient;
//# sourceMappingURL=client.js.map