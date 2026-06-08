"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, User, RefreshCw, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: string;
    timestamp: Date;
    followUpIds?: string[];
    status?: 'success' | 'error';
}

type ConversationFlow = null | 'awaiting_name' | 'awaiting_phone' | 'submitting';

const SAMPLE_FAQ = [
    {
        id: 'about',
        label: 'About Emote Tech',
        question: 'What does Emote Technology do? 🚀',
        reply: 'We build the conversation layer of your business! Our team specializes in creating custom websites, setting up local SEO, developing WhatsApp chatbots, and creating AI voice agents.',
        followUpIds: ['services', 'process', 'contact']
    },
    {
        id: 'services',
        label: 'Services Offered',
        question: 'What services do you offer? 🛠️',
        reply: 'We offer a complete suite of digital services:\n\n• Web Development (UI/UX optimized)\n• Google Business Profile Setup\n• SEO Setup & Optimization\n• Google & Meta Ads\n• WhatsApp Campaigns & Chatbots',
        followUpIds: ['about', 'pricing', 'contact']
    },
    {
        id: 'process',
        label: 'Our Process',
        question: 'What is your process? ⏱️',
        reply: 'We go from kickoff to live in 4 weeks!\n\n1. Discovery call to align on goals\n2. Sketch & Spec for UX/UI\n3. Build & Integrate\n4. Launch & Iterate\n\nOur focus is on shipping quality products every week.',
        followUpIds: ['services', 'pricing', 'contact']
    },
    {
        id: 'pricing',
        label: 'Pricing & Quotes',
        question: 'How much does it cost? 💰',
        reply: 'Our pricing varies depending on the specific services and scope of your project. We offer competitive rates for custom solutions.\n\nWould you like to book a 20-minute call to get a quick idea and some options with zero pitch decks?',
        followUpIds: ['contact', 'services']
    },
    {
        id: 'contact',
        label: 'Talk to our Team',
        question: 'I want to talk to your team 📞',
        reply: null,
        followUpIds: []
    }
];

const getFAQById = (id: string) => SAMPLE_FAQ.find(f => f.id === id);

const matchKeywords = (text: string): string => {
    const t = text.toLowerCase();
    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'howdy'];
    if (greetings.some(g => t.includes(g))) return 'greeting';
    if (t.includes('service') || t.includes('web') || t.includes('seo') || t.includes('whatsapp') || t.includes('ads') || t.includes('development') || t.includes('offer')) return 'services';
    if (t.includes('process') || t.includes('timeline') || t.includes('how long') || t.includes('duration') || t.includes('steps') || t.includes('week')) return 'process';
    if (t.includes('price') || t.includes('cost') || t.includes('fee') || t.includes('charge') || t.includes('quote') || t.includes('budget')) return 'pricing';
    if (t.includes('emote') || t.includes('who are you') || t.includes('about') || t.includes('company')) return 'about';
    if (t.includes('contact') || t.includes('call') || t.includes('email') || t.includes('talk') || t.includes('human') || t.includes('support') || t.includes('reach') || t.includes('speak') || t.includes('team')) return 'contact';
    return 'fallback';
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: 'Greetings! Welcome to Emote Technology. 🚀\n\nI am your Emote Support Assistant. How can I help you today? Select a topic below or type your question.',
            timestamp: new Date(),
            followUpIds: ['about', 'services', 'process', 'pricing', 'contact']
        }
    ]);
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [flow, setFlow] = useState<ConversationFlow>(null);
    const [contactForm, setContactForm] = useState({ name: '', phone: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const event = new CustomEvent('modal-state-change', { detail: { isOpen } });
        window.dispatchEvent(event);
    }, [isOpen]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const pushBotMessage = (text: string, followUpIds?: string[], status?: 'success' | 'error') => {
        setMessages((prev) => [
            ...prev,
            { id: `bot-${Date.now()}`, sender: 'bot', text, timestamp: new Date(), followUpIds, status }
        ]);
        setIsTyping(false);
    };

    const pushUserMessage = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: `usr-${Date.now()}`, sender: 'user', text, timestamp: new Date() }
        ]);
    };

    const startContactFlow = () => {
        pushUserMessage('How do I contact an advisor? 📞');
        setIsTyping(true);
        setTimeout(() => {
            pushBotMessage("Sure! I'll connect you with an advisor. 😊\n\nFirst, what is your full name?");
            setFlow('awaiting_name');
        }, 600);
    };

    const submitToCallyzer = async (name: string, phone: string) => {
        setFlow('submitting');
        setIsTyping(true);
        try {
            const res = await fetch(`${API_BASE}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: name,
                    phone,
                    source: 'Chatbot',
                    lead_tags: ['Emote Tech', 'Chatbot']
                })
            });

            if (!res.ok) throw new Error('Request failed');

            pushBotMessage(
                `Thank you, ${name}! ✅\n\nOur team will call you at ${phone} shortly. Is there anything else I can help you with?`,
                ['about', 'services', 'process', 'pricing'],
                'success'
            );
        } catch {
            pushBotMessage(
                "Sorry, something went wrong while sending your details. 😔\n\nPlease email us directly at info@emotetechnology.in.",
                ['contact'],
                'error'
            );
        } finally {
            setFlow(null);
            setContactForm({ name: '', phone: '' });
        }
    };

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;
        setInputVal('');

        // --- Guided contact flow ---
        if (flow === 'awaiting_name') {
            const name = text.trim();
            pushUserMessage(name);
            setContactForm((prev) => ({ ...prev, name }));
            setIsTyping(true);
            setTimeout(() => {
                pushBotMessage(`Nice to meet you, ${name}! 📱\n\nWhat is your phone number? (include country code if outside India)`);
                setFlow('awaiting_phone');
            }, 600);
            return;
        }

        if (flow === 'awaiting_phone') {
            const phone = text.trim();
            const digits = phone.replace(/\D/g, '');
            if (digits.length < 10) {
                pushUserMessage(phone);
                setIsTyping(true);
                setTimeout(() => {
                    pushBotMessage("That doesn't look like a valid phone number. Please enter at least 10 digits (e.g. 9876543210 or +919876543210).");
                }, 500);
                return;
            }
            pushUserMessage(phone);
            submitToCallyzer(contactForm.name, phone);
            return;
        }

        // --- Normal keyword flow ---
        pushUserMessage(text);
        setIsTyping(true);

        setTimeout(() => {
            const match = matchKeywords(text);
            if (match === 'contact') {
                startContactFlow();
                return;
            }
            if (match === 'greeting') {
                pushBotMessage(
                    "Hello! Great to have you here. 😊 I can help you with our services, process, pricing, or connecting with our team. What would you like to know?",
                    ['about', 'services', 'process', 'pricing', 'contact']
                );
            } else if (match === 'fallback') {
                pushBotMessage(
                    "I'm not sure I caught that — could you rephrase or pick one of the quick topics below?",
                    ['about', 'services', 'process', 'pricing', 'contact']
                );
            } else {
                const faq = getFAQById(match);
                if (faq) pushBotMessage(faq.reply!, faq.followUpIds);
            }
        }, 850);
    };

    const handleSelectFAQ = (faqId: string) => {
        if (faqId === 'contact') {
            startContactFlow();
            return;
        }
        const faq = getFAQById(faqId);
        if (!faq || !faq.reply) return;
        pushUserMessage(faq.question);
        setIsTyping(true);
        setTimeout(() => pushBotMessage(faq.reply!, faq.followUpIds), 600);
    };

    const handleReset = () => {
        setFlow(null);
        setContactForm({ name: '', phone: '' });
        setMessages([
            {
                id: 'welcome',
                sender: 'bot',
                text: 'Greetings! Welcome to Emote Technology. 🚀\n\nI am your Emote Support Assistant. How can I help you today? Select a topic below or type your question.',
                timestamp: new Date(),
                followUpIds: ['about', 'services', 'process', 'pricing', 'contact']
            }
        ]);
    };

    const inputPlaceholder =
        flow === 'awaiting_name' ? 'Enter your full name...' :
            flow === 'awaiting_phone' ? 'Enter your phone number...' :
                'Ask about services, pricing, process...';

    return (
        <>
            {/* Floating trigger */}
            <div
                className={`fixed ${isOpen ? 'bottom-4 sm:bottom-5 md:bottom-8' : 'bottom-20 md:bottom-8'} right-4 sm:right-5 md:right-8 z-[90] flex items-center gap-3 flex-row-reverse`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.button
                    id="chatbot-trigger"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all cursor-pointer ${isOpen ? 'bg-zinc-950 text-wine border border-border' : 'bg-wine text-zinc-50 border border-wine/10'
                        }`}
                    aria-label="Emote Tech chatbot support"
                >
                    {isOpen ? <X size={24} /> : <MessageSquare size={24} className="animate-pulse" />}
                </motion.button>

                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.15 }}
                            className="px-4 py-2 bg-wine text-zinc-50 font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl pointer-events-none select-none border border-wine/10"
                        >
                            Need Help?
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chatbot-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[85] cursor-pointer"
                    />
                )}
            </AnimatePresence>

            {/* Chatbot Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="chatbot-panel"
                        initial={{ opacity: 0, scale: 0.85, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="fixed bottom-20 sm:bottom-20 md:bottom-24 right-4 left-4 sm:left-auto sm:right-5 md:right-8 w-[calc(100vw-2rem)] sm:w-[380px] h-[calc(100vh-110px)] max-h-[500px] sm:h-[520px] bg-zinc-950 border border-border rounded-3xl shadow-3xl overflow-hidden flex flex-col z-[90]"
                    >
                        {/* Header */}
                        <div className="bg-wine p-4 flex items-center justify-between border-b border-wine/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white relative">
                                    <Bot size={20} className="text-zinc-50" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-wine" />
                                </div>
                                <div>
                                    <h4 className="text-zinc-50 font-bold text-sm tracking-wide flex items-center gap-1.5 font-serif">
                                        Emote Support <Sparkles size={12} className="text-zinc-50/80" />
                                    </h4>
                                    <p className="text-[#ffffff]/70 text-[10px] uppercase font-semibold tracking-widest leading-none">Online &middot; Emote Team</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleReset}
                                    className="p-1 px-2 rounded-lg text-[#ffffff]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                                    title="Reset Conversation"
                                >
                                    <RefreshCw size={12} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg text-[#ffffff]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-modal-scrollbar bg-zinc-900">
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    <div className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'bot'
                                                ? msg.status === 'success'
                                                    ? 'bg-green-100 text-green-600'
                                                    : msg.status === 'error'
                                                        ? 'bg-red-100 text-red-500'
                                                        : 'bg-wine/10 text-wine dark:bg-wine/30 dark:text-rose-400'
                                                : 'bg-zinc-950 border border-border text-muted shadow-xs'
                                            }`}>
                                            {msg.sender === 'bot'
                                                ? msg.status === 'success'
                                                    ? <CheckCircle size={14} />
                                                    : msg.status === 'error'
                                                        ? <AlertCircle size={14} />
                                                        : <Bot size={14} />
                                                : <User size={14} />}
                                        </div>

                                        <div className="space-y-1">
                                            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user'
                                                    ? 'bg-wine text-zinc-50 rounded-tr-none shadow-sm font-semibold'
                                                    : msg.status === 'success'
                                                        ? 'bg-green-50 border border-green-200 text-green-800 rounded-tl-none shadow-xs font-semibold whitespace-pre-wrap'
                                                        : msg.status === 'error'
                                                            ? 'bg-red-50 border border-red-200 text-red-700 rounded-tl-none shadow-xs font-semibold whitespace-pre-wrap'
                                                            : 'bg-zinc-950 border border-border text-zinc-100 rounded-tl-none shadow-xs font-semibold whitespace-pre-wrap'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <p className={`text-[9px] text-muted font-semibold uppercase tracking-wider px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Contextual follow-up chips */}
                                    {msg.sender === 'bot' && msg.followUpIds && msg.followUpIds.length > 0 && (
                                        <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
                                            {msg.followUpIds.map((fid) => {
                                                const faq = getFAQById(fid);
                                                if (!faq) return null;
                                                return (
                                                    <button
                                                        key={fid}
                                                        onClick={() => handleSelectFAQ(fid)}
                                                        className="flex items-center gap-1 px-2.5 py-1 bg-zinc-950 hover:bg-wine hover:text-zinc-50 text-zinc-100 border border-border rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                                                    >
                                                        <HelpCircle size={9} className="shrink-0" />
                                                        {faq.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex gap-2.5 max-w-[85%]">
                                    <div className="w-7 h-7 rounded-full bg-wine/10 text-wine dark:bg-wine/30 dark:text-rose-400 flex items-center justify-center shrink-0">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-zinc-950 border border-border p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1 text-muted">
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-muted rounded-full" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-muted rounded-full" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-muted rounded-full" />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputVal); }}
                            className="border-t border-border p-3 bg-zinc-950 flex gap-2 items-center"
                        >
                            <input
                                type={flow === 'awaiting_phone' ? 'tel' : 'text'}
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder={inputPlaceholder}
                                disabled={flow === 'submitting'}
                                className="flex-1 bg-zinc-950 border border-border rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-wine focus:border-wine placeholder-muted disabled:opacity-50"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={flow === 'submitting'}
                                className="p-2 mb-0 bg-wine text-zinc-50 rounded-xl shadow-md shadow-wine/10 hover:brightness-110 active:scale-95 transition-all select-none cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={15} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
