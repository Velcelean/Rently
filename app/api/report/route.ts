// app/api/report/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetId, targetType, reason, details } = body;

    if (!targetId || !reason) {
      return NextResponse.json({ error: "Date incomplete" }, { status: 400 });
    }

    // AICI VINE LOGICA TA DE BAZĂ DE DATE
    // Exemplu pentru Supabase: await supabase.from('reports').insert({ target_id: targetId, target_type: targetType, reason, details })
    
    // Simulare de procesare și alertare internă
    console.log(`[ALERTA DE SECURITATE] Raport nou înregistrat:`);
    console.log(`- Țintă: ${targetType} [${targetId}]`);
    console.log(`- Motiv: ${reason}`);
    console.log(`- Detalii: ${details}`);
    console.log(`- Acțiune necesară: Verificare manuală și alertă pe rently.studenti@gmail.com`);

    return NextResponse.json(
      { success: true, message: "Raportul a fost înregistrat cu succes." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REPORT ERROR] Eroare la procesarea raportului:", error);
    return NextResponse.json(
      { error: "Eroare internă a serverului" },
      { status: 500 }
    );
  }
}