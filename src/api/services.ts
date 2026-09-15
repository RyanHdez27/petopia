import { apiClient } from "./client"
import { Pet, ServiceItem, ProductItem, Booking, ApiResponse } from "../types"

// Servicios conectados con Laravel API (/api/v1/...)

export const petsService = {
  getAll: async (): Promise<Pet[]> => {
    const res = await apiClient.get<ApiResponse<Pet[]>>("/pets")
    return res.data
  },
  create: async (pet: Partial<Pet>): Promise<Pet> => {
    const res = await apiClient.post<ApiResponse<Pet>>("/pets", pet)
    return res.data
  },
  update: async (id: number, pet: Partial<Pet>): Promise<Pet> => {
    const res = await apiClient.put<ApiResponse<Pet>>(`/pets/${id}`, pet)
    return res.data
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/pets/${id}`)
  }
}

export const servicesService = {
  getAll: async (category?: string, search?: string): Promise<ServiceItem[]> => {
    let url = "/services"
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (search) params.append("search", search)
    const queryString = params.toString()
    if (queryString) url += `?${queryString}`
    
    const res = await apiClient.get<ApiResponse<ServiceItem[]>>(url)
    return res.data
  },
  getByIdOrSlug: async (identifier: string): Promise<ServiceItem> => {
    const res = await apiClient.get<ApiResponse<ServiceItem>>(`/services/${identifier}`)
    return res.data
  }
}

export const productsService = {
  getAll: async (search?: string): Promise<ProductItem[]> => {
    let url = "/products"
    if (search) url += `?search=${encodeURIComponent(search)}`
    const res = await apiClient.get<ApiResponse<ProductItem[]>>(url)
    return res.data
  },
  getByIdOrSlug: async (identifier: string): Promise<ProductItem> => {
    const res = await apiClient.get<ApiResponse<ProductItem>>(`/products/${identifier}`)
    return res.data
  }
}

export const bookingsService = {
  getAll: async (): Promise<Booking[]> => {
    const res = await apiClient.get<ApiResponse<Booking[]>>("/bookings")
    return res.data
  },
  create: async (data: { service_id: number | string; pet_id?: number; booking_date: string; booking_time: string; notes?: string }): Promise<Booking> => {
    const res = await apiClient.post<ApiResponse<Booking>>("/bookings", data)
    return res.data
  }
}
