// Tipados de dominio para Petopia (Alineados con Eloquent Models)

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: "owner" | "provider" | "vet" | "admin"
  avatar_url?: string
}

export interface Pet {
  id: number
  user_id: number
  name: string
  species: "dog" | "cat" | "other"
  breed?: string
  gender?: string
  age?: string
  weight?: string
  microchip_id?: string
  avatar_emoji: string
  avatar_bg?: string
  medical_notes?: string
  created_at?: string
  updated_at?: string
}

export interface ServiceItem {
  id: number | string
  slug: string
  title: string
  subtitle?: string
  category: "veterinaria" | "paseo" | "spa" | "guarderia" | "general"
  description?: string
  price: number | string
  duration?: string
  rating: number | string
  reviews_count?: number
  reviews?: number
  icon: string
  bgIcon?: string
  bg_icon?: string
}

export interface ProductItem {
  id: number | string
  slug: string
  title: string
  subtitle?: string
  description?: string
  price: number | string
  stock?: number
  rating: number | string
  reviews_count?: number
  reviews?: number
  icon: string
  bg?: string
  bg_color?: string
  accent?: string
  accent_color?: string
}

export interface Booking {
  id: number
  user_id: number
  service_id: number
  pet_id?: number
  booking_date: string
  booking_time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  total_price: number
  notes?: string
  service?: ServiceItem
  pet?: Pet
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
