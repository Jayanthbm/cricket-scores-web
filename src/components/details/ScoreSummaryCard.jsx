import "./details.css";

export default function ScoreSummaryCard({ live, status }) {
  if (!live || (!live.currentScore && !live.overs)) {
    return null;
  }

  const {
    battingTeam,
    currentScore,
    overs,
    runRate,
    requiredRunRate,
    remRunsToWin,
    partnershipText,
    lastWicket,
  } = live;

  const hasScore = currentScore && currentScore !== "0/0";

  if (!hasScore && !status) {
    return null;
  }

  return (
    <div className="details-card score-summary-card">
      <div className="score-summary-main">
        <div className="score-summary-primary">
          <h1 className="score-team-runs">
            {battingTeam && `${battingTeam} `}
            <span className="score-runs">{currentScore}</span>
          </h1>
          {overs && <span className="score-overs">({overs} overs)</span>}
        </div>
        {status && <div className="score-status-text">{status}</div>}
      </div>

      <div className="score-details-row">
        {runRate > 0 && (
          <div className="score-detail-item">
            <span className="detail-label">Run Rate</span>
            <span className="detail-value">{runRate}</span>
          </div>
        )}

        {requiredRunRate > 0 && (
          <div className="score-detail-item">
            <span className="detail-label">Req. RR</span>
            <span className="detail-value">{requiredRunRate}</span>
          </div>
        )}

        {remRunsToWin > 0 && (
          <div className="score-detail-item">
            <span className="detail-label">Runs to Win</span>
            <span className="detail-value">{remRunsToWin}</span>
          </div>
        )}

        {partnershipText && partnershipText !== "0 (0)" && (
          <div className="score-detail-item">
            <span className="detail-label">Partnership</span>
            <span className="detail-value">{partnershipText}</span>
          </div>
        )}
      </div>

      {lastWicket && (
        <div className="score-last-wicket">
          <span className="last-wicket-label">Last Wicket</span>
          <p className="last-wicket-value">{lastWicket}</p>
        </div>
      )}
    </div>
  );
}

