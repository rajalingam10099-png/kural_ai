import React, { useEffect, useState } from "react";

interface KavithaMamAvatarProps {
  action: "idle" | "speaking" | "explaining" | "cheering";
  size?: "sm" | "md" | "lg";
}

export default function KavithaMamAvatar({ action, size = "md" }: KavithaMamAvatarProps) {
  const [blink, setBlink] = useState(false);
  const [mouthOpenAmount, setMouthOpenAmount] = useState(0);

  // Periodic eye blinking to look alive
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Sync lips rhythm during speaking action
  useEffect(() => {
    let animId: number;
    if (action === "speaking") {
      const runLipSync = () => {
        // Generate values between 0 (closed) and 100 (fully open) to simulate vowels
        setMouthOpenAmount(Math.floor(Math.sin(Date.now() / 65) * 45 + 55));
        animId = requestAnimationFrame(runLipSync);
      };
      runLipSync();
    } else {
      setMouthOpenAmount(0);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [action]);

  const dimensions = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36"
  }[size];

  // Map values beautifully for the mouth path
  const talkingMouthHeight = 4 + (mouthOpenAmount / 100) * 11;
  const talkingMouthWidth = 14 - (mouthOpenAmount / 100) * 2;

  return (
    <div className={`relative inline-block ${dimensions} select-none group`}>
      
      {/* Background radial soft light halo */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 scale-105 ${
        action === "speaking" 
          ? "bg-amber-300/20 animate-pulse border border-amber-400/20" 
          : action === "cheering"
          ? "bg-emerald-300/20 border border-emerald-400/20"
          : "bg-stone-100/30"
      }`} />

      {/* Render the Highly-Detailed Vector AI Kavitha Mam (Indian/Tamil Teacher) */}
      <svg
        viewBox="0 0 160 160"
        className={`w-full h-full drop-shadow-lg transform transition duration-300 ${
          action === "cheering" ? "animate-bounce" : "hover:scale-105"
        }`}
      >
        <defs>
          {/* Hair Gradient */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b18" />
            <stop offset="45%" stopColor="#12100e" stopOpacity="1" />
            <stop offset="100%" stopColor="#2c2520" />
          </linearGradient>

          {/* Skin Gradient - Beautiful Indian Gold/Hazel tone */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ebd1be" />
            <stop offset="100%" stopColor="#d1b299" />
          </linearGradient>

          {/* Yellow Dress Gradient */}
          <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e6ab05" />
            <stop offset="50%" stopColor="#f7cc00" />
            <stop offset="100%" stopColor="#d49b00" />
          </linearGradient>

          {/* Dark Green Collar/Border */}
          <linearGradient id="colGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a5c36" />
            <stop offset="100%" stopColor="#043d22" />
          </linearGradient>

          {/* Gold Ornament Shader */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe680" />
            <stop offset="50%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#b38700" />
          </linearGradient>
        </defs>

        {/* 1. Behind Hair (Long flowing dark locks over shoulders) */}
        <path
          d="M32,95 C15,110 15,145 15,160 L145,160 C145,145 145,110 128,95 C124,115 110,135 110,140 C100,120 110,75 105,60 C90,40 55,40 55,60 C50,75 60,120 50,140 C50,135 36,115 32,95 Z"
          fill="url(#hairGrad)"
        />

        {/* 2. Neck */}
        <rect x="70" y="90" width="20" height="20" fill="url(#skinGrad)" rx="2" />
        <path d="M70,102 C70,102 80,112 90,102" stroke="#b08d74" strokeWidth="2" fill="none" />

        {/* 3. Shoulders and Saree/Kurta (Yellow with Green & Gold borders matching photo) */}
        <path
          d="M40,110 L120,110 M30,118 C26,128 35,160 35,160 L125,160 C125,160 134,128 130,118 C115,112 105,114 100,114 C92,118 68,118 60,114 C55,114 45,112 30,118 Z"
          fill="url(#dressGrad)"
        />
        
        {/* Deep Green Neckline design */}
        <path
          d="M60,110 Q80,128 100,110 L94,113 Q80,133 66,113 Z"
          fill="url(#colGrad)"
        />

        {/* Detailed Golden Embroidery Zari lines (matching photo) */}
        <path
          d="M60,110 Q80,128 100,110"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M62,112 Q80,131 98,112"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          strokeDasharray="2,2"
          fill="none"
        />
        <line x1="80" y1="125" x2="80" y2="160" stroke="url(#goldGrad)" strokeWidth="3" />
        <circle cx="80" cy="133" r="2.5" fill="url(#goldGrad)" />
        <circle cx="80" cy="143" r="2.5" fill="url(#goldGrad)" />
        <circle cx="80" cy="153" r="2.5" fill="url(#goldGrad)" />

        {/* 4. Ears */}
        <circle cx="48" cy="78" r="7" fill="url(#skinGrad)" />
        <circle cx="112" cy="78" r="7" fill="url(#skinGrad)" />

        {/* Traditional Gold Jhumka Earrings (Swaying suttle animation) */}
        <g className={action === "speaking" ? "animate-pulse origin-top" : ""}>
          {/* Left Jhumka */}
          <line x1="48" y1="81" x2="48" y2="87" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <path d="M42,87 C42,81 54,81 54,87 Z" fill="url(#goldGrad)" />
          {/* Hanging little gold beads */}
          <circle cx="44" cy="91" r="1.5" fill="url(#goldGrad)" />
          <circle cx="48" cy="92" r="1.5" fill="url(#goldGrad)" />
          <circle cx="52" cy="91" r="1.5" fill="url(#goldGrad)" />

          {/* Right Jhumka */}
          <line x1="112" y1="81" x2="112" y2="87" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <path d="M106,87 C106,81 118,81 118,87 Z" fill="url(#goldGrad)" />
          {/* Hanging little gold beads */}
          <circle cx="108" cy="91" r="1.5" fill="url(#goldGrad)" />
          <circle cx="112" cy="92" r="1.5" fill="url(#goldGrad)" />
          <circle cx="116" cy="91" r="1.5" fill="url(#goldGrad)" />
        </g>

        {/* 5. Face Outline */}
        <path
          d="M52,58 C52,42 108,42 108,58 C108,82 104,98 80,98 C56,98 52,82 52,58 Z"
          fill="url(#skinGrad)"
        />

        {/* 6. Hair Front overlay (Middle parted sleek black hair) */}
        <path
          d="M52,52 C65,42 78,45 80,48 C82,45 95,42 108,52 C111,40 100,32 80,32 C60,32 49,40 52,52 Z"
          fill="url(#hairGrad)"
        />

        {/* Traditional Gold Maang Tikka chain on partition midline (from photo) */}
        <path
          d="M80,32 L80,48"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          fill="none"
        />
        {/* Pendant dangling on forehead */}
        <path
          d="M80,47 L77,50 L80,53 L83,50 Z"
          fill="url(#goldGrad)"
        />
        <circle cx="80" cy="50" r="1.5" fill="#e63946" /> {/* Small red ruby in pendant */}

        {/* Sacred red/black forehead bindi (தமிழ்த்தாய் திலகம்/பொட்டு) */}
        <circle cx="80" cy="59" r="2.5" fill="#800020" />
        <circle cx="80" cy="59" r="1" fill="#f1c40f" />

        {/* 7. Eyes & Eyebrows */}
        {/* Left Eyebrow */}
        <path d="M60,60 C63,55 71,55 74,58" stroke="#12100e" strokeWidth="2" fill="none" rx="1" />
        {/* Right Eyebrow */}
        <path d="M86,58 C89,55 97,55 100,60" stroke="#12100e" strokeWidth="2" fill="none" rx="1" />

        {/* Eyes (Blinking mechanic) */}
        {blink ? (
          <>
            {/* Closed eyelids */}
            <path d="M62,67 Q68,69 74,67" stroke="#332211" strokeWidth="2.5" fill="none" />
            <path d="M86,67 Q92,69 98,67" stroke="#332211" strokeWidth="2.5" fill="none" />
          </>
        ) : (
          <>
            {/* Left Eye */}
            <ellipse cx="68" cy="67" rx="6" ry="4.5" fill="#ffffff" />
            <circle cx="68" cy="67" r="3.2" fill="#5c4033" /> {/* Hazel brown lens */}
            <circle cx="68" cy="67" r="1.8" fill="#000000" /> {/* Pupil */}
            <circle cx="69.5" cy="65.5" r="1" fill="#ffffff" /> {/* Glint */}
            {/* Eyelashes */}
            <path d="M62,65 Q68,62 74,65" stroke="#12100e" strokeWidth="1.2" fill="none" />

            {/* Right Eye */}
            <ellipse cx="92" cy="67" rx="6" ry="4.5" fill="#ffffff" />
            <circle cx="92" cy="67" r="3.2" fill="#5c4033" /> {/* Hazel brown lens */}
            <circle cx="92" cy="67" r="1.8" fill="#000000" /> {/* Pupil */}
            <circle cx="93.5" cy="65.5" r="1" fill="#ffffff" /> {/* Glint */}
            {/* Eyelashes */}
            <path d="M86,65 Q92,62 98,65" stroke="#12100e" strokeWidth="1.2" fill="none" />
          </>
        )}

        {/* 8. Sharp beautiful nose (with elegant shadow) */}
        <path d="M79,66 L77,77 L83,77 Z" fill="#b08d74" opacity="0.3" />
        <path d="M80,65 L80,78 Q80,80 82,78" stroke="#ac8566" strokeWidth="1.5" fill="none" />

        {/* 9. Mouth Lips (Moves dynamically with speech or smiles calmly in idle) */}
        {action === "speaking" ? (
          <>
            {/* Outer Lips background */}
            <path
              d={`M70,83 Q80,78 90,83 Q80,${84 + talkingMouthHeight} 70,83`}
              fill="#9a1f33" // Deep magenta lipstick
            />
            {/* Moving Inner mouth hole */}
            <ellipse
              cx="80"
              cy="84"
              rx={talkingMouthWidth / 2}
              ry={talkingMouthHeight / 2}
              fill="#3a040e"
            />
            {/* Teeth peeking through sound */}
            {talkingMouthHeight > 6 && (
              <path
                d={`M${80 - talkingMouthWidth/3},81.5 Q80,83 M${80 + talkingMouthWidth/3},81.5`}
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="none"
              />
            )}
            {/* Lower Lip outline */}
            <path d="M70,83 Q80,95 90,83" stroke="#b12942" strokeWidth="1.5" fill="none" />
          </>
        ) : (
          /* High-Quality smiling lips when idle or explaining */
          <>
            {/* Soft pink bottom lip */}
            <path d="M68,82 Q80,91 92,82" fill="#ce3d55" />
            {/* Smiling upper lip contour (Cupid's bow) */}
            <path d="M68,82 Q74,79 80,81 Q86,79 92,82 C90,83.5 86,84 80,84 C74,84 70,83.5 68,82 Z" fill="#9a1f33" />
            <path d="M67,82 Q80,85 93,82" stroke="#5d0d1a" strokeWidth="1" fill="none" />
          </>
        )}
      </svg>

      {/* Decorative Speech Sound Rings (glowing circular signals) */}
      {action === "speaking" && (
        <div className="absolute inset-0 rounded-full border border-amber-300 animate-[ping_1.8s_linear_infinite]" />
      )}
      {action === "speaking" && (
        <div className="absolute -inset-2 rounded-full border border-amber-200/50 animate-[ping_2.4s_linear_infinite] delay-300" />
      )}

      {/* Action Badges in Corner of coach */}
      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full text-[9px] tracking-wide uppercase shadow-xs flex items-center gap-0.5">
        {action === "speaking" ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>LIVE 🎙️</span>
          </>
        ) : action === "explaining" ? (
          <span>IDEA 💡</span>
        ) : action === "cheering" ? (
          <span>GREAT 🎉</span>
        ) : (
          <span>COACH 🎓</span>
        )}
      </span>
    </div>
  );
}
