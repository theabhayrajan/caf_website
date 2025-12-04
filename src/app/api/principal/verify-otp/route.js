import { db } from "../../../../config/db";

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    const [rows] = await db.query("SELECT * FROM principals WHERE phone=?", [phone]);
    if (!rows.length)
      return Response.json({ success: false, message: "Phone not registered" });

    const user = rows[0];

    // ❌ Wrong OTP
    if (user.otp !== otp)
      return Response.json({ success: false, message: "Invalid OTP" });

    // ✔ OTP match → clear it
    await db.query("UPDATE principals SET otp=NULL, otp_expiry=NULL WHERE id=?", [user.id]);

    // Check if profile exists
    const [[profile]] = await db.query(
      "SELECT * FROM principal_profiles WHERE principal_id=?",
      [user.id]
    );

    return Response.json({
      success: true,
      principalId: user.id,
      profileComplete: !!profile,
    });
  } catch (err) {
    console.log("VERIFY OTP ERROR:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
