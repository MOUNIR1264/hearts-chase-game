import React from "react";

const twemojiBase = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/";

function emojiToCodepoint(emoji: string): string {
  const codepoints: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp && cp !== 0xfe0f) {
      codepoints.push(cp.toString(16));
    }
  }
  return codepoints.join("-");
}

interface EmojiProps {
  emoji: string;
  size?: number;
  className?: string;
}

const Emoji: React.FC<EmojiProps> = ({ emoji, size = 24, className = "" }) => {
  const codepoint = emojiToCodepoint(emoji);
  const src = `${twemojiBase}${codepoint}.svg`;

  return (
    <img
      src={src}
      alt={emoji}
      draggable={false}
      className={`inline-block ${className}`}
      style={{ width: size, height: size, verticalAlign: "-0.1em" }}
    />
  );
};

export default Emoji;
