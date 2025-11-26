// app/api/create-full-test/route.js
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";  

export async function POST(req) {
  try {
    const form = await req.formData();

    const class_id = form.get("class_id");
    const test_code = form.get("test_code");
    const video_link = form.get("video_link");
    const total_questions = Number(form.get("total_questions") || 0);
    const questionsJson = form.get("questions"); 

    const questions = questionsJson ? JSON.parse(questionsJson) : [];

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });

    for (let i = 0; i < questions.length; i++) {
      const fileField = form.get(`image_${i}`);
      if (fileField && fileField.size) {
        const arrayBuffer = await fileField.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const ext = (fileField.type && fileField.type.split("/")[1]) || "png";
        const filename = `q_${Date.now()}_${i}.${ext}`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, buffer);

        questions[i].image_url = `/uploads/${filename}`;
        questions[i].local_path = filepath;
      } else {
        questions[i].image_url = "";
        questions[i].local_path = null;
      }
    }

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caf_system", 
    });
    const [result] = await db.execute(
      "INSERT INTO questions (class_id, test_code, video_link, total_questions, created_at) VALUES (?, ?, ?, ?, NOW())",
      [class_id, test_code, video_link, total_questions]
    );
    const testId = result.insertId;

    for (const q of questions) {
      await db.execute(
        `INSERT INTO question_list 
          (question_id, title, image_url, question_choice1, question_choice2, question_choice3, question_choice4, correct_answer, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          testId,
          q.title || "",
          q.image_url || "",
          q.choice1 || "",
          q.choice2 || "",
          q.choice3 || "",
          q.choice4 || "",
          q.correct_answer || 1,
        ]
      );
    }

    await db.end();

    return new Response(
      JSON.stringify({ success: true, test_id: testId, questions }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("CREATE FULL TEST ERROR:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
