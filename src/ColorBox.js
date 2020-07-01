import React from "react";

export default function ColorBox(props) {
  return (
    <div style={{ background: props.color.color }} className="ColorBox">
      <span>{props.color.name}</span>
      <span>MORE</span>
    </div>
  );
}
