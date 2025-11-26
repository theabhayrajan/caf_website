import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caf_system",
    });

    const [rows] = await connection.execute(
      "SELECT * FROM classes ORDER BY id ASC"
    );

    await connection.end();

    return NextResponse.json(rows);
  } catch (err) {
    console.log("CLASSES API ERROR:", err);
    return NextResponse.json(
      { error: "Error fetching classes" },
      { status: 500 }
    );
  }
}
