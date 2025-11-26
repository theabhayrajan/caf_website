// /src/app/api/uploadimg/route.js
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  // Parse FormData
  const formData = await request.formData();
  const file = formData.get("image");
  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  // Use Buffer to save file
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "-" + file.name.replace(/\s+/g, "_");
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  // Ensure uploadDir exists!

  await writeFile(path.join(uploadDir, filename), buffer);

  // Return relative public url
  return Response.json({ url: `/uploads/${filename}` });
}

export const config = {
  api: { bodyParser: false }
};
