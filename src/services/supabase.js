import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bcaoqayefsqhravmwnkb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYW9xYXllZnNxaHJhdm13bmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MzE1NDUsImV4cCI6MjAxMDAwNzU0NX0.fIItOyHpe6_c4kltTcA4F6GtwSQoKaKQFGrmcBV_Xx0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;



// WORKING QUERIES
// -Activity name: Vet clinic database: create animals table
// SELECT name from animals WHERE date_of_birth BETWEEN '2016-01-01' AND '2019-12-31';
// SELECT * from animals WHERE weight_kg BETWEEN 10.40 AND 17.30;
