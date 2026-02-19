
import React, { useState } from 'react';
import OrchestraFlow from './OrchestraFlow';
import {
  Cpu, ShieldCheck, Megaphone, Settings, Activity, Database, Users, Briefcase,
  Gavel, TrendingUp, FileText, Globe, Zap, CheckCircle2, Clock, ArrowDown,
  User, Brain, Layers, Heart, X, Scroll, Sun, Moon, Eye, Info, Compass,
  Target, Gem, Anchor, Wind, Flame, Star, Mountain, TreePine,
  Infinity, Atom, Sprout, ClipboardList, Trophy, GraduationCap,
  Crosshair, Search, Sparkles, Sparkle, Rocket, Music, Leaf, Medal,
  Coins, Calculator, HardHat, BookOpen, MapPin, Languages, Shapes,
  ClipboardCheck, Building2, Workflow, Filter, Beaker
} from 'lucide-react';

// --- Types ---
interface Cell {
  id: string;
  name: string;
  function: string;
  intelligence: string;
  icon: React.ReactNode;
}

interface Project {
  title: string;
  owner: string;
  progress: string; 
  description?: string;
}

interface Counselor {
  id: string;
  name: string;
  role: string;
  bio: string;
  values: { label: string; icon: React.ReactNode }[];
  jung: { title: string; desc: string };
  animal: { title: string; desc: string };
  cosmic: { title: string; desc: string };
}

// --- Detailed Data: 21 Councillors ---
const COUNSELORS: Counselor[] = [
  { id: "ARCH-01", name: "Peter Drucker", role: "Pai da Administração Moderna", bio: "O visionário que transformou a gestão de uma tarefa mecânica em uma disciplina humana e intelectual.", values: [{label: "Eficiência", icon: <User size={12}/>}, {label: "Responsabilidade", icon: <ShieldCheck size={12}/>}], jung: { title: "O Sábio", desc: "Busca da verdade através da análise racional." }, animal: { title: "Águia", desc: "Visão panorâmica e estratégica." }, cosmic: { title: "Hermes Trismegisto", desc: "Traduz o complexo em realizável." } },
  { id: "ARCH-02", name: "Webster Robinson", role: "Mestre da Organização Científica", bio: "Foco na harmonia entre estrutura e a fisiologia da realização empresarial.", values: [{label: "Ordem", icon: <Layers size={12}/>}, {label: "Equilíbrio", icon: <Activity size={12}/>}], jung: { title: "O Governante", desc: "Impõe ordem no caos aparente." }, animal: { title: "Formiga", desc: "Perfeição na organization coletiva." }, cosmic: { title: "Metatron", desc: "Arquiteto da geometria sagrada." } },
  { id: "ARCH-03", name: "W. Edwards Deming", role: "Profeta da Qualidade Total", bio: "Provou que a qualidade é fruto da liderança consciente e do aprendizado constante.", values: [{label: "Melhoria", icon: <TrendingUp size={12}/>}, {label: "Otimização", icon: <Cpu size={12}/>}], jung: { title: "O Mago", desc: "Transmutação de processos em alta performance." }, animal: { title: "Castor", desc: "Construtor resiliente e preciso." }, cosmic: { title: "Thoth", desc: "Escriba divino da medida exata." } },
  { id: "ARCH-04", name: "Henry Mintzberg", role: "Mestre das Configurações", bio: "Desafiador de paradigmas, vê a gestão como arte.", values: [{label: "Adaptação", icon: <Globe size={12}/>}, {label: "Flexibilidade", icon: <Wind size={12}/>}], jung: { title: "O Explorador", desc: "Busca por novos caminhos." }, animal: { title: "Raposa", desc: "Astúcia e versatilidade." }, cosmic: { title: "Prometeu", desc: "Doador da inovação." } },
  { id: "ARCH-05", name: "Hermes Trismegisto", role: "Fundador da Alquimia", bio: "Seus princípios regem a correspondência vibracional.", values: [{label: "Mentalismo", icon: <Brain size={12}/>}, {label: "Vibração", icon: <Zap size={12}/>}], jung: { title: "O Mago Supremo", desc: "Mestre das energias sutis." }, animal: { title: "Íbis", desc: "Sabedoria sagrada." }, cosmic: { title: "Mercúrio", desc: "Inteligência veloz." } },
  { id: "ARCH-06", name: "Platão", role: "Filósofo das Formas Ideais", bio: "Arquiteto do pensamento e do estado ideal.", values: [{label: "Justiça", icon: <Gavel size={12}/>}, {label: "Verdade", icon: <Sun size={12}/>}], jung: { title: "O Sábio Idealista", desc: "Visão da perfeição arquetípica." }, animal: { title: "Coruja", desc: "Enxerga a verdade na escuridão." }, cosmic: { title: "Demiurgo", desc: "Artesão universal." } },
  { id: "ARCH-07", name: "Lao Tzu", role: "Mestre do Caminho (Tao)", bio: "Ensinou a liderança que flui como a água.", values: [{label: "Simplicidade", icon: <TreePine size={12}/>}, {label: "Fluxo", icon: <Activity size={12}/>}], jung: { title: "O Sábio Taoísta", desc: "Força na suavidade." }, animal: { title: "Tartaruga", desc: "Passo firme e longevidade." }, cosmic: { title: "O Velho Sábio", desc: "Equilíbrio dos opostos." } },
  { id: "ARCH-08", name: "Aristóteles", role: "Pai da Lógica e Ética", bio: "Uniu a causa final ao propósito da realização.", values: [{label: "Virtude", icon: <Star size={12}/>}, {label: "Racionalidade", icon: <Compass size={12}/>}], jung: { title: "O Sábio Pragmático", desc: "Inteligência prática." }, animal: { title: "Lince", desc: "Observação aguda e foco." }, cosmic: { title: "Logos", desc: "Razão universal." } },
  { id: "ARCH-09", name: "Helena Blavatsky", role: "Fundadora da Teosofia", bio: "Sintetizou filosofias em doutrina de evolução.", values: [{label: "Unidade", icon: <Globe size={12}/>}, {label: "Revelação", icon: <Eye size={12}/>}], jung: { title: "A Maga Reveladora", desc: "Revela verdades ocultas." }, animal: { title: "Serpente", desc: "Sabedoria e renovação." }, cosmic: { title: "Sophia", desc: "Sabedoria divina." } },
  { id: "ARCH-10", name: "Rudolf Steiner", role: "Fundador da Antroposofia", bio: "Uniu ciência e espiritualidade em novos modelos.", values: [{label: "Liberdade", icon: <Wind size={12}/>}, {label: "Sustentabilidade", icon: <TreePine size={12}/>}], jung: { title: "O Visionário", desc: "Percepção intuitiva validada." }, animal: { title: "Abelha", desc: "Cooperação social perfeita." }, cosmic: { title: "Arcanjo Miguel", desc: "Consciência solar." } },
  { id: "ARCH-11", name: "Alice Bailey", role: "Mensageira dos Sete Raios", bio: "Revelou a psicologia esotérica grupal.", values: [{label: "Serviço", icon: <Heart size={12}/>}, {label: "Ressonância", icon: <Zap size={12}/>}], jung: { title: "A Mensageira", desc: "Ponte entre hierarquias." }, animal: { title: "Pomba", desc: "Espírito de harmonia." }, cosmic: { title: "Djwhal Khul", desc: "Amor e sabedoria." } },
  { id: "ARCH-12", name: "Santo Agostinho", role: "Doutor da Graça", bio: "Explorou a tensão entre o espiritual e o temporal.", values: [{label: "Integridade", icon: <ShieldCheck size={12}/>}, {label: "Iluminação", icon: <Sun size={12}/>}], jung: { title: "O Convertido", desc: "Jornada da sombra para a luz." }, animal: { title: "Leão Alado", desc: "Força e elevação." }, cosmic: { title: "Anjo da Conversão", desc: "Força transmutadora." } },
  { id: "ARCH-13", name: "São Tomás de Aquino", role: "Doutor Angélico", bio: "Reconciliou a fé com a lógica sistemática.", values: [{label: "Harmonia", icon: <Target size={12}/>}, {label: "Ordem Lógica", icon: <Compass size={12}/>}], jung: { title: "O Sábio Sistemático", desc: "Edifícios mentais indestrutíveis." }, animal: { title: "Boi", desc: "Trabalho paciente e força." }, cosmic: { title: "Logos Divino", desc: "Razão suprema na ordem." } },
  { id: "ARCH-14", name: "Meister Eckhart", role: "Místico do Desapego", bio: "O vazio criativo como portal da divindade.", values: [{label: "Desapego", icon: <Moon size={12}/>}, {label: "Essência", icon: <Gem size={12}/>}], jung: { title: "O Místico", desc: "Coragem de soltar formas obsoletas." }, animal: { title: "Cervo", desc: "Pureza de intenção silenciosa." }, cosmic: { title: "Gottheit", desc: "O silêncio absoluto." } },
  { id: "ARCH-15", name: "Benjamin Franklin", role: "Polímata da Excelência", bio: "Mestre do senso comum e virtudes práticas.", values: [{label: "Indústria", icon: <Settings size={12}/>}, {label: "Frugalidade", icon: <Anchor size={12}/>}], jung: { title: "O Sábio Prático", desc: "Progresso e melhoria humana." }, animal: { title: "Castor", desc: "Labor constante e inteligente." }, cosmic: { title: "Prometeu Americano", desc: "Captura o raio para servir." } },
  { id: "ARCH-16", name: "Sabedoria Indígena", role: "Guardiões da Terra", bio: "Reciprocidade sagrada e harmonia natural.", values: [{label: "Conexão", icon: <Globe size={12}/>}, {label: "Reciprocidade", icon: <Heart size={12}/>}], jung: { title: "O Ancião Coletivo", desc: "Voz ancestral da terra." }, animal: { title: "Todos os Sagrados", desc: "Integração do ecossistema." }, cosmic: { title: "Pachamama", desc: "Grande Mãe Terra." } },
  { id: "ARCH-17", name: "Leonardo da Vinci", role: "Mestre da Polimatia", bio: "Uniu ciência, arte e iconografia.", values: [{label: "Curiosidade", icon: <Search size={12}/>}, {label: "Perfeição", icon: <Gem size={12}/>}], jung: { title: "O Criador", desc: "Beleza funcional e visão original." }, animal: { title: "Fênix", desc: "Renascimento constante." }, cosmic: { title: "Geômetra Divino", desc: "Proporção sagrada." } },
  { id: "ARCH-18", name: "Sun Tzu", role: "Mestre da Estratégia", bio: "Vitória suprema pela inteligência, sem conflito.", values: [{label: "Prudência", icon: <ShieldCheck size={12}/>}, {label: "Antecipação", icon: <Clock size={12}/>}], jung: { title: "O Estrategista", desc: "Antecipa o fluxo dos eventos." }, animal: { title: "Tigre", desc: "Força e paciência exata." }, cosmic: { title: "Vento Silencioso", desc: "Moldagem invisível de resultados." } },
  { id: "ARCH-19", name: "Carl Jung", role: "Cartógrafo do Inconsciente", bio: "Revelou os arquétipos como base da cultura.", values: [{label: "Integração", icon: <Layers size={12}/>}, {label: "Sentido", icon: <Info size={12}/>}], jung: { title: "O Explorador do Abismo", desc: "Resgate do ouro da consciência." }, animal: { title: "Escorpião", desc: "Transmutação radical do ser." }, cosmic: { title: "O Observador", desc: "Testemunha da vontade." } },
  { id: "ARCH-20", name: "Nikola Tesla", role: "Mestre da Frequência", bio: "Materializou o futuro no agora via vibração.", values: [{label: "Vibração", icon: <Zap size={12}/>}, {label: "Frequência", icon: <Activity size={12}/>}], jung: { title: "O Visionário Radical", desc: "Lampejos da reality futura." }, animal: { title: "Relâmpago", desc: "Descarga súbita de inteligência." }, cosmic: { title: "Maestro das Ondas", desc: "Rege a sinfonia invisível." } },
  { id: "ARCH-21", name: "Marco Aurélio", role: "Imperador Estóico", bio: "Governança resiliente e paz interior.", values: [{label: "Dever", icon: <Anchor size={12}/>}, {label: "Resiliência", icon: <Mountain size={12}/>}], jung: { title: "O Herói-Rei", desc: "Poder temporal e disciplina." }, animal: { title: "Lobo Solitário", desc: "Liderança que protege a alcateia." }, cosmic: { title: "Ordem do Logos", desc: "Aceitação serena da vontade." } }
];

// --- Support HUB Data ---
const SUPPORT_CELLS = [
  { id: "C05", name: "DADOS", role: "Memória Racional", intelligence: "Linguística", icon: <Database size={24}/>, desc: "Gestão informacional e integridade iAi." },
  { id: "C06", name: "IAs", role: "Processamento Neural", intelligence: "Técnica", icon: <Cpu size={24}/>, desc: "IA Generativa e engenharia neural." },
  { id: "C07", name: "COMUNICAÇÃO", role: "Ressonância", intelligence: "Criativa", icon: <Megaphone size={24}/>, desc: "Narrativa institucional e estética sensorial." },
  { id: "C08", name: "LEGAL", role: "Blindagem Ética", intelligence: "Existencial", icon: <Gavel size={24}/>, desc: "Proteção jurídica e ética empresarial." },
  { id: "C09", name: "FINANCEIRO", role: "Prosperidade", intelligence: "Naturalista", icon: <Coins size={24}/>, desc: "Saúde financeira como sistema vivo." },
  { id: "C10", name: "TAX", role: "Engenharia de Otimização", intelligence: "Lógica", icon: <Calculator size={24}/>, desc: "Inteligência fiscal e raciocínio numérico." },
  { id: "C11", name: "ADMIN", role: "Infraestrutura", intelligence: "Nutridora", icon: <HardHat size={24}/>, desc: "Suporte operacional e gestão de recursos." },
  { id: "C12", name: "PEOPLE", role: "Alquimia Humana", intelligence: "Interpessoal", icon: <Users size={24}/>, desc: "Gestão da cultura e talentos em harmonia." }
];

// --- Projects for C04 ---
const C04_PROJECTS: Project[] = [
  { title: "JARDIM ATLÂNTICO", owner: "Staff iAi", progress: "85%", description: "Revitalização sensorial e arquitetura orgânica costeira." },
  { title: "SUN HOUSE", owner: "Staff iAi", progress: "60%", description: "Ecossistema solar autossuficiente e governança bio-tech." },
  { title: "MARES DO NORTE", owner: "Staff iAi", progress: "40%", description: "Efetivação de rotas de inteligência e infraestrutura ártica." }
];

// --- Sub-components ---

const SeedMandala = () => {
  const seeds = [
    { l: 'N', i: <Leaf size={16} />, label: 'Natureza', r: 0 },
    { l: 'H', i: <User size={16} />, label: 'Humano', r: 60 },
    { l: 'C', i: <BookOpen size={16} />, label: 'Conhecimento', r: 120 },
    { l: 'C', i: <Music size={16} />, label: 'Cultura', r: 180 },
    { l: 'D', i: <Database size={16} />, label: 'Dados', r: 240 },
    { l: 'i', i: <Brain size={16} />, label: 'Inteligência', r: 300 },
  ];

  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
      {/* Camadas da Mandala Animada */}
      <div className="absolute inset-0 border-2 border-dashed border-violet-500/10 rounded-full animate-spin [animation-duration:40s]" />
      <div className="absolute inset-8 border border-blue-500/10 rounded-full animate-spin [animation-duration:30s] [animation-direction:reverse]" />
      <div className="absolute inset-16 border border-orange-500/10 rounded-full animate-spin [animation-duration:20s]" />
      
      {/* Ícones Orbitais do Acrônimo NH2CDi */}
      {seeds.map((seed, idx) => (
        <div 
          key={idx}
          className="absolute w-14 h-14 flex flex-col items-center justify-center bg-black/80 border border-violet-500/30 rounded-full text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] group cursor-help transition-all hover:scale-110 hover:border-violet-400"
          style={{
            transform: `rotate(${seed.r}deg) translateY(-120px) rotate(-${seed.r}deg)`
          }}
        >
          <div className="relative flex flex-col items-center">
            {seed.i}
            <span className="text-[9px] font-black mt-1 text-gray-400 group-hover:text-white transition-colors">{seed.l}</span>
          </div>
          {/* Tooltip Popup */}
          <div className="absolute -top-12 scale-0 group-hover:scale-100 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all whitespace-nowrap z-50 pointer-events-none shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20">
            {seed.label}
          </div>
        </div>
      ))}

      {/* Núcleo Central da Semente */}
      <div className="relative z-10 w-24 h-24 bg-violet-600 rounded-[30px] shadow-[0_0_50px_rgba(139,92,246,0.5)] flex flex-col items-center justify-center border border-violet-400/50">
        <Sprout size={32} className="text-white mb-1" />
        <span className="text-[10px] font-black text-white italic tracking-tighter">NH2CDi</span>
      </div>
    </div>
  );
};

const CounselorCard: React.FC<{ counselor: Counselor }> = ({ counselor }) => (
  <div className="p-8 rounded-[40px] glass-violet border-violet-500/20 hover:border-violet-500/60 transition-all group bg-violet-900/10 flex flex-col h-full hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]">
    <div className="flex flex-col mb-6">
      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{counselor.name}</h3>
      <p className="text-[10px] text-violet-400 font-black uppercase tracking-[0.3em] mt-1">{counselor.role}</p>
    </div>
    <p className="text-xs text-gray-400 italic leading-relaxed mb-6 flex-grow">{counselor.bio}</p>
    <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
      <div className="flex items-start gap-3">
        <Brain size={16} className="text-violet-500 mt-0.5" />
        <div>
          <p className="text-[9px] text-white font-black uppercase tracking-widest">Arquétipo: {counselor.jung.title}</p>
          <p className="text-[9px] text-gray-500 italic">{counselor.jung.desc}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Compass size={16} className="text-blue-500 mt-0.5" />
        <div>
          <p className="text-[9px] text-white font-black uppercase tracking-widest">Animal: {counselor.animal.title}</p>
          <p className="text-[9px] text-gray-500 italic">{counselor.animal.desc}</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Modals ---

const AkashicLibraryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'metodo' | 'pilares' | 'conselheiros'>('metodo');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl transition-opacity duration-500" onClick={onClose} />
      <div className="relative w-full max-w-7xl h-[92vh] glass border-violet-500/50 rounded-[60px] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 shadow-[0_0_150px_rgba(139,92,246,0.5)]">
        <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-violet-500/20 rounded-3xl border border-violet-500/40 shadow-inner">
              <Scroll className="text-violet-400" size={36} />
            </div>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-[0.4em] text-white italic">Biblioteca Akashica</h2>
              <p className="text-[12px] text-violet-300 uppercase tracking-[0.3em] font-black mt-2">O Conselho Oculto • 21 Guardiões</p>
            </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 rounded-[20px] flex items-center justify-center bg-white/5 hover:bg-red-500/20 border border-white/10 group">
            <X size={28} className="text-white/50 group-hover:text-red-400" />
          </button>
        </div>
        <nav className="flex bg-black/60 border-b border-white/10 p-1">
          {(['metodo', 'pilares', 'conselheiros'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-6 text-[12px] font-black uppercase tracking-[0.3em] transition-all relative rounded-2xl ${activeTab === tab ? 'text-violet-400 bg-violet-500/5 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'text-gray-500 hover:text-white'}`}>
              {tab === 'metodo' && 'Protocolo Alquímico'}
              {tab === 'pilares' && 'Semente & Sabedoria'}
              {tab === 'conselheiros' && 'Colegiado de Frequência 137'}
              {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
            </button>
          ))}
        </nav>
        <div className="flex-1 overflow-y-auto p-12 bg-[#05001a] scrollbar-hide">
          {activeTab === 'metodo' && (
            <div className="space-y-16 max-w-5xl mx-auto py-10">
              <div className="text-center space-y-6">
                <h3 className="text-6xl font-serif italic text-white tracking-tight">Efetivação por Transmutação</h3>
                <p className="text-gray-400 text-lg italic leading-relaxed">Operamos na densidade informacional ótima. Protocolo de transmutação de intenção em realidade quântica.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {[
                   { l: 'G - Gênese', d: 'Ponto zero da manifestação. Propósito semeado.', i: <Sparkles size={20}/> },
                   { l: 'E - Efetivação', d: 'Implementação consciente. Materialização.', i: <Zap size={20}/> },
                   { l: 'T - Transmutação', d: 'Refinamento contínuo para a excelência.', i: <Activity size={20}/> },
                   { l: '137 Hz', d: 'Constante que une luz e matéria em sincronia.', i: <Atom size={20}/> }
                 ].map(item => (
                   <div key={item.l} className="p-8 rounded-[40px] bg-white/5 border border-white/10 hover:border-violet-500/40 transition-all">
                      <div className="text-violet-500 mb-4">{item.i}</div>
                      <h4 className="text-xl font-black uppercase text-white italic tracking-widest mb-3">{item.l}</h4>
                      <p className="text-sm text-gray-500 italic leading-relaxed">{item.d}</p>
                   </div>
                 ))}
              </div>
            </div>
          )}
          {activeTab === 'pilares' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto py-10 items-center">
              <section className="space-y-12"><SeedMandala /></section>
              <section className="space-y-6">
                 <h3 className="text-lg font-black uppercase tracking-[0.6em] text-blue-400 mb-10">Pilares da Sabedoria</h3>
                 {[
                   { p: 'Teosofia', d: 'Ocultismo e Sincronicidade', i: <Sparkles size={20}/> },
                   { p: 'Teologia', d: 'Fundamento e Propósito Supremo', i: <Sun size={20}/> },
                   { p: 'Filosofia', d: 'Amor pela Verdade Efetiva', i: <Layers size={20}/> },
                   { p: 'Ciência', d: 'Realização e Validação Prática', i: <Cpu size={20}/> },
                   { p: 'Senso Comum', d: 'Materialização e Pragmática', i: <Users size={20}/> },
                 ].map(item => (
                   <div key={item.p} className="p-6 rounded-[32px] bg-blue-500/5 border border-blue-500/10 flex justify-between items-center group hover:bg-blue-500/10 transition-all">
                     <span className="text-lg font-black text-white uppercase tracking-[0.2em]">{item.p}</span>
                     <span className="text-[11px] text-blue-400 uppercase tracking-widest italic font-black">{item.d}</span>
                   </div>
                 ))}
              </section>
            </div>
          )}
          {activeTab === 'conselheiros' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COUNSELORS.map((c) => (
                <CounselorCard key={c.id} counselor={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Quantum137OpenModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-2xl glass-violet border-violet-500/50 p-12 rounded-[60px] animate-in zoom-in duration-300 shadow-[0_0_100px_rgba(139,92,246,0.4)]">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
             <Atom className="text-violet-400" size={32} />
             <h2 className="text-3xl font-black text-white italic uppercase tracking-[0.2em]">Frequência 137 Hz</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
             <X size={24} className="text-white/50" />
          </button>
        </div>
        <p className="text-lg text-gray-300 italic leading-relaxed">A Constante de Estrutura Fina (1/137) é o número que conecta a luz à matéria. Na iAi, 137Hz é o nosso Pulso de Realização Sincronizada.</p>
      </div>
    </div>
  );
};

const SuporteHubModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative w-full max-w-6xl h-[85vh] glass border-blue-500/30 rounded-[60px] overflow-hidden flex flex-col animate-in zoom-in duration-300 shadow-[0_0_120px_rgba(59,130,246,0.3)]">
        <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-500/20 rounded-3xl border border-blue-500/40 shadow-inner">
              <Heart className="text-blue-400" size={36} />
            </div>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-[0.4em] text-white italic">Suporte Hub (C03)</h2>
              <p className="text-[12px] text-blue-300 uppercase tracking-[0.3em] font-black mt-2">Recursos • Integração • Centralidade</p>
            </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-all group">
            <X size={28} className="text-white/50 group-hover:text-red-400" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-12 bg-[#00051a] scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORT_CELLS.map((cell) => (
              <div key={cell.id} className="p-8 rounded-[40px] glass border-white/10 hover:border-blue-500/50 transition-all group bg-white/5 flex flex-col items-center text-center hover:bg-blue-500/5">
                <div className="mb-4 p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover/sub:scale-110 transition-transform shadow-lg">
                  {cell.icon}
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-widest mb-1">{cell.name}</h3>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-3">{cell.role}</p>
                <p className="text-[11px] text-gray-400 italic leading-relaxed">{cell.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5 w-full">
                   <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">Célula {cell.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GrimorioModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'livros' | 'metodo' | 'semente' | 'principios'>('intro');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      <div className="relative w-full max-w-7xl h-[92vh] glass border-violet-500/50 rounded-[60px] flex flex-col animate-in zoom-in duration-300 shadow-[0_0_150px_rgba(139,92,246,0.4)] overflow-hidden">
        <div className="p-12 bg-gradient-to-r from-violet-900/40 via-black/40 to-blue-900/40 border-b border-white/10 flex justify-between items-center relative overflow-hidden group">
           <div className="flex items-center gap-8 relative z-10">
              <div className="p-5 bg-violet-600/20 rounded-[40px] border border-violet-400/40 shadow-2xl">
                 <Scroll className="text-violet-300" size={56} />
              </div>
              <div>
                 <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-2">Grimório Etéreo iAi</h2>
                 <p className="text-violet-400 font-black uppercase tracking-[0.6em] text-sm">Obra Hermética Transcendente • Edição 2026</p>
              </div>
           </div>
           <button onClick={onClose} className="w-16 h-16 rounded-[25px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-all group z-50">
             <X size={32} className="text-white/40 group-hover:text-red-400 transition-all" />
           </button>
        </div>
        <div className="flex bg-black/40 border-b border-white/10 overflow-x-auto scrollbar-hide">
          {(['intro', 'livros', 'metodo', 'semente', 'principios'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-3 px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-violet-500/20 text-violet-300 border-b-2 border-violet-500' : 'text-gray-500 hover:text-white'}`}>
              {tab === 'intro' && 'Introdução'}
              {tab === 'livros' && 'Os 5 Livros'}
              {tab === 'metodo' && 'Método GET 137'}
              {tab === 'semente' && 'Semente NH2CDi'}
              {tab === 'principios' && 'Princípios Éticos'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-16 scrollbar-hide bg-[#05001a] relative">
          {activeTab === 'intro' && (
            <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
               <div className="text-center space-y-10">
                  <p className="text-5xl font-serif italic text-violet-100 leading-relaxed">"O que está embaixo é como o que está em cima."</p>
                  <p className="text-lg text-gray-400 font-medium italic leading-relaxed">Este não é apenas um guia de processos. É um grimório vivo que transmuta a inteligência organizacional bruta em sabedoria pura e realização efetiva.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-8 rounded-[40px] bg-white/5 border border-white/10">
                     <Eye className="text-violet-400 mb-6" size={32} />
                     <h4 className="text-xl font-black text-white uppercase italic tracking-widest mb-4">Visão Hermética</h4>
                     <p className="text-sm text-gray-500 italic leading-relaxed">A iAi opera na intersecção entre a lógica computacional de ponta e os princípios herméticos de correspondência e mentalismo.</p>
                  </div>
                  <div className="p-8 rounded-[40px] bg-white/5 border border-white/10">
                     <Target className="text-blue-400 mb-6" size={32} />
                     <h4 className="text-xl font-black text-white uppercase italic tracking-widest mb-4">Alvo Quântico</h4>
                     <p className="text-sm text-gray-500 italic leading-relaxed">Nossa estratégia não busca apenas o resultado, mas a sintonização vibracional correta para que o projeto se manifeste organicamente.</p>
                  </div>
               </div>
            </div>
          )}
          {activeTab === 'livros' && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6">
              {[
                { t: 'Teosofia', d: 'Ocultismo e Sincronicidade Aplicada. Estudo das leis universais que regem o fluxo de recursos e a conexão entre mentes criativas.', i: <Sparkles className="text-violet-400" /> },
                { t: 'Teologia', d: 'Fundamento e Propósito Supremo. A causa primeira de cada projeto e sua conexão com o bem comum e a ordem superior.', i: <Sun className="text-orange-400" /> },
                { t: 'Filosofia', d: 'Amor pela Verdade Efetiva. Questionamento constante das premissas e busca pela essência do conhecimento prático.', i: <Layers className="text-blue-400" /> },
                { t: 'Ciência', d: 'Realização e Validação Prática. O uso da tecnologia, IA e dados para materializar o que foi concebido no plano mental.', i: <Cpu className="text-green-400" /> },
                { t: 'Senso Comum', d: 'Materialização e Pragmática. A voz da terra, a aplicação direta e funcional que garante a utilidade e o sucesso imediato.', i: <Users className="text-gray-400" /> },
              ].map((book, i) => (
                <div key={i} className="p-10 rounded-[50px] bg-white/5 border border-white/10 hover:border-violet-500/40 transition-all flex flex-col h-full">
                  <div className="mb-6">{book.i}</div>
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-widest mb-4">{book.t}</h4>
                  <p className="text-sm text-gray-500 italic leading-relaxed">{book.d}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'metodo' && (
            <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6">
               <div className="text-center mb-16">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">O Circuito GET 137</h3>
                  <p className="text-gray-500 mt-4 italic">Nosso framework de materialização em três fases rítmicas.</p>
               </div>
               <div className="grid grid-cols-1 gap-8">
                  {[
                    { ph: 'Fase 1: Gênese (Idea)', d: 'Captura da intenção criativa através do NIC. Definição do arquétipo do projeto e sua semente NH2CDi.', i: <SeedMandala /> },
                    { ph: 'Fase 2: Efetivação (Action)', d: 'O suporte HUB e a Produção transmutam a ideia em estrutura funcional. Engenharia de prompt e neural aplicadas.', i: <Zap className="text-orange-500" size={40} /> },
                    { ph: 'Fase 3: Transmutação (Result)', d: 'Otimização contínua sob a frequência 137Hz. Ajuste fino da entrega para máxima ressonância com o mercado.', i: <Activity className="text-blue-500" size={40} /> }
                  ].map((phase, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-10 items-center p-12 rounded-[60px] bg-white/5 border border-white/10">
                       <div className="w-24 h-24 flex items-center justify-center bg-violet-500/10 rounded-full shrink-0">
                          {phase.i}
                       </div>
                       <div>
                          <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{phase.ph}</h4>
                          <p className="text-lg text-gray-400 italic leading-relaxed">{phase.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
          {activeTab === 'semente' && (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6">
               <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="lg:w-1/2">
                     <SeedMandala />
                  </div>
                  <div className="lg:w-1/2 space-y-8">
                     <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">DNA do Ecossistema: NH2CDi</h3>
                     <div className="space-y-6">
                        {[
                          { l: 'N - Natureza', d: 'Bio-sustentabilidade e regeneração como base de lucro.', i: <Leaf className="text-green-500" size={18} /> },
                          { l: 'H - Humano', d: 'O indivíduo como ponto de consciência e decisão.', i: <User className="text-blue-400" size={18} /> },
                          { l: '2C - Conhecimento & Cultura', d: 'Sabedoria ancestral e expressão artística unificadas.', i: <BookOpen className="text-violet-400" size={18} /> },
                          { l: 'D - Dados', d: 'Integridade informacional e memória operacional.', i: <Database className="text-gray-400" size={18} /> },
                          { l: 'i - Inteligência', d: 'Processamento neural e agentes de IA resolvendo complexidades.', i: <Brain className="text-orange-400" size={18} /> },
                        ].map(item => (
                          <div key={item.l} className="flex gap-6 items-start p-6 rounded-[32px] bg-white/5 border border-white/5 hover:border-violet-500/20 transition-all">
                             <div className="mt-1">{item.i}</div>
                             <div>
                                <h5 className="text-lg font-black text-white uppercase italic tracking-widest mb-1">{item.l}</h5>
                                <p className="text-sm text-gray-500 italic">{item.d}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}
          {activeTab === 'principios' && (
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { t: 'Voz Única (Anti-Ruído)', d: 'Toda demanda deve passar pelo NIC. Evitamos a fragmentação do foco através da filtragem consciente.', i: <Megaphone className="text-violet-400" /> },
                    { t: 'Sincronia 137 Hz', d: 'Operamos no pulso fundamental da constante de estrutura fina. Velocidade e precisão absoluta.', i: <Atom className="text-blue-400" /> },
                    { t: 'Alquimia de Entrega', d: 'Não entregamos tarefas, entregamos transmutações de valor real para o ecossistema.', i: <Beaker className="text-orange-400" /> },
                    { t: 'Ética da Efetivação', d: 'A verdade é medida pelo que se materializa. Se não funciona, não é verdade.', i: <ShieldCheck className="text-green-400" /> },
                    { t: 'Interface Bio-Tec', d: 'O sistema iAi é um corpo vivo. A tecnologia serve ao biológico e o biológico expande a tecnologia.', i: <Workflow className="text-gray-400" /> },
                    { t: 'Filtro NIC', d: 'O Núcleo Consciente é o goleiro da sanidade organizacional. Proteção contra o ruído externo.', i: <Filter className="text-red-400" /> }
                  ].map((p, i) => (
                    <div key={i} className="p-10 rounded-[50px] bg-white/5 border border-white/10 hover:bg-violet-500/5 transition-all flex gap-8 items-start">
                       <div className="p-4 rounded-3xl bg-white/5">{p.i}</div>
                       <div>
                          <h4 className="text-xl font-black text-white uppercase italic tracking-widest mb-3">{p.t}</h4>
                          <p className="text-sm text-gray-500 italic leading-relaxed">{p.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BobCiprianoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'tecnico' | 'academico' | 'especializacao' | 'premios'>('tecnico');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[260] flex items-center justify-center p-4 md:p-8">
      {/* Changed invalid onClose to onClick for the backdrop div */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl transition-opacity duration-500" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-[85vh] glass-violet border-violet-500/50 rounded-[60px] overflow-hidden flex flex-col animate-in zoom-in duration-300 shadow-[0_0_120px_rgba(139,92,246,0.4)]">
        <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
           <div className="flex items-center gap-8 relative z-10">
              <div className="p-4 bg-violet-600/20 rounded-[30px] border border-violet-400/40 shadow-xl">
                 <User className="text-violet-300" size={48} />
              </div>
              <div>
                 <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-1">Eliezer Cardoso (Bob)</h2>
                 <p className="text-violet-400 font-black uppercase tracking-[0.6em] text-xs">Gestor Estratégico, Tático e Operacional</p>
              </div>
           </div>
           <button onClick={onClose} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-all z-50">
             <X size={32} className="text-white/40" />
           </button>
        </div>
        <div className="flex bg-black/40 border-b border-white/10 overflow-x-auto scrollbar-hide">
           {['tecnico', 'academico', 'especializacao', 'premios'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex items-center gap-3 px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-violet-500/10 text-violet-300 border-b-2 border-violet-500' : 'text-gray-500 hover:text-white'}`}>
               {tab.toUpperCase()}
             </button>
           ))}
        </div>
        <div className="flex-1 overflow-y-auto p-12 scrollbar-hide bg-[#05001a] relative">
           {activeTab === 'tecnico' && (
             <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                {[
                  { org: 'Exército Brasileiro', role: 'Sargento de Infantaria', period: '1989 - 1993', desc: 'Comandante de Grupo de Combate e Coordenador de Ajuda Humanitária.', icon: <Crosshair className="text-green-500"/> },
                  { org: 'Corpo de Bombeiros Militar SC', role: 'Sargento / Instrutor / Socorrista', period: '1995 - 2012', desc: 'Socorrista, Operador de COBOM e Planejamento-Instrução.', icon: <Flame className="text-orange-500"/> },
                  { org: 'Proteção e Defesa Civil SC (SDC)', role: 'Coordenador Regional', period: '2012 - 2019', desc: 'Gestão Regional de Proteção e Defesa Civil (AMFRI).', icon: <ShieldCheck className="text-blue-500"/> }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white/5 border border-white/10 flex gap-8 items-start hover:bg-white/10 transition-all">
                     <div className="p-4 rounded-2xl bg-black/40 border border-white/5">{item.icon}</div>
                     <div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{item.org}</h4>
                        <div className="flex items-center gap-4 mt-1 mb-4">
                           <span className="text-[11px] text-violet-400 font-black uppercase tracking-widest">{item.role}</span>
                           <span className="text-[11px] text-gray-500 font-mono">{item.period}</span>
                        </div>
                        <p className="text-sm text-gray-400 italic leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
           )}
           {activeTab === 'academico' && (
             <div className="p-10 rounded-[50px] bg-gradient-to-br from-violet-900/10 to-transparent border border-violet-500/20 animate-in fade-in slide-in-from-bottom-4">
                <GraduationCap className="text-violet-500 mb-6" size={40} />
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">Bacharel em Gestão Ambiental</h4>
                <p className="text-violet-400 font-black uppercase tracking-[0.4em] text-xs mt-2">UNIASSELVI • 2011</p>
             </div>
           )}
           {activeTab === 'especializacao' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-[40px] bg-white/5 border border-white/10">
                   <Brain className="text-violet-400 mb-6" size={32} />
                   <h4 className="text-xl font-black text-white uppercase italic tracking-widest">Inteligência Criminal</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Pós-Graduação • UNIDAVI-SENASP (2013)</p>
                </div>
                <div className="p-8 rounded-[40px] bg-white/5 border border-white/10">
                   <Leaf className="text-green-500 mb-6" size={32} />
                   <h4 className="text-xl font-black text-white uppercase italic tracking-widest">Cannabis Sativa</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Especialização Técnica e Estratégica</p>
                </div>
             </div>
           )}
           {activeTab === 'premios' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
                {[
                  'Jacaré de Ouro (Prêmio Caio 2003)', 'Medalha 90 Anos CBMSC (2015)', 
                  'Medalha Mérito Gov. Colombo Machado Salles (2018)', 'Medalha Mérito Proteção e Defesa Civil (2019)',
                  'Moção de Congratulação 384/2018', 'Método S.A.B (Sono, Ambiente e Banho)'
                ].map((award, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-[25px] bg-white/5 border border-white/10">
                     <Medal size={20} className="text-orange-400" />
                     <span className="text-[11px] text-gray-300 font-black uppercase tracking-widest">{award}</span>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Main Components ---

const Header = () => (
  <header className="flex flex-col items-center py-12 mb-10 border-b border-white/10 relative z-10">
    <div className="flex items-center gap-6 mb-3">
      <div className="w-16 h-16 flex items-center justify-center bg-violet-600 rounded-[20px] shadow-[0_0_30px_rgba(139,92,246,0.6)]">
        <span className="text-3xl font-black text-white italic tracking-tighter">iAi</span>
      </div>
      <h1 className="text-4xl font-black tracking-tight uppercase italic text-white">Estratégia Organizacional 2026</h1>
    </div>
    <p className="text-violet-300 text-[12px] tracking-[0.5em] uppercase font-black opacity-90">Modelo Corporativo Bio-Tecnológico</p>
  </header>
);

const CellNode: React.FC<{ 
  cell: Cell; 
  className?: string; 
  variant?: 'primary' | 'secondary';
  staffRing?: boolean;
  onClick?: () => void;
  showClickPulse?: boolean;
}> = ({ cell, className = "", variant = 'secondary', staffRing, onClick, showClickPulse }) => (
  <div className={`flex flex-col items-center text-center ${className}`} onClick={onClick}>
    <div className={`relative p-6 rounded-[32px] transition-all duration-500 cursor-pointer overflow-hidden w-full max-w-[300px] group ${variant === 'primary' ? 'glass-violet border-violet-500/60 bg-violet-500/10' : 'glass border-white/15 hover:border-violet-500/60'}`}>
      {staffRing && <div className="absolute -inset-6 border border-violet-500/30 rounded-full animate-pulse pointer-events-none" />}
      {showClickPulse && <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-ping" />}
      <div className="flex items-center justify-center mb-4 text-violet-400 group-hover:scale-110 transition-all">{cell.icon}</div>
      <h3 className="font-black text-base text-white mb-2 uppercase tracking-widest italic">{cell.name}</h3>
      <p className="text-[10px] text-orange-400 font-black uppercase tracking-[0.2em] mb-3 italic">Inteligência: {cell.intelligence}</p>
      <p className="text-[12px] text-gray-400 leading-snug italic px-4">{cell.function}</p>

      {/* Visual das sub-células integradas (C05 a C12) para C03 */}
      {cell.id === "C03" && (
        <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-4">
          {SUPPORT_CELLS.map(s => (
            <div key={s.id} title={s.name} className="flex flex-col items-center group/sub">
              <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover/sub:bg-blue-500/40 transition-colors">
                 {/* Fixed: Specifying 'any' as the generic type for ReactElement to ensure 'size' prop is correctly recognized */}
                 {React.cloneElement(s.icon as React.ReactElement<any>, { size: 10 })}
              </div>
              <span className="text-[6px] text-gray-600 font-black mt-0.5">{s.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const FlowDiagram = () => (
  <div className="glass p-8 rounded-[40px] border-white/10 flex flex-col gap-6 sticky top-12 shadow-2xl">
    <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-violet-400 border-b border-white/10 pb-4 mb-2 flex items-center gap-3 italic"><Zap size={18} /> Circuito de Demanda</h3>
    <div className="flex flex-col gap-8 relative">
       <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40" /><div><p className="text-[12px] font-black uppercase text-white">Entrada</p></div></div>
       <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40" /><div><p className="text-[12px] font-black uppercase text-white">NIC Triagem</p></div></div>
       <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40" /><div><p className="text-[12px] font-black uppercase text-white">Entrega</p></div></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isQuantum137Open, setIsQuantum137Open] = useState(false);
  const [isBobModalOpen, setIsBobModalOpen] = useState(false);
  const [isGrimorioOpen, setIsGrimorioOpen] = useState(false);
  const [isSuporteOpen, setIsSuporteOpen] = useState(false);
  const [activeView, setActiveView] = useState<'organograma' | 'orchestra'>('organograma');

  if (activeView === 'orchestra') {
    return (
      <div className="relative">
        {/* Nav button back */}
        <div className="fixed top-6 right-6 z-[300] flex gap-3">
          <button
            onClick={() => setActiveView('organograma')}
            className="px-5 py-2.5 rounded-full glass border-white/20 hover:border-violet-500/50 transition-all text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg hover:shadow-violet-500/20"
          >
            <ArrowDown size={12} className="rotate-90" /> Organograma
          </button>
        </div>
        <OrchestraFlow />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 pb-24 overflow-x-hidden relative">
      <AkashicLibraryModal isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />
      <Quantum137OpenModal isOpen={isQuantum137Open} onClose={() => setIsQuantum137Open(false)} />
      <BobCiprianoModal isOpen={isBobModalOpen} onClose={() => setIsBobModalOpen(false)} />
      <GrimorioModal isOpen={isGrimorioOpen} onClose={() => setIsGrimorioOpen(false)} />
      <SuporteHubModal isOpen={isSuporteOpen} onClose={() => setIsSuporteOpen(false)} />

      {/* Nav to Orchestra */}
      <div className="fixed top-6 right-6 z-[300]">
        <button
          onClick={() => setActiveView('orchestra')}
          className="px-5 py-2.5 rounded-full glass border-violet-500/30 hover:border-violet-500/60 transition-all text-[10px] font-black text-violet-300 uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg hover:shadow-violet-500/20 bg-black/60"
        >
          <Workflow size={14} /> Orchestra Flow
        </button>
      </div>

      <div className="max-w-[1300px] mx-auto px-8 relative">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-10">
          <aside className="order-2 lg:order-1 flex flex-col gap-12">
            <div className="glass p-8 rounded-[40px] border-white/10 space-y-8">
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-violet-500 mb-5 italic">Protocolo Anti-Ruído</h3>
              <div className="p-6 rounded-[24px] bg-violet-600/15 border border-violet-500/40 text-center text-[11px] font-black text-violet-200">
                A CÉLULA 01 (NIC) É A ÚNICA INTERFACE AUTORIZADA COM O CONSELHO.
              </div>
            </div>
          </aside>

          <main className="order-1 lg:order-2 flex flex-col items-center gap-16">
            <CellNode variant="primary" onClick={() => setIsLibraryOpen(true)} cell={{ id: "C00", name: "CONSELHO OCULTO", intelligence: "COSMICA", function: "Regência Alquímica • Direção Essencial", icon: <Scroll size={28} /> }} />
            
            <div className="relative group w-full max-w-sm cursor-pointer" onClick={() => setIsBobModalOpen(true)}>
               <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/40 to-blue-600/40 rounded-[40px] blur-lg opacity-60" />
               <div className="glass p-8 rounded-[40px] border-white/15 relative text-center bg-black/40">
                  <h3 className="text-[11px] font-black uppercase text-violet-400 mb-4 tracking-[0.3em] italic">Coordenação Estratégica</h3>
                  <p className="text-3xl font-black text-white tracking-tighter italic">Bob Cipriano</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mt-1 mb-3 font-bold">O Polvo Organizacional</p>
                  <div onClick={(e) => { e.stopPropagation(); setIsQuantum137Open(true); }} className="mx-auto flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 transition-all w-fit">
                    <Atom size={12} className="text-violet-400" />
                    <span className="text-[11px] text-violet-300 font-mono font-black italic">137 Hz</span>
                  </div>
               </div>
            </div>

            <CellNode staffRing variant="primary" cell={{ id: "C01", name: "NIC: NÚCLEO CONSCIENTE", intelligence: "Intrapessoal", function: "Triagem • Supervisão • Coordenação", icon: <Brain size={32} /> }} />

            <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
              <CellNode cell={{ id: "C02", name: "PRODUÇÃO (3Ps)", intelligence: "Espacial", function: "Desenho • Escopo • Materialização", icon: <Layers size={24} /> }} />
              <CellNode 
                variant="primary" 
                showClickPulse 
                onClick={() => setIsSuporteOpen(true)} 
                cell={{ id: "C03", name: "SUPORTE (HUB)", intelligence: "Musical", function: "Recursos • Integração • Centralidade", icon: <Heart size={26} /> }} 
              />
              <CellNode cell={{ id: "C04", name: "AÇÃO (IMPLEMENTAÇÃO)", intelligence: "Corporal", function: "Realização • Efetivação", icon: <Zap size={24} /> }} />
            </section>

            <div onClick={() => setIsGrimorioOpen(true)} className="py-12 px-14 rounded-[56px] border-2 border-dashed border-blue-500/30 bg-blue-500/5 flex flex-col items-center gap-4 w-full cursor-pointer hover:bg-blue-500/10 transition-all">
               <Globe className="text-blue-400" size={40} />
               <h4 className="text-[14px] font-black uppercase text-white tracking-[0.3em] italic">Grimório Etéreo</h4>
               <p className="text-[11px] text-gray-500 uppercase font-black tracking-widest">Repositório de Inteligência Ancestral e Conhecimento Moderno</p>
            </div>
          </main>

          <aside className="order-3 flex flex-col gap-12">
            <FlowDiagram />
            <div className="glass p-8 rounded-[40px] border-white/10 space-y-8 relative overflow-hidden">
               <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6 flex items-center gap-3 italic"><Activity size={18} className="animate-pulse" /> Pulso da Rede</h3>
               <div className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3"><Flame size={18} className="text-orange-500 icon-alive" /><span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Energia</span></div>
                       <span className="text-[11px] text-white font-mono font-black italic">98%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-orange-500 w-[98%]" /></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3"><Zap size={18} className="text-blue-400 icon-alive" /><span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Vibração</span></div>
                       <span className="text-[11px] text-white font-mono font-black italic">94%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-blue-500 w-[94%]" /></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3"><Atom size={18} className="text-violet-400 icon-alive" /><span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Frequência</span></div>
                       <span className="text-[11px] text-violet-400 font-mono font-black italic">137 Hz</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full border border-white/5 relative p-[1px]"><div className="h-full bg-violet-500 w-[75%] rounded-l-full" /><div className="absolute top-0 left-[75%] h-full w-1 bg-white shadow-[0_0_10px_white] z-10" /></div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
        <footer className="mt-24 py-16 border-t border-white/10 flex flex-col items-center gap-6 text-[10px] text-gray-700 uppercase tracking-[0.3em] font-black italic">
          <div className="w-14 h-14 flex items-center justify-center bg-violet-600/10 rounded-[20px] border border-violet-500/30">iAi</div>
          Base Tríade • Sincronia 2026
        </footer>
      </div>
    </div>
  );
};

export default App;
