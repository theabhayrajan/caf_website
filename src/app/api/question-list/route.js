import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const { test_id, questions } = await req.json();

    if (!test_id || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

  const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caf_system",
    });  

    for (let q of questions) {
      await db.execute(
        `INSERT INTO question_list 
        (question_id, title, image_url, question_choice1, question_choice2, question_choice3, question_choice4, correct_answer) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          test_id,
          q.title,
          q.image_url,
          q.choice1,
          q.choice2,
          q.choice3,
          q.choice4,
          q.correct_answer
        ]
      );
    }

    return NextResponse.json({ success: true, message: "Questions saved." });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
