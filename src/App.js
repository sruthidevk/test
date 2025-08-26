import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart, faMusic, faCloud, faStar, faFeatherAlt, faGift, faLaugh, faCameraRetro,
  faSeedling, faPalette, faXmark, faEnvelope, faArrowLeft, faArrowRight
} from "@fortawesome/free-solid-svg-icons";

// Fix for missing personalBgs
const personalBgs = Array.from({ length: 25 }, (_, i) => `/bg${i + 1}.jpg`);

// ALL milestones, none omitted, include Meenu with video, match your prior arrangement
const polaroids = [
  { title: "The First Text", memory: "Who knew one text would turn into a year-long saga. NOT COMPLAINING.", quizQuestion: "What was the first text about?", quizAnswer: "love", img: "/memory1.jpg", theme: { icon: faHeart, overlay: "#ffe6eb", sticker: "🫢", confetti: "#fa729e", emojiUnder: "💞" } },
  { title: "The Official Number Exchange Upgrade", memory: "I know Instagram was huge-er this just came naturally", quizQuestion: "Which app did we use first?", quizAnswer: "instagram", img: "/memory2.jpg", theme: { icon: faLaugh, overlay: "#fffae9", sticker: "😇", confetti: "#ffe138", emojiUnder: "🩷" } },
  { title: "The First Call", memory: "The very beginning of the never ending sodhi.", quizQuestion: "What started the neverending calls?", quizAnswer: "call", img: "/memory3.jpg", theme: { icon: faSeedling, overlay: "#e7fff0", sticker: "💌", confetti: "#b2dfdb", emojiUnder: "💗" } },
  { title: "The Telepathy", memory: "Cmon you were almost convinced I could read your mind.", quizQuestion: "What superpower did I almost have?", quizAnswer: "telepathy", img: "/memory4.jpg", theme: { icon: faCloud, overlay: "#e6f2ff", sticker: "😌", confetti: "#b9c6e7", emojiUnder: "❣️" } },
  { title: "The First Date", memory: "OUR first date. The beginning of your never ending waiting time.\nBut couldn’t have been any more PERFECT.", quizQuestion: "What was our first special outing called?", quizAnswer: "date", img: "/memory5.jpg", theme: { icon: faFeatherAlt, overlay: "#fff5e1", sticker: "💕", confetti: "#f8c471", emojiUnder: "🌸" } },
  { title: "The Second Meet", memory: "Well. Technically 2nd. If this didn’t make it that obvious - I WAS DOWN BAD", quizQuestion: "Which time did I fall for you?", quizAnswer: "second", img: "/memory6.jpg", theme: { icon: faLaugh, overlay: "#fbeaff", sticker: "🔄", confetti: "#d7bde2", emojiUnder: "🥹" } },
  { title: "The Golden Era", memory: "Adhe Bangaram Era. Your first ever nickname.\nPretty sure Tuthi came later", quizQuestion: "What was your first nickname?", quizAnswer: "nickname", img: "/memory7.jpg", theme: { icon: faPalette, overlay: "#ffeaea", sticker: "💫", confetti: "#fb8876", emojiUnder: "🍀" } },
  { title: "Spotify Official", memory: "89 percent. Not bad. Spotify approved that we could be couple goals", quizQuestion: "Which app gave us 89% compatibility?", quizAnswer: "spotify", img: "/memory8.jpg", theme: { icon: faMusic, overlay: "#eaffec", sticker: "🎶", confetti: "#93e9be", emojiUnder: "🎵" } },
  { title: "The Reel Flood", memory: "The chocolate cake and baby reels flood to be precise. Very enthusiastic we were.", quizQuestion: "What food was most featured in reels?", quizAnswer: "cake", img: "/memory9.jpg", theme: { icon: faGift, overlay: "#fffbdd", sticker: "🎎", confetti: "#fddb64", emojiUnder: "🍰" } },
  { title: "The One Year Mark", memory: "One year since Sruthi came into your life. What more would you have asked for.", quizQuestion: "We hit which big milestone in months?", quizAnswer: "year", img: "/memory10.jpg", theme: { icon: faCameraRetro, overlay: "#e0f4ff", sticker: "🫀", confetti: "#44b3ee", emojiUnder: "🎉" } },
  { title: "Saree", memory: "The first time you saw me in a saree... your reaction was priceless!", quizQuestion: "What traditional dress did you love?", quizAnswer: "saree", img: "/saree.jpg", theme: { icon: faGift, overlay: "#ffe6f0", sticker: "🥻", confetti: "#e15d87", emojiUnder: "🎀" } },
  { title: "Flo", memory: "Flo, always there with those soft paws and those big eyes.", quizQuestion: "Name of our furry companion?", quizAnswer: "flo", img: "/flo.jpg", theme: { icon: faStar, overlay: "#f3f8de", sticker: "🐾", confetti: "#b7d996", emojiUnder: "🐶" } },
  { title: "Childhood Pictures", memory: "Sharing childhood stories and little snapshots… pure nostalgia.", quizQuestion: "What kind of photos did we share?", quizAnswer: "childhood", img: "/childhood.jpg", theme: { icon: faCameraRetro, overlay: "#eaf5ff", sticker: "🧒", confetti: "#749ee8", emojiUnder: "📸" } },
  { title: "Ludo", memory: "Those epic ludo battles — let’s be honest, I win more 😉", quizQuestion: "Our favourite board game?", quizAnswer: "ludo", img: "/ludo.jpg", theme: { icon: faStar, overlay: "#fcfbec", sticker: "🎲", confetti: "#ffe773", emojiUnder: "🎲" } },
  { title: "Handwriting", memory: "How you adore my handwriting, and those secret notes.", quizQuestion: "What do you find cute in letters?", quizAnswer: "handwriting", img: "/handwriting.jpg", theme: { icon: faFeatherAlt, overlay: "#ecfaff", sticker: "✍️", confetti: "#67cdf0", emojiUnder: "✒️" } },
  { title: "Keychain", memory: "The first cute keychain you gifted — always on my bag!", quizQuestion: "Your first gift?", quizAnswer: "keychain", img: "/keychain.jpg", theme: { icon: faGift, overlay: "#ffe6ff", sticker: "🔑", confetti: "#e789d6", emojiUnder: "🔑" } },
  { title: "Meenu", memory: "Meenu and her legendary Maggi orders, the trio never fails.", quizQuestion: "Who is the food queen?", quizAnswer: "meenu", video: "/meenu-video.mp4", theme: { icon: faLaugh, overlay: "#fff9f7", sticker: "🐱", confetti: "#ffa25c", emojiUnder: "🐯" } },
  { title: "Ties", memory: "All those matching ties, so dapper — and hilarious!", quizQuestion: "What do we match for style?", quizAnswer: "ties", img: "/ties.jpg", theme: { icon: faStar, overlay: "#e6f4ff", sticker: "👔", confetti: "#7bb6ea", emojiUnder: "👔" } },
  { title: "The Seal Deal", memory: "The moment it became official — signed, sealed, delivered.", quizQuestion: "When did we make it official?", quizAnswer: "seal", img: "/seal.jpg", theme: { icon: faHeart, overlay: "#fffbea", sticker: "🔏", confetti: "#e5ce62", emojiUnder: "🔏" } },
  { title: "Movie", memory: "Our first movie date, popcorn fights and all.", quizQuestion: "Where did we eat popcorn together?", quizAnswer: "movie", img: "/movie.jpg", theme: { icon: faStar, overlay: "#e6eaff", sticker: "🍿", confetti: "#a7aae7", emojiUnder: "🎬" } },
  { title: "Flowers", memory: "Whenever you give me flowers, it’s a new day for my heart.", quizQuestion: "Which gift do I love to get?", quizAnswer: "flowers", img: "/flowers.jpg", theme: { icon: faPalette, overlay: "#e6ffed", sticker: "🌷", confetti: "#b0e8c6", emojiUnder: "🌺" } },
  { title: "Maggi", memory: "Late night maggi and stolen bites, it’s our guilty pleasure.", quizQuestion: "Which noodles are our go-to?", quizAnswer: "maggi", img: "/maggi.jpg", theme: { icon: faGift, overlay: "#eae1ff", sticker: "🍜", confetti: "#cbadf0", emojiUnder: "🍜" } },
  { title: "Stickers", memory: "Collecting cute stickers for every notebook. Each one is part of our story.", quizQuestion: "What cute thing do we collect?", quizAnswer: "stickers", img: "/stickers.jpg", theme: { icon: faLaugh, overlay: "#f6ffe6", sticker: "✨", confetti: "#d0f870", emojiUnder: "✨" } },
];

const secretImages = Array.from({ length: 14 }, (_, i) => `/secret${i + 1}.jpg`);
const violetGrad = "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)";
const subtleBgColor = "rgba(255,192,203,0.11)";

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
            transition: { duration: 4, repeat: Infinity, delay: Math.random() * 2 }
          }}
          style={{ position: "absolute", fontSize: 20, color, pointerEvents: "none" }}
        >
          {emoji}
        </motion.div>
      );
    })}
  </div>
);

function FadedBackground() {
  const imgSize = 140, cols = 5, repeatCount = 20;
  const imgs = Array.from({ length: personalBgs.length * repeatCount }, (_, i) => personalBgs[i % personalBgs.length]);
  const rows = Math.ceil(imgs.length / cols), containerHeight = rows * (imgSize + 30) + 50;
  return (
    <div style={{position:"absolute",top:0,left:0,width:"100%",height:containerHeight,pointerEvents:"none",zIndex:0}}>
      {imgs.map((src,i) => {
        const col = i % cols, row = Math.floor(i / cols), left = col * (imgSize + 26) + 30, top = row * (imgSize + 30) + 30;
        return <img key={i} src={src} alt="" draggable={false} loading="lazy" style={{position:"absolute",left,top,width:imgSize,height:imgSize,borderRadius:16,filter:"grayscale(0.15) blur(1.1px)",opacity:0.08+(i%7)*0.007,objectFit:"cover"}} />;
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

  // For secret messages, cycle exactly 14 images in order
  const nextMsg = () => setMsgIndex(i => (i + 1) % 14);
  const prevMsg = () => setMsgIndex(i => (i + 13) % 14);

  const handleCardClick = (p) => {
    setSelected(p);
    setQuizInput("");
    setQuizFeedback("");
    setPopupOpen(false);
    setHeartClicked(false);
  };

  // Opens popup only after quiz submit, always perfectly centered
  const handleQuizSubmit = () => {
    if (!selected) return;
    if (quizInput.trim().toLowerCase() === selected.quizAnswer.toLowerCase()) {
      setQuizFeedback("good boi 💋");
      setTimeout(() => {
        setPopupOpen(true);
        document.body.style.overflow = "hidden";
      }, 350);
    } else {
      setQuizFeedback(`WOW. DO BETTER. Correct answer: ${selected.quizAnswer}`);
      setTimeout(() => {
        setPopupOpen(true);
        document.body.style.overflow = "hidden";
      }, 350);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    setHeartClicked(false);
    setQuizFeedback("");
    setQuizInput("");
    document.body.style.overflow = "";
  };

  return (
    <div style={{
      fontFamily: "'Quicksand', sans-serif",
      minHeight: "200vh",
      background: violetGrad,
      position: "relative",
      overflow: "hidden",
      color: "#8a4380",
    }}>
      <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:subtleBgColor,pointerEvents:"none",zIndex:0}} />
      <FadedBackground />
      <h1 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, margin: "30px 0 20px" }}>Polaroid Trail of Us</h1>

      {/* Secret Messages Button */}
      <motion.div onClick={() => { setShowMessages(true); setMsgIndex(0);}}
                  style={{ position:"fixed", bottom:30, right:30, width:56, height:56, borderRadius:28, background:"#d54482", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:100 }}>
        <FontAwesomeIcon icon={faEnvelope} color="#fff" size="lg"/>
      </motion.div>

      <div style={{ maxWidth: 340, margin: "0 auto", zIndex: 10 }}>
        {polaroids.map((p, i) => (
          <motion.div key={i} style={{
            marginBottom: 56,
            cursor: "pointer",
            background: p.theme.overlay,
            borderRadius: 14,
            border: "1.5px solid #cda3b8",
            boxShadow: "0 6px 18px rgba(196, 126, 158, 0.20)",
            rotate: i % 2 === 0 ? "-3deg" : "3deg"
          }} onClick={() => handleCardClick(p)}>
            <div style={{ padding: 12 }}>
              {p.video ? (
                <video src={p.video} autoPlay muted loop playsInline style={{ width: "100%", height: 160, borderRadius: 12, objectFit: "cover" }} />
              ) : (
                <img src={p.img} alt={p.title} style={{ width: "100%", height: 160, borderRadius: 12, objectFit: "cover" }} />
              )}
              <div style={{ fontWeight:700,fontSize:18,marginTop:10, color:"#7e3a5a", textAlign:"center" }}>{p.title}</div>
              <div style={{ marginTop: 12, display:"flex", justifyContent:"center", alignItems:"center" }}>
                <input
                  value={quizInput}
                  onChange={e=>setQuizInput(e.target.value)}
                  placeholder={p.quizQuestion}
                  style={{ padding:"8px", borderRadius:10, border:"1.5px solid #b45579", textAlign:"center", width:"70%" }}
                  onClick={e=>e.stopPropagation()}
                  onKeyDown={e=>e.key==="Enter" && handleQuizSubmit()}
                />
                <button onClick={e=> { e.stopPropagation(); handleQuizSubmit(); }}
                  style={{marginLeft:8, padding:"8px 14px", borderRadius:10, backgroundColor:"#b45579", color:"#fff", border:"none", cursor:"pointer"}}>Submit</button>
              </div>
              {quizFeedback && selected && selected.title === p.title &&
                <div style={{marginTop:8, fontWeight:"bold", color:quizFeedback.startsWith("good") ? "green":"crimson", textAlign:"center"}}>{quizFeedback}</div>
              }
            </div>
          </motion.div>
        ))}
      </div>
      {/* Always centered popup, only after quiz submit */}
      <AnimatePresence>
        {selected && popupOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            style={{
              position:"fixed",
              top:"50%",
              left:"50%",
              transform:"translate(-50%, -50%)",
              width:"92vw",
              maxWidth:350,
              maxHeight:"86vh",
              overflowY:"auto",
              background:selected.theme.overlay,
              borderRadius:20,
              border:"2px solid #c8a3b6",
              boxShadow:"0 0 16px rgba(131,59,97,0.25)",
              zIndex:9999,
              padding:22,
              display:"flex", flexDirection:"column", alignItems:"center"
            }}>
            <button onClick={closePopup} style={{
              position:"absolute",top:10,right:10,background:"none",border:"none",fontSize:24, cursor:"pointer"}} aria-label="Close popup">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {selected.video ? (
              <video src={selected.video} autoPlay muted loop playsInline style={{ width: "100%", maxHeight: 180, borderRadius: 14, objectFit:"cover", marginBottom: 15 }} />
            ) : (
              <img src={selected.img} alt={selected.title} style={{ width: "100%", maxHeight: 180, borderRadius: 14, objectFit: "cover", marginBottom: 15 }} />
            )}
            <h2 style={{ color: "#7e3a5a", marginTop: 10, marginBottom: 12, fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
              {selected.title} {selected.sticker}
            </h2>
            <p style={{ fontStyle: "italic", color: "#5e3d4b", whiteSpace: "pre-line", textAlign: "center" }}>{selected.memory}</p>
            <motion.button
              onClick={() => setHeartClicked(h=>!h)}
              animate={{ scale: heartClicked ? 1.3 : 1, color: heartClicked ? "crimson" : "#b3718e" }}
              style={{ fontSize: 32, marginTop: 16, cursor: "pointer", border: "none", background: "none" }}>❤️
            </motion.button>
            <FloatingParticles emoji={selected.theme.emojiUnder} color={selected.theme.confetti} count={10} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Secret Messages modal always cycles 14 in order, never omitted */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed", bottom:0,left:0,right:0,
              background:"rgba(255,240,245,0.97)",
              borderTopLeftRadius:20, borderTopRightRadius:20,
              maxHeight:"70vh",overflow:"auto",zIndex:19999,
              padding:18, fontFamily:"'Quicksand',sans-serif", color:"#8a3d6b"
            }}>
            <div style={{position:"relative", textAlign:"center", fontWeight:700, fontSize:20, marginBottom:20}}>Secret Messages
              <button onClick={()=>setShowMessages(false)}
                aria-label="Close Secret Messages"
                style={{ position: "absolute", right: 12, top: -6, background: "none", border: "none", fontSize: 24, cursor: "pointer" }}>
                <FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <button onClick={prevMsg} style={{fontSize:28,background:"none",border:"none",color:"#b46c99",cursor:"pointer"}}>
                <FontAwesomeIcon icon={faArrowLeft}/></button>
              <div style={{flex:1, display:"flex",justifyContent:"center"}}>
                <img src={secretImages[msgIndex]} alt="" style={{maxWidth:"85%",borderRadius:12,maxHeight:220}} />
              </div>
              <button onClick={nextMsg} style={{fontSize:28,background:"none",border:"none",color:"#b46c99",cursor:"pointer"}}>
                <FontAwesomeIcon icon={faArrowRight}/></button>
            </div>
            <div style={{marginTop:10, textAlign:"center", color:"#b46c99"}}>{msgIndex+1}/14</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
