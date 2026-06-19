import "./details.css";

export default function BatterStatsTable({ striker, nonStriker }) {
  // Only render if we have at least one active batsman with a name
  const hasStriker = striker && striker.name;
  const hasNonStriker = nonStriker && nonStriker.name;

  if (!hasStriker && !hasNonStriker) {
    return null;
  }

  const battersList = [];
  if (hasStriker) {
    battersList.push({ ...striker, isStriker: true });
  }
  if (hasNonStriker) {
    battersList.push({ ...nonStriker, isStriker: false });
  }

  return (
    <div className="details-card">
      <div className="details-card-title">Batting</div>
      <div className="stats-table-wrapper">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Batter</th>
              <th>Runs</th>
              <th>Balls</th>
              <th>4s</th>
              <th>6s</th>
              <th>S/R</th>
            </tr>
          </thead>
          <tbody>
            {battersList.map((batter, idx) => (
              <tr 
                key={idx} 
                className={batter.isStriker ? "striker-active" : ""}
              >
                <td>
                  <strong>{batter.name}</strong>
                  {batter.isStriker && <span className="active-asterisk">*</span>}
                </td>
                <td>{batter.runs}</td>
                <td>{batter.balls}</td>
                <td>{batter.fours}</td>
                <td>{batter.sixes}</td>
                <td>
                  {typeof batter.strikeRate === "number"
                    ? batter.strikeRate.toFixed(2)
                    : batter.strikeRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
