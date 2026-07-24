export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "50px clamp(20px, 6vw, 60px)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <h3 style={{ marginTop: 0 }}>Grenland Dør og Vindu AS</h3>
          <p style={{ maxWidth: "320px", lineHeight: 1.6, color: "#cbd5e1" }}>
            Dører og vinduer fra flere av Norges ledende produsenter, med
            profesjonell rådgivning og montering i Grenland.
          </p>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>Kontakt</h4>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
            Herman Baggers gate 13
            <br />
            3717 Skien
            <br />
            95 76 13 50
          </p>
        </div>

        <div>
          <h4 style={{ marginTop: 0 }}>Åpningstider</h4>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
            Mandag–fredag: 08:00–16:00
            <br />
            Lørdag–søndag: Stengt
          </p>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          marginTop: "40px",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} Grenland Dør og Vindu AS. Org.nr. 820 596 102.
      </p>
    </footer>
  );
}
