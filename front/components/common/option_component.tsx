"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type Option = {
  title?: string;
  isSeparator?: boolean;
  onClick?: () => void;
};

type ThreeDotsProps = {
  padding: number;
  color: string;
  size?: number;
  options: Option[];
};

const ThreeDotsComponent: React.FC<ThreeDotsProps> = ({
  options,
  padding,
  color,
  size = 20,
}) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const updateCoords = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setCoords({
      top: r.bottom + window.scrollY,
      left: r.left + window.scrollX,
    });
  };

  useLayoutEffect(() => {
    if (open) updateCoords();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const handleOptionClick = (onClick?: () => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation(); 
      setOpen(false);
      onClick?.();
    };
  };

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <button
        ref={btnRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        style={{
          cursor: "pointer",
          padding: padding,
          fontSize: size,
          color: color,
        }}
        aria-label="Options"
      >
        &#8942;
      </button>

      {open && ReactDOM.createPortal(
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: coords.top + 10,
            left: coords.left + 15,
            background: "linear-gradient(-135deg, #6a4080 0%, #404080 100%)",
            borderRadius: 8,
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            zIndex: 99999,
            minWidth: 225,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            padding: "5px",
            borderTop: "2px solid rgba(255, 255, 255, 0.1)",
            transform: "translateX(-95%)",
          }}
          role="menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              position: "absolute",
              top: -6,
              right: 20,
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: "6px solid #69538d",
            }}
          />

          {options.map((option, idx) =>
            option.isSeparator ? (
              <div
                key={`sep-${idx}`}
                style={{
                  height: 1,
                  margin: "6px 0",
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                }}
                aria-hidden="true"
              />
            ) : (
              <button
                key={`opt-${idx}`}
                onClick={handleOptionClick(option.onClick)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: 5,
                  transition: "background 0.2s ease",
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.background =
                    "rgba(0, 0, 0, 0.22)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.background = "transparent")
                }
                role="menuitem"
                tabIndex={0}
              >
                {option.title}
              </button>
            )
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default ThreeDotsComponent;