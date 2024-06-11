import { Link } from "@remix-run/react";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
}

export default function VideoListItem({ video }: { video: Video }) {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Link to={`/video-viewer/${video.id}`} className="video-link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={video.thumbnail} alt={video.title} />
          </div>
        </Link>
        <div>{video.title}</div>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Delete</button>
        <Link to="/post-video">
          <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Post</button>
        </Link>
      </div>
    </div>
  );
}
