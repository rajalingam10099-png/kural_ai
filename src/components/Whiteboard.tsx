import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Trash2, Undo, HelpCircle, CheckCircle2, RotateCcw } from "lucide-react";

interface WhiteboardProps {
  targetLetter: string;
  phonics: string;
  onAssessmentCompleted: (score: number) => void;
}

interface EvaluationResult {
  score: number;
  isMatch: boolean;
  feedback: string;
  tips: string;
}

export default function Whiteboard({ targetLetter, phonics, onAssessmentCompleted }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#FBBF24"); // Glow gold default
  const [brushWidth, setBrushWidth] = useState(8);
  const [history, setHistory] = useState<string[]>([]);
  const [showTemplate, setShowTemplate] = useState(true);
  const [templateOpacity, setTemplateOpacity] = useState(0.2);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  // Colors available for board drawing (neon tints)
  const colors = [
    { name: "Gold", code: "#FBBF24" },
    { name: "Teal", code: "#38BDF8" },
    { name: "Cyan", code: "#2DD4BF" },
    { name: "Magenta", code: "#F43F5E" },
    { name: "White", code: "#FFFFFF" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset and clear drawing area
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    clearCanvas();
  }, [targetLetter]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save previous state to history before drawing
    saveState();

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    
    // Smooth out initial touch click dot
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    
    // Add visual glow-mesh for modern responsive aesthetic
    ctx.shadowBlur = 4;
    ctx.shadowColor = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.shadowBlur = 0; // Reset shadow for efficiency
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Accumulate states up to 15 entries for undo
    setHistory((prev) => {
      const next = [...prev, canvas.toDataURL()];
      if (next.length > 15) next.shift();
      return next;
    });
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const previousStates = [...history];
    const previousState = previousStates.pop();
    setHistory(previousStates);

    if (previousState) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = previousState;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw charcoal chalkboard backdrop grid pattern lines slightly
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    
    // horizontal grid
    for (let i = 40; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    setHistory([]);
    setEvaluation(null);
  };

  const evaluateDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setLoading(true);
    setEvaluation(null);
    const imageBase64 = canvas.toDataURL("image/png");
    // Local heuristic fallback: compute pixel coverage and centering to give immediate feedback
    const computeLocalEvaluation = (): EvaluationResult => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return { score: 80, isMatch: true, feedback: "Drawing looks fine.", tips: "Try to trace with continuous strokes." };
      }
      const w = canvas.width;
      const h = canvas.height;
      const img = ctx.getImageData(0, 0, w, h);
      let nonEmpty = 0;
      let minX = w, minY = h, maxX = 0, maxY = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const alpha = img.data[idx + 3];
          if (alpha > 20) {
            nonEmpty++;
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }
      const pixelCoverage = nonEmpty / (w * h);
      const boxW = Math.max(1, maxX - minX);
      const boxH = Math.max(1, maxY - minY);
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const centerDist = Math.hypot(centerX - w / 2, centerY - h / 2) / Math.hypot(w / 2, h / 2);

      // Ideal coverage heuristics depend on letter; choose mid-range
      const idealCoverage = 0.008; // tuned for stroke thinness
      let score = Math.round(Math.min(98, Math.max(30, (pixelCoverage / idealCoverage) * 100)));
      // Penalize if off-center
      score = Math.round(score * (1 - Math.min(0.35, centerDist)));

      const feedback = `Detected strokes cover ${(pixelCoverage * 100).toFixed(2)}% of the board. Bounding box ${Math.round(boxW)}x${Math.round(boxH)}.`;
      const tips = centerDist > 0.15 ? "Try to centre your strokes on the guide letter and follow the template lines." : "Good placement — keep steady strokes and continuous flow.";

      return {
        score,
        isMatch: score >= 65,
        feedback,
        tips,
      };
    };

    // Show quick local evaluation while awaiting server
    const localEval = computeLocalEvaluation();
    setEvaluation(localEval);
    onAssessmentCompleted(localEval.score);

    try {
      const response = await fetch("/api/ai/analyze-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          targetLetter,
          letterEnglishPhonetics: phonics,
        }),
      });

      if (!response.ok) {
        throw new Error("Evaluation error");
      }

      const data: EvaluationResult = await response.json();
      setEvaluation(data);
      onAssessmentCompleted(data.score);
    } catch (err) {
      console.error("Tracing correction error:", err);
      // Keep localEval already set as fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Dynamic Board Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <span className="p-1 px-2.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm border border-amber-500/25">Blackboard</span>
            Trace & Practice Writing
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Draw the Tamil letter <span className="text-amber-400 font-bold font-mono">"{targetLetter}"</span> on the blackboard workspace below.
          </p>
        </div>

        {/* Tracing Template Toggles */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-300 flex items-center gap-1">
            <input
              type="checkbox"
              checked={showTemplate}
              onChange={(e) => setShowTemplate(e.target.checked)}
              className="rounded bg-slate-850 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
            />
            Show Guide
          </label>
          {showTemplate && (
            <input
              type="range"
              min="0.05"
              max="0.4"
              step="0.05"
              value={templateOpacity}
              onChange={(e) => setTemplateOpacity(parseFloat(e.target.value))}
              className="w-16 accent-amber-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
              title="Guide Letter Opacity"
            />
          )}
        </div>
      </div>

      {/* Blackboard Drawing Area */}
      <div className="relative border-4 border-slate-950 bg-radial from-slate-950 to-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center select-none" style={{ height: "320px" }}>
        
        {/* Template Letter overlay in background */}
        {showTemplate && !evaluation && (
          <div
            className="absolute inset-0 flex items-center justify-center font-sans select-none pointer-events-none transition-all duration-350"
            style={{
              opacity: templateOpacity,
              fontSize: "14rem",
              lineHeight: 1,
              color: "#38BDF8", // Ice Blue guide
              textShadow: "0 0 15px rgba(56, 189, 248, 0.6)",
            }}
          >
            {targetLetter}
          </div>
        )}

        {/* Real Canvas element */}
        <canvas
          ref={canvasRef}
          width={580}
          height={312}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10"
        />

        {/* Chalk dust visual background effects */}
        <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-700/60 pointer-events-none">
          KURAL WRITING INTERACTIVE LAB v1.2
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-25 flex flex-col items-center justify-center text-center p-6 transition-all">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-teal-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-teal-400 border-t-transparent animate-spin"></div>
            </div>
            <h4 className="text-indigo-200 font-semibold text-base animate-pulse">Tamil Arasi is reviewing...</h4>
            <p className="text-slate-400 text-xs mt-1.5 max-w-xs">
              Analyzing stroke curves, alignment, and writing density.
            </p>
          </div>
        )}

        {/* Evaluation Overlaid Result */}
        {evaluation && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-20 overflow-y-auto p-5 flex flex-col items-center justify-center transition-all animate-fade-in">
            <div className="w-full max-w-sm flex flex-col items-center">
              
              {/* Score Meter Gauge */}
              <div className="relative flex items-center justify-center mb-3">
                <svg className="w-24 h-24">
                  <circle
                    className="text-slate-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="48"
                    cy="48"
                  />
                  <circle
                    className={evaluation.score >= 80 ? "text-emerald-400" : evaluation.score >= 65 ? "text-amber-400" : "text-rose-400"}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 38}
                    strokeDashoffset={2 * Math.PI * 38 * (1 - evaluation.score / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="38"
                    cx="48"
                    cy="48"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-bold text-white">{evaluation.score}</span>
                  <span className="text-[10px] block text-slate-400 font-mono">SCORE</span>
                </div>
              </div>

              {/* Tag Badges */}
              <div className="flex items-center gap-1.5 mb-2">
                {evaluation.isMatch ? (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Passed!
                  </span>
                ) : (
                  <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Keep Practicing
                  </span>
                )}
                <span className="bg-slate-850 text-slate-300 border border-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-full">
                  Letter: {targetLetter}
                </span>
              </div>

              {/* Feedbacks */}
              <p className="text-slate-200 text-sm font-medium text-center line-clamp-3 px-2 mb-2 leading-relaxed">
                "{evaluation.feedback}"
              </p>

              <div className="bg-slate-900/80 border border-slate-800/60 p-3 rounded-xl w-full mb-4 text-left">
                <span className="text-amber-400 font-semibold text-xs block mb-1">💡 Tamil Arasi's Tip:</span>
                <p className="text-slate-300 text-xs leading-relaxed">{evaluation.tips}</p>
              </div>

              <button
                onClick={() => setEvaluation(null)}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2 px-5 rounded-full flex items-center gap-1.5 transition active:scale-95"
              >
                <RotateCcw size={13} /> Draw Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Blackboard Control Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        {/* Color Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chalk color:</span>
          <div className="flex items-center gap-1.5">
            {colors.map((c) => (
              <button
                key={c.code}
                onClick={() => setBrushColor(c.code)}
                className="w-6 h-6 rounded-full border-2 transition relative flex items-center justify-center active:scale-90"
                style={{
                  backgroundColor: c.code,
                  borderColor: brushColor === c.code ? "#E2E8F0" : "transparent",
                  boxShadow: brushColor === c.code ? `0 0 8px ${c.code}` : "none",
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Thickness */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Size:</span>
          <input
            type="range"
            min="4"
            max="18"
            value={brushWidth}
            onChange={(e) => setBrushWidth(parseInt(e.target.value))}
            className="w-20 bg-slate-700 h-1 rounded-lg cursor-pointer accent-amber-400"
          />
          <span className="text-xs text-slate-300 font-mono">{brushWidth}px</span>
        </div>

        {/* Editing buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="p-2 bg-slate-850 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-850 text-slate-300 rounded-lg border border-slate-800/80 transition flex items-center justify-center"
            title="Undo stroke"
          >
            <Undo size={15} />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 bg-slate-850 hover:bg-red-500/10 hover:text-red-400 text-slate-300 rounded-lg border border-slate-800/80 hover:border-red-500/30 transition flex items-center justify-center"
            title="Clean board"
          >
            <Trash2 size={15} />
          </button>
          <button
            onClick={evaluateDrawing}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl border border-emerald-400/20 shadow-lg shadow-emerald-950/20 flex items-center gap-1.5 transition active:scale-95"
          >
            <Sparkles size={14} className="text-amber-200" /> Verify with AI
          </button>
        </div>
      </div>
    </div>
  );
}
