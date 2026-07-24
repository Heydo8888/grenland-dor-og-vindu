import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enova-støtte",
  description:
    "Slik fungerer Enova-støtte til nye vinduer og ytterdører: støttebeløp, krav og hvordan du søker.",
};

const nokkeltall = [
  { tall: "25%", tekst: "av godkjente kostnader" },
  { tall: "400 kr/m²", tekst: "maks støtte per kvadratmeter" },
  { tall: "100 000 kr", tekst: "makstak per bolig (2025–2028)" },
];

const krav = [
  "Boligen må ha godkjent byggesøknad fra før 1. juli 1997.",
  "Kun helårsboliger — hytter og utleieboliger kvalifiserer ikke.",
  "Vinduer og dører må ha en U-verdi på 0,9 W/m²K eller lavere.",
];

const steg = [
  {
    tittel: "Få et tilbud fra oss",
    tekst: "Vi hjelper deg å velge vinduer/dører som oppfyller Enova sitt U-verdikrav.",
  },
  {
    tittel: "Søk støtte på enova.no",
    tekst: "Søknaden må sendes inn og godkjennes FØR arbeidet starter.",
  },
  {
    tittel: "Vent på godkjenning",
    tekst: "Godkjenningen er gyldig i 6 måneder — god tid til å planlegge montering.",
  },
  {
    tittel: "Vi monterer, du fakturerer Enova",
    tekst: "Etter montering laster du opp faktura i Enova sin søknadsportal for utbetaling.",
  },
];

export default function EnovaStottePage() {
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
            Statlig støtteordning
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            Enova-støtte til nye vinduer og dører
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#e2e8f0",
              margin: 0,
            }}
          >
            Siden høsten 2025 kan du søke Enova-støtte til nye vinduer og
            ytterdører som et eget tiltak — uten å måtte oppgradere hele
            boligen samtidig.
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
          {nokkeltall.map((fakta) => (
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
                style={{ fontSize: "26px", fontWeight: "bold", color: "#0f766e" }}
              >
                {fakta.tall}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>
                {fakta.tekst}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "60px",
            marginBottom: "60px",
          }}
        >
          <div style={{ flex: "1 1 320px" }}>
            <h2
              style={{ color: "#0f172a", fontSize: "22px", fontWeight: "bold" }}
            >
              Hvem kan søke?
            </h2>
            <ul
              style={{
                lineHeight: 1.8,
                color: "#374151",
                maxWidth: "480px",
                paddingLeft: "20px",
                margin: 0,
              }}
            >
              {krav.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>

          <div style={{ flex: "1 1 320px" }}>
            <h2
              style={{ color: "#0f172a", fontSize: "22px", fontWeight: "bold" }}
            >
              Slik går du frem
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {steg.map((s, i) => (
                <div key={s.tittel} style={{ display: "flex", gap: "14px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#0f172a",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 2px 0", fontSize: "15px" }}>
                      {s.tittel}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#6b7280",
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

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          <Link
            href="/tilbud"
            className="btn-primary"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              backgroundColor: "#0f766e",
              color: "white",
              borderRadius: "10px",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Be om tilbud
          </Link>

          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Vi hjelper deg gjerne med å sjekke om ditt hjem kvalifiserer.
          </p>
        </div>

        <p style={{ fontSize: "13px", color: "#9ca3af", maxWidth: "600px" }}>
          Støttebeløp og vilkår kan endres av Enova. Sjekk alltid{" "}
          <a
            href="https://www.enova.no"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0f766e" }}
          >
            enova.no
          </a>{" "}
          for oppdatert informasjon før du søker.
        </p>
      </div>
    </div>
  );
}
