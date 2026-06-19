import { useEffect, useRef } from "react";
import { formatStartDate } from "../utils/format";
import MatchInfoCard from "./details/MatchInfoCard";
import ScoreSummaryCard from "./details/ScoreSummaryCard";
import BatterStatsTable from "./details/BatterStatsTable";
import BowlerStatsTable from "./details/BowlerStatsTable";
import RecentBallsList from "./details/RecentBallsList";
import UdrsDetailsCard from "./details/UdrsDetailsCard";
import "./MatchDetails.css";

export default function MatchDetails({ data, onBack, onRefresh, refreshing }) {
  const refreshRef = useRef(onRefresh);
  useEffect(() => {
    refreshRef.current = onRefresh;
  }, [onRefresh]);

  const state = data?.state;

  useEffect(() => {
    const liveStates = ["Innings Break", "In Progress"];
    const isLiveState = liveStates.some(
      (s) => s.toLowerCase() === (state || "").toLowerCase()
    );

    if (!isLiveState) {
      return;
    }

    const timer = setInterval(() => {
      if (refreshRef.current) {
        refreshRef.current();
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [state]);

  if (!data) {
    return null;
  }

  const { status, matchInfo, live } = data;

  // Determine what components to show based on state
  const isPreview = (state || "").toLowerCase() === "preview";
  const isFinished = (state || "").toLowerCase() === "finished" || (state || "").toLowerCase() === "completed";
  const isInProgress = !isPreview && !isFinished; // In Progress, Stumps, etc.

  return (
    <div className="details-container">
      <header className="details-header">
        <button className="back-btn" onClick={onBack} title="Go Back">
          ←
        </button>
        <div className="details-header-center">
          <span
            className={`state-badge ${(state || "").toLowerCase().replace(" ", "-")}`}
          >
            {state}
          </span>
        </div>
        <button
          className="refresh-btn"
          onClick={onRefresh}
          disabled={refreshing}
          title={refreshing ? "Refreshing..." : "Refresh"}
        >
          <span className={`refresh-icon-anim ${refreshing ? "spinning" : ""}`}>↻</span>
        </button>
      </header>

      <main className="details-main">
        {/* Match Info shown at the top for Previews */}
        {isPreview && <MatchInfoCard matchInfo={matchInfo} />}

        {/* Score Summary shown if not preview */}
        {!isPreview && <ScoreSummaryCard live={live} status={status} />}

        {/* Live stats shown in progress */}
        {isInProgress && live && (
          <>
            <RecentBallsList recentBalls={live.recentBalls} />

            <div className="live-stats-row">
              <BatterStatsTable
                striker={live.striker}
                nonStriker={live.nonStriker}
              />
              <BowlerStatsTable
                bowlerStriker={live.bowlerStriker}
                bowlerNonStriker={live.bowlerNonStriker}
              />
            </div>

            <UdrsDetailsCard
              matchUdrs={live.matchUdrs}
              team1={matchInfo?.team1}
              team2={matchInfo?.team2}
            />
          </>
        )}

        {/* Match Info shown at the end for In Progress, Stumps, Finished matches */}
        {!isPreview && <MatchInfoCard matchInfo={matchInfo} />}

        {isPreview && (
          <div className="preview-placeholder-card">
            <h3>Match Preview</h3>
            <p>
              {matchInfo?.startDate
                ? `Match starts at ${formatStartDate(matchInfo.startDate)}`
                : status || "This match hasn't started yet. Check back when the toss is announced!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
