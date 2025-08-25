import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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

const pastelGradColors = [
  "#e0c3fc",
  "#8ec5fc",
  "#f6d365",
  "#fda085",
  "#a1c4fd",
  "#c2e9fb",
  "#89f7fe",
  "#66a6ff",
];

const polaroids = [
  {
    title: "The First Text",
    memory: "Who knew one text would turn into a year-long saga. NOT COMPLAINING.",
    img: "/memory1.jpg",
    quizAnswer: "love",
    theme: { icon: faHeart, overlay: "#ffe6eb", sticker: "🫢", confetti: "#fa729e", emojiUnder: "💞" },
  },
  {
    title: "The Official Number Exchange Upgrade",
    memory: "I know Instagram was huge-er this just came naturally",
    img: "/memory2.jpg",
    quizAnswer: "instagram",
    theme: { icon: faLaugh, overlay: "#fffae9", sticker: "😇", confetti: "#ffe138", emojiUnder: "🩷" },
  },
  {
    title: "The First Call",
    memory: "The very beginning of the never ending sodhi.",
    img: "/memory3.jpg",
    quizAnswer: "call",
    theme: { icon: faSeedling, overlay: "#e7fff0", sticker: "💌", confetti: "#b2dfdb", emojiUnder: "💗" },
  },
  {
    title: "The Telepathy",
    memory: "Cmon you were almost convinced I could read your mind.",
    img: "/memory4.jpg",
    quizAnswer: "telepathy",
    theme: { icon: faCloud, overlay: "#e6f2ff", sticker: "😌", confetti: "#b9c6e7", emojiUnder: "❣️" },
  },
  {
    title: "The First Date",
    memory: `OUR first date. The beginning of your never ending waiting time.\nBut couldn’t have been any more PERFECT.`,
    img: "/memory5.jpg",
    quizAnswer: "date",
    theme: { icon: faFeatherAlt, overlay: "#fff5e1", sticker: "💕", confetti: "#f8c471", emojiUnder: "🌸" },
  },
  {
    title: "The Second Meet",
    memory: "Well. Technically 2nd. If this didn’t make it that obvious - I WAS DOWN BAD",
    img: "/memory6.jpg",
    quizAnswer: "second",
    theme: { icon: faLaugh, overlay: "#fbeaff", sticker: "🔄", confetti: "#d7bde2", emojiUnder: "🥹" },
  },
  {
    title: "The Golden Era",
    memory: "Adhe Bangaram Era. Your first ever nickname.\nPretty sure Tuthi came later",
    img: "/memory7.jpg",
    quizAnswer: "nickname",
    theme: { icon: faPalette, overlay: "#ffeaea", sticker: "💫", confetti: "#fb8876", emojiUnder: "🍀" },
  },
  {
    title: "Spotify Official",
    memory: "89 percent. Not bad. Spotify approved that we could be couple goals",
    img: "/memory8.jpg",
    quizAnswer: "spotify",
    theme: { icon: faMusic, overlay: "#eaffec", sticker: "🎶", confetti: "#93e9be", emojiUnder: "🎵" },
  },
  {
    title: "The Reel Flood",
    memory: "The chocolate cake and baby reels flood to be precise. Very enthusiastic we were.",
    img: "/memory9.jpg",
    quizAnswer: "cake",
    theme: { icon: faGift, overlay: "#fffbdd", sticker: "🎎", confetti: "#fddb64", emojiUnder: "🍰" },
  },
  {
    title: "The One Year Mark",
    memory: "One year since Sruthi came into your life. What more would you have asked for.",
    img: "/memory10.jpg",
    quizAnswer: "year",
    theme: { icon: faCameraRetro, overlay: "#e0f4ff", sticker: "🫀", confetti: "#44b3ee", emojiUnder: "🎉" },
  },
  {
    title: "Saree",
    memory: "The first time you saw me in a saree... your reaction was priceless!",
    img: "/saree.jpg",
    quizAnswer: "saree",
    theme: { icon: faGift, overlay: "#ffe6f0", sticker: "🥻", confetti: "#e15d87", emojiUnder: "🎀" },
  },
  {
    title: "Flo",
    memory: "Flo, always there with those soft paws and those big eyes.",
    img: "/flo.jpg",
    quizAnswer: "flo",
    theme: { icon: faStar, overlay: "#f3f8de", sticker: "🐾", confetti: "#b7d996", emojiUnder: "🐶" },
  },
  {
    title: "Childhood Pictures",
    memory: "Sharing childhood stories and little snapshots… pure nostalgia.",
    img: "/childhood.jpg",
    quizAnswer: "childhood",
    theme: { icon: faCameraRetro, overlay: "#eaf5ff", sticker: "🧒", confetti: "#749ee8", emojiUnder: "📸" },
  },
  {
    title: "Ludo",
    memory: "Those epic ludo battles — let’s be honest, I win more 😉",
    img: "/ludo.jpg",
    quizAnswer: "ludo",
    theme: { icon: faStar, overlay: "#fcfbec", sticker: "🎲", confetti: "#ffe773", emojiUnder: "🎲" },
  },
  {
    title: "Handwriting",
    memory: "How you adore my handwriting, and those secret notes.",
    img: "/handwriting.jpg",
    quizAnswer: "handwriting",
    theme: { icon: faFeatherAlt, overlay: "#ecfaff", sticker: "✍️", confetti: "#67cdf0", emojiUnder: "✒️" },
  },
  {
    title: "Keychain",
    memory: "The first cute keychain you gifted — always on my bag!",
    img: "/keychain.jpg",
    quizAnswer: "keychain",
    theme: { icon: faGift, overlay: "#ffe6ff", sticker: "🔑", confetti: "#e789d6", emojiUnder: "🔑" },
  },
  {
    title: "Meenu",
    memory: "Meenu and her legendary Maggi orders, the trio never fails.",
    video: "/meenu-video.mp4",
    quizAnswer: "meenu",
    theme: { icon: faLaugh, overlay: "#fff9f7", sticker: "🐱", confetti: "#ffa25c", emojiUnder: "🐯" },
  },
  {
    title: "Ties",
    memory: "All those matching ties, so dapper — and hilarious!",
    img: "/ties.jpg",
    quizAnswer: "ties",
    theme: { icon: faStar, overlay: "#e6f4ff", sticker: "👔", confetti: "#7bb6ea", emojiUnder: "👔" },
  },
  {
    title: "The Seal Deal",
    memory: "The moment it became official — signed, sealed, delivered.",
    img: "/seal.jpg",
    quizAnswer: "seal",
    theme: { icon: faHeart, overlay: "#fffbea", sticker: "🔏", confetti: "#e5ce62", emojiUnder: "🔏" },
  },
  {
    title: "Movie",
    memory: "Our first movie date, popcorn fights and all.",
    img: "/movie.jpg",
    quizAnswer: "movie",
    theme: { icon: faStar, overlay: "#e6eaff", sticker: "🍿", confetti: "#a7aae7", emojiUnder: "🎬" },
  },
  {
    title: "Flowers",
    memory: "Whenever you give me flowers, it’s a new day for my heart.",
    img: "/flowers.jpg",
    quizAnswer: "flowers",
    theme: { icon: faPalette, overlay: "#e6ffed", sticker: "🌷", confetti: "#b0e8c6", emojiUnder: "🌺" },
  },
  {
    title: "Maggi",
    memory: "Late night maggi and stolen bites, it’s our guilty pleasure.",
    img: "/maggi.jpg",
    quizAnswer: "maggi",
    theme: { icon: faGift, overlay: "#eae1ff", sticker: "🍜", confetti: "#cbadf0", emojiUnder: "🍜" },
  },
  {
    title: "Stickers",
    memory: "Collecting cute stickers for every notebook. Each one is part of our story.",
    img: "/stickers.jpg",
    quizAnswer: "stickers",
    theme: { icon: faLaugh, overlay: "#f6ffe6", sticker: "✨", confetti: "#d0f870", emojiUnder: "✨" },
  },
];

const FloatingParticles = ({ emoji = "💞", color = "#fa729e", count = 10 }) => (
  <div style={{ position: "relative", height: 60, width: 240, margin: "0 auto" }}>
    {[...Array(count)].map((_, i) => {
      const xPos = (240 / count) * i + Math.random() * (240 / count) * 0.7;
      return (
        <motion.div
          key={i}
          initial={{
            x: xPos,
            y: 40 + Math.random() * 10,
            rotate: Math.random() * 20 - 10,
            opacity: 0.65,
          }}
          animate={{
            y: [40 + Math.random() * 10, 10],
            x: [xPos, xPos + (Math.random() * 20 - 10)],
            rotate: Math.random() * 60 - 30,
            transition: { duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 },
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
  const imgSize = 140;
  const cols = 5;
  const repeatCount = 10; // repeat to fill page height

  const imgs = Array.from({ length: personalBgs.length * repeatCount }, (_, i) => personalBgs[i % personalBgs.length]);

  const rows = Math.ceil(imgs.length / cols);
  const containerHeight = rows * (imgSize + 30) + 50;

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
        const col = i % cols;
        const row = Math.floor(i / cols);
        const left = col * (imgSize + 26) + 30;
        const top = row * (imgSize + 30) + 30;
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

export default function App() {
  const [selected, setSelected] = useState(null);
  const [popupCenter, setPopupCenter] = useState({ top: 0, left: 0 });
  const [quizInput, setQuizInput] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [heartClicked, setHeartClicked] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  const handleMilestoneClick = (e, milestone) => {
    e.stopPropagation();
    const left = window.innerWidth / 2;
    const top = window.innerHeight / 2 + window.scrollY;
    setPopupCenter({ top, left });
    setSelected(milestone);
    setQuizInput("");
    setQuizFeedback("");
    setHeartClicked(false);
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const closePopup = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  const handleQuizSubmit = () => {
    if (!selected) return;
    if (quizInput.trim().toLowerCase() === selected.quizAnswer.toLowerCase()) {
      setQuizFeedback("good boi 💋");
    } else {
      setQuizFeedback(`WOW. DO BETTER. Correct answer: ${selected.quizAnswer}`);
    }
  };

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const secretMessages = [
    { id: 1, type: "img", img: "/ss1.jpg", caption: "Hoping you don’t go back on your words and stay true to your promises." },
    { id: 2, type: "img", img: "/ss2.jpg", caption: "You are the best part of my day." },
    { id: 3, type: "text", caption: "No image, just these words: Love you for all your little reminders." },
  ];

  useEffect(() => {
    if (!showMessages) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") setMsgIndex((i) => Math.max(i - 1, 0));
      if (e.key === "ArrowRight") setMsgIndex((i) => Math.min(i + 1, secretMessages.length - 1));
      if (e.key === "Escape") setShowMessages(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showMessages]);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 33 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.6, duration: 0.5 }},
    exit: { opacity: 0, scale: 0.87, y: 46, transition: { duration: 0.2 }},
  };

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", minHeight: "200vh", background: pastelGradColors[0], position: "relative", overflowX: "hidden", color: "#9e4c88", paddingBottom: "5em" }}>
      <FadedBackground />
      <h1 style={{ textAlign: "center", fontWeight: 700, color: "#9e4c88", paddingTop: 32, marginBottom: 40, fontSize: 28, letterSpacing: 3, position: "relative", zIndex: 10 }}>
        Polaroid Trail of Us
      </h1>

      <motion.div
        onClick={() => { setShowMessages(true); setMsgIndex(0); }}
        style={{ position: "fixed", bottom: 30, right: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: "#f06292", boxShadow: "0 0 12px #f48fb1", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 30 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open Secret Messages"
      >
        <FontAwesomeIcon color="#fff" icon={faEnvelope} size="lg" />
      </motion.div>

      <div style={{ maxWidth: 340, margin: "auto", position: "relative", zIndex: 10 }}>
        {polaroids.map((m, idx) => (
          <motion.div
            key={idx}
            style={{ marginBottom: 56, cursor: "pointer", userSelect: "none", background: m.theme.overlay, borderRadius: 14, boxShadow: "0 5px 12px rgba(200, 100, 140, 0.3)", border: "1.5px solid #f2e6e7", rotate: idx % 2 === 0 ? "-3deg" : "3deg", }}
            whileHover={{ scale: 1.05, rotate: 0, boxShadow: "0 15px 30px rgba(200,50,120,0.5)" }}
            whileTap={{ scale: 1.1, rotate: 0 }}
            onClick={(e) => handleMilestoneClick(e, m)}
          >
            <div style={{ padding: 12 }}>
              {m.video ? <video src={m.video} autoPlay muted loop style={{ width: "100%", height: 160, borderRadius: 12, objectFit: "cover" }} /> :
                <img src={m.img} alt={m.title} style={{ width: "100%", height: 160, borderRadius: 12, objectFit: "cover" }} />}
              <div style={{ fontWeight: "bold", textAlign: "center", marginTop: 10, color: "#75466e" }}>{m.title}</div>
              <div style={{ marginTop: 10, color: "#8a648e", fontStyle: "italic" }}>{m.memory}</div>
              <input
                value={quizInput}
                onChange={(e) => setQuizInput(e.target.value)}
                placeholder="Answer the quiz"
                onKeyDown={(e) => e.key === "Enter" && handleQuizSubmit()}
                style={{ width: "100%", padding: 6, borderRadius: 12, border: "1.5px solid #c38cb6", textAlign: "center", fontSize: 14, fontWeight: "600" }}
              />
              <button onClick={handleQuizSubmit} style={{ marginTop: 10, width: "100%", padding: 8, backgroundColor: "#c38cb6", border: "none", borderRadius: 12, color: "#fff", fontWeight: "700", cursor: "pointer" }}>
                Submit
              </button>
              {quizFeedback && <div style={{ marginTop: 8, color: quizFeedback.startsWith("good") ? "green" : "crimson", fontWeight: "bold", textAlign: "center" }}>{quizFeedback}</div>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: selected.theme.overlay,
              borderRadius: 20,
              padding: 20,
              maxWidth: 320,
              maxHeight: "70vh",
              overflowY: "auto",
              boxShadow: "0 15px 30px rgba(150, 50, 90, 0.8)",
              zIndex: 1000,
              fontFamily: "'Quicksand', sans-serif",
              border: "2px solid #e0b1c0",
            }}
          >
            <button
              onClick={() => {
                closePopup();
              }}
              aria-label="Close popup"
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: "transparent",
                border: "none",
                fontSize: 24,
                color: "#b07193",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {selected.video ? (
              <video
                src={selected.video}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", maxHeight: 180, borderRadius: 14, objectFit: "cover", marginBottom: 15 }}
              />
            ) : (
              <img
                src={selected.img}
                alt={selected.title}
                style={{ width: "100%", maxHeight: 180, borderRadius: 14, objectFit: "cover", marginBottom: 15 }}
              />
            )}
            <h2 style={{ textAlign: "center", color: "#8a648e", marginBottom: 12, fontWeight: "700", fontSize: 22 }}>
              {selected.title} {selected.sticker}
            </h2>
            <p style={{ color: "#815d79", whiteSpace: "pre-line", textAlign: "center" }}>{selected.memory}</p>
            <motion.button
              onClick={() => setHeartClicked(!heartClicked)}
              animate={{ scale: heartClicked ? 1.3 : 1, color: heartClicked ? "crimson" : "#cda0c4" }}
              style={{
                fontSize: 32,
                userSelect: "none",
                marginTop: 20,
                cursor: "pointer",
                border: "none",
                background: "transparent",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              whileTap={{ scale: 1.5 }}
              aria-label="Heart toggle"
            >
              ❤️
            </motion.button>
            <FloatingParticles emoji={selected.theme.emojiUnder} color={selected.theme.confetti} count={10} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Messages Modal */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255, 240, 245, 0.95)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70vh",
              overflowY: "auto",
              zIndex: 1010,
              fontFamily: "'Quicksand',sans-serif",
              color: "#9e4d7d",
              padding: 15,
            }}
          >
            <div style={{ position: "relative" }}>
              <h3
                style={{
                  textAlign: "center",
                  margin: 0,
                  fontWeight: "700",
                  fontSize: 22,
                }}
              >
                Secret Messages
              </h3>
              <button
                onClick={() => setShowMessages(false)}
                aria-label="Close secret messages"
                style={{
                  position: "absolute",
                  right: 10,
                  top: 5,
                  background: "transparent",
                  border: "none",
                  fontSize: 24,
                  cursor: "pointer",
                  color: "#b07193",
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <motion.div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setMsgIndex((i) => Math.max(i - 1, 0))}
                disabled={msgIndex === 0}
                style={{
                  cursor: msgIndex === 0 ? "default" : "pointer",
                  fontSize: 28,
                  background: "transparent",
                  border: "none",
                  color: msgIndex === 0 ? "#d3b6c6" : "#9e4d7d",
                }}
                aria-label="Previous"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>

              <div
                style={{
                  margin: "0 12px",
                  width: "280px",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#9e4d7d",
                }}
              >
                {secretMessages[msgIndex].type === "img" ? (
                  <img
                    src={secretMessages[msgIndex].img}
                    alt="secret"
                    style={{ width: "100%", borderRadius: 12, marginBottom: 8 }}
                    loading="lazy"
                  />
                ) : null}
                <div>{secretMessages[msgIndex].caption}</div>
              </div>

              <button
                onClick={() => setMsgIndex((i) => Math.min(i + 1, secretMessages.length - 1))}
                disabled={msgIndex === secretMessages.length - 1}
                style={{
                  cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer",
                  fontSize: 28,
                  background: "transparent",
                  border: "none",
                  color: msgIndex === secretMessages.length - 1 ? "#d3b6c6" : "#9e4d7d",
                }}
                aria-label="Next"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
