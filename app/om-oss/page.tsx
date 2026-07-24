import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Grenland Dør og Vindu AS er en lokal bedrift i Skien som leverer dører og vinduer fra flere ledende produsenter, med rådgivning, befaring og montering i Grenland.",
};

const nokkelfakta = [
  { tall: "2018", tekst: "Etablert" },
  { tall: "7", tekst: "Leverandører" },
  { tall: "100%", tekst: "Lokalt forankret" },
];

export default function OmOssPage() {
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
            Lokal bedrift i Skien
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            Om Grenland Dør og Vindu
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#e2e8f0",
              margin: 0,
            }}
          >
            Vi leverer dører, vinduer og tilhørende produkter til både
            privat- og bedriftsmarkedet i Grenland — med rådgivning som
            faktisk tar utgangspunkt i ditt hjem, ikke vårt lager.
          </p>
        </div>
      </section>

      <div style={{ padding: "clamp(28px, 6vw, 60px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "24px",
            maxWidth: "700px",
            marginBottom: "60px",
          }}
        >
          {nokkelfakta.map((fakta) => (
            <div
              key={fakta.tekst}
              style={{
                textAlign: "center",
                padding: "24px",
                borderRadius: "12px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{ fontSize: "32px", fontWeight: "bold", color: "#0f766e" }}
              >
                {fakta.tall}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>
                {fakta.tekst}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "60px" }}>
          <div style={{ flex: "1 1 320px" }}>
            <h2 style={{ color: "#0f172a", fontSize: "22px", fontWeight: "bold" }}>
              Hvem vi er
            </h2>
            <p style={{ lineHeight: 1.7, color: "#374151", maxWidth: "480px" }}>
              Grenland Dør og Vindu AS er en lokal bedrift i Skien, stiftet i
              2018. Vi er ikke bundet til én produsent — vi tilbyr dører og
              vinduer fra flere av Norges ledende leverandører, slik at vi
              kan finne løsningen som passer best til ditt behov, budsjett
              og ønskede design.
            </p>
          </div>

          <div style={{ flex: "1 1 320px" }}>
            <h2 style={{ color: "#0f172a", fontSize: "22px", fontWeight: "bold" }}>
              Fra rådgivning til ferdig montert
            </h2>
            <p style={{ lineHeight: 1.7, color: "#374151", maxWidth: "480px" }}>
              Vi følger deg gjennom hele prosessen: rådgivning, befaring,
              oppmåling og tilbud. Ønsker du montering, gjør Snekkerservice
              Grenland AS jobben — foreløpig innenfor vårt lokale nedslagsfelt
              i Grenland. Kunder fra resten av landet kan selvfølgelig handle
              produkter hos oss.
            </p>
          </div>

          <div style={{ flex: "1 1 320px" }}>
            <h2 style={{ color: "#0f172a", fontSize: "22px", fontWeight: "bold" }}>
              Enova-støtte
            </h2>
            <p style={{ lineHeight: 1.7, color: "#374151", maxWidth: "480px" }}>
              Siden høsten 2025 kan du søke Enova-støtte til nye vinduer og
              ytterdører som et eget tiltak. Vi hjelper deg gjerne å sjekke om
              boligen din kvalifiserer.{" "}
              <Link
                href="/enova-stotte"
                style={{ color: "#0f766e", fontWeight: "bold" }}
              >
                Les mer om Enova-støtte →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
