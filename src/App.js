import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
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

// Background pictures /bg1.jpg to /bg25.jpg in public folder
const personalBgs = Array.from({ length: 25 }, (_, i) => `/bg${i + 1}.jpg`);

const pastelGrad =
  "linear-gradient(135deg, #fdf9fb 0%, #fdebeb 100%)";
const subtleBgColor = "rgba(255,192,203,0.11)";
const audioFile = "/voice1.mp3";

// All milestones as you gave before
const polaroids = [
  {
    title: "The First Text",
    memory:
      "Who knew one text would turn into a year-long saga. NOT COMPLAINING.",
    img: "/memory1.jpg",
    theme: { icon: faHeart, overlay: "#ffe6eb", sticker: "🫢", confetti: "#fa729e", emojiUnder: "💞" },
  },
  {
    title: "The Official Number Exchange Upgrade",
    memory: "I know Instagram was huge-er this just came naturally",
    img: "/memory2.jpg",
    theme: { icon: faLaugh, overlay: "#fffae9", sticker: "😇", confetti: "#ffe138", emojiUnder: "🩷" },
  },
  {
    title: "The First Call",
    memory: "The very beginning of the never ending sodhi.",
    img: "/memory3.jpg",
    theme: { icon: faSeedling, overlay: "#e7fff0", sticker: "💌", confetti: "#b2dfdb", emojiUnder: "💗" },
  },
  {
    title: "The Telepathy",
    memory: "Cmon you were almost convinced I could read your mind.",
    img: "/memory4.jpg",
    theme: { icon: faCloud, overlay: "#e6f2ff", sticker: "😌", confetti: "#b9c6e7", emojiUnder: "❣️" },
  },
  {
    title: "The First Date",
    memory:
      "OUR first date. The beginning of your never ending waiting time.\nBut couldn’t have been any more PERFECT.",
    img: "/memory5.jpg",
    theme: { icon: faFeatherAlt, overlay: "#fff5e1", sticker: "💕", confetti: "#f8c471", emojiUnder: "🌸" },
  },
  {
    title: "The Second Meet",
    memory: "Well. Technically 2nd. If this didn’t make it that obvious - I WAS DOWN BAD",
    img: "/memory6.jpg",
    theme: { icon: faLaugh, overlay: "#fbeaff", sticker: "🔄", confetti: "#d7bde2", emojiUnder: "🥹" },
  },
  {
    title: "The Golden Era",
    memory: "Adhe Bangaram Era. Your first ever nickname.\nPretty sure Tuthi came later",
    img: "/memory7.jpg",
    theme: { icon: faPalette, overlay: "#ffeaea", sticker: "💫", confetti: "#fb8876", emojiUnder: "🍀" },
  },
  {
    title: "Spotify Official",
    memory: "89 percent. Not bad. Spotify approved that we could be couple goals",
    img: "/memory8.jpg",
    theme: { icon: faMusic, overlay: "#eaffec", sticker: "🎶", confetti: "#93e9be", emojiUnder: "🎵" },
  },
  {
    title: "The Reel Flood",
    memory: "The chocolate cake and baby reels flood to be precise. Very enthusiastic we were.",
    img: "/memory9.jpg",
    theme: { icon: faGift, overlay: "#fffbdd", sticker: "🎎", confetti: "#fddb64", emojiUnder: "🍰" },
  },
  {
    title: "The One Year Mark",
    memory: "One year since Sruthi came into your life. What more would you have asked for.",
    img: "/memory10.jpg",
    theme: { icon: faCameraRetro, overlay: "#e0f4ff", sticker: "🫀", confetti: "#44b3ee", emojiUnder: "🎉" },
  },
  {
    title: "Saree",
    memory: "The first time you saw me in a saree... your reaction was priceless!",
    img: "/saree.jpg",
    theme: { icon: faGift, overlay: "#ffe6f0", sticker: "🥻", confetti: "#e15d87", emojiUnder: "🎀" },
  },
  {
    title: "Flo",
    memory: "Flo, always there with those soft paws and those big eyes.",
    img: "/flo.jpg",
    theme: { icon: faStar, overlay: "#f3f8de", sticker: "🐾", confetti: "#b7d996", emojiUnder: "🐶" },
  },
  {
    title: "Childhood Pictures",
    memory: "Sharing childhood stories and little snapshots… pure nostalgia.",
    img: "/childhood.jpg",
    theme: { icon: faCameraRetro, overlay: "#eaf5ff", sticker: "🧒", confetti: "#749ee8", emojiUnder: "📸" },
  },
  {
    title: "Ludo",
    memory: "Those epic ludo battles — let’s be honest, I win more 😉",
    img: "/ludo.jpg",
    theme: { icon: faStar, overlay: "#fcfbec", sticker: "🎲", confetti: "#ffe773", emojiUnder: "🎲" },
  },
  {
    title: "Handwriting",
    memory: "How you adore my handwriting, and those secret notes.",
    img: "/handwriting.jpg",
    theme: { icon: faFeatherAlt, overlay: "#ecfaff", sticker: "✍️", confetti: "#67cdf0", emojiUnder: "✒️" },
  },
  {
    title: "Keychain",
    memory: "The first cute keychain you gifted — always on my bag!",
    img: "/keychain.jpg",
    theme: { icon: faGift, overlay: "#ffe6ff", sticker: "🔑", confetti: "#e789d6", emojiUnder: "🔑" },
  },
  {
    title: "Meenu",
    memory: "Meenu and her legendary Maggi orders, the trio never fails.",
    img: "/meenu.jpg",
    theme: { icon: faLaugh, overlay: "#fff9f7", sticker: "🐱", confetti: "#ffa25c", emojiUnder: "🐯" },
  },
  {
    title: "Ties",
    memory: "All those matching ties, so dapper — and hilarious!",
    img: "/ties.jpg",
    theme: { icon: faStar, overlay: "#e6f4ff", sticker: "👔", confetti: "#7bb6ea", emojiUnder: "👔" },
  },
  {
    title: "The Seal Deal",
    memory: "The moment it became official — signed, sealed, delivered.",
    img: "/seal.jpg",
    theme: { icon: faHeart, overlay: "#fffbea", sticker: "🔏", confetti: "#e5ce62", emojiUnder: "🔏" },
  },
  {
    title: "Movie",
    memory: "Our first movie date, popcorn fights and all.",
    img: "/movie.jpg",
    theme: { icon: faStar, overlay: "#e6eaff", sticker: "🍿", confetti: "#a7aae7", emojiUnder: "🎬" },
  },
  {
    title: "Flowers",
    memory: "Whenever you give me flowers, it’s a new day for my heart.",
    img: "/flowers.jpg",
    theme: { icon: faPalette, overlay: "#e6ffed", sticker: "🌷", confetti: "#b0e8c6", emojiUnder: "🌺" },
  },
  {
    title: "Maggi",
    memory: "Late night maggi and stolen bites, it’s our guilty pleasure.",
    img: "/maggi.jpg",
    theme: { icon: faGift, overlay: "#eae1ff", sticker: "🍜", confetti: "#cbadf0", emojiUnder: "🍜" },
  },
  {
    title: "Stickers",
    memory: "Collecting cute stickers for every notebook. Each one is part of our story.",
    img: "/stickers.jpg",
    theme: { icon: faLaugh, overlay: "#f6ffe6", sticker: "✨", confetti: "#d0f870", emojiUnder: "✨" },
  },
];

const FloatingParticles = ({ emoji = "💞", color = "#fa729e", count = 10 }) => (
  <div style={{ position: "relative", height: 60, width: 240, margin: "0 auto" }}>
    {[...Array(count)].map((_, i) => {
      const xPos = (240 / count) * i + Math.random() * (240 / count * 0.7);
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
          style={{
            position: "absolute",
            fontSize: 20,
            color,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {emoji}
        </motion.div>
      );
    })}
  </div>
);

function FadedPhotosBG({ scrollYRaw }) {
  const imgWidth = 140;
  const gapX = 26;
  const gapY = 30;
  const imgsPerRow = 5;

  // Total images to fill a tall enough page - repeat 4x your 25 pics for continuous scroll
  const totalImgs = personalBgs.length * 4;
  const repeatedImgs = Array.from({ length: totalImgs }, (_, i) => personalBgs[i % personalBgs.length]);

  // Calculate container height dynamically to fill scroll
  const rows = Math.ceil(totalImgs / imgsPerRow);
  const containerHeight = rows * (imgWidth + gapY) + 40;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: containerHeight,
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
      }}
    >
      {repeatedImgs.map((src, i) => {
        const row = Math.floor(i / imgsPerRow);
        const col = i % imgsPerRow;
        const left = col * (imgWidth + gapX) + 30;
        const top = row * (imgWidth + gapY) + 30;

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
              width: imgWidth,
              height: imgWidth,
              objectFit: "cover",
              borderRadius: 16,
              filter: "grayscale(0.15) blur(1.1px)",
              opacity: 0.08 + (i % 7) * 0.007,
            }}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [showMessages, setShowMessages] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const scrollY = useMotionValue(0);

  const handleMilestoneClick = (event, milestone) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPos({
      left: rect.left + window.scrollX + rect.width / 2,
      top: rect.top + window.scrollY,
    });
    setSelected(milestone);
    setHeartClicked(false);
    document.body.style.overflow = "hidden"; // Prevent background scroll while popup open
  };

  const closePopup = () => {
    setSelected(null);
    document.body.style.overflow = ""; // Enable scroll back
  };

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

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
  }, [showMessages, secretMessages.length]);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 33 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.6, duration: 0.48 } },
    exit: { opacity: 0, scale: 0.87, y: 46, transition: { duration: 0.21 } },
  };

  return (
    <div
      style={{
        minHeight: "150vh",
        fontFamily: "'Quicksand', sans-serif",
        background: pastelGrad,
        position: "relative",
        overflowX: "hidden",
        color: "#8d6e7e",
        paddingBottom: "5em",
      }}
    >
      {/* Subtle pink overlay - no hearts shape */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          background: subtleBgColor,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Background photos scroll naturally */}
      <FadedPhotosBG scrollYRaw={scrollY.get()} />

      <h1
        style={{
          zIndex: 10,
          color: "#b55477",
          letterSpacing: "0.12em",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2.2em",
          paddingTop: "2.5em",
          marginBottom: "1em",
          userSelect: "none",
          textShadow: "0 0 16px #ffddea",
        }}
      >
        Polaroid Trail of Us
      </h1>

      {/* Secret Messages Icon */}
      <motion.div
        onClick={() => {
          setShowMessages(true);
          setMsgIndex(0);
        }}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 56,
          height: 56,
          backgroundColor: "#f5c6d1",
          borderRadius: "50%",
          boxShadow: "0 4px 14px #e296acb1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 25,
          userSelect: "none",
        }}
        whileHover={{ scale: 1.13, rotate: 12 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open Secret Messages"
      >
        <FontAwesomeIcon icon={faEnvelope} color="#982f5e" size="lg" />
      </motion.div>

      {/* Timeline Milestones */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 320,
          margin: "0 auto 3em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {polaroids.map((p, idx) => (
          <motion.div
            key={idx}
            style={{
              width: 250,
              marginBottom: 54,
              position: "relative",
              boxShadow: "0 8px 28px #c79abd6c, 0 2px 8px 2px #eae4e8",
              background: p.theme.overlay,
              borderRadius: 18,
              cursor: "pointer",
              border: "1px solid #f2e6f2",
              transform: `rotate(${((idx % 2 === 0) ? -4 : 4) + (idx === 0 ? -3 : 0)}deg)`,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.08, boxShadow: "0 20px 40px #eecaf666" }}
            whileTap={{ scale: 1.16, boxShadow: "0 8px 38px #ff92cac8", rotate: 0 }}
            onClick={(e) => handleMilestoneClick(e, p)}
          >
            <FloatingParticles emoji={p.theme.emojiUnder} color={p.theme.confetti} count={10} />
            <div
              style={{
                position: "absolute",
                top: -10,
                left: 20,
                zIndex: 7,
                fontSize: 22,
                userSelect: "none",
                rotate: "-13deg",
                opacity: 0.7,
              }}
            >
              📌
            </div>
            <div
              style={{
                position: "absolute",
                top: -9,
                right: 28,
                zIndex: 7,
                fontSize: 28,
                userSelect: "none",
                rotate: "11deg",
                opacity: 0.7,
              }}
            >
              🎀
            </div>
            <div
              style={{
                width: 236,
                height: 160,
                background: "#fff",
                borderRadius: 12,
                margin: "12px auto 0",
                overflow: "hidden",
                position: "relative",
                border: "1.5px solid #f7e6f0",
                boxShadow: "0 2px 12px 0 #efd8ec71",
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
              />
              <FontAwesomeIcon
                icon={p.theme.icon}
                color="#c37288"
                style={{
                  fontSize: 22,
                  position: "absolute",
                  left: 10,
                  top: 10,
                  opacity: 0.67,
                  filter: "blur(0.5px)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 6,
                  bottom: 6,
                  fontSize: 22,
                  opacity: 0.7,
                }}
              >
                {p.theme.sticker}
              </span>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "12px 10px 16px",
                color: "#8d6e7e",
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                lineHeight: 1.1,
                letterSpacing: "0.03em",
                textShadow: "0 1px 6px #fff6fa",
                userSelect: "text",
              }}
            >
              {p.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal above the milestone */}
      <AnimatePresence>
        {selected && (
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.85, y: 33 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.6, duration: 0.48 } },
              exit: { opacity: 0, scale: 0.87, y: 46, transition: { duration: 0.21 } },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "absolute",
              zIndex: 1003,
              background: selected.theme.overlay,
              borderRadius: 26,
              boxShadow: "0 18px 48px #e8bfd5cb",
              padding: 23,
              maxWidth: 300,
              width: "80vw",
              maxHeight: 360,
              overflowY: "auto",
              fontFamily: "'Quicksand',sans-serif",
              border: "2px solid #f1dbeb",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              left: popupPos.left - 150 > 10 ? popupPos.left - 150 : 10, // centered horizontally
              top: popupPos.top > 360 ? popupPos.top - 360 : popupPos.top + 60, // above or below milestone
              outline: "none",
            }}
          >
            {/* Close X top right */}
            <button
              aria-label="Close popup"
              onClick={closePopup}
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: "transparent",
                border: "none",
                fontSize: 28,
                color: "#b54f88",
                cursor: "pointer",
                fontWeight: "bold",
                zIndex: 40,
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div
              style={{
                width: "100%",
                height: 120,
                overflow: "hidden",
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              <img
                src={selected.img}
                alt={selected.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <h2
              style={{
                margin: "7px 0 14px 0",
                color: "#984577",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "0.045em",
                textAlign: "center",
              }}
            >
              {selected.sticker} {selected.title}
            </h2>
            <p
              style={{
                color: "#7a5a68",
                fontWeight: 500,
                fontSize: 15,
                marginBottom: 18,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              <span style={{ whiteSpace: "pre-line" }}>{selected.memory}</span>
            </p>
            <audio
              controls
              src={audioFile}
              style={{ width: "100%", outline: "none", marginBottom: 12, borderRadius: 7 }}
            />
            <motion.button
              onClick={() => setHeartClicked(!heartClicked)}
              animate={{ scale: heartClicked ? 1.26 : 1.0, color: heartClicked ? "#e9446a" : "#dab7d8" }}
              style={{
                fontSize: 30,
                display: "block",
                margin: "0 auto 14px",
                cursor: "pointer",
                border: "none",
                background: "none",
                outline: "none",
                textAlign: "center",
              }}
              whileTap={{ scale: 1.5, rotate: 8 }}
              aria-label="Tap to heart"
            >
              ❤️
            </motion.button>
            <FloatingParticles emoji={selected.theme.emojiUnder} color={selected.theme.confetti} count={9} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Messages Modal (unchanged) */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", duration: 0.37 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255,240,245,0.95)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "77vh",
              overflowY: "auto",
              padding: 16,
              boxShadow: "0 -8px 32px rgba(213,83,111,0.35)",
              zIndex: 1010,
              fontFamily: "'Quicksand',sans-serif",
              color: "#9b4176",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
                position: "relative",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 20,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Secret Messages
              </h3>
              <button
                onClick={() => setShowMessages(false)}
                aria-label="Close Secret Messages"
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 30,
                  cursor: "pointer",
                  color: "#b54f88",
                  fontWeight: "bold",
                  padding: 0,
                  marginLeft: 10,
                  lineHeight: 1,
                  position: "absolute",
                  top: 16,
                  right: 18,
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <button
                onClick={() => setMsgIndex((i) => Math.max(i - 1, 0))}
                disabled={msgIndex === 0}
                aria-label="Previous"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 32,
                  color: msgIndex === 0 ? "#aaa" : "#b54f88",
                  cursor: msgIndex === 0 ? "default" : "pointer",
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: 160,
                  maxHeight: 260,
                  justifyContent: "center",
                }}
              >
                {secretMessages[msgIndex].type === "img" ? (
                  <img
                    src={secretMessages[msgIndex].img}
                    alt=""
                    style={{
                      maxHeight: 170,
                      maxWidth: "85%",
                      borderRadius: 12,
                      boxShadow: "0 4px 17px #c1b5c7",
                      marginBottom: 11,
                      objectFit: "contain",
                    }}
                  />
                ) : null}
                <div
                  style={{ color: "#823559", fontWeight: 600, fontSize: 15, marginTop: 2 }}
                >
                  {secretMessages[msgIndex].caption}
                </div>
              </div>
              <button
                onClick={() => setMsgIndex((i) => Math.min(i + 1, secretMessages.length - 1))}
                disabled={msgIndex === secretMessages.length - 1}
                aria-label="Next"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 32,
                  color: msgIndex === secretMessages.length - 1 ? "#aaa" : "#b54f88",
                  cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer",
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

