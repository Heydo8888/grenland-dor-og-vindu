"use client";

import { useState } from "react";

type Status = "idle" | "sender" | "sendt" | "feil";

export default function KontaktSkjema() {
  const [status, setStatus] = useState<Status>("idle");
  const [feilmelding, setFeilmelding] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sender");
    setFeilmelding("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          navn: data.get("navn"),
          telefon: data.get("telefon"),
          epost: data.get("epost"),
          gjelder: data.get("gjelder"),
          melding: data.get("melding"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Noe gikk galt.");
      }

      setStatus("sendt");
      form.reset();
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
        <h3 style={{ margin: "0 0 8px 0" }}>Takk for henvendelsen!</h3>
        <p style={{ margin: 0 }}>
          Vi har mottatt meldingen din og tar kontakt så snart som mulig.
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
        maxWidth: "480px",
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
        <label style={labelStyle} htmlFor="gjelder">
          Hva gjelder henvendelsen?
        </label>
        <select style={inputStyle} id="gjelder" name="gjelder" required>
          <option value="">Velg et alternativ</option>
          <option value="Tilbud på dør/vindu">Tilbud på dør/vindu</option>
          <option value="Befaring og oppmåling">Befaring og oppmåling</option>
          <option value="Montering">Montering</option>
          <option value="Generelt spørsmål">Generelt spørsmål</option>
          <option value="Annet">Annet</option>
        </select>
      </div>

      <div>
        <label style={labelStyle} htmlFor="melding">
          Melding (valgfritt)
        </label>
        <textarea
          style={{ ...inputStyle, resize: "vertical" }}
          id="melding"
          name="melding"
          rows={4}
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
        {status === "sender" ? "Sender..." : "Send henvendelse"}
      </button>
    </form>
  );
}
