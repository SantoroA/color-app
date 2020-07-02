import React, { useState } from "react";
import "./ColorBox.css";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, hex } = props.color;
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <CopyToClipboard text={hex} onCopy={changeCopyState}>
      <div style={{ background: hex }} className="ColorBox">
        <div
          style={{ background: hex }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>COPIED!</h1>
          <p>{hex}</p>
        </div>
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
