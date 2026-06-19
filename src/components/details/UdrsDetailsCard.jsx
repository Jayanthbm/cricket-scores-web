import "./details.css";

export default function UdrsDetailsCard({ matchUdrs, team1, team2 }) {
  if (!matchUdrs) {
    return null;
  }

  const {
    team1Remaining,
    team2Remaining,
    team1Successful,
    team1Unsuccessful,
    team2Successful,
    team2Unsuccessful,
  } = matchUdrs;

  const team1Name = (team1 && (team1.shortName || team1.name)) || "Team 1";
  const team2Name = (team2 && (team2.shortName || team2.name)) || "Team 2";

  // Check if we have valid DRS values to show
  const hasDRSData = typeof team1Remaining === "number" || typeof team2Remaining === "number";

  if (!hasDRSData) {
    return null;
  }

  return (
    <div className="details-card">
      <div className="details-card-title">DRS Reviews Remaining</div>
      <div className="drs-grid">
        <div className="drs-team-box">
          <div className="drs-team-name">{team1Name}</div>
          <div className="drs-reviews">{team1Remaining}</div>
          {(typeof team1Successful === "number" || typeof team1Unsuccessful === "number") && (
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              S: {team1Successful || 0} | U: {team1Unsuccessful || 0}
            </div>
          )}
        </div>

        <div className="drs-team-box">
          <div className="drs-team-name">{team2Name}</div>
          <div className="drs-reviews">{team2Remaining}</div>
          {(typeof team2Successful === "number" || typeof team2Unsuccessful === "number") && (
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              S: {team2Successful || 0} | U: {team2Unsuccessful || 0}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
