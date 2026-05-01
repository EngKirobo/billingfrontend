export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface CheckEmailResponse {
  email: string;
  exists: boolean;
}

// Optional: User model for registration
export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  // add other fields your User entity has (e.g. phone, role, etc.)
}
