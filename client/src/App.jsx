import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async (code) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/stats/${code}`
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const shortenUrl = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/shorten",
        {
          url,
        }
      );

      setShortUrl(response.data.shortUrl);
      setShortCode(response.data.shortCode);

      fetchStats(response.data.shortCode);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>Mini URL Shortener</h1>

        <p className="subtitle">
          Generate short links instantly
        </p>

        <input
          type="text"
          placeholder="Paste your URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={shortenUrl}>
          {loading ? "Generating..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <div className="result">

            <h3>Generated Link</h3>

            <div className="linkRow">

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  setTimeout(() => {
                    fetchStats(shortCode);
                  }, 1000);
                }}
              >
                {shortUrl}
              </a>

              <button
                className="copyBtn"
                onClick={copyToClipboard}
              >
                Copy
              </button>

            </div>

            {stats && (
              <div className="stats">

                <p>
                  <strong>Clicks:</strong> {stats.clicks}
                </p>

                <button
                  className="copyBtn"
                  style={{ marginTop: "10px" }}
                  onClick={() => fetchStats(shortCode)}
                >
                  Refresh Stats
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;