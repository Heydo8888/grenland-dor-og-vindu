import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { navn, telefon, epost, gjelder, melding } = body;

  if (!navn || !telefon || !epost || !gjelder) {
    return NextResponse.json(
      { error: "Vennligst fyll ut navn, telefon, e-post og hva henvendelsen gjelder." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error("Mangler SMTP-oppsett i .env.local");
    return NextResponse.json(
      { error: "E-postutsending er ikke satt opp ennå. Prøv igjen senere eller ring oss." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      // Enkelte antivirus-/nettverksprogrammer på lokale utviklermaskiner
      // inspiserer HTTPS-trafikk med sitt eget sertifikat. Krev streng
      // sertifikatsjekk kun i produksjon, der dette ikke forekommer.
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: epost,
      subject: `Ny henvendelse fra nettsiden: ${gjelder}`,
      text: `Navn: ${navn}\nTelefon: ${telefon}\nE-post: ${epost}\nGjelder: ${gjelder}\n\nMelding:\n${melding || "(ingen melding)"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Klarte ikke sende e-post:", error);
    return NextResponse.json(
      { error: "Noe gikk galt under sending. Prøv igjen senere eller ring oss." },
      { status: 500 }
    );
  }
}
