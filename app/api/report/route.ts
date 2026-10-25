import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetId, targetType, reason, details } = body;

    if (!targetId || !reason) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    // 1. Configurarea serverului de trimitere Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Formatarea link-ului către anunț/utilizator
    const reviewLink = targetType === "LISTING" 
      ? `https://rently-ro.vercel.app/anunturi/${targetId}`
      : `https://rently-ro.vercel.app/user/${targetId}`;

    // 3. Template-ul vizual al Email-ului
    const mailOptions = {
      from: `"Rently Security Engine" <${process.env.EMAIL_USER}>`,
      to: "rently.studenti@gmail.com",
      subject: `🚨 [URGENT] Raport Nou: ${reason} (${targetType})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #ef4444; padding: 24px; color: white; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">🚨 Alertă de Securitate Rently</h2>
          </div>
          <div style="padding: 32px; background-color: #f8fafc; color: #334155;">
            <p style="font-size: 16px; margin-bottom: 24px;">Sistemul a înregistrat un nou raport de la un utilizator, care necesită investigație manuală.</p>
            
            <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px 0;"><strong>Tip Țintă:</strong> ${targetType}</p>
              <p style="margin: 0 0 12px 0;"><strong>ID Țintă:</strong> <span style="font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${targetId}</span></p>
              <p style="margin: 0 0 12px 0;"><strong>Motiv Principal:</strong> <span style="color: #ef4444; font-weight: bold; font-size: 16px;">${reason}</span></p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed #cbd5e1;">
                <strong>Detalii suplimentare lăsate de utilizator:</strong>
                <p style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 8px; font-style: italic;">
                  "${details || "Nu au fost oferite detalii suplimentare."}"
                </p>
              </div>
            </div>

            <div style="margin-top: 32px; text-align: center;">
              <a href="${reviewLink}" style="background-color: #0f172a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Analizează Cazul pe Site</a>
            </div>
          </div>
        </div>
      `,
    };

    // 4. Expedierea propriu-zisă
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Notificarea a fost trimisă echipei de suport." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REPORT ERROR] Eroare la trimiterea emailului:", error);
    return NextResponse.json(
      { error: "Eroare internă a serverului" },
      { status: 500 }
    );
  }
}