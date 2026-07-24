import type { Metadata } from "next";
import TilbudSkjema from "@/components/TilbudSkjema";

export const metadata: Metadata = {
  title: "Be om tilbud",
  description:
    "Be om et gratis og uforpliktende tilbud på dører og vinduer fra Grenland Dør og Vindu AS.",
};

const steg = [
  {
    tittel: "Du sender inn forespørselen",
    tekst: "Fortell oss hva du trenger, gjerne med bilder og mål om du har det.",
  },
  {
    tittel: "Vi tar kontakt",
    tekst: "Vi ringer eller sender e-post for å avtale videre.",
  },
  {
    tittel: "Gratis befaring",
    tekst: "Vi kommer til deg og måler opp riktig, uforpliktende.",
  },
  {
    tittel: "Tilbud og eventuell montering",
    tekst: "Du får et tilbud, og Snekkerservice Grenland monterer om ønskelig.",
  },
];

export default function TilbudPage() {
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
            Gratis og uforpliktende
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            Be om tilbud
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#e2e8f0",
              margin: 0,
            }}
          >
            Fortell oss litt om hva du trenger, så tar vi kontakt for
            befaring og et uforpliktende tilbud.
          </p>
        </div>
      </section>

      <div
        style={{
          padding: "clamp(28px, 6vw, 60px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
        }}
      >
        <div style={{ flex: "2 1 380px" }}>
          <TilbudSkjema />
        </div>

        <div
          style={{
            flex: "1 1 300px",
            alignSelf: "flex-start",
            borderRadius: "16px",
            padding: "40px",
            color: "white",
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(20,184,166,0.35), transparent 50%), linear-gradient(160deg, #0f172a 0%, #0f766e 100%)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Slik fungerer det</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            {steg.map((s, i) => (
              <div key={s.tittel} style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>

                <div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>
                    {s.tittel}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#e2e8f0",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.tekst}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
