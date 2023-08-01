import "./globals.css";
export default function LoadingPage() {
  return (
    <div className="loading">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}
