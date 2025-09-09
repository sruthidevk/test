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
const violetGrad = "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)";
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
  {
    title: "The Official Number Exchange Upgrade",
    memory: "I know Instagram was huge-er this just came naturally\nNever forgetting that you ignored me for 2 whole days\nI WAS DYING FOR YOU TO FIGURE IT OUT",
    quizQuestion: "Whats my number?",
    quizAnswer: "9440992807",
    img: "/number.jpg",
    theme: { icon: faLaugh, overlay: "#fffae9", sticker: "😇", confetti: "#ffe138", emojiUnder: "🩷" },
  },
  {
    title: "The Reel Flood",
    memory: "The baby reels flood to be precise\nVery enthusiastic we were.",
    quizQuestion: "Who followed who first-Me/You?",
    quizAnswer: "You",
    img: "/reel.jpg",
    theme: { icon: faGift, overlay: "#fffbdd", sticker: "🎎", confetti: "#fddb64", emojiUnder: "🍰" },
  },
  {
    title: "The Coincidences",
    memory: "Cmon you were almost scared of me\nI kind of figured you out waaay early",
    quizQuestion: "Which one object prompted you\nto add me to your ft.tushar?",
    quizAnswer: "nosepin",
    img: "/coincidence.jpg",
    theme: { icon: faCloud, overlay: "#e6f2ff", sticker: "😌", confetti: "#b9c6e7", emojiUnder: "❣️" },
  },
  {
    title: "Flower Firsts",
    memory: "I consider myself ridiculously lucky to get Tushar’s first ever flowers\nAlso getting taunted by school kids on a bus? never happened before.",
    quizQuestion: "What smol flower did I get you?",
    quizAnswer: "lotus",
    img: "/flowers.jpg",
    theme: { icon: faPalette, overlay: "#e6ffed", sticker: "🌷", confetti: "#b0e8c6", emojiUnder: "🌺" },
  },
  {
    title: "The First Date",
    memory: "OUR first date. The beginning of your never ending waiting time.\nBut couldn’t have been any more PERFECT.",
    quizQuestion: "What colour flats was I wearing?",
    quizAnswer: "white",
    img: "/memory5.jpg",
    theme: { icon: faFeatherAlt, overlay: "#fff5e1", sticker: "💕", confetti: "#f8c471", emojiUnder: "🌸" },
  },
  {
    title: "The Second Meet",
    memory: "Well. Technically 2nd. If this didn’t make it that obvious - I WAS DOWN BAD\nSruthi’s one for grand gestures\n^cries at the smallest of things",
    quizQuestion: "Why was I supposedly there?",
    quizAnswer: "Airtel Office",
    img: "/memory6.jpg",
    theme: { icon: faLaugh, overlay: "#fbeaff", sticker: "🔄", confetti: "#d7bde2", emojiUnder: "🥹" },
  },
  {
    title: "Spotify Official",
    memory: "89 percent. Not bad. Spotify approved that we could be couple goals\nAnd you still weren’t satisfied.",
    quizQuestion: "How much was the match percent?",
    quizAnswer: "89",
    img: "/spotify.jpg",
    theme: { icon: faMusic, overlay: "#eaffec", sticker: "🎶", confetti: "#93e9be", emojiUnder: "🎵" },
  },
  {
    title: "Draped in a Wish",
    memory: "Who even puts on a saree for no reason\nother than just a RANDO saying it\nSRUTHI DOES!",
    quizQuestion: "What was the colour of the first saree\nI ever wore FOR YOU?",
    quizAnswer: "orange",
    img: "/saree.jpg",
    theme: { icon: faGift, overlay: "#ffe6f0", sticker: "🥻", confetti: "#e15d87", emojiUnder: "🎀" },
  },
  {
    title: "Hi Meenu",
    memory: "The first person to know my Tusha.\nI was half afraid you’d like her more.",
    img: "/meenu.jpg",
    quizQuestion: "What did Meenu first call you?",
    quizAnswer: "tuchar",
    theme: { icon: faLaugh, overlay: "#fff9f7", sticker: "😽", confetti: "#ffa25c", emojiUnder: "🐯" },
  },
  {
    title: "The Golden Era",
    memory: "Adhe Bangaram Era. Your first ever nickname.\nPretty sure Tuthi came later",
    quizQuestion: "What do you like most\nto be called by me?",
    quizAnswer: "shouldnt have a fav",
    img: "/nickname.jpg",
    theme: { icon: faPalette, overlay: "#ffeaea", sticker: "💫", confetti: "#fb8876", emojiUnder: "🍀" },
  },
  {
    title: "Flo Official",
    memory: "Tushar being persistent ^with a ton of breaks\nand Sruthi had to give in",
    quizQuestion: "My average period lasts how many days?",
    quizAnswer: "five",
    img: "/flo.jpg",
    theme: { icon: faStar, overlay: "#f3f8de", sticker: "🌊", confetti: "#b7d996", emojiUnder: "🐶" },
  },
  {
    title: "Handwriting or Whatever that was",
    memory: "Too bad I didnt see it before.\nNow I’m in too deep to get away from that\nABSTRACT MODERN ART.",
    quizQuestion: "What is that style\nyou write in called?",
    quizAnswer: "ANYTHING BUT CURSIVE",
    img: "/handwriting.jpg",
    theme: { icon: faFeatherAlt, overlay: "#ecfaff", sticker: "✍️", confetti: "#67cdf0", emojiUnder: "✒️" },
  },
  {
    title: "Seeing Panduamma🥹",
    memory: "HOW CAN I EVER BE MAD AT YOU AFTER LOOKING AT PANDU.\nEmotionally manipulated by that cute face",
    quizQuestion: "What colour garland\nwas my Pandu wearing\nin you know what?",
    quizAnswer: "red",
    img: "/child.jpg",
    theme: { icon: faCameraRetro, overlay: "#eaf5ff", sticker: "🧒", confetti: "#749ee8", emojiUnder: "📸" },
  },
  {
    title: "ChatGPT Official",
    memory: "You gyatt a tech-savvy gurll. Thank your stars atleast one of us is.",
    quizQuestion: "I converted a few pictures into\na certain style - what style?",
    quizAnswer: "Ghibli",
    img: "/stickers.jpg",
    theme: { icon: faLaugh, overlay: "#f6ffe6", sticker: "✨", confetti: "#d0f870", emojiUnder: "✨" },
  },
  {
    title: "Ludo kaadu Mosam",
    memory: "You killed me. Champesaavu nannu\nHOW COULD YOU🥹",
    quizQuestion: "What was my Player name?",
    quizAnswer: "Tushar-always wanted you to win. That’s a lie.",
    img: "/ludo.jpg",
    theme: { icon: faStar, overlay: "#fcfbec", sticker: "🎲", confetti: "#ffe773", emojiUnder: "🎲" },
  },
  {
    title: "Doctor Strange",
    memory: "No matter the X number of coincidences.\nthis shocked me the most\nNow you know why I had to bring it up.",
    quizQuestion: "What was the colour of the\ninner rotating part you lost?",
    quizAnswer: "green",
    img: "/keychain.jpg",
    theme: { icon: faGift, overlay: "#ffe6ff", sticker: "🔑", confetti: "#e789d6", emojiUnder: "🔑" },
  },
  {
    title: "Familiar in the best way\n2nd round of anandam",
    memory: "I missed you teribbly the moment you were out of sight.\nThats when I realised my best days \ncome with a withdrawl syndrome called YOU. ",
    quizQuestion: "Name the place we did our first painting",
    quizAnswer: "artgram",
    img: "/seal.jpg",
    theme: { icon: faHeart, overlay: "#fffbea", sticker: "🐥", confetti: "#e5ce62", emojiUnder: "🔏" },
  },
  {
    title: "The Movie We Paid To Not Watch",
    memory: "Sruthi’s first 3D-Distraction,Distraction,Distraction.\nNEVER has Sruthi thought she’d watch a TELUGU DUBBED ANIMATED 3D movie\nWITHOUT her specs. That happened.\nNot that she was interested in the movie anyway.",
    quizQuestion: "Which movie did we even watch\nthe first time IRL Tushar?",
    quizAnswer: "Mufasa",
    img: "/movie.jpg",
    theme: { icon: faStar, overlay: "#e6eaff", sticker: "🍿", confetti: "#a7aae7", emojiUnder: "🎬" },
  },
  {
    title: "Tied to You",
    memory: "The only reason I got them that day\nwas to actually show\nHOW much I believe in you. Always.",
    quizQuestion: "What was the major colour\nin the Satya Paul tie?",
    quizAnswer: "yellow",
    img: "/tie.jpg",
    theme: { icon: faStar, overlay: "#e6f4ff", sticker: "👔", confetti: "#7bb6ea", emojiUnder: "👔" },
  },
  {
    title: "The Birthday Season",
    memory: "Our First Birthdays Together\nI felt a quiet joy knowing we had each other to celebrate with\nThis year my biggest gift wasn’t something grand or wrapped\nit was simply YOU,being mine.",
    quizQuestion: "What day-DAY OF THE WEEK\nwas I born on?",
    quizAnswer: "wednesday",
    img: "/birthday.jpg",
    theme: { icon: faStar, overlay: "#e6f4ff", sticker: "💗", confetti: "#7bb6ea", emojiUnder: "👔" },
  },
  {
    title: "Maggi^cally Different",
    memory: "Given our contrast in maggi and pani puri style made me rethink for a second\nbut nothing no matter how huge\ncan convince me otherwise.",
    quizQuestion: "Who makes better Maggi?",
    quizAnswer: "ME.ME.ME.",
    img: "/maggi.jpg",
    theme: { icon: faGift, overlay: "#eae1ff", sticker: "🍜", confetti: "#cbadf0", emojiUnder: "🍜" },
  },
  {
    title: "The One Year Mark",
    memory: "One year since Sruthi came and crash landed into your life. What more would you have asked for?",
    quizQuestion: "ARE YOU HAPPY",
    quizAnswer:
      "There is no correct answer.\nI’M SORRY for when I make you feel like you have to do better\nYou really don’t.\nYOU ALREADY ARE THE BEST💝",
    img: "/memory10.jpg",
    theme: { icon: faCameraRetro, overlay: "#e0f4ff", sticker: "🫀", confetti: "#44b3ee", emojiUnder: "🎉" },
  },
];

function FadedBackground() {
  const imgSize = 140;
  const cols = 5;
  const repeatCount = 20;
  const imgs = Array.from(
    { length: personalBgs.length * repeatCount },
    (_, i) => personalBgs[i % personalBgs.length]
  );
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

const popupVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4, duration: 0.4 },
  },
  exit: { opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.2 } },
};

const secretMessages = Array.from({ length: 16 }, (_, i) => ({
  img: `/secret${i + 1}.jpg`,
  caption: "",
}));

export default function App() {
  const [selected, setSelected] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [quizInput, setQuizInput] = React.useState("");
  const [quizFeedback, setQuizFeedback] = React.useState("");
  const [heartClicked, setHeartClicked] = React.useState(false);
  const [showMessages, setShowMessages] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);
  const [showHeartNote, setShowHeartNote] = React.useState(false);

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleCardClick = (item) => {
    setSelected(item);
    setQuizInput("");
    setQuizFeedback("");
    setPopupOpen(false);
    setHeartClicked(false);
  };

  const handleSubmit = (e, item) => {
    e.stopPropagation();
    const isCorrect =
      quizInput.trim().toLowerCase() === item.quizAnswer.toLowerCase();
    setSelected(item);
    setQuizFeedback(
      isCorrect
        ? "Good boi 💋"
        : `WOW! Do better. Correct answer: ${item.quizAnswer}`
    );
    setPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setPopupOpen(false);
    setHeartClicked(false);
    setQuizInput("");
    setQuizFeedback("");
    document.body.style.overflow = "";
  };

  const nextMsg = () => setMsgIndex((i) => (i + 1) % secretMessages.length);
  const prevMsg = () => setMsgIndex((i) => (i + secretMessages.length - 1) % secretMessages.length);

  return (
    <div
      style={{
        fontFamily: "'Quicksand', sans-serif",
        minHeight: "200vh",
        background: violetGrad,
        color: "#7a447f",
        position: "relative",
        paddingBottom: 100,
      }}
    >
      {/* subtle overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: subtleBg,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <FadedBackground />

      <h1 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, margin: "30px 0" }}>
        OUR MILESTONES
      </h1>

      {/* Secret Messages Button */}
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
          borderRadius: 28,
          backgroundColor: "#bb569b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 9999,
        }}
        aria-label="Secret messages toggle"
      >
        <FontAwesomeIcon icon={faEnvelope} color="#fff" size="lg" />
      </motion.div>

      {/* Heart Note Button - bottom left */}
      <motion.div
        onClick={() => setShowHeartNote((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: 30,
          left: 30,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#e75381",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 9999,
        }}
        aria-label="Heart note toggle"
      >
        <FontAwesomeIcon icon={faHeart} color="#fff" size="lg" />
      </motion.div>

      {/* Milestones list */}
      <div style={{ maxWidth: 340, margin: "auto", marginTop: 20, zIndex: 10, position: "relative" }}>
        {polaroids.map((item, idx) => (
          <motion.div
            key={idx}
            style={{
              marginBottom: 56,
              background: item.theme.overlay,
              borderRadius: 14,
              border: "1.8px solid #bb92b7",
              boxShadow: "0 6px 18px #a86da5",
              rotate: idx % 2 ? "3deg" : "-3deg",
              cursor: "pointer",
              paddingBottom: 16,
            }}
            whileHover={{ scale: 1.05, rotate: 0, boxShadow: "0 15px 28px rgba(188,78,189,0.5)" }}
            onClick={() => handleCardClick(item)}
          >
            {item.video ? (
              <video src={item.video} autoPlay muted loop playsInline style={{ width: "100%", height: 156, borderRadius: 14, objectFit: "cover" }} />
            ) : (
              <img src={item.img} alt={item.title} style={{ width: "100%", height: 156, borderRadius: 14, objectFit: "cover" }} />
            )}
            <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8, color: "#65314f", textAlign: "center" }}>
              {item.title}
            </div>
            <div style={{ marginTop: 12, padding: "0 16px" }}>
              {item.quizQuestion && (
                <div style={{ whiteSpace: "pre-line", fontWeight: 500, textAlign: "center", fontSize: 15, color: "#793662", marginBottom: 10 }}>
                  {item.quizQuestion}
                </div>
              )}
              <input
                type="text"
                value={quizInput}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setQuizInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: 9,
                  borderRadius: 14,
                  border: "1.5px solid #aa77b1",
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: "17px",
                }}
              />
              <button
                style={{
                  marginTop: 10,
                  background: "#bb569b",
                  color: "white",
                  border: "none",
                  borderRadius: 14,
                  width: "100%",
                  fontWeight: 700,
                  padding: "10px 0",
                  cursor: "pointer",
                  fontSize: "17px",
                }}
                onClick={(e) => handleSubmit(e, item)}
              >
                Submit
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup - MODIFIED STYLE BLOCK ONLY! */}
      <AnimatePresence>
        {selected && popupOpen && (
          <motion.div
            key="popup"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            style={{
              position: "fixed",
              top: "7vh",
              right: window.innerWidth >= 900 ? "5vw" : "50%",
              left: window.innerWidth >= 900 ? "auto" : "50%",
              transform: window.innerWidth >= 900 ? "none" : "translate(-50%, 0)",
              maxWidth: 410,
              width: window.innerWidth >= 900 ? "31vw" : "90vw",
              minWidth: 320,
              maxHeight: "83vh",
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
              alignItems: "center"
            }}
          >
            <button onClick={closePopup} aria-label="Close popup" style={{
              position: "absolute", top: 14, right: 18, background: "transparent", border: "none", fontSize: 26, cursor: "pointer", color: "#883a85"
            }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {selected.video ? (
              <video src={selected.video} autoPlay muted loop playsInline style={{ width: "100%", borderRadius: 20, height: 180, objectFit: "cover", marginBottom: 20 }} />
            ) : (
              <img src={selected.img} alt={selected.title} style={{ width: "100%", borderRadius: 20, height: 180, objectFit: "cover", marginBottom: 20 }} />
            )}

            <h3 style={{ textAlign: "center", fontWeight: 700, fontSize: 22, marginBottom: 10 }}>
              {selected.title} {selected.theme.sticker}
            </h3>

            <p style={{ whiteSpace: "pre-line", fontSize: 16, textAlign: "center", lineHeight: 1.4, marginBottom: 16 }}>
              {selected.memory}
            </p>

            {quizFeedback && (
              <p style={{ fontWeight: "bold", marginBottom: 20, color: quizFeedback.includes("Good") ? "green" : "crimson" }}>
                {quizFeedback}
              </p>
            )}

            <motion.button animate={{ scale: heartClicked ? 1.4 : 1, color: heartClicked ? "#d7157a" : "#bb57a0" }} onClick={() => setHeartClicked(!heartClicked)} style={{
              fontSize: 40, cursor: "pointer", border: "none", background: "transparent", marginBottom: 12
            }} whileTap={{ scale: 1.6 }} aria-label="Favourite button">
              ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Messages Bottom Sheet */}
      <AnimatePresence>
        {showMessages && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", bounce: 0.25, duration: 0.3 }} style={{
              position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "70vh", background: "#fdeaebcc",
              borderRadius: "24px 24px 0 0", padding: 24, overflowY: "auto", zIndex: 10000, userSelect: "none",
              fontFamily: "'Quicksand', sans-serif", color: "#824d86"
            }}>
            <div style={{ position: "relative", textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22 }}>A lovely reminder to always stand by your words ^lekapothe champestha hehe jk not jk</h3>
              <button onClick={() => setShowMessages(false)} style={{
                position: "absolute", top: 16, right: 20, fontSize: 24, border: "none",
                background: "transparent", cursor: "pointer", color: "#824d86"
              }}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={prevMsg} disabled={msgIndex === 0} style={{
                border: "none",
                background: "transparent",
                fontSize: 28,
                color: msgIndex === 0 ? "#d5aac6" : "#824d86",
                cursor: msgIndex === 0 ? "default" : "pointer"
              }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>

              <img src={secretMessages[msgIndex].img} alt={`Secret message ${msgIndex + 1}`} style={{
                maxWidth: "85%", maxHeight: 220, borderRadius: 20, objectFit: "cover"
              }} />

              <button onClick={nextMsg} disabled={msgIndex === secretMessages.length - 1} style={{
                border: "none", background: "transparent", fontSize: 28,
                color: msgIndex === secretMessages.length - 1 ? "#d5aac6" : "#824d86",
                cursor: msgIndex === secretMessages.length - 1 ? "default" : "pointer"
              }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            <p style={{ fontWeight: 600, textAlign: "center", marginTop: 8 }}>{msgIndex + 1} / {secretMessages.length}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart Note Popup */}
      <AnimatePresence>
        {showHeartNote && (
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
              background: "#f9d9e6cc",
              borderRadius: "24px 24px 0 0",
              padding: 24,
              overflowY: "auto",
              zIndex: 10000,
              userSelect: "none",
              fontFamily: "'Quicksand', sans-serif",
              color: "#9b2875",
            }}
            aria-label="Heart note popup"
          >
            <div style={{ position: "relative", textAlign: "center", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22 }}>For You To Know</h3>
              <button
                onClick={() => setShowHeartNote(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontSize: 24,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#9b2875",
                }}
                aria-label="Close heart note"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.5, whiteSpace: "pre-line" }}>
              {/* Your long personal note */}
              Dear Tushar,{"\n"}
              Beyond all these memories, there’s something I want you to know. I see how hard you try, every single day, to make time for me even when you’re buried in work, even when things at home are hectic, even when you barely get a moment for yourself.{"\n"}I notice the effort you put in, the little ways you show up for us, and it never goes unseen.{"\n"}
              Yes, I sulk sometimes no a lot, but beneath all that, I love you to my very core and nothing can ever change that. Thank you for trying, for being so patient, and so true, and I hope you always feel just how deeply I cherish you.{"\n"}
              It’s not just ‘me’ or ‘you’ anymore it’s us and as a team, we’re solid. We’ve laughed, got mad at, missed each other, celebrated, seen each other deal with stuff and held on through it all.{"\n"}
              You are my greatest blessing, my teammate in everything.{"\n\n"}
              Thank you for letting me have you Tushar ❤
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
