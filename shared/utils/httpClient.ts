import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { logger } from './logger';

export class ServiceClient {
  private client: AxiosInstance;

  constructor(baseURL: string, timeout = 5000) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.client.interceptors.request.use(
      config => {
        logger.debug({ url: config.url, method: config.method }, 'Service request');
        return config;
      },
      error => {
        logger.error({ error }, 'Service request error');
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      response => response,
      error => {
        logger.error({ error: error.message, url: error.config?.url }, 'Service response error');
        return Promise.reject(error);
      }
    );
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(path, config);
    return response.data;
  }

  async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(path, data, config);
    return response.data;
  }

  async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(path, data, config);
    return response.data;
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(path, config);
    return response.data;
  }
}
