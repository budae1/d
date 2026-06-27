import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import prologueImg from "@assets/프롤로그_1782568517991.png";
import titleImg from "@assets/4d9e4798-b924-4d4b-bc67-3cb7ef21cf84-removebg-preview_1782569072678.png";
import sujinImg from "@assets/b1_1782568517989.png";
import areumImg from "@assets/c1_1782568517990.png";
import yunaImg from "@assets/d1_1782568517990.png";
import haeunImg from "@assets/a1_1782568517989.png";
import daeunImg from "@assets/e1_1782568517990.png";

const queryClient = new QueryClient();

const characters = [
  {
    id: "heodaeun",
    name: "허다은",
    age: 35,
    role: "의붓엄마",
    desc: "아들의 귀여운 자지를 걱정하는 헌신적이고 다정한 의붓엄마.",
    img: haeunImg,
    accent: "#c9a0dc",
  },
  {
    id: "hongseulah",
    name: "홍슬아",
    age: 23,
    role: "간호사",
    desc: "발랄하고 도발적인 간호사, 묵직한 대물만을 선호하며 소추는 가차 없이 비웃음.",
    img: sujinImg,
    accent: "#ff6eb4",
  },
  {
    id: "imjuhee",
    name: "임주희",
    age: 35,
    role: "수간호사",
    desc: "상냥한 미소 뒤에 본색을 감춘 아줌마, 작고 귀여운 것만 보면 참지 못하고 환장하는 소추 애호가.",
    img: areumImg,
    accent: "#6ec6a0",
  },
  {
    id: "hanyuri",
    name: "한유리",
    age: 32,
    role: "레지던트",
    desc: "모든 것을 데이터로 분석하는 냉철한 레지던트, 대물만 인정할 뿐 작은 성기에는 일말의 관심도 없음.",
    img: yunaImg,
    accent: "#7eb8e8",
  },
  {
    id: "kimsoyl",
    name: "김소율",
    age: 21,
    role: "몰래 훔쳐보는 변태",
    desc: "정밀 검사실에 숨어들어 환자들의 은밀한 부위를 훔쳐보며 자위를 하는 변태.",
    img: daeunImg,
    accent: "#8a8a8a",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function BubbleNavBtn({
  children,
  onClick,
  gradient,
  shadow,
}: {
  children: React.ReactNode;
  onClick: () => void;
  gradient: string;
  shadow: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden select-none transition-transform duration-150 active:scale-95 hover:scale-105"
      style={{
        background: gradient,
        borderRadius: "9999px",
        padding: "4px 13px",
        fontWeight: 900,
        fontSize: "12px",
        color: "#fff",
        letterSpacing: "0.04em",
        border: "3px solid rgba(255,255,255,0.85)",
        boxShadow: `0 3px 0 ${shadow}, 0 5px 16px ${shadow}`,
        textShadow:
          "0 1px 0 rgba(0,0,0,0.18), -1px 0 0 rgba(255,255,255,0.4), 1px 0 0 rgba(255,255,255,0.4)",
        WebkitTextStroke: "0.5px rgba(255,255,255,0.6)",
      }}
    >
      {/* glossy shine */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 55%, transparent 100%)",
          borderRadius: "9999px",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Navbar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}bgm.mp3?v=2`);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function toggleBgm() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-2"
      style={{
        background: "rgba(255,245,250,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(249,168,212,0.35)",
      }}
    >
      {/* Left: small title logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center"
        aria-label="홈으로"
      >
        <img
          src={titleImg}
          alt="타이틀"
          style={{
            height: "48px",
            width: "auto",
            filter: "drop-shadow(0 2px 6px rgba(230,80,140,0.3))",
          }}
        />
      </button>

      {/* Right: nav buttons + BGM toggle */}
      <nav className="flex items-center gap-3">
        <BubbleNavBtn
          onClick={() => scrollTo("prologue")}
          gradient="linear-gradient(135deg, #ff8ecb 0%, #ff6eb0 50%, #e85fa0 100%)"
          shadow="rgba(232,95,160,0.55)"
        >
          프롤로그
        </BubbleNavBtn>
        <BubbleNavBtn
          onClick={() => scrollTo("characters")}
          gradient="linear-gradient(135deg, #7de8f5 0%, #4ec8f0 50%, #38a8e0 100%)"
          shadow="rgba(62,180,230,0.55)"
        >
          캐릭터 소개
        </BubbleNavBtn>

        {/* BGM Toggle */}
        <button
          onClick={toggleBgm}
          title={playing ? "음악 끄기" : "음악 켜기"}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: playing
              ? "linear-gradient(135deg, #f9a8d4, #f472b6)"
              : "rgba(255,240,248,0.9)",
            border: "1.5px solid #f9a8d4",
            boxShadow: playing ? "0 2px 10px rgba(236,72,153,0.3)" : "none",
            color: playing ? "#fff" : "#db2777",
            fontSize: "16px",
          }}
        >
          {playing ? "🔊" : "🔇"}
        </button>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-background z-0" />
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #ffd6e8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ffe0f0 0%, transparent 40%), radial-gradient(circle at 60% 80%, #ffd0e8 0%, transparent 40%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={titleImg}
              alt="아들이 2cm 소추 허접인데 어쩌죠?"
              style={{
                width: "min(520px, 90vw)",
                display: "block",
                margin: "0 auto",
                filter:
                  "drop-shadow(0 3px 12px rgba(230,80,140,0.35)) drop-shadow(0 6px 24px rgba(60,160,220,0.28))",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-pink-300 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mx-8" />

      {/* Prologue Section */}
      <section id="prologue" className="py-24 bg-white relative scroll-mt-16">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 50%, #ffe0f0 0%, transparent 50%), radial-gradient(circle at 90% 50%, #ffe0f0 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="text-center mb-12"
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase mb-3 block"
              style={{ color: "#e8609a" }}
            >
              Prologue
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif mb-5"
              style={{ color: "#2d1a2e" }}
            >
              프롤로그
            </h2>
            <div className="w-12 h-0.5 mx-auto rounded-full" style={{ background: "#f9a8d4" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-2xl overflow-hidden shadow-xl border"
            style={{ borderColor: "#fbd5e8", background: "#fff" }}
          >
            <img
              src={prologueImg}
              alt="프롤로그 만화"
              className="w-full max-w-2xl mx-auto h-auto block"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mx-8" />

      {/* Characters Section */}
      <section id="characters" className="py-24 relative scroll-mt-16" style={{ background: "hsl(330 60% 98%)" }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, #ffe4f4 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="text-center mb-16"
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase mb-3 block"
              style={{ color: "#e8609a" }}
            >
              Characters
            </span>
            <h2
              className="text-3xl md:text-4xl font-serif mb-5"
              style={{ color: "#2d1a2e" }}
            >
              등장인물
            </h2>
            <div className="w-12 h-0.5 mx-auto rounded-full" style={{ background: "#f9a8d4" }} />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
            {characters.map((char, i) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(20%-1.2rem)] h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: "0 4px 24px rgba(236,72,153,0.10)",
                  border: "1.5px solid #fbd5e8",
                  background: "#fff",
                }}
              >
                <img
                  src={char.img}
                  alt={char.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.5) 40%, transparent 70%)",
                  }}
                />

                <div className="absolute bottom-0 left-0 w-full p-5 z-10">
                  <div
                    className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                    style={{ color: char.accent }}
                  >
                    {char.role}
                  </div>
                  <h3
                    className="text-2xl font-serif mb-2 flex items-baseline gap-2"
                    style={{ color: "#2d1a2e" }}
                  >
                    {char.name}
                    <span className="text-sm font-sans font-normal" style={{ color: "#9a6a8a" }}>
                      {char.age}세
                    </span>
                  </h3>
                  <p
                    className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100"
                    style={{ color: "#5a3a4a" }}
                  >
                    {char.desc}
                  </p>
                </div>

                <div
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ borderColor: char.accent + "66" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 text-center border-t"
        style={{ borderColor: "#fbd5e8", background: "#fff" }}
      >
        <p className="font-serif text-sm tracking-wider" style={{ color: "#c994b8" }}>
          © {new Date().getFullYear()} 아들이 2cm 소추 허접인데 어쩌죠. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
