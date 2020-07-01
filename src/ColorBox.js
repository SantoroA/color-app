import React from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ColorBox(props) {
  const { name, color } = props.color;
  return (
    <CopyToClipboard text={color}>
      <div style={{ background: color }} className="ColorBox">
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">MORE</span>
      </div>
    </CopyToClipboard>
  );
}
