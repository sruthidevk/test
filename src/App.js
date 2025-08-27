import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faXmark,
  faEnvelope,
  faArrowLeft,
  faArrowRight,
  faLaugh,
  faSeedling,
  faCloud,
  faFeatherAlt,
  faGift,
  faMusic,
  faCameraRetro,
  faPalette,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const personalBgs = Array.from({ length: 25 }, (_, i) => `/bg${i + 1}.jpg`);
const violetGrad = "linear-gradient(135deg, #e0f0ff 0%, #b0cee9 100%)";
const subtleBg = "rgba(255,192,203,0.11)";

const polaroids = [
  {
    title: "The First Text",
    memory: "That not so innocent notification? Yeah, it ruined tutha’s peace forever.",
    quizQuestion: "Who texted first-\nMe/You?",
    quizAnswer: "You",
    img: "/memory1.jpg",
    theme: { overlay: "#ffe6eb", sticker: "🫢", confetti: "#fa729e", emoji: "💞" },
  },
  // include all other milestones exactly as you have them, with '\\n' in strings for line breaks
];

function FadedBackground() {
  const imgSize = 140;
  const cols = 5;
  const repeatCount = 20;
  const imgs = Array.from({ length: personalBgs.length * repeatCount }, (_, i) => personalBgs[i % personalBgs.length]);
  const rows = Math.ceil(imgs.length / cols);
  const containerHeight = rows * (imgSize + 30) + 50;

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: containerHeight, pointerEvents: "none", zIndex: 0, userSelect: "none" }}>
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
            style={{ position: "absolute", left, top, width: imgSize, height: imgSize, borderRadius: 16, filter: "grayscale(0.15) blur(1.1px)", opacity: 0.1, objectFit: "cover" }}
          />
        )
      })}
    </div>
  )
}

const popupVariants = {
  hidden: { opacity: 0, x: 70, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.5 } },
  exit: { opacity: 0, x: 70, scale: 0.95, transition: { duration: 0.3 } }
}

const secretMessages = Array.from({ length: 14 }, (_, i) => ({
  img: `/secret${i+1}.jpg`,
  caption: ""
}))

export default function App() {
  const [selected, setSelected] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [quizInput, setQuizInput] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [heartClicked, setHeartClicked] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showHeartNote, setShowHeartNote] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 800);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleCardClick = (item) => {
    setSelected(item);
    setQuizInput("");
    setQuizFeedback("");
    setPopupOpen(false);
    setHeartClicked(false);
  }

  const handleSubmit = (e, item) => {
    e.preventDefault();
    if (!item) return;
    const isCorrect = quizInput.trim().toLowerCase() === item.quizAnswer.toLowerCase();
    setSelected(item);
    setQuizFeedback(isCorrect ? "Good boi 💋" : `WOW! Better luck next time! The answer: ${item.quizAnswer}`);
    setPopupOpen(true);
    document.body.style.overflow = "hidden";
    if (!isDesktop) setTimeout(()=> window.scrollTo({top:0, behavior:"smooth"}), 200);
  }

  const closePopup = () => {
    setPopupOpen(false);
    setHeartClicked(false);
    setQuizInput("");
    setQuizFeedback("");
    document.body.style.overflow = "";
  }

  const nextMsg = () => setMsgIndex(i => (i + 1) % secretMessages.length);
  const prevMsg = () => setMsgIndex(i => (i - 1 + secretMessages.length) % secretMessages.length);

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", minHeight: "100vh", background: violetGrad, color: "#7a447f", position: "relative", overflowX: "auto" }}>
      <div style={{ position: "fixed", top:0, left:0, width:"100%", height:"100%", background: subtleBg, pointerEvents: "none", zIndex: 0 }} />
      <FadedBackground />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 20, paddingTop: 60, paddingBottom: 60, flexWrap: "nowrap" }}>
        <div style={{ flex: "0 0 360px", overflowY: "auto", maxHeight: "90vh", marginLeft: 20 }}>
          {polaroids.map((item, idx) =>
            <motion.div key={idx} style={{
              marginBottom: 40,
              background: item.theme.overlay,
              borderRadius: 14,
              boxShadow: "0 0 14px rgb(187 146 183 / 0.5)",
              paddingBottom: 12,
              border: "2px solid #bb92b7",
              cursor: "pointer",
              rotate: idx % 2 === 0 ? "-3deg" : "3deg",
            }} whileHover={{ scale: 1.05, rotate: 0, boxShadow: "0 0 28px rgba(188,78,189,0.6)" }}
              onClick={() => handleCardClick(item)}>

              {item.video ? (
                <video src={item.video} autoPlay muted loop playsInline style={{ width:"100%", borderRadius:14, height:156, objectFit:"cover" }} />
              ) : (
                <img src={item.img} alt={item.title} style={{ width:"100%", borderRadius:14, height:156, objectFit:"cover" }} />
              )}

              <div style={{ textAlign: "center", fontSize: 20, fontWeight: "700", marginTop: 10, color: "#653459" }}>
                {item.title}
              </div>

              <form onSubmit={e => { e.preventDefault(); handleSubmit(e, item); }} style={{ marginTop: 20, padding: "0 16px" }}>
                {item.quizQuestion && <div style={{ fontWeight:600, fontSize:14, marginBottom: 8, whiteSpace: "pre-line", color: "#7a3660", textAlign: "center" }}>{item.quizQuestion}</div>}

                <input type="text" onClick={e=> e.stopPropagation()} value={quizInput} onChange={e => setQuizInput(e.target.value)} style={{ width:"100%", borderRadius:12, border:"1.5px solid #aa76b7", padding:10, fontSize:17, fontWeight:"600", textAlign:"center" }} />

                <button type="submit" style={{ width:"100%", marginTop:10, padding:10, background:"#bb569d", border:"none", borderRadius:14, color:"white", fontWeight:"700", fontSize:16, cursor:"pointer" }}>Submit</button>
              </form>
            </motion.div>
          )}
        </div>

        {isDesktop && selected && popupOpen && (
          <motion.div key="popup" initial="hidden" animate="visible" exit="exit" variants={popupVariants}
            style={{
              flex: "0 0 360px",
              background: selected.theme.overlay,
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 0 40px rgb(218 103 184 / 0.6)",
              color: "#7a4b75",
              position: "sticky",
              top: 40,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button onClick={closePopup} aria-label="Close popup" style={{ position: "absolute", top: 20, right: 20, fontSize: 28, background: "transparent", border: "none", color: "#82385d", cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {selected.video ? (
              <video src={selected.video} autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 16, height: 180, objectFit: "cover", marginBottom: 20 }} />
            ) : (
              <img src={selected.img} alt={selected.title} style={{ width: "100%", borderRadius: 16, height: 180, objectFit: "cover", marginBottom: 20 }} />
            )}
            <h3 style={{ fontWeight: 800, fontSize: 24, color: "#703c65", marginBottom: 12, textAlign: "center" }}>{selected.title} {selected.theme.sticker}</h3>
            <p style={{ fontSize: 16, fontWeight: 500, whiteSpace: "pre-line", textAlign: "center", marginBottom: 18 }}>
              {selected.memory}
            </p>
            {quizFeedback && (
              <p style={{ fontSize:16, fontWeight: "800", textAlign: "center", color: quizFeedback.includes("Good") ? "green" : "crimson" }}>
                {quizFeedback}
              </p>
            )}
            <motion.button animate={{ scale: heartClicked ? 1.2 : 1, color: heartClicked ? "#db237a" : "#a7578d" }} onClick={() => setHeartClicked(!heartClicked)} style={{ fontSize: 38, marginTop: 20, display: "block", marginLeft: "auto", marginRight: "auto", background: "transparent", border: "none", cursor: "pointer" }} whileTap={{ scale: 1.3 }} aria-label="Favourite button">
              ❤️
            </motion.button>
          </motion.div>
        )}

      </div>

      {/* Buttons for Secret Messages and Heart Note */}
      <motion.div onClick={() => setShowMessages(true)} style={{ position: "fixed", bottom: 30, right: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: "#bb559d", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, cursor: "pointer" }} aria-label="Toggle secret messages">
        <FontAwesomeIcon icon={faEnvelope} color="white" size="lg" />
      </motion.div>

      <motion.div onClick={() => setShowHeartNote(curr => !curr)} style={{ position: "fixed", bottom: 30, left: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: "#db4a82", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, cursor: "pointer" }} aria-label="Toggle heart note">
        <FontAwesomeIcon icon={faHeart} color="white" size="lg" />
      </motion.div>

      {/* Secret Messages Drawer */}
      <AnimatePresence>
        {showMessages && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", bounce: 0.25, duration: 0.4 }} style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "70vh", backgroundColor: "rgba(236 184 222 / 0.7)", borderRadius: "24px 24px 0 0", padding: 24, zIndex: 10000, overflowY: "auto", fontFamily: "'Quicksand', sans-serif", color: "#7a4b75" }} aria-label="Secret messages drawer">
            <div style={{ position: "relative", textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22 }}>Secret Messages</h3>
              <button onClick={() => setShowMessages(false)} aria-label="Close secret messages" style={{ position: "absolute", top: 16, right: 20, fontSize: 24, backgroundColor: "transparent", border: "none", cursor: "pointer", color: "#7a4b75" }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={prevMsg} disabled={msgIndex === 0} style={{ border: "none", backgroundColor: "transparent", fontSize: 28, color: msgIndex === 0 ? "#c5a4bd" : "#7a4b75", cursor: msgIndex === 0 ? "default" : "pointer" }} aria-label="Previous secret message">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={secretMessages[msgIndex].img} alt={`Secret message ${msgIndex + 1}`} style={{ maxWidth: "85%", maxHeight: 220, borderRadius: 20, objectFit: "cover" }} />
              <button onClick={nextMsg} disabled={msgIndex === secretMessages.length - 1} style={{ border: "none", backgroundColor: "transparent", fontSize: 28, color: msgIndex === secretMessages.length - 1 ? "#c5a4bd" : "#7a4b75", cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer" }} aria-label="Next secret message">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <p style={{ fontWeight: 600, textAlign: "center", marginTop: 8 }}>
              {msgIndex + 1} / {secretMessages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart Note Drawer */}
      <AnimatePresence>
        {showHeartNote && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", bounce: 0.25, duration: 0.4 }} style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "70vh", backgroundColor: "rgba(236 184 222 / 0.7)", borderRadius: "24px 24px 0 0", padding: 24, zIndex: 10000, overflowY: "auto", fontFamily: "'Quicksand', sans-serif", color: "#7a4b75" }} aria-label="Heart note drawer">
            <div style={{ position: "relative", textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22 }}>A Note For You</h3>
              <button onClick={() => setShowHeartNote(false)} aria-label="Close heart note" style={{ position: "absolute", top: 16, right: 20, fontSize: 24, backgroundColor: "transparent", border: "none", cursor: "pointer", color: "#7a4b75" }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p style={{ whiteSpace: "pre-line", fontSize: 16 }}>
              Dear Tushar,

              Beyond all these memories, there’s a special message I want you to know.

              I see and appreciate all the love and efforts you put in day after day.

              You mean the world to me, now and forever.

              Thank you for being you.

              Always,

              Sruthi
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

