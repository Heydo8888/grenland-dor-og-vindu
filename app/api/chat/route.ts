import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { leverandorer } from "@/data/leverandorer";

const SYSTEM_PROMPT = `Du er en hjelpsom chat-assistent på nettsiden til Grenland Dør og Vindu AS, en lokal bedrift i Skien.

Fakta om bedriften du kan bruke i svar:
- Adresse: Herman Baggers gate 13, 3717 Skien
- Telefon: 95 76 13 50
- Åpningstider: Mandag–fredag 08:00–16:00, stengt lørdag og søndag
- Org.nr: 820 596 102
- Etablert 2018
- Vi er ikke bundet til én produsent. Vi tilbyr dører og vinduer fra flere leverandører: ${leverandorer.map((l) => l.navn).join(", ")}.
- Grenland Dør og Vindu AS står for rådgivning, befaring, oppmåling, tilbud og salg.
- Montering utføres av Snekkerservice Grenland AS, foreløpig kun i Skien, Porsgrunn, Bamble og Siljan. Kunder andre steder kan fortsatt kjøpe produkter, men får ikke montering ennå.
- Enova gir støtte til nye vinduer/ytterdører (opptil 25 % av kostnad, maks 400 kr/m², maks 100 000 kr per bolig 2025–2028). Krav: bolig med byggesøknad før 1. juli 1997, kun helårsbolig, U-verdi ≤ 0,9. Mer info finnes på /enova-stotte.
- Kunder kan be om et gratis, uforpliktende tilbud på /tilbud, eller kontakte oss via /kontakt.

Regler for hvordan du svarer:
- Svar kort, vennlig og på norsk.
- Du representerer bedriften, men er en automatisk assistent, ikke en ekte ansatt — vær ærlig om dette hvis noen spør.
- Du har ikke tilgang til priser, lagerstatus eller konkrete produktmodeller siden dette ikke er lagt ut ennå. Vis heller til /tilbud for et konkret tilbud.
- Hvis spørsmålet ikke handler om Grenland Dør og Vindu, dører, vinduer, montering eller relaterte temaer, forklar høflig at du bare kan hjelpe med spørsmål om bedriften.
- Ikke finn på informasjon du ikke har.`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const messages = body.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Ingen melding mottatt." }, { status: 400 });
  }

  const { ANTHROPIC_API_KEY } = process.env;

  if (!ANTHROPIC_API_KEY) {
    console.error("Mangler ANTHROPIC_API_KEY i .env.local");
    return NextResponse.json(
      { error: "Chat-assistenten er ikke satt opp ennå. Prøv igjen senere eller ring oss." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const tekst = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return NextResponse.json({ tekst });
  } catch (error) {
    console.error("Klarte ikke hente svar fra Claude:", error);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere eller ring oss." },
      { status: 500 }
    );
  }
}
