import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bplvqhexetcmxojoipws.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbHZxaGV4ZXRjbXhvam9pcHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzkxNTIsImV4cCI6MjA4NzA1NTE1Mn0.29ITsJ1iRSy8zWQugjW3YxQiG7UEm6OzN2Ea76XhGvc";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Fetching users...");
  const { data, error } = await supabase.from("users").select("*");
  console.log("Users Data:", data);
  console.log("Users Error:", error);
}

testConnection();
