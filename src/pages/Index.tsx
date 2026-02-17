import { useState, useCallback, useRef } from "react";
import Emoji from "@/components/Emoji";

const HEARTS = ["🫶", "🩷", "✨", "🦋", "💫", "🌸", "🫧", "💐", "🧸", "🪻"];

function FloatingHeart({ index }: { index: number }) {
  const heart = HEARTS[index % HEARTS.length];
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const delay = Math.random() * 8;
  const size = 20 + Math.random() * 28;

  return (
    <span
      className="fixed pointer-events-none animate-heart-rise"
      style={{
        left: `${left}%`,
        bottom: 0,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <Emoji emoji={heart} size={size} />
    </span>
  );
}

function Confetti({ index }: { index: number }) {
  const colors = [
    "hsl(350, 80%, 55%)",
    "hsl(20, 90%, 70%)",
    "hsl(330, 70%, 60%)",
    "hsl(50, 90%, 65%)",
    "hsl(0, 0%, 100%)",
  ];
  const left = Math.random() * 100;
  const duration = 2 + Math.random() * 3;
  const delay = Math.random() * 1.5;
  const size = 6 + Math.random() * 8;

  return (
    <span
      className="fixed pointer-events-none animate-confetti rounded-sm"
      style={{
        left: `${left}%`,
        top: 0,
        width: size,
        height: size * 1.5,
        backgroundColor: colors[index % colors.length],
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (!noBtnRef.current || !containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const btn = noBtnRef.current.getBoundingClientRect();
    const maxX = container.width - btn.width - 20;
    const maxY = container.height - btn.height - 20;
    const x = Math.random() * maxX + 10;
    const y = Math.random() * maxY + 10;
    noBtnRef.current.style.position = "absolute";
    noBtnRef.current.style.left = `${x}px`;
    noBtnRef.current.style.top = `${y}px`;
    noBtnRef.current.style.transition = "left 0.3s ease-out, top 0.3s ease-out";
  }, []);

  if (accepted) {
    return (
      <div className="gradient-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <Confetti key={`c-${i}`} index={i} />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingHeart key={`h-${i}`} index={i} />
        ))}
        <div className="animate-celebrate text-center z-10 px-6">
          <h1 className="font-script text-6xl md:text-8xl text-primary mb-6">
            YAY!!! <Emoji emoji="🫶" size={64} />
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Best decision ever <Emoji emoji="🥹" size={32} /> <Emoji emoji="✨" size={32} />
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground">
            I love you so much <Emoji emoji="🩷" size={28} /> <Emoji emoji="🫧" size={28} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="gradient-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingHeart key={i} index={i} />
      ))}

      <div className="z-10 text-center px-6">
        <div className="mb-6 animate-float">
          <Emoji emoji="🫶" size={64} />
        </div>
        <h1>MAROUUA<h1/><br>
        <h1 className="font-script text-5xl md:text-7xl text-primary mb-4 drop-shadow-sm">
          Will you be my Valentine?
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Choose wisely... <Emoji emoji="🦋" size={20} /> <Emoji emoji="✨" size={20} />
        </p>

        <div className="flex gap-6 justify-center items-center relative min-h-[80px]">
          <button
            onClick={() => setAccepted(true)}
            className="gradient-romantic text-primary-foreground font-bold text-xl px-10 py-4 rounded-full shadow-romantic animate-pulse-glow hover:scale-110 transition-transform duration-200 z-10 flex items-center gap-2"
          >
            YES <Emoji emoji="🤍" size={22} />
          </button>

          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="bg-card text-foreground font-semibold text-lg px-8 py-3 rounded-full border border-border shadow-sm hover:shadow-md transition-all duration-200 z-10 flex items-center gap-2"
          >
            No <Emoji emoji="🙈" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
