import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Sparkles,
    ArrowRight,
    ArrowLeft,
    MessageSquare,
    CheckCircle2,
    Info,
    Send,
    Wrench,
    AlertCircle
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import zelligePattern from '@/assets/zellige-pattern.jpg';

type FlowStep = 'input' | 'crossroads' | 'chat';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
    timestamp: Date;
}

const SmartDemandFlow = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<FlowStep>('input');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Crossroads state
    const [isRefined, setIsRefined] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 300, max: 500 });
    const [precisePrice, setPrecisePrice] = useState<number | null>(null);

    // Chat state
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (currentStep === 'chat') {
            scrollToBottom();
        }
    }, [messages, currentStep]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        // Simulate initial AI analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setCurrentStep('crossroads');
        }, 2000);
    };

    const startAiChat = () => {
        setCurrentStep('chat');
        setIsTyping(true);
        // AI Greeting
        setTimeout(() => {
            setMessages([
                {
                    id: '1',
                    text: "Bonjour ! Je suis l'IA L'M3alem. J'analyse votre photo... Le problème semble être au niveau de la tuyauterie. Est-ce que l'eau coule encore ou est-ce seulement un suintement ?",
                    sender: 'ai',
                    timestamp: new Date()
                }
            ]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Entendu. Cela demande une intervention standard. J'ai affiné votre devis. Souhaitez-vous terminer le diagnostic ?",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const finishDiagnostic = () => {
        setIsRefined(true);
        setPrecisePrice(450); // Refined price
        setCurrentStep('crossroads');
        toast.success('Devis affiné avec succès !');
    };

    const handleFinalSubmit = () => {
        toast.success('Demande envoyée ! Nous recherchons votre artisan.');
        navigate('/client/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-jakarta">
            <Navbar />

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
                <AnimatePresence mode="wait">

                    {/* STEP 1: INPUT */}
                    {currentStep === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-black text-[#2B2D42] mb-4">
                                    Nouvelle Demande <span className="text-[#B22222]">Intelligente</span>
                                </h1>
                                <p className="text-[#2B2D42]/60 max-w-lg mx-auto">
                                    Prenez une photo, décrivez le problème, et laissez notre IA s'occuper du reste.
                                </p>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5 border border-black/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                                    <img src={zelligePattern} alt="" className="object-cover w-full h-full rotate-45" />
                                </div>

                                <div className="grid grid-cols-1 gap-8 relative z-10">
                                    {/* Photo Upload Area */}
                                    <label className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#B22222]/20 rounded-[2rem] bg-[#FDFBF7] hover:bg-[#B22222]/5 transition-all cursor-pointer overflow-hidden">
                                        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />

                                        {selectedFile ? (
                                            <div className="absolute inset-0 p-4">
                                                <div className="w-full h-full rounded-2xl bg-[#B22222]/10 flex flex-col items-center justify-center text-[#B22222]">
                                                    <CheckCircle2 className="h-12 w-12 mb-2" />
                                                    <p className="font-bold">{selectedFile.name}</p>
                                                    <p className="text-sm opacity-60">Prêt pour l'analyse</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-4 rounded-2xl bg-white shadow-lg mb-4 text-[#B22222] group-hover:scale-110 transition-transform">
                                                    <Upload className="h-8 w-8" />
                                                </div>
                                                <p className="text-[#2B2D42] font-black text-xl mb-2">Choisir une photo</p>
                                                <p className="text-[#2B2D42]/50 text-sm">Glissez-déposez ou cliquez ici</p>
                                            </>
                                        )}
                                    </label>

                                    {/* Description area */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-[#2B2D42]/60 uppercase tracking-widest pl-2">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Décrivez brièvement le problème..."
                                            className="w-full bg-[#FDFBF7] border-2 border-black/5 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-[#B22222]/30 transition-all font-medium"
                                        />
                                    </div>

                                    <button
                                        onClick={startAnalysis}
                                        disabled={!selectedFile || isAnalyzing}
                                        className="w-full h-16 bg-[#B22222] text-white rounded-2xl font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#B22222]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        {isAnalyzing ? (
                                            <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                ANALYSER MON PROBLÈME
                                                <ArrowRight className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: CROSSROADS */}
                    {currentStep === 'crossroads' && (
                        <motion.div
                            key="crossroads"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <button
                                onClick={() => setCurrentStep('input')}
                                className="flex items-center gap-2 text-[#2B2D42]/50 hover:text-[#B22222] transition-colors font-bold mb-4"
                            >
                                <ArrowLeft className="h-4 w-4" /> Retour
                            </button>

                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5 border border-black/5 relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-[#2A9D8F]/10 text-[#2A9D8F]">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-[#2B2D42]">Estimation Préliminaire</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div className="bg-[#FDFBF7] p-6 rounded-[2rem] border border-black/5">
                                        <p className="text-xs font-black text-[#2B2D42]/40 uppercase tracking-widest mb-4">Catégorie Détectée</p>
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-2xl bg-white shadow-sm text-[#2B2D42]">
                                                <Wrench className="h-6 w-6" />
                                            </div>
                                            <p className="text-xl font-black text-[#2B2D42]">Plomberie</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#2A9D8F]/5 p-6 rounded-[2rem] border border-[#2A9D8F]/10">
                                        <p className="text-xs font-black text-[#2A9D8F] uppercase tracking-widest mb-4">Prix Estimé</p>
                                        {isRefined ? (
                                            <p className="text-4xl font-black text-[#2A9D8F]">{precisePrice} <span className="text-lg">MAD</span></p>
                                        ) : (
                                            <p className="text-4xl font-black text-[#2B2D42]">{priceRange.min}-{priceRange.max} <span className="text-lg">MAD</span></p>
                                        )}
                                    </div>
                                </div>

                                {/* Crossroads selection */}
                                <div className="space-y-4">
                                    <button
                                        onClick={handleFinalSubmit}
                                        className="w-full h-16 bg-[#2A9D8F] text-white rounded-2xl font-black tracking-widest hover:scale-[1.01] transition-all shadow-xl shadow-[#2A9D8F]/20 flex items-center justify-center gap-3 animate-pulse-subtle"
                                    >
                                        CONFIRMER ET TROUVER UN ARTISAN
                                    </button>

                                    {!isRefined && (
                                        <button
                                            onClick={startAiChat}
                                            className="w-full h-16 bg-white text-[#2B2D42] border-2 border-black/5 rounded-2xl font-black tracking-widest hover:bg-black/5 transition-all flex items-center justify-center gap-3"
                                        >
                                            <MessageSquare className="h-5 w-5" />
                                            AFFINER LE DEVIS AVEC NOTRE IA
                                        </button>
                                    )}
                                </div>

                                {isRefined && (
                                    <div className="mt-6 p-4 rounded-xl bg-[#2A9D8F]/10 flex items-center gap-3 text-[#2A9D8F] text-sm font-bold">
                                        <CheckCircle2 className="h-5 w-5" />
                                        Votre devis a été optimisé par notre conseiller IA
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: AI CHAT */}
                    {currentStep === 'chat' && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="h-[600px] flex flex-col space-y-4"
                        >
                            <div className="flex justify-between items-center mb-2 px-2">
                                <button
                                    onClick={() => setCurrentStep('crossroads')}
                                    className="flex items-center gap-2 text-[#2B2D42]/50 hover:text-[#B22222] transition-colors font-bold"
                                >
                                    <ArrowLeft className="h-4 w-4" /> Quitter l'IA
                                </button>
                                <button
                                    onClick={finishDiagnostic}
                                    className="bg-[#2B2D42] text-white px-4 py-2 rounded-xl text-xs font-black tracking-widest hover:scale-105 transition-all"
                                >
                                    TERMINER LE DIAGNOSTIC
                                </button>
                            </div>

                            <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl border border-black/5 overflow-hidden flex flex-col">
                                {/* Chat Header */}
                                <div className="p-6 border-b border-black/5 bg-[#FDFBF7] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-[#B22222] flex items-center justify-center text-white shadow-lg">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-[#2B2D42]">Expert IA L'M3alem</p>
                                            <p className="text-[10px] text-[#2A9D8F] font-black uppercase tracking-widest">En ligne</p>
                                        </div>
                                    </div>
                                    <AlertCircle className="h-5 w-5 text-[#2B2D42]/20" />
                                </div>

                                {/* Messages scroll area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((m) => (
                                        <motion.div
                                            key={m.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${m.sender === 'user'
                                                    ? 'bg-[#B22222] text-white rounded-tr-none'
                                                    : 'bg-[#FDFBF7] text-[#2B2D42] border border-black/5 rounded-tl-none'
                                                }`}>
                                                {m.text}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-[#FDFBF7] border border-black/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                                <span className="h-1.5 w-1.5 bg-[#B22222]/40 rounded-full animate-bounce" />
                                                <span className="h-1.5 w-1.5 bg-[#B22222]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <span className="h-1.5 w-1.5 bg-[#B22222]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Chat Input */}
                                <div className="p-6 bg-[#FDFBF7] border-t border-black/5">
                                    <div className="relative flex items-center">
                                        <input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Tapez votre réponse..."
                                            className="w-full bg-white border-2 border-black/5 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-[#B22222]/30 transition-all font-medium text-sm"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="absolute right-2 p-3 bg-[#B22222] text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-center text-[10px] text-[#2B2D42]/30 mt-4 font-bold uppercase tracking-widest">
                                        Propulsé par L'M3alem Vision AI
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default SmartDemandFlow;
