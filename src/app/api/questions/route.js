import { db } from "../../../config/db";

export async function POST(req) {
  try {
    const { class_id, test_code, video_link, total_questions } = await req.json();

    const [result] = await db.query(
      "INSERT INTO questions (class_id, test_code, video_link, total_questions) VALUES (?, ?, ?, ?)",
      [class_id, test_code, video_link, total_questions]
    );

    return Response.json({ test_id: result.insertId });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
