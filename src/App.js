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

const polaroids = [
  {
    title: "The First Text",
    memory: "Who knew one text would turn into a year-long saga. NOT COMPLAINING.",
    quizQuestion: "What was the first text about?",
    quizAnswer: "love",
    img: "/memory1.jpg",
    theme: { icon: faHeart, overlay: "#ffe6eb", sticker: "🫢", confetti: "#fa729e", emojiUnder: "💞" },
  },
  {
    title: "The Official Number Exchange Upgrade",
    memory: "I know Instagram was huge-er this just came naturally",
    quizQuestion: "Which app did we use first?",
    quizAnswer: "instagram",
    img: "/memory2.jpg",
    theme: { icon: faLaugh, overlay: "#fffae9", sticker: "😇", confetti: "#ffe138", emojiUnder: "🩷" },
  },
  {
    title: "The First Call",
    memory: "The very beginning of the never ending sodhi.",
    quizQuestion: "What started the neverending calls?",
    quizAnswer: "call",
    img: "/memory3.jpg",
    theme: { icon: faSeedling, overlay: "#e7fff0", sticker: "💌", confetti: "#b2dfdb", emojiUnder: "💗" },
  },
  {
    title: "The Telepathy",
    memory: "Cmon you were almost convinced I could read your mind.",
    quizQuestion: "What superpower did I almost have?",
    quizAnswer: "telepathy",
    img: "/memory4.jpg",
    theme: { icon: faCloud, overlay: "#e6f2ff", sticker: "😌", confetti: "#b9c6e7", emojiUnder: "❣️" },
  },
  {
    title: "The First Date",
    memory:
      "OUR first date. The beginning of your never ending waiting time.\nBut couldn’t have been any more PERFECT.",
    quizQuestion: "What was our first special outing called?",
    quizAnswer: "date",
    img: "/memory5.jpg",
    theme: { icon: faFeatherAlt, overlay: "#fff5e1", sticker: "💕", confetti: "#f8c471", emojiUnder: "🌸" },
  },
  {
    title: "The Second Meet",
    memory: "Well. Technically 2nd. If this didn’t make it that obvious - I WAS DOWN BAD",
    quizQuestion: "Which time did I fall for you?",
    quizAnswer: "second",
    img: "/memory6.jpg",
    theme: { icon: faLaugh, overlay: "#fbeaff", sticker: "🔄", confetti: "#d7bde2", emojiUnder: "🥹" },
  },
  {
    title: "The Golden Era",
    memory: "Adhe Bangaram Era. Your first ever nickname.\nPretty sure Tuthi came later",
    quizQuestion: "What was your first nickname?",
    quizAnswer: "nickname",
    img: "/memory7.jpg",
    theme: { icon: faPalette, overlay: "#ffeaea", sticker: "💫", confetti: "#fb8876", emojiUnder: "🍀" },
  },
  {
    title: "Spotify Official",
    memory: "89 percent. Not bad. Spotify approved that we could be couple goals",
    quizQuestion: "Which app gave us 89% compatibility?",
    quizAnswer: "spotify",
    img: "/memory8.jpg",
    theme: { icon: faMusic, overlay: "#eaffec", sticker: "🎶", confetti: "#93e9be", emojiUnder: "🎵" },
  },
  {
    title: "The Reel Flood",
    memory: "The chocolate cake and baby reels flood to be precise. Very enthusiastic we were.",
    quizQuestion: "What food was most featured in reels?",
    quizAnswer: "cake",
    img: "/memory9.jpg",
    theme: { icon: faGift, overlay: "#fffbdd", sticker: "🎎", confetti: "#fddb64", emojiUnder: "🍰" },
  },
  {
    title: "The One Year Mark",
    memory: "One year since Sruthi came into your life. What more would you have asked for.",
    quizQuestion: "We hit which big milestone in months?",
    quizAnswer: "year",
    img: "/memory10.jpg",
    theme: { icon: faCameraRetro, overlay: "#e0f4ff", sticker: "🫀", confetti: "#44b3ee", emojiUnder: "🎉" },
  },
  {
    title: "Saree",
    memory: "The first time you saw me in a saree... your reaction was priceless!",
    quizQuestion: "What traditional dress did you love?",
    quizAnswer: "saree",
    img: "/saree.jpg",
    theme: { icon: faGift, overlay: "#ffe6f0", sticker: "🥻", confetti: "#e15d87", emojiUnder: "🎀" },
  },
  {
    title: "Flo",
    memory: "Flo, always there with those soft paws and those big eyes.",
    quizQuestion: "Name of our furry companion?",
    quizAnswer: "flo",
    img: "/flo.jpg",
    theme: { icon: faStar, overlay: "#f3f8de", sticker: "🐾", confetti: "#b7d996", emojiUnder: "🐶" },
  },
  {
    title: "Childhood Pictures",
    memory: "Sharing childhood stories and little snapshots… pure nostalgia.",
    quizQuestion: "What kind of photos did we share?",
    quizAnswer: "childhood",
    img: "/childhood.jpg",
    theme: { icon: faCameraRetro, overlay: "#eaf5ff", sticker: "🧒", confetti: "#749ee8", emojiUnder: "📸" },
  },
  {
    title: "Ludo",
    memory: "Those epic ludo battles — let’s be honest, I win more 😉",
    quizQuestion: "Our favourite board game?",
    quizAnswer: "ludo",
    img: "/ludo.jpg",
    theme: { icon: faStar, overlay: "#fcfbec", sticker: "🎲", confetti: "#ffe773", emojiUnder: "🎲" },
  },
  {
    title: "Handwriting",
    memory: "How you adore my handwriting, and those secret notes.",
    quizQuestion: "What do you find cute in letters?",
    quizAnswer: "handwriting",
    img: "/handwriting.jpg",
    theme: { icon: faFeatherAlt, overlay: "#ecfaff", sticker: "✍️", confetti: "#67cdf0", emojiUnder: "✒️" },
  },
  {
    title: "Keychain",
    memory: "The first cute keychain you gifted — always on my bag!",
    quizQuestion: "Your first gift?",
    quizAnswer: "keychain",
    img: "/keychain.jpg",
    theme: { icon: faGift, overlay: "#ffe6ff", sticker: "🔑", confetti: "#e789d6", emojiUnder: "🔑" },
  },
  {
    title: "Meenu",
    memory: "Meenu and her legendary Maggi orders, the trio never fails.",
    quizQuestion: "Who is Meenu?",
    quizAnswer: "meenu",
    video: "/meenu-video.mp4",
    theme: { icon: faLaugh, overlay: "#fff9f7", sticker: "🐱", confetti: "#ffa25c", emojiUnder: "🐯" },
  },
  {
    title: "Ties",
    memory: "All those matching ties, so dapper — and hilarious!",
    quizQuestion: "What do we match for style?",
    quizAnswer: "ties",
    img: "/ties.jpg",
    theme: { icon: faStar, overlay: "#e6f4ff", sticker: "👔", confetti: "#7bb6ea", emojiUnder: "👔" },
  },
  {
    title: "The Seal Deal",
    memory: "The moment it became official — signed, sealed, delivered.",
    quizQuestion: "When did we make it official?",
    quizAnswer: "seal",
    img: "/seal.jpg",
    theme: { icon: faHeart, overlay: "#fffbea", sticker: "🔏", confetti: "#e5ce62", emojiUnder: "🔏" },
  },
  {
    title: "Movie",
    memory: "Our first movie date, popcorn fights and all.",
    quizQuestion: "Where did we eat popcorn together?",
    quizAnswer: "movie",
    img: "/movie.jpg",
    theme: { icon: faStar, overlay: "#e6eaff", sticker: "🍿", confetti: "#a7aae7", emojiUnder: "🎬" },
  },
  {
    title: "Flowers",
    memory: "Whenever you give me flowers, it’s a new day for my heart.",
    quizQuestion: "Which gift do I love to get?",
    quizAnswer: "flowers",
    img: "/flowers.jpg",
    theme: { icon: faPalette, overlay: "#e6ffed", sticker: "🌷", confetti: "#b0e8c6", emojiUnder: "🌺" },
  },
  {
    title: "Maggi",
    memory: "Late night maggi and stolen bites, it’s our guilty pleasure.",
    quizQuestion: "Which noodles are our go-to?",
    quizAnswer: "maggi",
    img: "/maggi.jpg",
    theme: { icon: faGift, overlay: "#eae1ff", sticker: "🍜", confetti: "#cbadf0", emojiUnder: "🍜" },
  },
  {
    title: "Stickers",
    memory: "Collecting cute stickers for every notebook. Each one is part of our story.",
    quizQuestion: "What cute thing do we collect?",
    quizAnswer: "stickers",
    img: "/stickers.jpg",
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

const secretMessages = [
  { id: 1, img: "/secret1.jpg", caption: "" },
  { id: 2, img: "/secret2.jpg", caption: "" },
  { id: 3, img: "/secret3.jpg", caption: "" },
  { id: 4, img: "/secret4.jpg", caption: "" },
  { id: 5, img: "/secret5.jpg", caption: "" },
  { id: 6, img: "/secret6.jpg", caption: "" },
  { id: 7, img: "/secret7.jpg", caption: "" },
  { id: 8, img: "/secret8.jpg", caption: "" },
  { id: 9, img: "/secret9.jpg", caption: "" },
  { id: 10, img: "/secret10.jpg", caption: "" },
  { id: 11, img: "/secret11.jpg", caption: "" },
  { id: 12, img: "/secret12.jpg", caption: "" },
  { id: 13, img: "/secret13.jpg", caption: "" },
  { id: 14, img: "/secret14.jpg", caption: "" },
];

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

  const handleMilestoneClick = (m) => {
    setSelected(m);
    setQuizInput("");
    setQuizFeedback("");
    setPopupOpen(false);
    setHeartClicked(false);
    document.body.style.overflow = "";
  };

  const handleQuizSubmit = () => {
    if (!selected) return;
    if (quizInput.trim().toLowerCase() === selected.quizAnswer.toLowerCase()) {
      setQuizFeedback("good boi 💋");
    } else {
      setQuizFeedback(`WOW! Do better. Correct answer: ${selected.quizAnswer}`);
    }
    setTimeout(() => {
      setPopupOpen(true);
      document.body.style.overflow = "hidden";
    }, 400);
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
      <h1 style={{ textAlign: "center", marginTop: 24, marginBottom: 24, fontWeight: 700, fontSize: 28 }}>Polaroid Trail of Us</h1>

      <motion.div style={{ position: "fixed", bottom: 30, right: 30, width: 52, height: 52, backgroundColor: "#bb569b", borderRadius: 28, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 1000 }} onClick={() => setShowMessages(true)} aria-label="Open Secret Messages" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <FontAwesomeIcon icon={faEnvelope} color="#fff" size="lg" />
      </motion.div>

      <div style={{ maxWidth: 340, margin: "auto", marginTop: 40, zIndex: 10 }}>
        {polaroids.map((m, idx) => (
          <motion.div key={idx} style={{ marginBottom: 56, background: m.theme.overlay, borderRadius: 14, border: "1.5px solid #bc82bc", boxShadow: "0 5px 12px rgba(188,130,188,0.4)", rotate: idx % 2 ? "3deg" : "-3deg", cursor: "pointer" }} whileHover={{ scale: 1.05, rotate: 0, boxShadow: "0 15px 28px rgba(188,78,189,0.5)" }} whileTap={{ scale: 1.1, rotate: 0 }} onClick={() => handleMilestoneClick(m)}>
            <img alt={m.title} src={m.video ? undefined : m.img} style={{ display: m.video ? "none" : "block", width: "100%", height: 160, borderRadius: 14, objectFit: "cover" }} />
            {m.video && (<video autoPlay muted loop playsInline src={m.video} style={{ width: "100%", height: 160, borderRadius: 14, objectFit: "cover" }} />)}
            <h3 style={{ textAlign: "center", marginTop: 12, color: "#7a447f" }}>{m.title} {m.theme.sticker}</h3>
            <input type="text" placeholder={m.quizQuestion || "Answer..."} value={quizInput} onChange={e => setQuizInput(e.target.value)} style={{ width: "90%", margin: "12px 5%", padding: 8, borderRadius: 16, border: "1.5px solid #a872a0", textAlign: "center", fontWeight: 600, fontSize: 16 }} onClick={e => e.stopPropagation()} onKeyDown={e => e.key === "Enter" && handleQuizSubmit()} />
            <button onClick={e => { e.stopPropagation(); handleQuizSubmit(); }} style={{ width: "90%", margin: "10px 5%", padding: 10, backgroundColor: "#a85aa7", border: "none", borderRadius: 14, fontWeight: 700, color: "white", cursor: "pointer" }}>Submit</button>
            {quizFeedback && selected && selected.title === m.title && <p style={{ textAlign: "center", color: quizFeedback.includes("good") ? "#2e7d32" : "#cc0000", fontWeight: "bold" }}>{quizFeedback}</p>}
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
            padding: 24,
            background: selected.theme.overlay,
            borderRadius: 24,
            boxShadow: "0 20px 40px rgba(200, 90, 190, 0.6)",
            border: "2px solid #c978d9",
            overflowY: "auto",
            zIndex: 9999,
          }}>
            <button aria-label="Close popup" onClick={closePopup} style={{ position: "absolute", top: 12, right: 14, border: "none", background: "transparent", cursor: "pointer", fontSize: 28, color: "#863e88" }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {selected.video ? (
              <video autoPlay muted loop playsInline src={selected.video} style={{ width: "100%", borderRadius: 24, height: 180, objectFit: "cover", marginBottom: 20 }} />
            ) : (
              <img alt={selected.title} src={selected.img} style={{ width: "100%", borderRadius: 24, height: 180, objectFit: "cover", marginBottom: 20 }} />
            )}
            <h3 style={{ textAlign: "center", color: "#7a447f", marginBottom: 14, fontWeight: "700", fontSize: 22 }}>
              {selected.title} {selected.theme.sticker}
            </h3>
            <p style={{ whiteSpace: "pre-line", textAlign: "center", color: "#6b3b6b", fontSize: 17, marginBottom: 28 }}>
              {selected.memory}
            </p>
            <motion.button
              onClick={() => setHeartClicked(!heartClicked)}
              animate={{ scale: heartClicked ? 1.4 : 1 }}
              style={{ fontSize: 40, cursor: "pointer", border: "none", background: "transparent", color: heartClicked ? "#bb137f" : "#c978d9", display: "block", margin: "0 auto" }}
              whileTap={{ scale: 1.6 }}
            >
              ❤️
            </motion.button>
            <FloatingParticles emoji={selected.theme.emojiUnder} color={selected.theme.confetti} count={10} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: "70vh",
              background: "#fdeaebcc",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              overflowY: "auto",
              zIndex: 10000,
              userSelect: "none",
              fontFamily: "'Quicksand', sans-serif",
              color: "#853b6a",
            }}
          >
            <div style={{ position: "relative", textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ color: "#853b6a", fontWeight: 700, fontSize: 22 }}>Secret Messages</h3>
              <button onClick={() => setShowMessages(false)} aria-label="Close messages" style={{
                position: "absolute",
                right: 12,
                top: 6,
                background: "transparent",
                border: "none",
                fontSize: 28,
                cursor: "pointer",
                color: "#a54e8c"
              }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={prevMsg} disabled={msgIndex === 0} aria-label="Previous secret message" style={{
                background: "transparent",
                border: "none",
                color: msgIndex === 0 ? '#ebb1cf' : '#853b6a',
                cursor: msgIndex === 0 ? "default" : "pointer",
                fontSize: 28,
              }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={secretMessages[msgIndex].img} alt={`Secret message ${msgIndex + 1}`} style={{ maxWidth: "85%", borderRadius: 20, maxHeight: 220 }} />
              <button onClick={nextMsg} disabled={msgIndex === secretMessages.length - 1} aria-label="Next secret message" style={{
                background: "transparent",
                border: "none",
                color: msgIndex === secretMessages.length - 1 ? '#ebb1cf' : '#853b6a',
                cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer",
                fontSize: 28,
              }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <p style={{ textAlign: "center", color: "#a54e8c", marginTop: 8, fontWeight: 600 }}>{msgIndex + 1} / {secretMessages.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
