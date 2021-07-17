import { useState } from "react";
import "./styles.css";

export default function App() {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  const handleSvgClick = (e) => {
    const position = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    points.length > 0 &&
      setLines((preLines) => [
        ...preLines,
        [points[points.length - 1].position, position]
      ]);
    setPoints((prePoints) => [
      ...prePoints,
      {
        name: `c${prePoints.length + 1}`,
        position
      }
    ]);
  };

  const hanleEntityClick = (e) => e.stopPropagation();
  const handleBtnClick = (e) => {
    setLines([]);
    setPoints([]);
  };

  return (
    <div className="App">
      <span>
        {points.length} Point, {lines.length} Line
      </span>
      <button style={{ marginLeft: "10px" }} onClick={handleBtnClick}>
        Clear
      </button>
      <svg width="100%" height="400" onClick={handleSvgClick}>
        {lines.map((line, idx) => (
          <line
            key={idx}
            x1={line[0][0]}
            y1={line[0][1]}
            x2={line[1][0]}
            y2={line[1][1]}
            stroke="blue"
            strokeWidth="4px"
          />
        ))}
        {points.map((point, idx) => (
          <circle
            key={idx}
            cx={point.position[0]}
            cy={point.position[1]}
            r="10"
            stroke="red"
            strokeWidth="3px"
            fill="pink"
            onClick={hanleEntityClick}
          />
        ))}
      </svg>
    </div>
  );
}
