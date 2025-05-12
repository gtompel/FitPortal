export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          weight: number | null
          height: number | null
          fitness_level: "beginner" | "intermediate" | "advanced" | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          weight?: number | null
          height?: number | null
          fitness_level?: "beginner" | "intermediate" | "advanced" | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          weight?: number | null
          height?: number | null
          fitness_level?: "beginner" | "intermediate" | "advanced" | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: number
          title: string
          slug: string
          description: string
          level: "beginner" | "intermediate" | "advanced"
          duration: number
          calories: number | null
          image_url: string | null
          video_url: string | null
          category_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          description: string
          level: "beginner" | "intermediate" | "advanced"
          duration: number
          calories?: number | null
          image_url?: string | null
          video_url?: string | null
          category_id?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          description?: string
          level?: "beginner" | "intermediate" | "advanced"
          duration?: number
          calories?: number | null
          image_url?: string | null
          video_url?: string | null
          category_id?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_ratings: {
        Row: {
          id: number
          workout_id: number
          user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: number
          workout_id: number
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          workout_id?: number
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string | null
          content: string
          image_url: string | null
          author_id: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          excerpt?: string | null
          content: string
          image_url?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          image_url?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_categories: {
        Row: {
          id: number
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          created_at?: string
        }
      }
      blog_post_categories: {
        Row: {
          post_id: number
          category_id: number
        }
        Insert: {
          post_id: number
          category_id: number
        }
        Update: {
          post_id?: number
          category_id?: number
        }
      }
      blog_comments: {
        Row: {
          id: number
          post_id: number
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          post_id: number
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          post_id?: number
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      workout_plans: {
        Row: {
          id: number
          user_id: string
          title: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_plan_items: {
        Row: {
          id: number
          plan_id: number
          workout_id: number
          day_of_week: number
          order_index: number
          created_at: string
        }
        Insert: {
          id?: number
          plan_id: number
          workout_id: number
          day_of_week: number
          order_index: number
          created_at?: string
        }
        Update: {
          id?: number
          plan_id?: number
          workout_id?: number
          day_of_week?: number
          order_index?: number
          created_at?: string
        }
      }
      user_workout_progress: {
        Row: {
          id: number
          user_id: string
          workout_id: number
          completed_at: string
          duration: number | null
          notes: string | null
        }
        Insert: {
          id?: number
          user_id: string
          workout_id: number
          completed_at?: string
          duration?: number | null
          notes?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          workout_id?: number
          completed_at?: string
          duration?: number | null
          notes?: string | null
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
  }
}
