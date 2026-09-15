// Cliente HTTP para comunicación con Laravel REST API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem("petopia_token")
  }

  public setToken(token: string) {
    localStorage.setItem("petopia_token", token)
  }

  public clearToken() {
    localStorage.removeItem("petopia_token")
  }

  public async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error HTTP: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.warn(`[API Client Warning] No se pudo conectar con el backend Laravel (${endpoint}):`, error)
      throw error
    }
  }

  public get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" })
  }

  public post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  public put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  public delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient()
