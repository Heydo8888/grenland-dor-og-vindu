import Link from "next/link";
import { Leverandor } from "@/data/leverandorer";

export default function LeverandorCard({
  leverandor,
}: {
  leverandor: Leverandor;
}) {
  return (
    <Link
      href={`/produkter/${leverandor.id}`}
      className="leverandor-card"
      style={{
        display: "block",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          height: "120px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #0f766e 60%, #14b8a6 100%)",
        }}
      />

      <div style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 6px 0" }}>{leverandor.navn}</h3>

        {leverandor.sted && (
          <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#6b7280" }}>
            {leverandor.sted}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          {leverandor.kategorier.map((kategori) => (
            <span
              key={kategori}
              style={{
                fontSize: "12px",
                backgroundColor: "#f1f5f9",
                color: "#0f172a",
                padding: "3px 10px",
                borderRadius: "999px",
              }}
            >
              {kategori}
            </span>
          ))}
        </div>

        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
          Se leverandøren →
        </p>
      </div>
    </Link>
  );
}
