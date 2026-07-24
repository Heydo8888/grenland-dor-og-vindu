"use client";

import { useState, useRef, useEffect } from "react";

type Melding = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [apen, setApen] = useState(false);
  const [meldinger, setMeldinger] = useState<Melding[]>([
    {
      role: "assistant",
      content:
        "Hei! Jeg kan svare på enkle spørsmål om Grenland Dør og Vindu — åpningstider, leverandører, montering, Enova-støtte og mer. Hva lurer du på?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState(false);
  const [visTeaser, setVisTeaser] = useState(false);
  const bunnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bunnRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [meldinger, apen]);

  useEffect(() => {
    const timer = setTimeout(() => setVisTeaser(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  function apneChat() {
    setApen(true);
    setVisTeaser(false);
  }

  async function sendMelding(event: React.FormEvent) {
    event.preventDefault();
    const tekst = input.trim();
    if (!tekst || sender) return;

    const nyeMeldinger: Melding[] = [...meldinger, { role: "user", content: tekst }];
    setMeldinger(nyeMeldinger);
    setInput("");
    setSender(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nyeMeldinger }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Noe gikk galt.");
      }

      setMeldinger([...nyeMeldinger, { role: "assistant", content: result.tekst }]);
    } catch (error) {
      setMeldinger([
        ...nyeMeldinger,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Noe gikk galt. Prøv igjen senere eller ring oss.",
        },
      ]);
    } finally {
      setSender(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 100,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {apen && (
        <div
          style={{
            width: "min(340px, calc(100vw - 40px))",
            height: "460px",
            marginBottom: "12px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              color: "white",
              padding: "14px 16px",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Spør oss noe
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {meldinger.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: m.role === "user" ? "#0f766e" : "#f1f5f9",
                  color: m.role === "user" ? "white" : "#0f172a",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  maxWidth: "85%",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            ))}
            {sender && (
              <div
                style={{
                  alignSelf: "flex-start",
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                Skriver...
              </div>
            )}
            <div ref={bunnRef} />
          </div>

          <form
            onSubmit={sendMelding}
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv en melding..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={sender || !input.trim()}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#0f766e",
                color: "white",
                fontSize: "14px",
                cursor: sender ? "default" : "pointer",
                opacity: sender || !input.trim() ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {visTeaser && !apen && (
        <div
          style={{
            position: "absolute",
            bottom: "68px",
            right: "0",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "white",
            color: "#0f172a",
            padding: "10px 14px",
            borderRadius: "999px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            cursor: "pointer",
            animation: "chat-teaser-inn 0.3s ease-out",
          }}
          onClick={apneChat}
        >
          Bruk vår AI for spørsmål! 💬
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisTeaser(false);
            }}
            aria-label="Lukk"
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              fontSize: "14px",
              cursor: "pointer",
              padding: "0 0 0 4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => (apen ? setApen(false) : apneChat())}
        aria-label={apen ? "Lukk chat" : "Åpne chat"}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#0f766e",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {apen ? "✕" : "💬"}
      </button>
    </div>
  );
}
