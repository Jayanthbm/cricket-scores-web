import "./details.css";

export default function RecentBallsList({ recentBalls }) {
  if (!recentBalls || recentBalls.length === 0) {
    return null;
  }

  const getBallClass = (ball) => {
    const lower = ball.toString().toLowerCase();
    if (lower.includes("w") && !lower.includes("wd")) {
      return "wicket";
    }
    if (ball === "4") {
      return "boundary-four";
    }
    if (ball === "6") {
      return "boundary-six";
    }
    if (lower.includes("wd") || lower.includes("nb")) {
      return "wide";
    }
    return "normal";
  };

  return (
    <div className="details-card">
      <div className="details-card-title">Recent Balls</div>
      <div className="recent-balls-container">
        {recentBalls.map((ball, idx) => (
          <span 
            key={idx} 
            className={`recent-ball-badge ${getBallClass(ball)}`}
            title={`Ball ${idx + 1}: ${ball}`}
          >
            {ball}
          </span>
        ))}
      </div>
    </div>
  );
}
