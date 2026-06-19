import { formatStartDate } from "../utils/format";
import "./MatchCard.css";

export default function MatchCard({ match, onClick }) {
  const isLive = match.statusType === "Live";

  return (
    <div className={`match-card ${isLive ? "is-live" : ""}`} onClick={() => onClick(match)}>
      <div className="card-header">
        <span className="series-name" title={match.seriesName}>
          {match.seriesName}
        </span>
        <div className="badge-row">
          <span className={`format-badge ${match.matchFormat}`}>{match.matchFormat}</span>
          <span className={`status-badge ${match.statusType}`}>
            {isLive && <span className="live-pulse"></span>}
            {match.statusType}
          </span>
        </div>
      </div>

      <div className="teams-row-wrapper">
        <div className="team-score-row">
          <div className="team-details" title={match.team1.name}>
            <img 
              src={match.team1.icon} 
              alt={match.team1.name} 
              className="team-icon"
              onError={(e) => {
                e.target.style.display = "none";
              }} 
            />
            <span className="team-shortname">{match.team1.shortName}</span>
          </div>
          <div className="team-score">{match.score.team1 || "-"}</div>
        </div>

        <div className="team-score-row">
          <div className="team-details" title={match.team2.name}>
            <img 
              src={match.team2.icon} 
              alt={match.team2.name} 
              className="team-icon"
              onError={(e) => {
                e.target.style.display = "none";
              }} 
            />
            <span className="team-shortname">{match.team2.shortName}</span>
          </div>
          <div className="team-score">{match.score.team2 || "-"}</div>
        </div>
      </div>

      <div className="card-footer-status">
        <span className="status-message">
          {match.state === "Preview" && match.startDate
            ? `Match starts at ${formatStartDate(match.startDate)}`
            : match.status}
        </span>
      </div>
    </div>
  );
}
