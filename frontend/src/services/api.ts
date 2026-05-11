import axios from 'axios'

const API_BASE_URL = '/api'

export interface Item {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface CreateItemData {
  name: string
  description: string
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const itemsApi = {
  getAll: async (): Promise<Item[]> => {
    const response = await api.get<Item[]>('/items/')
    return response.data
  },

  getById: async (id: number): Promise<Item> => {
    const response = await api.get<Item>(`/items/${id}/`)
    return response.data
  },

  create: async (data: CreateItemData): Promise<Item> => {
    const response = await api.post<Item>('/items/', data)
    return response.data
  },

  update: async (id: number, data: Partial<CreateItemData>): Promise<Item> => {
    const response = await api.put<Item>(`/items/${id}/`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/items/${id}/`)
  },
}

export default api
