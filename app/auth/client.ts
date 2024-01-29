import { useEffect, useMemo, useState } from "react";
import { createClient, Session } from "@supabase/supabase-js";


export function useSupabaseSession(supabaseUrl: string, supabaseAnonKey: string) {
  const client = useMemo(() => {
    if (supabaseUrl?.length && supabaseAnonKey.length) {
      return createClient(supabaseUrl, supabaseAnonKey);
    }
  }, [supabaseUrl, supabaseAnonKey]);

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (client) {
          const { data: sessionData } = await client.auth.getSession();
          console.log("auth.getSession()", sessionData);
          setSession(sessionData.session);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchData();
  }, []);

  return { client, session };
}
