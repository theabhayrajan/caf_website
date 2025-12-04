import { db } from "../../../../config/db";

export async function POST(req) {
  try {
    const {
      principalId,
      name,
      test_code,
      city,
      pincode,
      is_member
    } = await req.json();

    await db.query(
      `
      INSERT INTO principal_profiles
      (principal_id, name, test_code, city, pincode, is_member)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
         name=VALUES(name),
         test_code=VALUES(test_code),
         city=VALUES(city),
         pincode=VALUES(pincode),
         is_member=VALUES(is_member)
      `,
      [principalId, name, test_code, city, pincode, is_member]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.log("PROFILE SAVE ERROR:", error);
    return Response.json({ success: false, message: error.message });
  }
}
