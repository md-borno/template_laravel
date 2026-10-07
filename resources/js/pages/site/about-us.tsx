import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  Layers, 
  Compass, 
  ChevronRight, 
  ShieldCheck, 
  Terminal, 
  ArrowUpRight, 
  Zap, 
  Globe, 
  Database, 
  Activity, 
  Code2, 
  Workflow, 
  Sliders, 
  Server,
  Fingerprint,
  RefreshCw,
  Gauge,
  CheckCircle2,
  Boxes,
  Eye,
  ArrowRight
} from 'lucide-react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

function PristineLightCanvas({ warpSpeed = false }: { warpSpeed?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle constellation with light-mode visible luxury pigments
    const count = warpSpeed ? 160 : 85;
    const colors = [
      { r: 79, g: 70, b: 229 },  // Indigo 600
      { r: 14, g: 165, b: 233 }, // Sky 500
      { r: 147, g: 51, b: 234 }, // Purple 600
      { r: 16, g: 185, b: 129 }, // Emerald 500
    ];

    const particles = Array.from({ length: count }, () => {
      const col = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000 + 1,
        baseSpeed: Math.random() * 0.7 + 0.35,
        size: Math.random() * 2.2 + 1.2,
        col,
        pulse: Math.random() * Math.PI,
      };
    });

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Crisp white fade with subtle trail retention
      ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle holographic perspective grid on bottom plane
      const horizon = height * 0.65;
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)'; // Slate 300 subtle
      ctx.lineWidth = 0.8;

      for (let x = -width; x < width * 2; x += 110) {
        ctx.beginPath();
        ctx.moveTo(width / 2 + (x - width / 2) * 0.12, horizon);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = horizon; y < height; y += (height - horizon) / 7) {
        const factor = Math.pow((y - horizon) / (height - horizon), 2.2);
        const actualY = horizon + factor * (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, actualY);
        ctx.lineTo(width, actualY);
        ctx.stroke();
      }

      const speedMultiplier = warpSpeed ? 7.0 : 1.1;

      particles.forEach((p, idx) => {
        p.z -= p.baseSpeed * speedMultiplier;
        p.pulse += 0.025;

        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

        const k = 270 / p.z;
        const px = (p.x - width / 2) * k + width / 2 + (mouseX - width / 2) * 0.02;
        const py = (p.y - height / 2) * k + height / 2 + (mouseY - height / 2) * 0.02;

        if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
          const currentSize = Math.max(0.6, p.size * (1 - p.z / 1000) * (warpSpeed ? 3.2 : 1.6));
          const opacity = Math.min(0.85, (1 - p.z / 1000) * 1.1);

          ctx.fillStyle = `rgba(${p.col.r}, ${p.col.g}, ${p.col.b}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(px, py, currentSize, 0, Math.PI * 2);
          ctx.fill();

          // Warp streaks for light mode
          if (warpSpeed) {
            ctx.strokeStyle = `rgba(${p.col.r}, ${p.col.g}, ${p.col.b}, ${opacity * 0.7})`;
            ctx.lineWidth = currentSize * 0.8;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(
              px - (px - width / 2) * 0.16,
              py - (py - height / 2) * 0.16
            );
            ctx.stroke();
          }

          // Neural connections between nearby particles
          if (!warpSpeed && idx % 2 === 0) {
            for (let j = idx + 1; j < Math.min(idx + 4, particles.length); j++) {
              const p2 = particles[j];
              const k2 = 270 / p2.z;
              const p2x = (p2.x - width / 2) * k2 + width / 2;
              const p2y = (p2.y - height / 2) * k2 + height / 2;
              const dist = Math.hypot(px - p2x, py - p2y);

              if (dist < 90) {
                ctx.strokeStyle = `rgba(${p.col.r}, ${p.col.g}, ${p.col.b}, ${(1 - dist / 90) * 0.22})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(p2x, p2y);
                ctx.stroke();
              }
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [warpSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}

function SpatialReveal({
  children,
  vector = 'bottom',
  delay = 0,
  className = '',
  triggerKey = 0,
}: {
  children: React.ReactNode;
  vector?: string;
  delay?: number;
  className?: string;
  triggerKey?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (ref.current) observer.unobserve(ref.current);
          }
        },
        { threshold: 0.14 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, 40);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  // Spatial starting vector styling for Apple Pro 3D fly-in
  const getHiddenStyle = () => {
    switch (vector) {
      case 'left-top-orbit':
        return `translate3d(-140px, -90px, -200px) rotateX(20deg) rotateY(-28deg) rotateZ(-8deg) scale(0.82) opacity-0 blur-xl`;
      case 'right-bottom-orbit':
        return `translate3d(160px, 120px, -240px) rotateX(-18deg) rotateY(30deg) rotateZ(10deg) scale(0.82) opacity-0 blur-xl`;
      case 'deep-drop':
        return `translate3d(0, 150px, -350px) rotateX(32deg) scale(0.72) opacity-0 blur-2xl`;
      case 'left-slice':
        return `translate3d(-200px, 30px, -120px) rotateY(-36deg) rotateZ(-6deg) scale(0.85) opacity-0 blur-lg`;
      case 'right-slice':
        return `translate3d(200px, -30px, -120px) rotateY(36deg) rotateZ(6deg) scale(0.85) opacity-0 blur-lg`;
      case 'hyperspace-center':
        return `translate3d(0, 0, -480px) scale(0.4) opacity-0 blur-2xl`;
      default:
        return `translate3d(0, 100px, -150px) rotateX(16deg) scale(0.88) opacity-0 blur-md`;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transformStyle: 'preserve-3d',
      }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1) opacity-100 blur-0'
          : getHiddenStyle()
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CrystallineCard({ children, className = '', glowAccent = 'indigo' }: {
  children: React.ReactNode;
  className?: string;
  glowAccent?: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 11;

    setCoords({ x, y, rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const glowThemes: Record<string, string> = {
    indigo: 'radial-gradient(420px circle at %X%px %Y%px, rgba(99, 102, 241, 0.12), transparent 70%)',
    cyan: 'radial-gradient(420px circle at %X%px %Y%px, rgba(14, 165, 233, 0.14), transparent 70%)',
    purple: 'radial-gradient(420px circle at %X%px %Y%px, rgba(168, 85, 247, 0.12), transparent 70%)',
    emerald: 'radial-gradient(420px circle at %X%px %Y%px, rgba(16, 185, 129, 0.14), transparent 70%)',
    amber: 'radial-gradient(420px circle at %X%px %Y%px, rgba(245, 158, 11, 0.12), transparent 70%)',
    rose: 'radial-gradient(420px circle at %X%px %Y%px, rgba(244, 63, 94, 0.12), transparent 70%)',
  };

  const activeGlow = (glowThemes[glowAccent] || glowThemes.indigo)
    .replace('%X%', String(coords.x))
    .replace('%Y%', String(coords.y));

  return (
    <div
      style={{ perspective: 1400 }}
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: isHovered
            ? `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translateZ(16px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-8 backdrop-blur-2xl shadow-[0_12px_40px_-12px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_25px_65px_-15px_rgba(99,102,241,0.12)] ${className}`}
      >
        {/* Specular prismatic shine on cursor hover */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{ background: activeGlow }}
          />
        )}

        {/* Diagonal crystalline shimmer border overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/80" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}

function InteractiveEngineConsole() {
  const [activeTab, setActiveTab] = useState('agents');
  const [telemetryState, setTelemetryState] = useState({
    activeAgents: 14,
    throughput: '3,840 req/sec',
    inferenceTime: '11.4 ms',
    clusterHealth: '99.99%',
  });

  const [logs, setLogs] = useState([
    '[INIT] Swarm orchestrator active across 6 worker nodes',
    '[RAG] Indexed 1,280,000 enterprise entities into pgvector cluster',
    '[ERP] Bi-directional sync with SAP & Custom .NET ledger OK',
  ]);

  const modes = [
    {
      id: 'agents',
      title: 'Autonomous Multi-Agent Swarm',
      badge: 'PyTorch + LangChain',
      icon: <Bot className="h-4 w-4 text-indigo-600" />,
      desc: 'Independent agents communicating over message queues to resolve sales, inventory, and tier-2 operations without latency.',
    },
    {
      id: 'models',
      title: 'Proprietary LLM Fine-Tuning',
      badge: 'LoRA / Private Weights',
      icon: <Cpu className="h-4 w-4 text-purple-600" />,
      desc: 'Training custom 70B parameter models tuned on internal financial records and customer support datasets under zero-leakage compliance.',
    },
    {
      id: 'erp',
      title: 'Enterprise Sync Engine',
      badge: '.NET 9 + Laravel 12',
      icon: <Database className="h-4 w-4 text-sky-600" />,
      desc: 'Unifying Point-of-Sale registers, HRM payroll, CRM pipelines, and multi-warehouse ERP under unified real-time event buses.',
    },
  ];

  const handleModeSwitch = (modeId: React.SetStateAction<string>) => {
    setActiveTab(modeId);
    if (modeId === 'agents') {
      setTelemetryState({
        activeAgents: 18,
        throughput: '4,120 tasks/min',
        inferenceTime: '9.8 ms',
        clusterHealth: '100%',
      });
      setLogs((prev) => [
        `[SWARM] Agent #07 dispatched: Automated refund validation executed in 410ms.`,
        `[COMM] Agent #03 handed off qualified B2B lead to CRM pipeline.`,
        ...prev.slice(0, 2),
      ]);
    } else if (modeId === 'models') {
      setTelemetryState({
        activeAgents: 6,
        throughput: '128 TFLOPS',
        inferenceTime: '14.2 ms',
        clusterHealth: 'Optimal',
      });
      setLogs((prev) => [
        `[TRAIN] Epoch 4/5 complete: Perplexity reduced to 1.12 with zero loss spike.`,
        `[WEIGHTS] Quantized LoRA adapters packaged for edge server deployment.`,
        ...prev.slice(0, 2),
      ]);
    } else {
      setTelemetryState({
        activeAgents: 24,
        throughput: '9,450 transactions/sec',
        inferenceTime: '4.1 ms',
        clusterHealth: '99.999%',
      });
      setLogs((prev) => [
        `[POS-SYNC] 45 offline terminal transaction logs committed to central ledger.`,
        `[HRM] Biometric payroll ledger processed across 3 international subsidiaries.`,
        ...prev.slice(0, 2),
      ]);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 p-8 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(99,102,241,0.08)]">
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 text-indigo-600 ring-1 ring-indigo-200/60 shadow-sm">
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Autonomous Systems & Neural Orchestrator
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-500 font-mono">Live architectural simulator • Real-time metrics</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 font-mono text-xs text-slate-700 shadow-sm">
          <Activity className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
          <span>Cluster Status: Verified Normal</span>
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {modes.map((m) => {
          const isActive = activeTab === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleModeSwitch(m.id)}
              className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                isActive
                  ? 'border-indigo-500/60 bg-gradient-to-b from-indigo-50/50 to-white shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20'
                  : 'border-slate-200/70 bg-white/60 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900">
                  {m.icon}
                  {m.title}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600 font-medium">
                  {m.badge}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">{m.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Real-time Telemetry Ribbons */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Active Node Swarms</span>
          <p className="mt-1 text-xl font-bold text-slate-900 font-mono">{telemetryState.activeAgents}</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Throughput Velocity</span>
          <p className="mt-1 text-xl font-bold text-indigo-600 font-mono">{telemetryState.throughput}</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Inference Response</span>
          <p className="mt-1 text-xl font-bold text-slate-900 font-mono">{telemetryState.inferenceTime}</p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Service SLA</span>
          <p className="mt-1 text-xl font-bold text-emerald-600 font-mono">{telemetryState.clusterHealth}</p>
        </div>
      </div>

      {/* Live Stream Terminal Box (Light theme with high contrast code) */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-300 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            <span>realtime_orchestration_feed.log</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">STREAMING 100%</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="select-none text-indigo-400">&gt;</span>
              <span className={idx === 0 ? 'text-white font-medium' : 'text-slate-400'}>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [warpSpeed, setWarpSpeed] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);

  const capabilities = [
    {
      title: 'Modern Full-Stack & Next.js Platforms',
      badge: 'Next.js 15 / React 19',
      vector: 'left-top-orbit',
      icon: <Globe className="h-6 w-6 text-sky-600" />,
      glow: 'cyan',
      desc: 'Bespoke web applications engineered with Edge SSR, reactive visual architectures, instantaneous Core Web Vitals, and head-turning animations.',
      stack: ['Server Actions', 'Headless eCommerce', 'Speed Index 100%'],
    },
    {
      title: 'Enterprise Core: HRM & CRM Systems',
      badge: '.NET Core & Laravel 12',
      vector: 'deep-drop',
      icon: <Database className="h-6 w-6 text-indigo-600" />,
      glow: 'indigo',
      desc: 'Mission-critical software engineered to automate multi-branch human resources, payroll pipelines, automated client acquisition, and telemetry.',
      stack: ['Multi-tenant DB', 'Biometric Sync', 'Role-based RBAC'],
    },
    {
      title: 'Industrial-Strength POS & ERP Software',
      badge: 'Real-time Distributed SQL',
      vector: 'right-bottom-orbit',
      icon: <Boxes className="h-6 w-6 text-purple-600" />,
      glow: 'purple',
      desc: 'Full cycle enterprise automation: point-of-sale registers with offline-first capabilities, real-time warehouse inventory sync, and live ledger balancing.',
      stack: ['Hardware Peripherals', 'Offline Ledger', 'Supply Telemetry'],
    },
    {
      title: 'Autonomous AI Agents & Swarm Bots',
      badge: 'PyTorch / LangChain / RAG',
      vector: 'left-slice',
      icon: <Bot className="h-6 w-6 text-emerald-600" />,
      glow: 'emerald',
      desc: 'Custom-built artificial intelligence: multi-agent collaborative task bots, proprietary model fine-tuning (LoRA), and zero-leakage RAG search.',
      stack: ['Private 70B Models', 'Vector Databases', 'Zero-latency Bots'],
    },
    {
      title: 'Algorithmic Search & Semantic SEO',
      badge: 'Knowledge Graphs / Core Web',
      vector: 'right-slice',
      icon: <Zap className="h-6 w-6 text-amber-600" />,
      glow: 'amber',
      desc: 'Technical search domination engineered right into your application code. Automated structured schema, fast server hydration, and conversion pipelines.',
      stack: ['JSON-LD Graphs', 'Dynamic SSG', 'Inbound Velocity'],
    },
    {
      title: 'High-Resiliency Cloud Architecture',
      badge: 'AWS / Docker / Kubernetes',
      vector: 'hyperspace-center',
      icon: <ShieldCheck className="h-6 w-6 text-rose-600" />,
      glow: 'rose',
      desc: 'Cloud deployments with auto-healing container topologies, SOC2-ready encryption, real-time telemetry alerting, and zero-downtime rolling deploys.',
      stack: ['Zero-Trust Mesh', 'Kubernetes Clusters', 'Continuous CI/CD'],
    },
  ];

  const metrics = [
    { label: 'Enterprise Systems Built', value: '250+', detail: 'Running global corporate operations' },
    { label: 'Autonomous Tasks Run/Mo', value: '4.8M', detail: 'Executed across active agent swarms' },
    { label: 'Guaranteed System Uptime', value: '99.99%', detail: 'Zero-fault distributed architecture' },
    { label: 'Average Client ROI Multiple', value: '5.2x', detail: 'In operation throughput efficiency' },
  ];

  const technologies = [
    { name: 'Next.js 15', role: 'Full-stack Edge UI', category: 'Frontend' },
    { name: 'Laravel 12', role: 'Microservice API', category: 'Backend' },
    { name: '.NET 9 (C#)', role: 'Enterprise Core', category: 'High Scale' },
    { name: 'PyTorch / Python', role: 'Deep Learning', category: 'AI & Models' },
    { name: 'LangChain & RAG', role: 'Agent Swarms', category: 'Automation' },
    { name: 'PostgreSQL & Redis', role: 'Vector & Telemetry', category: 'Data Layer' },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Pristine Light Interactive 3D Canvas */}
      <SiteNavbar/>
      <PristineLightCanvas warpSpeed={warpSpeed} />

      {/* Ambient background soft light gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-gradient-to-tr from-indigo-100/60 via-sky-100/50 to-purple-100/60 blur-[130px]" />
        <div className="absolute top-[850px] -left-48 h-[600px] w-[600px] rounded-full bg-sky-100/50 blur-[140px]" />
        <div className="absolute top-[1700px] -right-48 h-[650px] w-[650px] rounded-full bg-purple-100/50 blur-[150px]" />
      </div>

      {/* Main Experience Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24 space-y-36">
        
        {/* HERO SECTION: World-Class Typography & 3D Spatial Presentation */}
        <section className="text-center pt-6 pb-8">
          <SpatialReveal
            vector="deep-drop"
            triggerKey={replayTrigger}
            delay={220}
          >
            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 sm:text-7xl lg:text-8xl leading-none">
              We Build The Engine <br />
              <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                That Scales Your Business
              </span>
            </h1>
          </SpatialReveal>

          <SpatialReveal
            vector="right-bottom-orbit"
            triggerKey={replayTrigger}
            delay={360}
          >
            <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 sm:text-2xl font-normal leading-relaxed">
              We eliminate disjointed vendors. One partner for high-converting <span className="font-semibold text-slate-900">Next.js platforms</span>, mission-critical <span className="font-semibold text-slate-900">HRM, CRM, POS & ERP systems</span>, and autonomous <span className="font-semibold text-indigo-600">AI Agents & Fine-Tuned Models</span>.
            </p>
          </SpatialReveal>

          <SpatialReveal
            vector="hyperspace-center"
            triggerKey={replayTrigger}
            delay={500}
          >
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#capabilities"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-600/25 transition-all duration-300 hover:bg-slate-950 hover:shadow-2xl hover:scale-105"
              >
                <span>Discover Capabilities</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#console"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/80 px-7 py-4 font-semibold text-slate-800 shadow-sm backdrop-blur-xl transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Cpu className="h-4 w-4 text-indigo-600" />
                <span>Simulate AI Workflows</span>
              </a>
            </div>
          </SpatialReveal>
        </section>

        {/* METRICS SHOWCASE: Floating Pristine Cards */}
        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, idx) => (
              <SpatialReveal
                key={idx}
                vector={idx % 2 === 0 ? 'left-top-orbit' : 'right-bottom-orbit'}
                triggerKey={replayTrigger}
                delay={idx * 110}
              >
                <CrystallineCard glowAccent="indigo" className="p-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                    {m.label}
                  </span>
                  <div className="mt-3 text-4xl font-extrabold text-slate-950 tracking-tight">
                    {m.value}
                  </div>
                  <p className="mt-2 text-xs text-slate-500 font-medium">
                    {m.detail}
                  </p>
                </CrystallineCard>
              </SpatialReveal>
            ))}
          </div>
        </section>

        {/* 3D CAPABILITIES GRID: Spatial Fly-In from 6 Random Vectors */}
        <section id="capabilities" className="space-y-12">
          <div className="text-center space-y-3">
            <SpatialReveal vector="deep-drop" triggerKey={replayTrigger}>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
                Core Architectural Pillars
              </span>
              <h2 className="text-4xl font-black text-slate-950 sm:text-6xl tracking-tight">
                Everything Modern Enterprise Requires
              </h2>
              <p className="mx-auto max-w-2xl text-slate-600 text-base">
                Engineering durability from user interfaces down to distributed ledgers and neural intelligence.
              </p>
            </SpatialReveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <SpatialReveal
                key={i}
                vector={cap.vector}
                triggerKey={replayTrigger}
                delay={i * 120}
              >
                <CrystallineCard glowAccent={cap.glow}>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                        {cap.icon}
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700">
                        {cap.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-slate-950 tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-5">
                    <ul className="space-y-2">
                      {cap.stack.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CrystallineCard>
              </SpatialReveal>
            ))}
          </div>
        </section>

        {/* INTERACTIVE WORKFLOW & MODEL SIMULATOR CONSOLE */}
        <section id="console" className="space-y-8">
          <SpatialReveal vector="deep-drop" triggerKey={replayTrigger}>
            <div className="text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
                Live Interactive Lab
              </span>
              <h2 className="text-4xl font-extrabold text-slate-950 sm:text-5xl tracking-tight">
                Simulate Autonomous AI &amp; ERP Workflows
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-slate-600">
                Select an operational layer below to see how our autonomous multi-agent pipelines, fine-tuned private models, and distributed ledgers synchronize in real time.
              </p>
            </div>
          </SpatialReveal>

          <SpatialReveal vector="hyperspace-center" triggerKey={replayTrigger} delay={200}>
            <InteractiveEngineConsole />
          </SpatialReveal>
        </section>

        {/* FOUNDATIONAL TECH STACK: Dynamic Slices from Left & Right */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <SpatialReveal vector="deep-drop" triggerKey={replayTrigger}>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
                Battle-Tested Architecture
              </span>
              <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
                The Technologies Powering Your Scale
              </h2>
            </SpatialReveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {technologies.map((tech, i) => (
              <SpatialReveal
                key={i}
                vector={i % 2 === 0 ? 'left-slice' : 'right-slice'}
                triggerKey={replayTrigger}
                delay={i * 90}
              >
                <div className="group rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-center backdrop-blur-md shadow-sm transition duration-300 hover:border-indigo-400 hover:bg-white hover:scale-105 hover:shadow-md">
                  <div className="font-mono text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tech.name}
                  </div>
                  <div className="mt-1 text-xs text-indigo-600 font-mono font-medium">{tech.role}</div>
                  <div className="mt-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">{tech.category}</div>
                </div>
              </SpatialReveal>
            ))}
          </div>
        </section>

        {/* CONVERSION CTA: Ultra Clean Light Portal */}
        <section id="contact" className="pb-12">
          <SpatialReveal vector="hyperspace-center" triggerKey={replayTrigger}>
            <div className="relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/70 via-white to-white p-12 text-center shadow-[0_25px_70px_-15px_rgba(99,102,241,0.15)] backdrop-blur-2xl lg:p-20">
              {/* Soft radial shine behind content */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#6366f1_0,transparent_60%)] opacity-10" />

              <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-indigo-800 border border-indigo-200">
                Ready For Market Leadership?
              </span>

              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black text-slate-950 sm:text-6xl tracking-tight leading-tight">
                Let's Engineer Software That Actually Scales Your Bottom Line.
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed">
                Whether you need a custom POS and HRM suite, high-speed Next.js application, or private AI models trained on your business data—we build it right the first time.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/contact-us"
                  className="rounded-2xl bg-indigo-600 px-9 py-4 font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:bg-slate-950 hover:scale-105 hover:shadow-2xl"
                >
                  Start Your Project
                </a>
                <a
                  href="tel:+18005550199"
                  className="rounded-2xl border border-slate-200 bg-white/90 px-8 py-4 font-semibold text-slate-800 shadow-sm backdrop-blur-xl transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Book Technical Discovery
                </a>
              </div>
            </div>
          </SpatialReveal>
        </section>
      </main>
      <SiteFooter/>
    </div>
  );
}