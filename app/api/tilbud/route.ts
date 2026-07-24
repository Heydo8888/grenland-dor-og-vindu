import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const lokaleOmrader = ["Skien", "Porsgrunn", "Bamble", "Siljan"];

export async function POST(request: NextRequest) {
  const form = await request.formData();

  const navn = form.get("navn")?.toString() ?? "";
  const telefon = form.get("telefon")?.toString() ?? "";
  const epost = form.get("epost")?.toString() ?? "";
  const adresse = form.get("adresse")?.toString() ?? "";
  const kommune = form.get("kommune")?.toString() ?? "";
  const type = form.get("type")?.toString() ?? "";
  const antallOgMal = form.get("antallOgMal")?.toString() ?? "";
  const onskerMontering = form.get("onskerMontering")?.toString() === "true";
  const onsketDato = form.get("onsketDato")?.toString() ?? "";
  const onsketTidspunkt = form.get("onsketTidspunkt")?.toString() ?? "";
  const melding = form.get("melding")?.toString() ?? "";
  const bilder = form
    .getAll("bilder")
    .filter((verdi): verdi is File => verdi instanceof File && verdi.size > 0);

  if (!navn || !telefon || !epost || !adresse || !kommune || !type) {
    return NextResponse.json(
      { error: "Vennligst fyll ut navn, telefon, e-post, adresse, kommune og hva det gjelder." },
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

  const attachments = await Promise.all(
    bilder.slice(0, 6).map(async (fil) => ({
      filename: fil.name,
      content: Buffer.from(await fil.arrayBuffer()),
    }))
  );

  const erLokalt = lokaleOmrader.includes(kommune);

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: epost,
      subject: `Ny tilbudsforespørsel: ${type} – ${navn}`,
      text: [
        `Navn: ${navn}`,
        `Telefon: ${telefon}`,
        `E-post: ${epost}`,
        `Adresse: ${adresse}`,
        `Kommune: ${kommune} (${erLokalt ? "innenfor monteringsområde" : "utenfor monteringsområde"})`,
        `Type: ${type}`,
        `Ønsker montering: ${erLokalt && onskerMontering ? "Ja" : "Nei"}`,
        `Omtrentlig mål/antall: ${antallOgMal || "(ikke oppgitt)"}`,
        `Ønsket dato for befaring: ${onsketDato || "(ikke oppgitt)"}`,
        `Ønsket tidspunkt: ${onsketTidspunkt || "(ikke oppgitt)"}`,
        `Melding: ${melding || "(ingen)"}`,
        `Antall vedlagte bilder: ${attachments.length}`,
      ].join("\n"),
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Klarte ikke sende tilbudsforespørsel:", error);
    return NextResponse.json(
      { error: "Noe gikk galt under sending. Prøv igjen senere eller ring oss." },
      { status: 500 }
    );
  }
}
