import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const form = await req.formData();

    const class_id = form.get("class_id"); // From UI
    const test_code = form.get("test_code"); // From UI
    const video_link = form.get("video_link");
    const total_questions = Number(form.get("total_questions"));
    const questionsJson = form.get("questions");

    const questions = JSON.parse(questionsJson);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });

    const db = await mysql.createConnection({
       host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
    });

    const [existing] = await db.execute(
      "SELECT id FROM class_tests WHERE test_code = ?",
      [test_code]
    );

    if (existing.length > 0) {
      await db.end();
      return new Response(
        JSON.stringify({
          success: false,
          error: "Test Code already exists. Please use a different one.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ----------------------------------------------------
    // 1️ INSERT INTO class_tests (FIRST)
    // ----------------------------------------------------
    const [classTestResult] = await db.execute(
      `INSERT INTO class_tests (class_id, test_code, created_at)
       VALUES (?, ?, NOW())`,
      [class_id, test_code]
    );

    const classTestId = classTestResult.insertId; // 🔥 SAVE THIS ID

    // ----------------------------------------------------
    // Upload image files
    // ----------------------------------------------------
    for (let i = 0; i < questions.length; i++) {
      const file = form.get(`image_${i}`);
if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.type.split("/")[1] || "png";
    const filename = `q_${Date.now()}_${i}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    questions[i].image_url = `/uploads/${filename}`;
} else {
    // keep existing image if present
    if (!questions[i].image_url) {
        questions[i].image_url = "";
    }
} 
    }
    // ----------------------------------------------------
    // 2️ INSERT INTO questions TABLE (SECOND)
    // ----------------------------------------------------
    const [questionsResult] = await db.execute(
      `INSERT INTO questions (class_test_id, video_link, total_questions, created_at)
       VALUES (?, ?, ?, NOW())`,
      [classTestId, video_link, total_questions]
    );

    const questionId = questionsResult.insertId; // 🔥 SAVE THIS ID

    // ----------------------------------------------------
    // 3️ INSERT INTO question_list (LAST)
    // ----------------------------------------------------
    for (const q of questions) {
      await db.execute(
        `INSERT INTO question_list 
           (question_id, title, image_url, question_choice1, question_choice2, 
            question_choice3, question_choice4, correct_answer, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          questionId,
          q.title || "",
          q.image_url || "",
          q.options[0] || "",
          q.options[1] || "",
          q.options[2] || "",
          q.options[3] || "",
          q.correctAnswer, // 0-based → 1-based
        ]
      );
    }

    await db.end();

    return new Response(
      JSON.stringify({
        success: true,
        class_test_id: classTestId,
        question_id: questionId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("CREATE FULL TEST ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
