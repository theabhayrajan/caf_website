import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caf_system"
    });

    const [rows] = await db.execute(`
      SELECT q.*, c.class_name 
      FROM questions q 
      LEFT JOIN classes c ON q.class_id = c.id 
      ORDER BY q.id DESC
    `);

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load tests" }, { status: 500 });
  }
}
