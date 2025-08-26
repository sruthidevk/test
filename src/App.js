import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLaugh,
  faSeedling,
  faCloud,
  faFeatherAlt,
  faGift,
  faMusic,
  faCameraRetro,
  faPalette,
  faStar,
  faXmark,
  faEnvelope,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const personalBgs = Array.from({ length: 25 }, (_, i) => `/bg${i + 1}.jpg`);
const violetGrad = "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)";
const subtleBg = "rgba(255,192,203,0.11)";

// Your full milestones data omitted here for brevity, include all your milestones with quizAnswer, theme, img/video etc.
const polaroids = [
  {
    title: "The First Text",
    memory: "...",
    quizQuestion: "Enter your guess",
    quizAnswer: "love",
    img: "/memory1.jpg",
    theme: { icon: faHeart, overlay: "#ffe6eb", sticker: "🫢", confetti: "#fa729e", emoji: "💞" }
  },
  // add all other milestones similarly
];

const secretMessages = Array.from({ length: 14 }, (_, i) => ({ img: `/secret${i + 1}.jpg`, caption: "" }));

const FloatingParticles = ({ emoji = "💞", color = "#fa729e", count = 10 }) => (
  <div style={{ position: "relative", height: 60, width: 240, margin: "0 auto" }}>
    {[...Array(count)].map((_, i) => {
      const xPos = (240 / count) * i + Math.random() * (240 / count) * 0.7;
      return (
        <motion.div
          key={i}
          initial={{ x: xPos, y: 40 + Math.random() * 10, rotate: Math.random() * 20 - 10, opacity: 0.65 }}
          animate={{
            y: [40 + Math.random() * 10, 10],
            x: [xPos, xPos + (Math.random() * 20 - 10)],
            rotate: Math.random() * 60 - 30,
            transition: { duration: 4, repeat: Infinity, delay: Math.random() * 2 },
          }}
          style={{ position: "absolute", fontSize: 20, color, pointerEvents: "none", userSelect: "none" }}
        >
          {emoji}
        </motion.div>
      );
    })}
  </div>
);

function FadedBackground() {
  const imgSize = 140,
    cols = 5,
    repeatCount = 20;
  const imgs = Array.from({ length: personalBgs.length * repeatCount }, (_, i) => personalBgs[i % personalBgs.length]);
  const rows = Math.ceil(imgs.length / cols),
    containerHeight = rows * (imgSize + 30) + 50;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: containerHeight,
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
      }}
    >
      {imgs.map((src, i) => {
        const col = i % cols,
          row = Math.floor(i / cols),
          left = col * (imgSize + 26) + 30,
          top = row * (imgSize + 30) + 30;
        return (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            loading="lazy"
            style={{
              position: "absolute",
              left,
              top,
              width: imgSize,
              height: imgSize,
              borderRadius: 16,
              filter: "grayscale(0.15) blur(1.1px)",
              opacity: 0.08 + (i % 7) * 0.007,
              objectFit: "cover",
            }}
          />
        );
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
  const [selected, setSelected] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [quizInput, setQuizInput] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [heartClicked, setHeartClicked] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const nextMsg = () => setMsgIndex((i) => (i + 1) % secretMessages.length);
  const prevMsg = () => setMsgIndex((i) => (i + secretMessages.length - 1) % secretMessages.length);

  const handleCardClick = (item) => {
    setSelected(item);
    setQuizInput("");
    setQuizFeedback("");
    setPopupOpen(false);
    setHeartClicked(false);
    document.body.style.overflow = "";
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!selected) return;
    const isCorrect = quizInput.trim().toLowerCase() === selected.quizAnswer.toLowerCase();
    setQuizFeedback(isCorrect ? "good boi 💋" : `WOW! Do better. Correct answer: ${selected.quizAnswer}`);
    setTimeout(() => {
      setPopupOpen(true);
      document.body.style.overflow = "hidden";
    }, 500);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setHeartClicked(false);
    setQuizInput("");
    setQuizFeedback("");
    setSelected(null);
    document.body.style.overflow = "";
  };

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", minHeight: "200vh", background: violetGrad, color: "#7a447f", position: "relative", paddingBottom: 100 }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: subtleBg, pointerEvents: "none", zIndex: 0 }} />
      <FadedBackground />
      <h1 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, margin: "30px 0" }}>Polaroid Trail of Us</h1>

      <motion.div onClick={() => { setShowMessages(true); setMsgIndex(0); }} style={{ position: "fixed", bottom: 30, right: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: "#bb569b", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 9999 }} aria-label="Secret Messages Button">
        <FontAwesomeIcon icon={faEnvelope} color="#fff" size="lg" />
      </motion.div>

      <div style={{ maxWidth: 340, margin: "auto", marginTop: 20, zIndex: 10, position: "relative" }}>
        {polaroids.map((item, idx) => (
          <motion.div key={idx} style={{ marginBottom: 56, background: item.theme.overlay, borderRadius: 14, border: "1.8px solid #bb92b7", boxShadow: "0 6px 18px #a86da5", rotate: idx % 2 ? "3deg" : "-3deg", cursor: "pointer" }} whileHover={{ scale: 1.05, rotate: 0, boxShadow: "0 15px 28px rgba(188,78,189,0.5)" }} whileTap={{ scale: 1.1, rotate: 0 }} onClick={() => handleCardClick(item)}>
            {item.video ? <video src={item.video} autoPlay muted loop playsInline style={{ width: "100%", height: 156, borderRadius: 14, objectFit: "cover" }} /> : <img src={item.img} alt={item.title} style={{ width: "100%", height: 156, borderRadius: 14, objectFit: "cover" }} />}
            <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8, color: "#65314f", textAlign: "center" }}>{item.title}</div>
            <div style={{ marginTop: 12, padding: "0 16px" }}>
              <input type="text" placeholder={item.quizQuestion} style={{ width: "100%", padding: 9, borderRadius: 14, border: "1.5px solid #aa77b1", fontWeight: 700, textAlign: "center" }} value={quizInput} onChange={e => setQuizInput(e.target.value)} onClick={e => e.stopPropagation()} onKeyDown={e => { e.stopPropagation(); if (e.key === "Enter") handleSubmit(e); }} />
              <button style={{ marginTop: 10, background: "#bb569b", color: "white", border: "none", borderRadius: 14, width: "100%", fontWeight: 700, padding: "10px 0", cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); handleSubmit(e); }}>Submit</button>
              {quizFeedback && selected && selected.title === item.title && (
                <div style={{ fontWeight: "bold", marginTop: 8, textAlign: "center", color: quizFeedback.includes("good") ? "green" : "crimson" }}>{quizFeedback}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && popupOpen && (
          <motion.div key="popup" initial="hidden" animate="visible" exit="exit" variants={popupVariants} style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 360,
            width: "90vw",
            maxHeight: "80vh",
            overflowY: "auto",
            background: selected.theme.overlay,
            borderRadius: 20,
            border: "2px solid #d17fbb",
            padding: 24,
            boxShadow: "0 18px 50px rgba(218,103,189,0.5)",
            color: "#7a4e7f",
            zIndex: 9999,
            fontFamily: "'Quicksand', sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <button onClick={closePopup} aria-label="Close popup" style={{ position: "absolute", top: 14, right: 18, background: "transparent", border: "none", fontSize: 26, cursor: "pointer", color: "#883a85" }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {selected.video ? (
              <video src={selected.video} autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 20, height: 180, objectFit: "cover", marginBottom: 20 }} />
            ) : (
              <img src={selected.img} alt={selected.title} style={{ width: "100%", borderRadius: 20, height: 180, objectFit: "cover", marginBottom: 20 }} />
            )}
            <h3 style={{ textAlign: "center", fontWeight: 700, fontSize: 22, marginBottom: 10 }}>{selected.title} {selected.theme.sticker}</h3>
            <p style={{ whiteSpace: "pre-line", fontSize: 16, textAlign: "center", lineHeight: 1.4, marginBottom: 28 }}>{selected.memory}</p>
            <motion.button animate={{ scale: heartClicked ? 1.4 : 1, color: heartClicked ? "#d7157a" : "#bb57a0" }} onClick={() => setHeartClicked(!heartClicked)} style={{ fontSize: 40, cursor: "pointer", border: "none", background: "transparent", marginBottom: 12 }} whileTap={{ scale: 1.6 }} aria-label="Favourite button">❤️</motion.button>
            <FloatingParticles emoji={selected.theme.emojiUnder} color={selected.theme.confetti} count={10} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessages && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", bounce: 0.25, duration: 0.3 }} style={{
            position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "70vh", background: "#fdeaebcc", borderRadius: "24px 24px 0 0", padding: 24, overflowY: "auto", zIndex: 10000, userSelect: "none", fontFamily: "'Quicksand', sans-serif", color: "#824d86"
          }}>
            <div style={{ position: "relative", textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ color: "#824d86", fontWeight: 700, fontSize: 22 }}>Secret Messages</h3>
              <button onClick={() => setShowMessages(false)} aria-label="Close secret messages" style={{
                position: "absolute",
                top: 16,
                right: 20,
                fontSize: 24,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#824d86"
              }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={prevMsg} disabled={msgIndex === 0} aria-label="Previous secret message" style={{ border: "none", background: "transparent", fontSize: 28, color: msgIndex === 0 ? "#d5aac6" : "#824d86", cursor: msgIndex === 0 ? "default" : "pointer" }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={secretMessages[msgIndex].img} alt={`Secret message ${msgIndex + 1}`} style={{ maxWidth: "85%", maxHeight: 220, borderRadius: 20, objectFit: "cover" }} loading="lazy" />
              <button onClick={nextMsg} disabled={msgIndex === secretMessages.length - 1} aria-label="Next secret message" style={{ border: "none", background: "transparent", fontSize: 28, color: msgIndex === secretMessages.length - 1 ? "#d5aac6" : "#824d86", cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer" }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <p style={{ fontWeight: 600, textAlign: "center", marginTop: 8 }}>{msgIndex + 1} / {secretMessages.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
