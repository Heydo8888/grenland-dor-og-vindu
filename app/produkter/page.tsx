import type { Metadata } from "next";
import { leverandorer } from "@/data/leverandorer";
import LeverandorCard from "@/components/LeverandorCard";

export const metadata: Metadata = {
  title: "Produkter",
  description:
    "Dører og vinduer fra Harmonie, Natre, Norwin, Bjervamoen, Gilje, Uldal og Vatnestrøm — vi hjelper deg finne riktig løsning, uansett leverandør.",
};

export default function ProdukterPage() {
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
            Ingen bindinger til én produsent
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            Produkter fra flere av Norges ledende leverandører
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#e2e8f0",
              margin: 0,
            }}
          >
            Vi shopper markedet for deg — og finner løsningen som passer best
            til ditt hjem, budsjett og ønskede design.
          </p>
        </div>
      </section>

      <div style={{ padding: "50px clamp(20px, 6vw, 60px) 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {leverandorer.map((leverandor) => (
            <LeverandorCard key={leverandor.id} leverandor={leverandor} />
          ))}
        </div>
      </div>
    </div>
  );
}
