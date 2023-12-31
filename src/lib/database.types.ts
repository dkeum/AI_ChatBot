export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      chatBot: {
        Row: {
          category: string;
          content_id: number | null;
          created_at: string;
          description: string;
          id: number;
          img_url: string;
          isLocked: boolean | null;
          name: string;
          slug: string | null;
        };
        Insert: {
          category: string;
          content_id?: number | null;
          created_at?: string;
          description: string;
          id?: number;
          img_url?: string;
          isLocked?: boolean | null;
          name: string;
          slug?: string | null;
        };
        Update: {
          category?: string;
          content_id?: number | null;
          created_at?: string;
          description?: string;
          id?: number;
          img_url?: string;
          isLocked?: boolean | null;
          name?: string;
          slug?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chatBot_content_id_fkey";
            columns: ["content_id"];
            referencedRelation: "chatBot_content";
            referencedColumns: ["id"];
          }
        ];
      };
      chatBot_content: {
        Row: {
          chatbot_url: string | null;
          created_at: string;
          id: number;
        };
        Insert: {
          chatbot_url?: string | null;
          created_at?: string;
          id?: number;
        };
        Update: {
          chatbot_url?: string | null;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          name: string | null;
          price: string | null;
          stripe_customer_id: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          price?: string | null;
          stripe_customer_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          price?: string | null;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
