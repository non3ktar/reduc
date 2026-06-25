import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Volume2, VolumeX, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// STORY DATA - Revolta dos Malês (1835)
const STORY = {
  "start": {
    background: "/images/males_rua_noite.png",
    character: "Narrador",
    text: "Salvador, Bahia. Noite de 24 de Janeiro de 1835. O mês sagrado do Ramadã está chegando ao fim.",
    choices: [
      { text: "Continuar caminhando...", next: "scene_1" }
    ]
  },
  "scene_1": {
    background: "/images/males_rua_noite.png",
    character: "Pensamento",
    text: "As ruas da Cidade Baixa estão abafadas. Sou apenas um jovem escravizado de ganho aos olhos deles, mas secretamente sei ler e escrever em árabe. No meu bolso, levo um bilhete vital para amanhã...",
    choices: [
      { text: "Ler o bilhete de novo", next: "read_note" },
      { text: "Apressar o passo", next: "guards_appear" }
    ]
  },
  "read_note": {
    background: "/images/males_rua_noite.png",
    character: "Bilhete (em árabe)",
    text: "\"Amanhã, nas primeiras horas da manhã, nos levantaremos por nossa liberdade. Juntem-se a nós em nome de Alá.\" ...A revolta vai libertar Pacífico Licutan, que está preso no subsolo da Câmara Municipal.",
    choices: [
      { text: "Guardar o bilhete e seguir", next: "guards_appear" }
    ]
  },
  "guards_appear": {
    background: "/images/males_guarda.png",
    character: "Guarda Imperial",
    text: "Ei, você aí! Pare! Aonde pensa que vai a essa hora da noite? O que está escondendo nas mãos?",
    choices: [
      { text: "Tentar subornar o guarda", next: "bribe_guard" },
      { text: "Engolir o bilhete rapidamente", next: "swallow_note" },
      { text: "Correr para a viela escura", next: "run_away" }
    ]
  },
  "bribe_guard": {
    background: "/images/males_guarda.png",
    character: "Guarda Imperial",
    text: "(Ele pega as moedas do seu ganho de hoje, olha para os lados e guarda no bolso). \"Suma daqui antes que eu mude de ideia. E não quero ver sua cara nas ruas hoje!\"",
    choices: [
      { text: "Fugir para o esconderijo", next: "basement_meeting" }
    ]
  },
  "swallow_note": {
    background: "/images/males_guarda.png",
    character: "Guarda Imperial",
    text: "Você tosse e se engasga engolindo o papel. O guarda te revista de forma bruta, mas não encontra provas. Ele te dá um empurrão: \"Volte para a senzala do seu senhor, agora!\"",
    choices: [
      { text: "Voltar sem entregar a mensagem (Fim)", next: "end_bad" }
    ]
  },
  "run_away": {
    background: "/images/males_rua_noite.png",
    character: "Narrador",
    text: "Você vira as costas e corre com os pés descalços batendo nas pedras. O guarda grita, mas logo desiste de entrar nos becos escuros do Pelourinho. Você está a salvo... por enquanto.",
    choices: [
      { text: "Ir para a reunião secreta", next: "basement_meeting" }
    ]
  },
  "basement_meeting": {
    background: "/images/males_porao_reuniao.png",
    character: "Ahuna",
    text: "Você chegou! Tivemos medo de que tivesse sido capturado. A cidade tem mais de 65 mil habitantes, mas os soldados imperiais parecem estar em todo lugar hoje.",
    choices: [
      { text: "Entregar a mensagem sobre o ataque à Câmara", next: "plan_attack" }
    ]
  },
  "plan_attack": {
    background: "/images/males_porao_reuniao.png",
    character: "Líder Malê",
    text: "Vamos resgatar o idoso Pacífico Licutan (Bilal), um dos nossos líderes mais estimados. Ele não foi preso por rebeldia, mas por dívidas do seu senhor. Libertá-lo será nosso primeiro grande ato!",
    choices: [
      { text: "Vestir o abadá branco e preparar-se", next: "end_good" }
    ]
  },
  "end_bad": {
    background: "/images/males_rua_noite.png",
    character: "Fim da Linha",
    text: "Você sobreviveu à noite, mas a revolta perdeu comunicação vital. A História Esquecida lembra daqueles que lutaram, mesmo quando as circunstâncias foram impossíveis.",
    isEnd: true,
    success: false
  },
  "end_good": {
    background: "/images/males_porao_reuniao.png",
    character: "O Início da Revolta",
    text: "Você veste o abadá branco e recebe um amuleto protetor. A Revolta dos Malês, um dos maiores levantes urbanos pela liberdade no Brasil, está prestes a começar.",
    isEnd: true,
    success: true
  }
};

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(intervalId);
    }, 30);
    return () => clearInterval(intervalId);
  }, [text]);

  return <p className="text-lg md:text-xl text-slate-100 font-medium leading-relaxed">{displayText}</p>;
};

export default function VisualNovelMales() {
  const navigate = useNavigate();
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [history, setHistory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const currentNode = STORY[currentNodeId];

  const handleChoice = (nextNodeId) => {
    setHistory([...history, currentNodeId]);
    setCurrentNodeId(nextNodeId);
  };

  const restartGame = () => {
    setCurrentNodeId('start');
    setHistory([]);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col overflow-hidden select-none">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.background}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentNode.background})` }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
        </motion.div>
      </AnimatePresence>

      {/* Top Navbar */}
      <nav className="absolute top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <ArrowLeft size={24} className="text-orange-500" />
            <span className="font-bold hidden sm:inline text-sm uppercase tracking-wider">Sair do Jogo</span>
          </button>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            <h1 className="text-base sm:text-lg font-bold text-slate-100 uppercase tracking-widest drop-shadow-lg">Malês: A História Esquecida</h1>
          </div>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-slate-300 hover:text-white transition">
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Game Interface */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-8 px-4 sm:px-8 max-w-5xl mx-auto w-full">
        
        {/* Dialogue Box */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentNodeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full glass-card border border-slate-600/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-black/60 shadow-2xl mb-6 relative"
          >
            {/* Character Name Badge */}
            <div className="absolute -top-5 left-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold px-6 py-2 rounded-full text-sm sm:text-base shadow-lg shadow-orange-500/20 border border-orange-400/50 uppercase tracking-wider">
              {currentNode.character}
            </div>

            <div className="min-h-[100px] mt-4">
              {currentNode.isEnd ? (
                <p className="text-lg md:text-xl text-slate-100 font-medium leading-relaxed">{currentNode.text}</p>
              ) : (
                <TypewriterText text={currentNode.text} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Choices / Actions */}
        <div className="w-full flex flex-col gap-3">
          {currentNode.isEnd ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={restartGame}
              className={`flex items-center justify-center gap-2 w-full sm:w-auto self-center px-8 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 shadow-xl border ${currentNode.success ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 shadow-emerald-500/30' : 'bg-red-600 hover:bg-red-500 border-red-400 shadow-red-500/30'}`}
            >
              {currentNode.success ? <CheckCircle2 size={24} /> : <ShieldAlert size={24} />}
              Jogar Novamente
            </motion.button>
          ) : (
            <AnimatePresence>
              {currentNode.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  onClick={() => handleChoice(choice.next)}
                  className="w-full text-left bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-orange-500 text-slate-200 hover:text-orange-400 px-6 py-4 rounded-xl transition-all duration-300 font-medium text-lg hover:pl-8 group shadow-lg flex items-center justify-between"
                >
                  <span>{choice.text}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
