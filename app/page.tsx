import Link from "next/link";
import { leverandorer } from "@/data/leverandorer";

const tillitsmerker = [
  "7 ledende leverandører",
  "Lokal montering i Grenland",
  "Etablert 2018",
];

const fordeler = [
  {
    ikon: "🏭",
    tittel: "Flere leverandører",
    tekst: "Vi er ikke bundet til én produsent — du får løsningen som faktisk passer deg, ikke det vi tilfeldigvis lagerfører.",
  },
  {
    ikon: "📐",
    tittel: "Gratis befaring",
    tekst: "Vi kommer til deg og måler opp riktig, før du bestemmer deg for noe.",
  },
  {
    ikon: "🔧",
    tittel: "Lokal montering",
    tekst: "Snekkerservice Grenland monterer dørene og vinduene dine i ditt nærområde.",
  },
  {
    ikon: "🌱",
    tittel: "Enova-støtte",
    tekst: "Vi hjelper deg å sjekke om oppgraderingen kan gi deg støtte.",
  },
];

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Hero */}
      <section
        style={{
          minHeight: "80vh",
          padding: "60px clamp(16px, 5vw, 40px)",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(20,184,166,0.35), transparent 45%), linear-gradient(135deg, #0f172a 0%, #0f766e 60%, #14b8a6 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="hero-content"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            padding: "clamp(28px, 6vw, 60px)",
            borderRadius: "16px",
            textAlign: "center",
            color: "white",
            maxWidth: "820px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 7vw, 60px)",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Dører og vinduer som løfter hjemmet ditt
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 3vw, 22px)",
              lineHeight: "1.6",
            }}
          >
            Vi er ikke bundet til én produsent. Vi finner den beste løsningen
            for akkurat ditt hjem, fra flere av Norges ledende leverandører —
            med profesjonell rådgivning og montering i Grenland.
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {tillitsmerker.map((merke) => (
              <span
                key={merke}
                style={{
                  backgroundColor: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                }}
              >
                {merke}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/tilbud"
              className="btn-primary"
              style={{
                padding: "18px 36px",
                backgroundColor: "#0f766e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Be om gratis befaring
            </Link>

            <Link
              href="/produkter"
              className="btn-secondary"
              style={{
                padding: "18px 36px",
                backgroundColor: "white",
                color: "#111827",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Se våre leverandører
            </Link>
          </div>
        </div>
      </section>

      {/* Derfor oss */}
      <section
        style={{
          padding: "80px clamp(20px, 6vw, 60px)",
          backgroundColor: "#f8fafc",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "34px",
            marginBottom: "50px",
            color: "#0f172a",
          }}
        >
          Derfor velger kundene våre Grenland Dør og Vindu
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {fordeler.map((fordel) => (
            <div key={fordel.tittel} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "14px" }}>
                {fordel.ikon}
              </div>
              <h3 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>
                {fordel.tittel}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                {fordel.tekst}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leverandørstripe */}
      <section
        style={{
          padding: "50px clamp(20px, 6vw, 60px)",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Vi tilbyr produkter fra
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px 40px",
          }}
        >
          {leverandorer.map((leverandor) => (
            <span
              key={leverandor.id}
              style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a" }}
            >
              {leverandor.navn}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
