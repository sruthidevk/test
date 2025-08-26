import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMusic,
  faCloud,
  faStar,
  faFeatherAlt,
  faGift,
  faLaugh,
  faCameraRetro,
  faSeedling,
  faPalette,
  faXmark,
  faEnvelope,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const personalBgs = Array.from({ length: 25 }, (_, i) => `/bg${i + 1}.jpg`);

const pastelGrad = "linear-gradient(135deg, #fdf9fb 0%, #fdebeb 100%)";
const subtleBgColor = "rgba(255,192,203,0.11)";

const polaroids = [
  {
    title: "The First Text",
    memory:
      "Who knew one text would turn into a year-long saga. NOT COMPLAINING.",
    quizQuestion: "Your first text was about?",
    quizAnswer: "love",
    img: "/memory1.jpg",
    theme: {
      icon: faHeart,
      overlay: "#ffe6eb",
      sticker: "🫢",
      confetti: "#fa729e",
      emojiUnder: "💞",
    },
  },
  {
    title: "The Official Upgrade",
    memory: "Upgraded our chat.",
    quizQuestion: "Which app is important?",
    quizAnswer: "instagram",
    img: "/memory2.jpg",
    theme: {
      icon: faLaugh,
      overlay: "#ffefd5",
      sticker: "😊",
      confetti: "#ffd700",
    },
  },
  {
    title: "The First Call",
    memory: "The very beginning.",
    quizQuestion: "What communication?",
    quizAnswer: "call",
    img: "/memory3.jpg",
    theme: {
      icon: faSeedling,
      overlay: "#e0f2fe",
      sticker: "📞",
      confetti: "#b2dfdb",
    },
  },
  {
    title: "The Telepathy",
    memory: "Beat that mind reading.",
    quizQuestion: "This power?",
    quizAnswer: "telepathy",
    img: "/memory4.jpg",
    theme: {
      icon: faCloud,
      overlay: "#ccf3ff",
      sticker: "☁️",
      confetti: "#b9d6f7",
    },
  },
  {
    title: "The First Date",
    memory: "Our unforgettable day.",
    quizQuestion: "Your first outing?",
    quizAnswer: "date",
    img: "/memory5.jpg",
    theme: {
      icon: faFeatherAlt,
      overlay: "#fff8e1",
      sticker: "🌸",
      confetti: "#ffe57f",
    },
  },
  {
    title: "The Second Meet",
    memory: "Was it second time?",
    quizQuestion: "Meet again when?",
    quizAnswer: "second",
    img: "/memory6.jpg",
    theme: {
      icon: faLaugh,
      overlay: "#fff0f6",
      sticker: "😊",
      confetti: "#f8bbd0",
    },
  },
  {
    title: "Golden Era",
    memory: "Special nicknames.",
    quizQuestion: "Your nickname?",
    quizAnswer: "nickname",
    img: "/memory7.jpg",
    theme: {
      icon: faPalette,
      overlay: "#fce4ec",
      sticker: "💫",
      confetti: "#f48fb1",
    },
  },
  {
    title: "Spotify Era",
    memory: "Music sync.",
    quizQuestion: "Favorite app?",
    quizAnswer: "spotify",
    img: "/memory8.jpg",
    theme: {
      icon: faMusic,
      overlay: "#e0f7fa",
      sticker: "🎵",
      confetti: "#4dd0e1",
    },
  },
  {
    title: "Reel Flood",
    memory: "Chocolate cake reels.",
    quizQuestion: "Favorite dessert?",
    quizAnswer: "cake",
    img: "/memory9.jpg",
    theme: {
      icon: faGift,
      overlay: "#fff3e0",
      sticker: "🍰",
      confetti: "#ffcc80",
    },
  },
  {
    title: "One Year",
    memory: "A whole year.",
    quizQuestion: "How long?",
    quizAnswer: "year",
    img: "/memory10.jpg",
    theme: {
      icon: faCameraRetro,
      overlay: "#e3f2fd",
      sticker: "🎉",
      confetti: "#64b5f6",
    },
  },
  // ...include every other milestone exactly as before here...
  {
    title: "Meenu",
    memory: "Special video of our moments.",
    quizQuestion: "Who is Meenu?",
    quizAnswer: "meenu",
    video: "/meenu-video.mp4",
    theme: {
      icon: faLaugh,
      overlay: "#fff4e6",
      sticker: "🐱",
      confetti: "#ffb347",
    },
  },
  // ...continue all milestones...
];

const FloatingParticles = ({ emoji = "💞", color = "#fa729e", count = 10 }) => (
  <div style={{ position: "relative", height: 60, width: 240, margin: "0 auto" }}>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: (240 / count) * i + Math.random() * 10, y: 40 + Math.random() * 10, rotate: Math.random() * 20 - 10, opacity: 0.65 }}
        animate={{
          y: [40 + Math.random() * 10, 10],
          x: [(240 / count) * i + Math.random() * 10, (240 / count) * i + Math.random() * 20],
          rotate: [0, 180, 0],
          transition: { repeat: Infinity, duration: 4, delay: Math.random() * 2 }
        }}
        style={{ position: "absolute", fontSize: 20, color, pointerEvents: "none", userSelect: "none" }}
      >
        {emoji}
      </motion.div>
    ))}
  </div>
);

function FadedBackground() {
  const size = 140;
  const cols = 5;
  const repeatTimes = 20;
  const images = Array.from({ length: repeatTimes * personalBgs.length }).map((_, i) => personalBgs[i % personalBgs.length]);
  const rows = Math.ceil(images.length / cols);
  const height = rows * (size + 30) + 50;
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height, pointerEvents: "none", zIndex: 0, userSelect: "none" }}>
      {images.map((src, i) => {
        const left = (i % cols) * (size + 26) + 30;
        const top = Math.floor(i / cols) * (size + 30) + 30;
        return <img key={i} src={src} style={{ position: "absolute", left, top, width: size, height: size, borderRadius: 16, filter: "grayscale(0.15) blur(1.1px)", opacity: 0.07 + (i % 7) * 0.008, objectFit: "cover" }} draggable={false} alt="" />;
      })}
    </div>
  );
}

const popupVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 33 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.6, duration: 0.5 } },
  exit: { opacity: 0, scale: 0.87, y: 46, transition: { duration: 0.2 } },
};

export default function App() {
  const [selected, setSelected] = React.useState(null);
  const [quizInput, setQuizInput] = React.useState("");
  const [quizFeedback, setQuizFeedback] = React.useState("");
  const [heartClicked, setHeartClicked] = React.useState(false);
  const [showMessages, setShowMessages] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const secretMessages = [
    { id: 1, type: "img", img: "/ss1.jpg", caption: "Hoping you don’t go back on your words and stay true to promises." },
    { id: 2, type: "img", img: "/ss2.jpg", caption: "You are best part of my day." },
    { id: 3, type: "text", caption: "No image just words: love." },
  ];

  React.useEffect(() => {
    if (!showMessages) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setMsgIndex((i) => Math.max(i - 1, 0));
      if (e.key === "ArrowRight") setMsgIndex((i) => Math.min(i + 1, secretMessages.length - 1));
      if (e.key === "Escape") setShowMessages(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showMessages]);

  const openPopupAfterQuiz = () => {
    setTimeout(() => {
      document.body.style.overflow = "hidden";
      setSelected(selected);
    }, 100);
  };

  const handleQuizSubmit = () => {
    if (!selected) return;
    if (quizInput.trim().toLowerCase() === selected.quizAnswer.toLowerCase()) {
      setQuizFeedback("good boi 💋");
      openPopupAfterQuiz();
    } else {
      setQuizFeedback(`WOW. DO BETTER. Correct answer: ${selected.quizAnswer}`);
      openPopupAfterQuiz();
    }
  };

  const closePopup = () => {
    setSelected(null);
    setQuizFeedback("");
    setQuizInput("");
    document.body.style.overflow = "";
  };

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", minHeight: "200vh", background: pastelGrad, position: "relative", overflow: "hidden", color: "#9c4174", paddingBottom: 150 }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", background: subtleBgColor, pointerEvents: "none", zIndex: 0 }} />
      <FadedBackground />
      <h1 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, color: "#9c4174", margin: "30px 0" }}>Polaroid Trail of Us</h1>
      <motion.div onClick={() => setShowMessages(true)} style={{ position: "fixed", bottom: 30, right: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: "#d54482", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 100 }}>
        <FontAwesomeIcon icon="envelope" />
      </motion.div>

      <div style={{ maxWidth: 340, margin: "auto" }}>
        {polaroids.map((item, idx) => (
          <motion.div key={idx} style={{ marginBottom: 50, cursor: "pointer", userSelect: "none", background: item.theme.overlay, borderRadius: 14, border: "1.5px solid #cda3b8", boxShadow: "0 6px 15px rgba(196, 126, 158, 0.4)", rotate: idx % 2 === 0 ? "-3deg" : "3deg" }} onClick={() => setSelected(item)}>
            <div style={{ padding: 12 }}>
              {item.video ? (
                <video src={item.video} autoPlay muted loop playsInline style={{ width: "100%", height: 160, borderRadius: 14, objectFit: "cover" }} />
              ) : (
                <img src={item.img} alt={item.title} style={{ width: "100%", height: 160, borderRadius: 14, objectFit: "cover" }} />
              )}
              <div style={{ fontWeight: 700, fontSize: 18, marginTop: 10, color: "#7e3a5a", textAlign: "center" }}>{item.title}</div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <input value={quizInput} onChange={(e) => setQuizInput(e.target.value)} placeholder={item.quizQuestion || "Your answer"} style={{ padding: "8px", borderRadius: 10, border: "1.5px solid #b45579", textAlign: "center", width: "70%" }} onKeyDown={(e) => e.key === "Enter" && handleQuizSubmit()} />
                <button onClick={handleQuizSubmit} style={{ marginLeft: 8, padding: "8px 16px", borderRadius: 10, backgroundColor: "#b45579", color: "#fff", border: "none", cursor: "pointer" }}>Submit</button>
              </div>
              {quizFeedback && (
                <div style={{ marginTop: 8, fontWeight: "bold", color: quizFeedback.includes("good") ? "green" : "red", textAlign: "center" }}>
                  {quizFeedback}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && quizFeedback && (
          <motion.div
            className="popup"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: 320,
              width: "90vw",
              maxHeight: "70vh",
              overflow: "auto",
              background: selected.theme.overlay,
              borderRadius: 20,
              border: "2px solid #c8a3b6",
              boxShadow: "0 0 10px rgba(131,59,97,0.8)",
              zIndex: 1000,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button onClick={closePopup} style={{ position: "absolute", top: 12, right: 12, border: "none", background: "transparent", fontSize: 24, cursor: "pointer", outline: "none" }} aria-label="Close popup">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {selected.video ? (
              <video src={selected.video} autoPlay muted loop playsInline style={{ width: "100%", maxHeight: 180, borderRadius: 14, objectFit: "cover" }} />
            ) : (
              <img src={selected.img} alt={selected.title} style={{ width: "100%", maxHeight: 180, borderRadius: 14, objectFit: "cover" }} />
            )}
            <h2 style={{ color: "#7e3a5a", marginTop: 10, marginBottom: 12, fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
              {selected.title} {selected.sticker}
            </h2>
            <p style={{ fontStyle: "italic", color: "#5e3d4b", whiteSpace: "pre-line", textAlign: "center" }}>{selected.memory}</p>
            <motion.button onClick={() => setHeartClicked(!heartClicked)} animate={{ scale: heartClicked ? 1.3 : 1, color: heartClicked ? "crimson" : "#b3718e" }} style={{ fontSize: 32, marginTop: 15, cursor: "pointer", border: "none", background: "none" }}>
              ❤️
            </motion.button>
            <FloatingParticles emoji={selected.theme.emojiUnder} color={selected.theme.confetti} count={10} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Messages */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            className="secret-messages"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255,240,245,0.95)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70vh",
              overflow: "auto",
              zIndex: 1500,
              padding: 15,
              fontFamily: "'Quicksand', sans-serif",
              color: "#8a3d6b",
            }}
          >
            <div style={{ position: "relative" }}>
              <h3 style={{ textAlign: "center", marginBottom: 20, fontWeight: "bold" }}>Secret Messages</h3>
              <button onClick={() => setShowMessages(false)} aria-label="Close Secret Messages" style={{ position: "absolute", top: 8, right: 15, background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: "#8a3d6b", fontWeight: "bold" }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => setMsgIndex(i => Math.max(i - 1, 0))} disabled={msgIndex === 0} style={{ fontSize: 28, background: "none", border: "none", color: msgIndex === 0 ? "#d8aadd" : "#69234e", cursor: msgIndex === 0 ? "default" : "pointer" }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div style={{ flex: 1, textAlign: "center", padding: "0 10px" }}>
                {secretMessages[msgIndex].type === "img" ? <img src={secretMessages[msgIndex].img} alt="" style={{ maxWidth: "90%", borderRadius: 12, marginBottom: 10 }} loading="lazy" /> : null}
                <div>{secretMessages[msgIndex].caption}</div>
              </div>
              <button onClick={() => setMsgIndex(i => Math.min(i + 1, secretMessages.length - 1))} disabled={msgIndex === secretMessages.length - 1} style={{ fontSize: 28, background: "none", border: "none", color: msgIndex === secretMessages.length - 1 ? "#d8aadd" : "#69234e", cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer" }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
