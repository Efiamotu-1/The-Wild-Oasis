import supabase, { supabaseUrl } from "./supabase";

// using jonas' javascript's client libraries
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

// Using the apiUrl
// export async function getCabins() {
//     fetch("https://bcaoqayefsqhravmwnkb.supabase.co/rest/v1/cabins?select=*", {
//       headers: {
//         apikey:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYW9xYXllZnNxaHJhdm13bmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MzE1NDUsImV4cCI6MjAxMDAwNzU0NX0.fIItOyHpe6_c4kltTcA4F6GtwSQoKaKQFGrmcBV_Xx0",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYW9xYXllZnNxaHJhdm13bmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MzE1NDUsImV4cCI6MjAxMDAwNzU0NX0.fIItOyHpe6_c4kltTcA4F6GtwSQoKaKQFGrmcBV_Xx0",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   }

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    // Handle error by deleting the cabin if image upload was unsuccessful
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded and cabin could not be created"
    );
  } else {
    // Handle success
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
}
