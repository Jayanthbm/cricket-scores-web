import { useEffect, useState } from "react";
import { getMatches, getMatchDetails } from "./api/matches";
import MatchCard from "./components/MatchCard";
import MatchDetails from "./components/MatchDetails";
import "./App.css";

function getRelativeTime(timestamp) {
  if (!timestamp) {
    return "-";
  }

  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days}d ago`;
}

export default function App() {
  const [matches, setMatches] = useState([]);
  const [meta, setMeta] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsRefreshing, setDetailsRefreshing] = useState(false);

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    let active = true;
    getMatches()
      .then((data) => {
        if (active) {
          setMatches(data.matches || []);
          setMeta(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedMatch) {
      return;
    }

    const timer = setInterval(() => {
      getMatches()
        .then((data) => {
          setMatches(data.matches || []);
          setMeta(data);
        })
        .catch((err) => {
          console.error("Dashboard auto-refresh failed", err);
        });
    }, 15000);

    return () => clearInterval(timer);
  }, [selectedMatch]);

  async function refreshMatches() {
    try {
      setRefreshing(true);

      const data = await getMatches();

      setMatches(data.matches || []);
      setMeta(data);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }

  async function openMatch(match) {
    try {
      setDetailsLoading(true);

      const details = await getMatchDetails(match.matchId);

      setSelectedMatch(match);
      setMatchDetails(details);
    } catch (err) {
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }
  }

  async function refreshMatchDetails() {
    if (!selectedMatch) {
      return;
    }

    try {
      setDetailsRefreshing(true);

      const details = await getMatchDetails(selectedMatch.matchId);

      setMatchDetails(details);
    } catch (err) {
      console.error(err);
    } finally {
      setDetailsRefreshing(false);
    }
  }

  function closeMatch() {
    setSelectedMatch(null);
    setMatchDetails(null);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p className="loading-text">Fetching matches...</p>
      </div>
    );
  }

  if (detailsLoading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p className="loading-text">Fetching match details...</p>
      </div>
    );
  }

  if (selectedMatch && matchDetails) {
    return (
      <MatchDetails
        data={matchDetails}
        onBack={closeMatch}
        onRefresh={refreshMatchDetails}
        refreshing={detailsRefreshing}
      />
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title-section">
          <h1 className="main-title">
            Cricket <span className="highlight">Scores</span>
          </h1>
          <p className="subtitle">Real-time live cricket scores</p>
        </div>

        <div className="header-actions">
          <button
            className="refresh-icon-btn"
            onClick={refreshMatches}
            disabled={refreshing}
            title={refreshing ? "Syncing..." : "Refresh"}
          >
            <span className={`refresh-icon-anim ${refreshing ? "spinning" : ""}`}>↻</span>
          </button>

          {meta?.lastUpdated && (
            <span className="synced-caption">
              Synced {getRelativeTime(meta.lastUpdated)}
            </span>
          )}
        </div>
      </header>

      {refreshing && <div className="header-refresh-progress-bar" />}

      <main className="dashboard-content">
        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard key={match.matchId} match={match} onClick={openMatch} />
          ))}
        </div>
      </main>
    </div>
  );
}
