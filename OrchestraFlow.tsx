
import React, { useState } from 'react';
import {
  Zap, Brain, Eye, ShieldCheck, CheckCircle2, XCircle,
  Users, Layers, Activity, Rocket, Sparkles, Atom, RefreshCw,
  AlertTriangle, Send, ArrowDown, Crosshair, Cpu,
  ChevronRight, Flame, Star, Target, Workflow, Filter
} from 'lucide-react';

// ── Types ──
interface FlowNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  glow: string;
  border: string;
  bg: string;
}

// ── Flow Nodes Data ──
const FLOW_NODES: FlowNode[] = [
  {
    id: 'input',
    title: 'INPUT',
    subtitle: 'Demanda Externa',
    description: 'Ponto de entrada de toda ideia, projeto ou necessidade no ecossistema iAi.',
    icon: <Send size={28} />,
    glow: 'shadow-[0_0_40px_rgba(34,197,94,0.4)]',
    border: 'border-green-500/50',
    bg: 'bg-green-500/10',
  },
  {
    id: 'staff',
    title: 'STAFF iAi',
    subtitle: 'Recepção Estratégica',
    description: 'O Staff recebe, contextualiza e prepara a demanda para avaliação pelo crivo NH2CDi.',
    icon: <Users size={28} />,
    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'nh2cdi',
    title: 'CRIVO NH2CDi',
    subtitle: 'Portão de Validação',
    description: 'Natureza, Humano, Conhecimento, Cultura, Dados, Inteligência — 6 dimensões que filtram cada demanda.',
    icon: <Atom size={32} />,
    glow: 'shadow-[0_0_60px_rgba(139,92,246,0.5)]',
    border: 'border-violet-500/60',
    bg: 'bg-violet-500/15',
  },
  {
    id: 'production',
    title: 'PRODUÇÃO',
    subtitle: 'Materialização',
    description: 'A equipe de produção transforma a demanda aprovada em realidade tangível e funcional.',
    icon: <Layers size={28} />,
    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
  },
];

// ── Human Reviewers ──
const REVIEWERS = [
  {
    id: 'rev-prod',
    title: 'PRODUÇÃO',
    subtitle: 'Quem construiu',
    description: 'Olhar técnico de quem materializou. Verifica fidelidade ao escopo e qualidade de execução.',
    color: 'blue',
    icon: <Layers size={20} />,
  },
  {
    id: 'rev-staff',
    title: 'STAFF',
    subtitle: 'Quem validou',
    description: 'Olhar estratégico de quem conhece a visão. Garante alinhamento com o propósito original.',
    color: 'violet',
    icon: <Brain size={20} />,
  },
  {
    id: 'rev-acao',
    title: 'CÉLULA AÇÃO',
    subtitle: 'Quem implementa',
    description: 'Olhar pragmático de quem vai colocar em prática. Valida viabilidade de implementação.',
    color: 'orange',
    icon: <Zap size={20} />,
  },
];

// ── Sub-components ──

const PulseConnector: React.FC<{ variant?: 'default' | 'green' | 'red' | 'orange'; label?: string }> = ({ variant = 'default', label }) => {
  const colors = {
    default: 'from-violet-500 via-blue-500 to-violet-500',
    green: 'from-green-500 via-emerald-400 to-green-500',
    red: 'from-red-500 via-orange-500 to-red-500',
    orange: 'from-orange-500 via-amber-400 to-orange-500',
  };
  return (
    <div className="flex flex-col items-center py-2 relative">
      <div className="w-[2px] h-16 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${colors[variant]} opacity-30`} />
        <div className={`absolute w-full h-4 bg-gradient-to-b ${colors[variant]} rounded-full animate-flow-down`} />
      </div>
      {label && (
        <span className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+16px)] text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 whitespace-nowrap">
          {label}
        </span>
      )}
      <ArrowDown size={14} className="text-gray-600 -mt-1" />
    </div>
  );
};

const GateNode: React.FC<{ node: FlowNode; isExpanded: boolean; onClick: () => void }> = ({ node, isExpanded, onClick }) => (
  <div className="flex flex-col items-center w-full max-w-lg mx-auto" onClick={onClick}>
    <div className={`relative w-full p-8 rounded-[40px] glass cursor-pointer transition-all duration-500 group hover:scale-[1.02] ${node.border} ${node.glow} overflow-hidden`}>
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer" />

      {/* Glow ring */}
      {node.id === 'nh2cdi' && (
        <div className="absolute -inset-[2px] rounded-[42px] bg-gradient-to-r from-violet-600 via-blue-500 to-violet-600 opacity-20 animate-spin-slow" />
      )}

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`p-4 rounded-[24px] ${node.bg} mb-4 group-hover:scale-110 transition-transform`}>
          <div className="text-white">{node.icon}</div>
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-[0.3em] italic mb-1">{node.title}</h3>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-3">{node.subtitle}</p>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-2">
            <p className="text-[12px] text-gray-300 italic leading-relaxed max-w-sm">{node.description}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const NH2CDiGate: React.FC<{ isExpanded: boolean; onClick: () => void }> = ({ isExpanded, onClick }) => {
  const seeds = [
    { letter: 'N', label: 'Natureza', color: 'text-green-400', bg: 'bg-green-500/20' },
    { letter: 'H', label: 'Humano', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { letter: '2C', label: 'Conhecimento & Cultura', color: 'text-violet-400', bg: 'bg-violet-500/20' },
    { letter: 'D', label: 'Dados', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    { letter: 'i', label: 'Inteligencia', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto" onClick={onClick}>
      {/* The Diamond Gate */}
      <div className="relative cursor-pointer group">
        {/* Outer rotating ring */}
        <div className="absolute -inset-8 border-2 border-dashed border-violet-500/20 rounded-full animate-spin-slow" />
        <div className="absolute -inset-4 border border-violet-500/10 rounded-full animate-spin-reverse" />

        <div className="relative p-10 rounded-[48px] glass-violet border-violet-500/60 shadow-[0_0_80px_rgba(139,92,246,0.4)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_120px_rgba(139,92,246,0.6)]">
          {/* Animated gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-blue-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent animate-shimmer" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={20} className="text-violet-400" />
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em]">Portao de Validacao</span>
              <ShieldCheck size={20} className="text-violet-400" />
            </div>

            <h3 className="text-3xl font-black text-white uppercase tracking-[0.2em] italic mb-4">
              CRIVO NH<span className="text-violet-400">2</span>CDi
            </h3>

            {/* Seed badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {seeds.map((seed) => (
                <div key={seed.letter} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${seed.bg} border border-white/10 group-hover:border-white/20 transition-all`}>
                  <span className={`text-[11px] font-black ${seed.color}`}>{seed.letter}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase">{seed.label}</span>
                </div>
              ))}
            </div>

            {isExpanded && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-2 max-w-md">
                <p className="text-[12px] text-gray-300 italic leading-relaxed">
                  Cada demanda e avaliada em 6 dimensoes fundamentais. Somente projetos que atendem ao crivo completo avancam para producao.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DecisionFork: React.FC = () => (
  <div className="flex items-center justify-center gap-4 w-full max-w-2xl mx-auto py-4">
    {/* Approved path */}
    <div className="flex-1 flex flex-col items-center">
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <CheckCircle2 size={16} className="text-green-400" />
        <span className="text-[11px] font-black text-green-400 uppercase tracking-[0.2em]">Aprovado</span>
      </div>
      <div className="w-[2px] h-8 bg-gradient-to-b from-green-500/40 to-transparent mt-2" />
    </div>

    {/* Divider */}
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
        <Filter size={16} className="text-white/40" />
      </div>
    </div>

    {/* Rejected path */}
    <div className="flex-1 flex flex-col items-center">
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
        <XCircle size={16} className="text-red-400" />
        <span className="text-[11px] font-black text-red-400 uppercase tracking-[0.2em]">Recusado</span>
      </div>
      <div className="w-[2px] h-8 bg-gradient-to-b from-red-500/40 to-transparent mt-2" />
    </div>
  </div>
);

const ApprovedPath: React.FC = () => (
  <div className="flex-1 flex flex-col items-center">
    <GateNode
      node={FLOW_NODES[3]}
      isExpanded={false}
      onClick={() => {}}
    />
  </div>
);

const RejectedPath: React.FC = () => (
  <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
    <div className="flex gap-4 w-full">
      {/* Ajustes */}
      <div className="flex-1 p-6 rounded-[28px] glass border-orange-500/30 bg-orange-500/5 text-center group hover:border-orange-500/60 transition-all cursor-pointer shadow-[0_0_20px_rgba(249,115,22,0.1)]">
        <RefreshCw size={22} className="text-orange-400 mx-auto mb-3 group-hover:animate-spin" />
        <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Ajustes</h4>
        <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-wider">Volta ao Staff para refinamento</p>
      </div>
      {/* Refutacao */}
      <div className="flex-1 p-6 rounded-[28px] glass border-red-500/30 bg-red-500/5 text-center group hover:border-red-500/60 transition-all cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <XCircle size={22} className="text-red-400 mx-auto mb-3" />
        <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Refutacao</h4>
        <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-wider">Demanda descartada com registro</p>
      </div>
    </div>
    {/* Return arrow */}
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
      <RefreshCw size={12} className="text-orange-400" />
      <span className="text-[9px] font-black text-orange-400 uppercase tracking-[0.2em]">Loop de retorno ao Staff</span>
    </div>
  </div>
);

const HumanReviewGate: React.FC<{ expandedReviewer: string | null; onToggle: (id: string) => void }> = ({ expandedReviewer, onToggle }) => (
  <div className="w-full max-w-3xl mx-auto">
    <div className="relative p-10 rounded-[48px] glass border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden">
      {/* Animated scanning line */}
      <div className="absolute inset-0 overflow-hidden rounded-[48px]">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent animate-scan" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Eye size={22} className="text-amber-400" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.5em]">Portao de Revisao Humana</span>
            <Eye size={22} className="text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-[0.15em] italic">
            3 Pares de Olhos
          </h3>
          <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Minimo 2 aprovacoes | Ideal: 3 unanime</p>
        </div>

        {/* The 3 Reviewers */}
        <div className="grid grid-cols-3 gap-4">
          {REVIEWERS.map((rev, idx) => {
            const isExpanded = expandedReviewer === rev.id;
            const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
              blue: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
              violet: { border: 'border-violet-500/40', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]' },
              orange: { border: 'border-orange-500/40', bg: 'bg-orange-500/10', text: 'text-orange-400', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]' },
            };
            const c = colorMap[rev.color];

            return (
              <div
                key={rev.id}
                onClick={(e) => { e.stopPropagation(); onToggle(rev.id); }}
                className={`relative p-6 rounded-[32px] glass ${c.border} ${c.bg} cursor-pointer transition-all duration-300 hover:scale-105 ${isExpanded ? c.glow : ''} group`}
              >
                {/* Eye pulse */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <Eye size={28} className={`${c.text} group-hover:scale-110 transition-transform`} />
                    <div className={`absolute -inset-2 rounded-full ${c.bg} animate-ping opacity-20`} />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.15em] mb-1">Revisor {idx + 1}</span>
                  <span className={`text-[9px] font-black ${c.text} uppercase tracking-[0.2em]`}>{rev.title}</span>
                  <span className="text-[8px] text-gray-500 mt-1 italic">{rev.subtitle}</span>

                  {isExpanded && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-3 pt-3 border-t border-white/10">
                      <p className="text-[10px] text-gray-400 italic leading-relaxed">{rev.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const ReviewDecision: React.FC = () => (
  <div className="flex items-center justify-center gap-8 w-full max-w-2xl mx-auto py-2">
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <CheckCircle2 size={16} className="text-green-400" />
        <span className="text-[11px] font-black text-green-400 uppercase tracking-[0.2em]">Aprovado</span>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
        <RefreshCw size={16} className="text-orange-400" />
        <span className="text-[11px] font-black text-orange-400 uppercase tracking-[0.2em]">Correcoes</span>
      </div>
      <span className="text-[8px] text-gray-600 mt-1 uppercase tracking-wider">Retorna a Producao</span>
    </div>
  </div>
);

const OutputNode: React.FC = () => (
  <div className="flex flex-col items-center w-full max-w-lg mx-auto">
    <div className="relative w-full p-10 rounded-[48px] glass border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.3)] overflow-hidden group cursor-pointer hover:shadow-[0_0_100px_rgba(16,185,129,0.5)] transition-all duration-500">
      {/* Particle burst bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-green-900/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-shimmer" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-5 rounded-[28px] bg-emerald-500/15 mb-4 group-hover:scale-110 transition-transform">
          <Rocket size={32} className="text-emerald-400" />
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-[0.3em] italic mb-1">OUTPUT</h3>
        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-3">Celula Acao • Implementacao</p>
        <p className="text-[12px] text-gray-300 italic leading-relaxed max-w-sm">
          O projeto validado e entregue a Celula Acao para implementacao no mundo real. Missao cumprida.
        </p>

        <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <Sparkles size={14} className="text-emerald-400" />
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">Deploy • Go Live • Impacto</span>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Component ──
const OrchestraFlow: React.FC = () => {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [expandedReviewer, setExpandedReviewer] = useState<string | null>(null);
  const [showRejected, setShowRejected] = useState(false);

  const toggleNode = (id: string) => {
    setExpandedNode(prev => prev === id ? null : id);
  };

  const toggleReviewer = (id: string) => {
    setExpandedReviewer(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 pb-24 overflow-x-hidden relative">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Radial glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-8 relative">
        {/* Header */}
        <header className="flex flex-col items-center py-16 mb-8 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-violet-500/50" />
            <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.6em]">iAi 2026</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-violet-500/50" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase italic text-white text-center mb-4">
            A Orquestra <span className="text-violet-400">iAi</span>
          </h1>
          <p className="text-gray-500 text-[12px] tracking-[0.5em] uppercase font-black italic mb-6">
            Fluxo de Orquestracao • Input to Output
          </p>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-violet-500/5 border border-violet-500/20">
            <Workflow size={16} className="text-violet-400" />
            <span className="text-[10px] text-violet-300 font-black uppercase tracking-[0.2em]">
              Agentes do Futuro • Processo Vivo
            </span>
          </div>
        </header>

        {/* Flow */}
        <div className="flex flex-col items-center gap-2">

          {/* ── STEP 1: INPUT ── */}
          <GateNode
            node={FLOW_NODES[0]}
            isExpanded={expandedNode === 'input'}
            onClick={() => toggleNode('input')}
          />
          <PulseConnector variant="green" />

          {/* ── STEP 2: STAFF ── */}
          <GateNode
            node={FLOW_NODES[1]}
            isExpanded={expandedNode === 'staff'}
            onClick={() => toggleNode('staff')}
          />
          <PulseConnector />

          {/* ── STEP 3: NH2CDi GATE ── */}
          <NH2CDiGate
            isExpanded={expandedNode === 'nh2cdi'}
            onClick={() => toggleNode('nh2cdi')}
          />

          {/* ── DECISION FORK ── */}
          <div className="py-6 w-full">
            <DecisionFork />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-4">
              {/* Approved side */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-full p-6 rounded-[28px] glass border-green-500/30 bg-green-500/5 text-center">
                  <Layers size={24} className="text-blue-400 mx-auto mb-3" />
                  <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Producao</h4>
                  <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-wider">Materializacao do projeto</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowDown size={14} className="text-green-500/50" />
                  <span className="text-[8px] text-green-400 font-black uppercase tracking-wider">segue para revisao</span>
                </div>
              </div>

              {/* Rejected side */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setShowRejected(!showRejected)}
                  className="w-full text-left"
                >
                  <RejectedPath />
                </button>
              </div>
            </div>
          </div>

          <PulseConnector variant="green" />

          {/* ── STEP 5: HUMAN REVIEW GATE ── */}
          <HumanReviewGate
            expandedReviewer={expandedReviewer}
            onToggle={toggleReviewer}
          />

          {/* ── REVIEW DECISION ── */}
          <div className="py-4 w-full">
            <ReviewDecision />

            {/* Correction loop visual */}
            <div className="max-w-xl mx-auto mt-4 p-5 rounded-[24px] bg-orange-500/5 border border-dashed border-orange-500/20 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <RefreshCw size={14} className="text-orange-400 animate-spin-slow" />
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Loop de Correcao</span>
              </div>
              <p className="text-[9px] text-gray-500 italic">
                Se a revisao identificar problemas, o projeto retorna a Producao para ajustes. O ciclo se repete ate a aprovacao unanime.
              </p>
            </div>
          </div>

          <PulseConnector variant="green" />

          {/* ── STEP 6: OUTPUT ── */}
          <OutputNode />
        </div>

        {/* ── LEGEND / INSIGHTS ── */}
        <section className="mt-20 mb-12">
          <div className="text-center mb-12">
            <h3 className="text-lg font-black text-white uppercase tracking-[0.4em] italic">Principios da Orquestra</h3>
            <div className="h-[1px] w-24 bg-violet-500/30 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[36px] glass border-white/10 hover:border-violet-500/30 transition-all group">
              <Target size={24} className="text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-black text-white uppercase tracking-[0.15em] italic mb-3">Zero Ruido</h4>
              <p className="text-[11px] text-gray-500 italic leading-relaxed">
                Toda demanda passa por um unico ponto de entrada. Sem atalhos, sem bypass. O sistema protege a qualidade.
              </p>
            </div>
            <div className="p-8 rounded-[36px] glass border-white/10 hover:border-amber-500/30 transition-all group">
              <Eye size={24} className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-black text-white uppercase tracking-[0.15em] italic mb-3">3 Pares de Olhos</h4>
              <p className="text-[11px] text-gray-500 italic leading-relaxed">
                Producao, Staff e Celula Acao — tres perspectivas distintas garantem que nada escape. Construtor, estrategista e implementador.
              </p>
            </div>
            <div className="p-8 rounded-[36px] glass border-white/10 hover:border-green-500/30 transition-all group">
              <RefreshCw size={24} className="text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-black text-white uppercase tracking-[0.15em] italic mb-3">Correcao Continua</h4>
              <p className="text-[11px] text-gray-500 italic leading-relaxed">
                Se voltou, e porque vai sair melhor. O loop de correcao nao e falha — e evolucao. Iteramos ate a excelencia.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 flex flex-col items-center gap-4 text-[10px] text-gray-700 uppercase tracking-[0.3em] font-black italic">
          <div className="flex items-center gap-3">
            <Atom size={16} className="text-violet-500/50" />
            <span>iAi Orchestra Flow • 2026</span>
            <Atom size={16} className="text-violet-500/50" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrchestraFlow;
