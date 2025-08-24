import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  faPalette
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const badge = '/badge1.png';        // Milestone badge image
const memoryImage = '/memory1.jpg'; // Memory photo
const audioFile = '/voice1.mp3';    // Voice/audio

const pastelGrad = 'linear-gradient(135deg, #fdf1f9 0%, #eef0fd 50%, #e4faee 100%)';
const softOverlay = 'repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px,rgba(255,255,255,0.07) 8px,transparent 8px,transparent 30px)';
const polaroids = [
  {
    title: 'First Glance',
    memory: 'That moment caught my breath.',
    img: '/memory1.jpg', 
    theme: { icon: faHeart, overlay: '#ffe6eb', sticker: '🌸', confetti: '#fa729e', float: 'petal' }
  },
  {
    title: 'First Laugh',
    memory: 'You made me smile brighter than ever.',
    img: '/memory2.jpg',
    theme: { icon: faLaugh, overlay: '#fffae9', sticker: '😂', confetti: '#ffe138', float: 'star' }
  },
  {
    title: 'Coffee Dates',
    memory: 'Sipping moments and shared secrets.',
    img: '/memory3.jpg',
    theme: { icon: faSeedling, overlay: '#e7fff0', sticker: '☕️', confetti: '#b2dfdb', float: 'leaf' }
  },
  {
    title: 'Late Night Talks',
    memory: 'Under stars, our dreams tangled.',
    img: '/memory4.jpg',
    theme: { icon: faCloud, overlay: '#e6f2ff', sticker: '🌙', confetti: '#b9c6e7', float: 'cloud' }
  },
  {
    title: 'First Trip',
    memory: 'Adventures that stitched our story tighter.',
    img: '/memory5.jpg',
    theme: { icon: faFeatherAlt, overlay: '#fff5e1', sticker: '✈️', confetti: '#f8c471', float: 'petal' }
  },
  {
    title: 'Inside Joke',
    memory: 'The laugh no one else understands.',
    img: '/memory6.jpg',
    theme: { icon: faLaugh, overlay: '#fbeaff', sticker: '🤪', confetti: '#d7bde2', float: 'star' }
  },
  {
    title: 'Support System',
    memory: 'Being pillars on stormy days.',
    img: '/memory7.jpg',
    theme: { icon: faPalette, overlay: '#ffeaea', sticker: '🌿', confetti: '#fb8876', float: 'leaf' }
  },
  {
    title: 'Shared Playlist',
    memory: 'Songs only we know the meaning of.',
    img: '/memory8.jpg',
    theme: { icon: faMusic, overlay: '#eaffec', sticker: '🎶', confetti: '#93e9be', float: 'music' }
  },
  {
    title: 'Surprise Gifts',
    memory: 'Little treasures that said, ‘I care.’',
    img: '/memory9.jpg',
    theme: { icon: faGift, overlay: '#fffbdd', sticker: '🎁', confetti: '#fddb64', float: 'star' }
  },
  {
    title: 'Looking Ahead',
    memory: 'Sketching dreams on blank pages.',
    img: '/memory10.jpg',
    theme: { icon: faCameraRetro, overlay: '#e0f4ff', sticker: '🚀', confetti: '#44b3ee', float: 'cloud' }
  }
];

// Animated floating particles (petal, star, cloud, music, leaf)
const FloatingParticles = ({ type = 'petal', color = '#fa729e', count = 12 }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{
          x: Math.random() * 120 - 60,
          y: 140,
          rotate: Math.random() * 20 - 10,
          opacity: 0.7
        }}
        animate={{
          y: [140, -20],
          x: ["0%", Math.random() * 60 - 30],
          rotate: Math.random() * 60 - 30,
          transition: { duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }
        }}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          fontSize: type === 'star' ? 20 : 18,
          color,
          opacity: 0.5,
          pointerEvents: 'none'
        }}
      >
        {type === 'petal' && '❀'}
        {type === 'star' && '★'}
        {type === 'cloud' && '☁️'}
        {type === 'music' && '♫'}
        {type === 'leaf' && '🍃'}
      </motion.div>
    ))}
  </>
);

function App() {
  const [selected, setSelected] = useState(null);
  const [heartClicked, setHeartClicked] = useState(false);

  // Load Google Quicksand font dynamically inside component
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Decorative drifting emojis/petals/clouds/music notes
  const driftingObjects = [
    { left: '20vw', delay: 0, content: '☁️', topStart: '20vh' },
    { left: '60vw', delay: 1, content: '💫', topStart: '15vh' },
    { left: '35vw', delay: 1.7, content: '🎶', topStart: '35vh' },
    { left: '80vw', delay: 0.7, content: '🌸', topStart: '60vh' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `${pastelGrad}, ${softOverlay}`,
      fontFamily: "'Quicksand', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Animated drifting decor */}
      {driftingObjects.map((obj, ix) => (
        <motion.div
          key={ix}
          style={{
            position: 'fixed',
            left: obj.left,
            top: obj.topStart,
            fontSize: '2.4em',
            opacity: 0.13,
            pointerEvents: 'none',
            zIndex: 1
          }}
          animate={{
            y: ['0vh', '-30vh'],
            x: ['0vw', Math.random() > 0.5 ? '-6vw' : '4vw']
          }}
          transition={{
            duration: 17 + Math.random() * 7,
            repeat: Infinity,
            delay: obj.delay,
            repeatType: "mirror"
          }}
        >
          {obj.content}
        </motion.div>
      ))}

      {/* Subtle hearts/sparkle pattern overlay */}
      <div style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        left: 0, top: 0,
        backgroundRepeat: 'repeat',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><text x="6" y="40" font-size="36">💕</text></svg>')`,
        opacity: 0.035,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <h1 style={{
        letterSpacing: '0.12em',
        color: '#b55477',
        textAlign: 'center',
        margin: '2.2em auto 0.6em',
        fontWeight: 700,
        fontSize: '2.3em',
        zIndex: 2,
        textShadow: '0 0 16px #ffddea'
      }}>
        Polaroid Trail of Us
      </h1>

      {/* Polaroid Cards Column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '75vh',
        paddingBottom: '6em',
        zIndex: 2,
        position: 'relative'
      }}>
        {polaroids.map((p, idx) => (
          <motion.div
            key={idx}
            style={{
              width: 250,
              marginBottom: 54,
              position: 'relative',
              boxShadow: '0 8px 28px #c79abd6c, 0 2px 8px 2px #eae4e8',
              background: p.theme.overlay,
              borderRadius: 18,
              cursor: 'pointer',
              zIndex: 4,
              border: '1px solid #f2e6f2',
              transform: `rotate(${((idx % 2 === 0) ? -4 : 4) + (idx === 0 ? -3 : 0)}deg)`
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              scale: 1.09,
              rotate: (idx % 2 === 0 ? -2 : 2),
              boxShadow: '0 22px 45px 8px #eecaf666'
            }}
            whileTap={{
              scale: 1.14,
              boxShadow: '0 5px 38px #ff92cac8',
              rotate: 0
            }}
            onClick={() => {
              setSelected(p);
              setHeartClicked(false);
            }}
          >
            <FloatingParticles type={p.theme.float} color={p.theme.confetti} count={9} />
            <div style={{
              position: 'absolute',
              top: -10, left: 20,
              zIndex: 7,
              fontSize: 22,
              userSelect: 'none',
              rotate: '-13deg',
              opacity: 0.7,
            }}>📌</div>
            <div style={{
              position: 'absolute',
              top: -9,
              right: 28,
              zIndex: 7,
              fontSize: 28,
              userSelect: 'none',
              rotate: '11deg',
              opacity: 0.7,
            }}>🎀</div>
            <div style={{
              width: 236,
              height: 160,
              background: '#fff',
              borderRadius: 12,
              margin: '12px auto 0',
              overflow: 'hidden',
              position: 'relative',
              border: '1.5px solid #f7e6f0',
              boxShadow: '0 2px 12px 0 #efd8ec71'
            }}>
              <img
                src={p.img}
                alt={p.title}
                style={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  display: 'block'
                }}
                loading="lazy"
              />
              <FontAwesomeIcon
                icon={p.theme.icon}
                color="#c37288"
                style={{
                  fontSize: 22,
                  position: 'absolute',
                  left: 10,
                  top: 10,
                  opacity: 0.67,
                  filter: 'blur(0.5px)'
                }}
              />
              <span style={{
                position: 'absolute',
                right: 6,
                bottom: 6,
                fontSize: 22,
                opacity: 0.7
              }}>{p.theme.sticker}</span>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '12px 10px 16px',
              color: '#8d6e7e',
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.1,
              letterSpacing: '0.03em',
              textShadow: '0 1px 6px #fff6fa',
              userSelect: 'text'
            }}>
              {p.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pop-up Polaroid Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            style={{
              position: 'fixed',
              zIndex: 1003,
              left: '50%',
              top: '9vh',
              transform: 'translateX(-50%)',
              background: selected.theme.overlay,
              borderRadius: 24,
              boxShadow: '0 20px 70px #e2b3d788, 0 2px 15px #ede1e83a',
              padding: 30,
              maxWidth: 370,
              width: 'calc(100vw - 20px)',
              fontFamily: "'Quicksand',sans-serif",
              border: '2.5px solid #f1dbeb',
              overflowY: 'auto'
            }}
          >
            <div style={{
              width: '100%',
              height: 150,
              overflow: 'hidden',
              borderRadius: 12,
              marginBottom: 15
            }}>
              <img
                src={selected.img}
                alt={selected.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <h2 style={{
              margin: '5px 0 13px 0',
              color: '#984577',
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: '0.045em'
            }}>
              {selected.sticker} {selected.title}
            </h2>
            <p style={{
              color: '#7a5a68',
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 24,
              fontStyle: 'italic'
            }}>
              {selected.memory}
            </p>
            <audio controls src={audioFile} style={{
              width: '100%',
              outline: 'none',
              marginBottom: 18,
              borderRadius: 7
            }} />
            <motion.button
              onClick={() => setHeartClicked(!heartClicked)}
              animate={{
                scale: heartClicked ? 1.30 : 1.00,
                color: heartClicked ? '#e9446a' : '#dab7d8'
              }}
              style={{
                fontSize: 36,
                display: 'block',
                margin: '0 auto 18px',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                outline: 'none'
              }}
              whileTap={{ scale: 1.7 }}
              aria-label="Tap to heart"
            >
              ❤️
            </motion.button>
            <div style={{ textAlign: 'center', marginTop: 6 }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: pastelGrad,
                  border: 'none',
                  borderRadius: 20,
                  color: '#ad7281',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '10px 25px',
                  boxShadow: '0 5px 12px #efd8ec3a',
                  cursor: 'pointer'
                }}>
                Close
              </button>
            </div>
            <FloatingParticles type={selected.theme.float} color={selected.theme.confetti} count={12} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
