import "./details.css";

export default function BowlerStatsTable({ bowlerStriker, bowlerNonStriker }) {
  // Only render if we have at least one active bowler with a name
  const hasStriker = bowlerStriker && bowlerStriker.name;
  const hasNonStriker = bowlerNonStriker && bowlerNonStriker.name;

  if (!hasStriker && !hasNonStriker) {
    return null;
  }

  const bowlersList = [];
  if (hasStriker) {
    bowlersList.push({ ...bowlerStriker, isActive: true });
  }
  if (hasNonStriker) {
    bowlersList.push({ ...bowlerNonStriker, isActive: false });
  }

  return (
    <div className="details-card">
      <div className="details-card-title">Bowling</div>
      <div className="stats-table-wrapper">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Bowler</th>
              <th>Overs</th>
              <th>Maidens</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th>Economy</th>
            </tr>
          </thead>
          <tbody>
            {bowlersList.map((bowler, idx) => (
              <tr 
                key={idx} 
                className={bowler.isActive ? "striker-active" : ""}
              >
                <td>
                  <strong>{bowler.name}</strong>
                  {bowler.isActive && <span className="active-asterisk">*</span>}
                </td>
                <td>{bowler.overs}</td>
                <td>{bowler.maidens}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
                <td>
                  {typeof bowler.economy === "number"
                    ? bowler.economy.toFixed(2)
                    : bowler.economy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
