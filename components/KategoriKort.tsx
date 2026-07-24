import type { Kategori } from "@/data/leverandorer";

const ikoner: Record<Kategori, string> = {
  Vindu: "🪟",
  Ytterdør: "🚪",
  Innerdør: "🚪",
  Garasjeport: "🚙",
  Dør: "🚪",
};

export default function KategoriKort({ kategori }: { kategori: Kategori }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "24px",
        textAlign: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>
        {ikoner[kategori]}
      </div>
      <div style={{ fontWeight: "bold", color: "#0f172a" }}>{kategori}</div>
    </div>
  );
}
