// Minimal types inferred; adjust to real backend schemas as needed
export interface Salon { id?: number | string; name?: string; [k: string]: any }
export interface Client { id?: number | string; name?: string; phone?: string; [k: string]: any }
export interface Service { id?: number | string; name?: string; price?: number; duration_minutes?: number; [k: string]: any }
export interface Staff { id?: number | string; name?: string; active?: boolean; salon_id?: number | string; skills?: string; [k: string]: any }
export interface Appointment { id?: number | string; client_id?: number | string; staff_id?: number | string; service_id?: number | string; start?: string; end?: string; [k: string]: any }
export interface Permission { perm?: string; [k: string]: any }
export interface ServiceStaff { service_id: number | string; staff_id: number | string; [k: string]: any }

export interface AuthResponse { token?: string; access_token?: string; jwt?: string; [k: string]: any }
