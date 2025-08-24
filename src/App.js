// App.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const badge = '/badge1.png';
const memoryImage = '/memory1.jpg';
const audioFile = '/voice1.mp3';

const pastelBackground = 'linear-gradient(135deg, #FDEFF9, #E0F7FA, #FFF3E0)';
const emojis = ['💖', '🥰', '🌸', '🎀', '✨', '💕', '💫', '🌷', '🌈', '💌', '🍓', '🍒', '🎉', '💐', '❤️'];

const timelineEvents = [
  { id: 1, title: "First Glance", memory: "That moment caught my breath.", position: { x: 80, y: 60 }, question: null },
  { id: 2, title: "First Laugh", memory: "You made me smile brighter than ever.", position: { x: 220, y: 110 }, question: "What made me laugh first?" },
  { id: 3, title: "Coffee Dates", memory: "Sipping moments and shared secrets.", position: { x: 360, y: 70 }, question: null },
  { id: 4, title: "Late Night Talks", memory: "Under stars, our dreams tangled.", position: { x: 520, y: 140 }, question: "What was the topic of our longest talk?" },
  { id: 5, title: "First Trip", memory: "Adventures that stitched our story tighter.", position: { x: 630, y: 100 }, question: null },
  { id: 6, title: "Inside Joke", memory: "The laugh no one else understands.", position: { x: 570, y: 230 }, question: "What was that joke about?" },
  { id: 7, title: "Support System", memory: "Being pillars on stormy days.", position: { x: 420, y: 290 }, question: null },
  { id: 8, title: "Shared Playlist", memory: "Songs only we know the meaning of.", position: { x: 260, y: 290 }, question: "Name a song that means a lot to us." },
  { id: 9, title: "Surprise Gifts", memory: "Little treasures that said, ‘I care.’", position: { x: 120, y: 230 }, question: null },
  { id: 10, title: "Looking Ahead", memory: "Sketching dreams on blank pages.", position: { x: 320, y: 380 }, question: "Where do you see us in 5 years?" }
];

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function EmojiScatter() {
  const positions = [
    { top: 10, left: 60 }, { top: 50, left: 10 }, { top: 100, left: 170 },
    { top: 130, left: 600 }, { top: 10, left: 700 }, { top: 350, left: 680 },
    { top: 340, left: 120 }, { top: 270, left: 350 }, { top: 180, left: 430 },
    { top: 330, left: 460 }, { top: 220, left: 560 }, { top: 40, left: 300 }
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          fontSize: 26,
          pointerEvents: 'none',
          opacity: 0.8,
          userSelect: 'none',
          transition: 'transform 0.3s ease',
          color: "#d6336c"
        }}>
          {getRandomEmoji()}
        </div>
      ))}
    </>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState('');
  const [showAnswerPrompt, setShowAnswerPrompt] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  useEffect(() => {
    // Load Google Poppins font dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleSubmitAnswer = () => {
    if (answer.trim() === '') {
      alert('Please try to answer the question!');
      return;
    }
    alert(`Thank you for answering: "${answer}"`);
    setShowAnswerPrompt(false);
    setAnswer('');
  };

  const toggleHeart = () => {
    setHeartClicked(!heartClicked);
  };

  return (
    <div style={{
      background: pastelBackground,
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: "'Poppins', sans-serif",
      color: "#37474F",
      position: 'relative',
      overflowX: 'hidden',
      userSelect: 'none'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 40, fontWeight: 700, color: "#b83280" }}>
        💞 Our Timeline of Moments 💞
      </h1>

      <div style={{
        position: 'relative',
        width: 760,
        height: 420,
        margin: 'auto',
        borderRadius: 24,
        background: '#FDF6F9',
        boxShadow: '0 8px 30px rgba(214, 51, 111, 0.15)'
      }}>
        <svg width="760" height="420" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d6336c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f08aad" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 100 90 Q 150 80 220 130 T 360 90 M 360 90 Q 430 110 520 110 T 650 100 
               M 520 110 Q 520 190 530 250 T 420 290 M 420 290 Q 280 310 260 290 
               M 260 290 Q 130 290 120 230 T 320 380"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <EmojiScatter />

        {timelineEvents.map(event => (
          <motion.div key={event.id}
            style={{
              position: 'absolute',
              left: event.position.x,
              top: event.position.y,
              width: 150,
              cursor: 'pointer',
              background: 'linear-gradient(145deg, #f6c1d0, #d84772)',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 7px 18px rgba(214, 51, 111, 0.35)',
              color: '#fff',
              fontWeight: '700',
              textAlign: 'center',
              userSelect: 'none',
              transition: 'transform 0.3s ease'
            }}
            whileHover={{ scale: 1.17, boxShadow: '0 12px 36px rgba(214, 51, 111, 0.8)', rotate: 2 }}
            onClick={() => {
              setSelected(event);
              setHeartClicked(false);
              if (event.question) setShowAnswerPrompt(true);
              else setShowAnswerPrompt(false);
              setAnswer('');
            }}
          >
            <img src={badge} alt="badge" style={{ width: 50, marginBottom: 14, filter: 'drop-shadow(0 0 3px #fff)' }} />
            <div style={{ fontSize: 19, letterSpacing: 0.3 }}>{event.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Milestone Pop-up Modal */}
      {selected && (
        <div style={{
          position: 'fixed',
          top: '15vh',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff0f5ee',
          boxShadow: '0 12px 30px rgba(214, 51, 111, 0.5)',
          borderRadius: 26,
          padding: 36,
          maxWidth: 380,
          zIndex: 1100,
          color: '#a8326a',
          userSelect: 'text'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: 14 }}>{selected.title} 💌</h2>
          <p style={{ fontStyle: 'italic', marginBottom: 26 }}>{selected.memory}</p>
          <img src={memoryImage} alt="memory" style={{ width: '100%', borderRadius: 16, marginBottom: 26, boxShadow: '0 0 16px #d6336c' }} />
          <audio controls src={audioFile} style={{ width: '100%', outline: 'none', marginBottom: 30 }} />
          
          {showAnswerPrompt && selected.question && (
            <div style={{ marginBottom: 30 }}>
              <label style={{ fontWeight: '700', fontSize: 16 }}>{selected.question}</label><br />
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Your answer here..."
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 14,
                  border: '2px solid #d6336c',
                  marginTop: 8,
                  fontSize: 17,
                  outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  if (answer.trim() === '') {
                    alert('Please enter your answer!');
                    return;
                  }
                  alert(`Thank you for answering: "${answer}"`);
                  setShowAnswerPrompt(false);
                  setAnswer('');
                }}
                style={{
                  marginTop: 14,
                  padding: '12px 22px',
                  backgroundColor: '#d6336c',
                  border: 'none',
                  borderRadius: 14,
                  color: '#fff',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: 16
                }}
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Interactive Heart Reaction */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <motion.button
              onClick={() => setHeartClicked(!heartClicked)}
              animate={{ scale: heartClicked ? 1.5 : 1, rotate: heartClicked ? 15 : 0, color: heartClicked ? '#e91e63' : '#ccc' }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              style={{
                fontSize: 36,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                userSelect: 'none',
                marginTop: -4,
              }}
              aria-label="Heart Reaction Button"
            >
              ❤️
            </motion.button>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              onClick={() => {
                setSelected(null);
                setShowAnswerPrompt(false);
                setAnswer('');
                setHeartClicked(false);
              }}
              style={{
                cursor: 'pointer',
                background: '#a8326a',
                color: 'white',
                border: 'none',
                padding: '10px 22px',
                borderRadius: 14,
                fontWeight: '700',
                fontSize: 15
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
