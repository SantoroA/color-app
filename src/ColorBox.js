import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import "./ColorBox.css";

export default function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, color, moreUrl, showLink } = props;
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const isDarkColor = chroma(color).luminance() <= 0.08;
  const isLightColor = chroma(color).luminance() >= 0.5;
  return (
    <CopyToClipboard text={color} onCopy={changeCopyState}>
      <div style={{ background: color }} className="ColorBox">
        <div
          style={{ background: color }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>COPIED!</h1>
          <p className={isLightColor && "dark-text"}>{color}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor && "light-text"}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && "dark-text"}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className={`see-more ${isLightColor && "dark-text"}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
