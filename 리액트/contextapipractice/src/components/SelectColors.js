import React from "react";
import ColorConsumer from "../contexts/color";

const colors = [
  "black",
  "white",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: `24px`,
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => actions.setBackgroundColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  actions.setFontColor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
};

export default SelectColors;
