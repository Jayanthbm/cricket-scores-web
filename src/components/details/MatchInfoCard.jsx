import "./details.css";

export default function MatchInfoCard({ matchInfo }) {
  if (!matchInfo) {
    return null;
  }

  const {
    seriesName,
    matchDesc,
    venueText,
    startDateText,
    matchFormat,
    matchType,
    team1,
    team2,
    toss,
  } = matchInfo;

  return (
    <div className="details-card">
      <div className="details-card-title">Match Info</div>
      
      <div className="match-info-header">
        {seriesName && <span className="match-series">{seriesName}</span>}
        {matchDesc && <h2 className="match-description">{matchDesc}</h2>}
      </div>

      <div className="teams-display">
        {team1 && (
          <div className="team-block">
            {team1.icon && (
              <img
                src={team1.icon}
                alt={team1.name || "Team 1"}
                className="team-logo"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <span className="team-name-long" title={team1.name || ""}>
              {team1.shortName || team1.name}
            </span>
          </div>
        )}

        <div className="team-vs">VS</div>

        {team2 && (
          <div className="team-block">
            {team2.icon && (
              <img
                src={team2.icon}
                alt={team2.name || "Team 2"}
                className="team-logo"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <span className="team-name-long" title={team2.name || ""}>
              {team2.shortName || team2.name}
            </span>
          </div>
        )}
      </div>

      <div className="match-meta-grid">
        {matchFormat && (
          <div className="meta-item">
            <span className="meta-label">Format</span>
            <span className="meta-value">{matchFormat}</span>
          </div>
        )}
        {matchType && (
          <div className="meta-item">
            <span className="meta-label">Type</span>
            <span className="meta-value">{matchType}</span>
          </div>
        )}
        {venueText && (
          <div className="meta-item">
            <span className="meta-label">Venue</span>
            <span className="meta-value">{venueText}</span>
          </div>
        )}
        {startDateText && (
          <div className="meta-item">
            <span className="meta-label">Date</span>
            <span className="meta-value">{startDateText}</span>
          </div>
        )}
      </div>

      {toss && toss.winner && toss.decision && (
        <div className="toss-banner">
          <strong>Toss:</strong> {toss.winner} won the toss and elected to {toss.decision.toLowerCase()}
        </div>
      )}
    </div>
  );
}
