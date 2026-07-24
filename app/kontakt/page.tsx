import type { Metadata } from "next";
import KontaktSkjema from "@/components/KontaktSkjema";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description:
    "Ta kontakt med Grenland Dør og Vindu AS i Skien for rådgivning, befaring eller spørsmål om dører og vinduer.",
};

export default function KontaktPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <section
        style={{
          padding: "70px clamp(20px, 6vw, 60px) 50px",
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(20,184,166,0.25), transparent 45%), linear-gradient(135deg, #0f172a 0%, #0f766e 100%)",
          color: "white",
        }}
      >
        <div className="hero-content" style={{ maxWidth: "700px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            Vi svarer raskt
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            Kontakt oss
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#e2e8f0",
              margin: 0,
            }}
          >
            Send oss en melding under, eller ring — så finner vi riktig
            løsning for ditt hjem sammen.
          </p>
        </div>
      </section>

      <div
        style={{
          padding: "clamp(28px, 6vw, 60px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "60px",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>Send oss en melding</h2>
          <KontaktSkjema />
        </div>

        <div style={{ flex: "1 1 260px" }}>
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>Besøksadresse</h2>
          <p style={{ lineHeight: 1.8, color: "#374151" }}>
            Herman Baggers gate 13
            <br />
            3717 Skien
          </p>

          <h2 style={{ color: "#0f172a" }}>Telefon</h2>
          <p style={{ lineHeight: 1.8, color: "#374151" }}>95 76 13 50</p>

          <h2 style={{ color: "#0f172a" }}>Åpningstider</h2>
          <p style={{ lineHeight: 1.8, color: "#374151" }}>
            Mandag–fredag: 08:00–16:00
            <br />
            Lørdag–søndag: Stengt
          </p>
        </div>
      </div>
    </div>
  );
}
