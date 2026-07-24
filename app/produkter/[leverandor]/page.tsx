import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { leverandorer } from "@/data/leverandorer";

export function generateStaticParams() {
  return leverandorer.map((leverandor) => ({ leverandor: leverandor.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ leverandor: string }>;
}): Promise<Metadata> {
  const { leverandor: id } = await params;
  const leverandor = leverandorer.find((l) => l.id === id);

  if (!leverandor) {
    return { title: "Leverandør ikke funnet" };
  }

  return {
    title: leverandor.navn,
    description: `Dører og vinduer fra ${leverandor.navn}${
      leverandor.sted ? ` (${leverandor.sted})` : ""
    }, levert av Grenland Dør og Vindu AS.`,
  };
}

export default async function LeverandorPage({
  params,
}: {
  params: Promise<{ leverandor: string }>;
}) {
  const { leverandor: id } = await params;
  const leverandor = leverandorer.find((l) => l.id === id);

  if (!leverandor) {
    notFound();
  }

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
          <Link
            href="/produkter"
            style={{
              color: "#e2e8f0",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            ← Tilbake til alle leverandører
          </Link>

          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 44px)",
              lineHeight: 1.15,
              margin: "16px 0 8px 0",
            }}
          >
            {leverandor.navn}
          </h1>

          {leverandor.sted && (
            <p style={{ fontSize: "16px", color: "#e2e8f0", margin: 0 }}>
              {leverandor.sted}
            </p>
          )}
        </div>
      </section>

      <div style={{ padding: "clamp(28px, 6vw, 60px)" }}>
        <p
          style={{
            maxWidth: "600px",
            lineHeight: 1.7,
            color: "#374151",
            marginBottom: "30px",
          }}
        >
          Produktutvalget fra {leverandor.navn} publiseres her så snart vi har
          mottatt produktbilder og -data fra leverandøren. Fram til da kan du
          se hele utvalget deres på nettsiden deres, eller be oss om et
          tilbud direkte.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
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
            Be om tilbud på {leverandor.navn}-produkter
          </Link>

          <a
            href={leverandor.nettside}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              backgroundColor: "white",
              color: "#111827",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Se {leverandor.navn} sin nettside ↗
          </a>
        </div>
      </div>
    </div>
  );
}
