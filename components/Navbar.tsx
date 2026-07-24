"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Hjem" },
  { href: "/produkter", label: "Produkter" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "#0f172a",
        padding: "10px clamp(20px, 6vw, 60px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        href="/"
        onClick={() => setOpen(false)}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          src="/logo-gdv.png"
          alt="Grenland Dør og Vindu AS"
          width={308}
          height={150}
          style={{ height: "64px", width: "auto" }}
          priority
        />
      </Link>

      <nav
        className="nav-links"
        style={{ alignItems: "center", gap: "30px" }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/tilbud"
          style={{
            backgroundColor: "#0f766e",
            color: "white",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Be om tilbud
        </Link>
      </nav>

      <button
        type="button"
        className="nav-toggle"
        onClick={() => setOpen((verdi) => !verdi)}
        aria-label={open ? "Lukk meny" : "Åpne meny"}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "26px",
          lineHeight: 1,
          cursor: "pointer",
          padding: "4px 8px",
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div
          className="nav-mobile-panel"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#0f172a",
            flexDirection: "column",
            gap: "4px",
            padding: "8px clamp(20px, 6vw, 60px) 24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "17px",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/tilbud"
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: "#0f766e",
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "14px 20px",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "14px",
            }}
          >
            Be om tilbud
          </Link>
        </div>
      )}
    </header>
  );
}
