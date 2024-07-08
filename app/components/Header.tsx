import { useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function Header({
  navigationState,
}: {
  navigationState: boolean;
}) {
  const location = useLocation();
  const isQueue = location.pathname === "/queue";

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src="/favicon.ico" alt="Sicierto" className="h-20 w-20" />
          </Link>
        </div>
        <div className="flex gap-4">
          {isQueue ? (
            <Link to="/" className="inline-flex items-center">
              <button
                className={`text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md border border-transparent ${
                  navigationState ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {!navigationState ? "Home" : "Loading..."}
              </button>
            </Link>
          ) : (
            <Link to="/queue" className="inline-flex items-center">
              <button
                className={`text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md border border-transparent ${
                  navigationState ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {!navigationState ? "Queue" : "Loading..."}
              </button>
            </Link>
          )}
          <Link to="/createPrompt" className="inline-flex items-center">
            <button
              className={`text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md border border-transparent ${
                navigationState ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {!navigationState ? "+ Create Video" : "Loading..."}
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
