"use client";

import { useState } from "react";

type Status = "idle" | "sender" | "sendt" | "feil";

const lokaleOmrader = ["Skien", "Porsgrunn", "Bamble", "Siljan"];

export default function TilbudSkjema() {
  const [status, setStatus] = useState<Status>("idle");
  const [feilmelding, setFeilmelding] = useState("");
  const [kommune, setKommune] = useState("");
  const [onskerMontering, setOnskerMontering] = useState(true);

  const erLokalt = lokaleOmrader.includes(kommune);

  const minDato = (() => {
    const iMorgen = new Date();
    iMorgen.setDate(iMorgen.getDate() + 1);
    return iMorgen.toISOString().split("T")[0];
  })();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sender");
    setFeilmelding("");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("onskerMontering", String(erLokalt && onskerMontering));

    try {
      const response = await fetch("/api/tilbud", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Noe gikk galt.");
      }

      setStatus("sendt");
      form.reset();
      setKommune("");
      setOnskerMontering(true);
    } catch (error) {
      setStatus("feil");
      setFeilmelding(
        error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen."
      );
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#0f172a",
  };

  if (status === "sendt") {
    return (
      <div
        style={{
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#ecfdf5",
          border: "1px solid #a7f3d0",
          color: "#065f46",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0" }}>Takk for forespørselen!</h3>
        <p style={{ margin: 0 }}>
          Vi går gjennom henvendelsen og bekrefter befaringstidspunktet med
          deg på telefon eller e-post.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        maxWidth: "520px",
      }}
    >
      {/* Kontaktinfo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
        }}
      >
        <div>
          <label style={labelStyle} htmlFor="navn">
            Navn
          </label>
          <input style={inputStyle} type="text" id="navn" name="navn" required />
        </div>

        <div>
          <label style={labelStyle} htmlFor="telefon">
            Telefon
          </label>
          <input
            style={inputStyle}
            type="tel"
            id="telefon"
            name="telefon"
            required
          />
        </div>

        <div>
          <label style={labelStyle} htmlFor="epost">
            E-post
          </label>
          <input
            style={inputStyle}
            type="email"
            id="epost"
            name="epost"
            required
          />
        </div>

        <div>
          <label style={labelStyle} htmlFor="adresse">
            Adresse
          </label>
          <input
            style={inputStyle}
            type="text"
            id="adresse"
            name="adresse"
            placeholder="Gate, postnummer og sted"
            required
          />
        </div>
      </div>

      {/* Om prosjektet */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "18px",
          }}
        >
          <div>
            <label style={labelStyle} htmlFor="kommune">
              Kommune
            </label>
            <select
              style={inputStyle}
              id="kommune"
              name="kommune"
              required
              value={kommune}
              onChange={(event) => setKommune(event.target.value)}
            >
              <option value="">Velg kommune</option>
              <option value="Skien">Skien</option>
              <option value="Porsgrunn">Porsgrunn</option>
              <option value="Bamble">Bamble</option>
              <option value="Siljan">Siljan</option>
              <option value="Annet">Annet sted i Norge</option>
            </select>
          </div>

          <div>
            <label style={labelStyle} htmlFor="type">
              Hva gjelder det?
            </label>
            <select style={inputStyle} id="type" name="type" required>
              <option value="">Velg et alternativ</option>
              <option value="Vindu">Vindu</option>
              <option value="Ytterdør">Ytterdør</option>
              <option value="Innerdør">Innerdør</option>
              <option value="Flere typer">Flere typer</option>
            </select>
          </div>
        </div>

        {kommune && (
          <p
            style={{
              fontSize: "13px",
              margin: 0,
              color: erLokalt ? "#047857" : "#92400e",
            }}
          >
            {erLokalt
              ? "Montering er tilgjengelig i ditt område."
              : "Montering tilbys foreløpig kun i Grenland-området, men du kan fortsatt bestille produkter hos oss."}
          </p>
        )}

        {erLokalt && (
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              color: "#0f172a",
            }}
          >
            <input
              type="checkbox"
              checked={onskerMontering}
              onChange={(event) => setOnskerMontering(event.target.checked)}
            />
            Jeg ønsker også montering av Snekkerservice Grenland
          </label>
        )}

        <div>
          <label style={labelStyle} htmlFor="antallOgMal">
            Omtrentlig antall/mål (valgfritt)
          </label>
          <textarea
            style={{ ...inputStyle, resize: "vertical" }}
            id="antallOgMal"
            name="antallOgMal"
            rows={2}
            placeholder="F.eks. 3 vinduer, ca. 120x150 cm — vi måler gjerne opp for deg"
          />
        </div>

        <div>
          <label style={labelStyle} htmlFor="bilder">
            Last opp bilder (valgfritt)
          </label>
          <input
            style={inputStyle}
            type="file"
            id="bilder"
            name="bilder"
            accept="image/*"
            multiple
          />
        </div>
      </div>

      {/* Befaring */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e5e7eb",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "15px", color: "#0f172a" }}>
            Book befaring (valgfritt)
          </h3>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
            Foreslå en dato som passer for deg, så bekrefter vi tidspunktet.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "18px",
          }}
        >
          <div>
            <label style={labelStyle} htmlFor="onsketDato">
              Ønsket dato
            </label>
            <input
              style={inputStyle}
              type="date"
              id="onsketDato"
              name="onsketDato"
              min={minDato}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="onsketTidspunkt">
              Ønsket tidspunkt
            </label>
            <select
              style={inputStyle}
              id="onsketTidspunkt"
              name="onsketTidspunkt"
              defaultValue="Fleksibel"
            >
              <option value="Formiddag (08–12)">Formiddag (08–12)</option>
              <option value="Ettermiddag (12–16)">Ettermiddag (12–16)</option>
              <option value="Fleksibel">Fleksibel</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="melding">
          Annen informasjon (valgfritt)
        </label>
        <textarea
          style={{ ...inputStyle, resize: "vertical" }}
          id="melding"
          name="melding"
          rows={3}
        />
      </div>

      {status === "feil" && (
        <p style={{ color: "#b91c1c", margin: 0, fontSize: "14px" }}>
          {feilmelding}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sender"}
        className="btn-primary"
        style={{
          padding: "16px 32px",
          backgroundColor: "#0f766e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: status === "sender" ? "default" : "pointer",
          opacity: status === "sender" ? 0.7 : 1,
        }}
      >
        {status === "sender" ? "Sender..." : "Send tilbudsforespørsel"}
      </button>
    </form>
  );
}
