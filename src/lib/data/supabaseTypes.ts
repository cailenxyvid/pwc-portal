export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      attendee: {
        Row: {
          company: string | null
          country: string | null
          email: string | null
          first_name: string | null
          id: string
          job_level: string | null
          job_title: string | null
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          country?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          job_level?: string | null
          job_title?: string | null
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          country?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_level?: string | null
          job_title?: string | null
          last_name?: string | null
          updated_at?: string | null
        }
      }
      event: {
        Row: {
          calendar_id: string | null
          content: string | null
          content_replay: string | null
          event_start: string | null
          id: number
          status: string | null
          title: string | null
          xyp_id: number | null
        }
        Insert: {
          calendar_id?: string | null
          content?: string | null
          content_replay?: string | null
          event_start?: string | null
          id?: number
          status?: string | null
          title?: string | null
          xyp_id?: number | null
        }
        Update: {
          calendar_id?: string | null
          content?: string | null
          content_replay?: string | null
          event_start?: string | null
          id?: number
          status?: string | null
          title?: string | null
          xyp_id?: number | null
        }
      }
      registration: {
        Row: {
          attendee: string | null
          created_at: string | null
          event: number | null
          id: number
        }
        Insert: {
          attendee?: string | null
          created_at?: string | null
          event?: number | null
          id?: number
        }
        Update: {
          attendee?: string | null
          created_at?: string | null
          event?: number | null
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
