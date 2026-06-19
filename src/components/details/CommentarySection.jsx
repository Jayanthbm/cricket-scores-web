import "./details.css";

export default function CommentarySection({ commentary }) {
  if (!commentary || commentary.length === 0) {
    return (
      <div className="details-card">
        <div className="details-card-title">Commentary</div>
        <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          No commentary details available yet.
        </div>
      </div>
    );
  }

  const getEventClass = (event) => {
    const lower = (event || "").toLowerCase();
    if (lower.includes("wicket")) {
      return "wicket-event";
    }
    if (lower.includes("four")) {
      return "four-event";
    }
    if (lower.includes("six")) {
      return "six-event";
    }
    return "";
  };

  return (
    <div className="details-card">
      <div className="details-card-title">Commentary</div>
      <div className="commentary-list">
        {commentary.map((item, idx) => (
          <div key={idx} className="commentary-row">
            <div className="commentary-left">
              {item.over && <span className="commentary-over-num">{item.over}</span>}
              {item.event && item.event !== "NONE" && (
                <span className={`commentary-event-tag ${getEventClass(item.event)}`}>
                  {item.event}
                </span>
              )}
            </div>
            <div className="commentary-right">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
