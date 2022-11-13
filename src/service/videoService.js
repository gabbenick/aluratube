import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ghdkkqzqxvtomxsrrbec.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZGtrcXpxeHZ0b214c3JyYmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTUxNjcsImV4cCI6MTk4Mzc5MTE2N30.bdyV1fNq2Cf0afahwPyd8IAbX-M7-OmjxDBnPV6PyQo";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}
