import { Link } from "@remix-run/react";

export default function Header() {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
            <div>
                <Link to="/">
                    <img src="/favicon.ico" alt="Sicierto" />
                </Link>
            </div>
            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/queue">
                    <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        Queue
                    </button>
                </Link>
                <Link to="/make-it-popup">
                    <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        + Create Video
                    </button>
                </Link>
            </div>
        </header>
    )
}