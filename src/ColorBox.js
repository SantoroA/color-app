import React, { useState } from "react";
import "./ColorBox.css";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, color, moreUrl } = props;
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <CopyToClipboard text={color} onCopy={changeCopyState}>
      <div style={{ background: color }} className="ColorBox">
        <div
          style={{ background: color }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>COPIED!</h1>
          <p>{color}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
          <span className="see-more">MORE</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}
