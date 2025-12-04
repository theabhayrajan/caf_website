import { db } from "../../../../config/db";

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    const [rows] = await db.query(
      "SELECT * FROM psychologists WHERE phone = ?",
      [phone]
    );

    if (!rows.length) {
      return Response.json({ success: false, message: "Phone not registered" }, { status: 404 });
    }

    const user = rows[0];

    if (user.otp !== otp) {
      return Response.json({ success: false, message: "Incorrect OTP" }, { status: 400 });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return Response.json({ success: false, message: "OTP expired" }, { status: 400 });
    }

    // Clear OTP
    await db.query("UPDATE psychologists SET otp=NULL, otp_expiry=NULL WHERE phone=?", [phone]);

    // find profile
    const [[profile]] = await db.query(
      `SELECT * FROM psychologist_profiles WHERE psychologist_id = ? LIMIT 1`,
      [user.id]
    );

    const profileComplete = !!profile; // true if a profile row exists

    // Return psychologist id & profileComplete flag for frontend routing
    return Response.json({
      success: true,
      message: "Login successful",
      psychologist: { id: user.id, phone: user.phone },
      profileComplete
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
