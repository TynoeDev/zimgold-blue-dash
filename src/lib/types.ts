// TypeScript types generated from Supabase schema
// These types match the database schema defined in supabase/schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string
          avatar_ipfs_hash: string | null
          membership_tier: 'Associate' | 'Caporegime' | 'Don' | 'Commission'
          respect_points: number
          deals_completed: number
          endorsements: number
          response_rate: number
          member_since: string
          wallet_address: string | null
          badge_nft_minted: boolean
          badge_nft_mint_address: string | null
          is_online: boolean
          last_seen: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          avatar_ipfs_hash?: string | null
          membership_tier?: 'Associate' | 'Caporegime' | 'Don' | 'Commission'
          respect_points?: number
          deals_completed?: number
          endorsements?: number
          response_rate?: number
          member_since?: string
          wallet_address?: string | null
          badge_nft_minted?: boolean
          badge_nft_mint_address?: string | null
          is_online?: boolean
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          avatar_ipfs_hash?: string | null
          membership_tier?: 'Associate' | 'Caporegime' | 'Don' | 'Commission'
          respect_points?: number
          deals_completed?: number
          endorsements?: number
          response_rate?: number
          member_since?: string
          wallet_address?: string | null
          badge_nft_minted?: boolean
          badge_nft_mint_address?: string | null
          is_online?: boolean
          last_seen?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon_name: string
          criteria: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon_name: string
          criteria: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon_name?: string
          criteria?: Json
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
      channels: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_name: string
          member_count: number
          is_voice: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon_name: string
          member_count?: number
          is_voice?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon_name?: string
          member_count?: number
          is_voice?: boolean
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          channel_id: string
          user_id: string
          message: string
          message_type: 'text' | 'image' | 'file'
          attachments_ipfs: Json
          is_pinned: boolean
          reply_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          channel_id: string
          user_id: string
          message: string
          message_type?: 'text' | 'image' | 'file'
          attachments_ipfs?: Json
          is_pinned?: boolean
          reply_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          channel_id?: string
          user_id?: string
          message?: string
          message_type?: 'text' | 'image' | 'file'
          attachments_ipfs?: Json
          is_pinned?: boolean
          reply_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      message_reactions: {
        Row: {
          id: string
          message_id: string
          user_id: string
          emoji: string
          created_at: string
        }
        Insert: {
          id?: string
          message_id: string
          user_id: string
          emoji: string
          created_at?: string
        }
        Update: {
          id?: string
          message_id?: string
          user_id?: string
          emoji?: string
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          title: string
          description: string
          category: 'Real Estate' | 'Crypto' | 'Business' | 'Investment' | 'Partnership'
          status: 'draft' | 'active' | 'review' | 'completed' | 'archived'
          priority: 'low' | 'medium' | 'high' | 'critical'
          value: string | null
          progress: number
          deadline: string | null
          created_by: string
          documents_ipfs: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'Real Estate' | 'Crypto' | 'Business' | 'Investment' | 'Partnership'
          status?: 'draft' | 'active' | 'review' | 'completed' | 'archived'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          value?: string | null
          progress?: number
          deadline?: string | null
          created_by: string
          documents_ipfs?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'Real Estate' | 'Crypto' | 'Business' | 'Investment' | 'Partnership'
          status?: 'draft' | 'active' | 'review' | 'completed' | 'archived'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          value?: string | null
          progress?: number
          deadline?: string | null
          created_by?: string
          documents_ipfs?: Json
          created_at?: string
          updated_at?: string
        }
      }
      deal_assignments: {
        Row: {
          id: string
          deal_id: string
          user_id: string
          role: string | null
          assigned_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          user_id: string
          role?: string | null
          assigned_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          user_id?: string
          role?: string | null
          assigned_at?: string
        }
      }
      deal_comments: {
        Row: {
          id: string
          deal_id: string
          user_id: string
          comment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          deal_id: string
          user_id: string
          comment: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          deal_id?: string
          user_id?: string
          comment?: string
          created_at?: string
          updated_at?: string
        }
      }
      activity_log: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          description: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          description: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          description?: string
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_online_status: {
        Args: {
          user_uuid: string
          is_online_status: boolean
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
