import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Create a single supabase client for interacting with your database
const createClientClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase credentials are missing. Please check your environment variables.")
    // Return a mock client that won't crash the app
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
        signInWithOAuth: () => Promise.resolve({ data: {}, error: null }),
        signUp: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
          insert: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    } as any
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Singleton pattern for client-side Supabase client
let clientInstance: ReturnType<typeof createClientClient> | null = null

export const getClientClient = () => {
  if (!clientInstance) {
    clientInstance = createClientClient()
  }
  return clientInstance
}
