import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caf_system", 
    });

    await db.execute("DELETE FROM question_list WHERE question_id = ?", [id]);
    await db.execute("DELETE FROM questions WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
