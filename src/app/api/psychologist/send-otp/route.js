import { db } from "../../../../config/db";

export async function POST(req) {
  try {
    const { phone } = await req.json();
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    console.log("DEMO OTP =", otp);

    await db.query(
      `
      INSERT INTO psychologists (phone, otp, otp_expiry)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE otp=?, otp_expiry=?
      `,
      [phone, otp, expiry, otp, expiry]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.log("SEND OTP ERROR:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
