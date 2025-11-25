import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      test_id,
      class_id,
      test_code,
      video_link,
      total_questions,
      questions,
    } = body;

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caf_system",
    });

    await db.execute(
      `UPDATE questions 
       SET class_id=?, test_code=?, video_link=?, total_questions=? 
       WHERE id=?`,
      [class_id, test_code, video_link, total_questions, test_id]
    );

for (const q of questions) {
  if (!q.id) continue;

      await db.execute(
        `UPDATE question_list
          SET 
            title = ?, 
            image_url = ?,
            question_choice1 = ?, 
            question_choice2 = ?, 
            question_choice3 = ?, 
            question_choice4 = ?, 
            correct_answer = ?
          WHERE id = ?`,
        [
          q.title ?? "",
          q.image_url ?? "",   // <-- NEW LINE (update image)
          q.choice1 ?? "",
          q.choice2 ?? "",
          q.choice3 ?? "",
          q.choice4 ?? "",
          q.correct_answer ?? 1,
          q.id,
        ]
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
}
