import { db } from "../../../../config/db";

export async function POST(req) {
  try {
    const body = await req.json();

    await db.query(
      `
      INSERT INTO psychologist_profiles
      (psychologist_id, name, occupation, experience_years, city, pincode,
       is_member, provides_counselling, counselling_website)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name=VALUES(name),
        occupation=VALUES(occupation),
        experience_years=VALUES(experience_years),
        city=VALUES(city),
        pincode=VALUES(pincode),
        is_member=VALUES(is_member),
        provides_counselling=VALUES(provides_counselling),
        counselling_website=VALUES(counselling_website)
      `,
      [
        body.psychologistId,
        body.name,
        body.occupation,
        body.experience_years,
        body.city,
        body.pincode,
        body.is_member,
        body.provides_counselling,
        body.counselling_website,
      ]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.log("PROFILE ERROR:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
