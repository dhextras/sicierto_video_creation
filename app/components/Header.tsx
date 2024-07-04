import { useState } from "react";
import { Link } from "@remix-run/react";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div>
          <Link to="/">
            <img src="/favicon.ico" alt="Sicierto" />
          </Link>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          {false ? (
            <Link to="/">
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Home
              </button>
            </Link>
          ) : (
            <Link to="/queue">
              <button
                className="hover:bg-blue-600 bg-blue-500"
                style={{
                  padding: "10px",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Queue
              </button>
            </Link>
          )}
          <Link to="/createPrompt">
            <button
              className="hover:bg-blue-600 bg-blue-500"
              style={{
                padding: "10px",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              + Create Video
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
