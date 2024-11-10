import { httpClient } from './http-client';
import { IPaginateedResponse } from './types';

export interface IClient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleManufacturer: string;
}

export class ClientsService {
  static async getAll(page = 1, perPage = 10) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { data } = await httpClient.get<IPaginateedResponse<IClient[]>>('/clients', {
      params: {
        '_page': page,
        '_per_page': perPage,
      }
    });

    return data;
  }
}
