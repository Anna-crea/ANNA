
import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, LayoutDashboard, Home, BookOpen, CalendarCheck, ShoppingCart, Sparkles, Share2, Check, Info, Code2, Cpu } from 'lucide-react';

interface NavigationProps {
  currentView: 'home' | 'menu' | 'reserve' | 'admin';
  setView: (view: 'home' | 'menu' | 'reserve' | 'admin') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGlobalShare = async () => {
    const shareData = {
      title: "L'Éclat de Saveurs | Gastronomie d'Avant-Garde",
      text: "Vivez une expérience culinaire unique mêlant art et intelligence artificielle.",
      url: window.location.origin + window.location.pathname,
    };

    try {
      if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
        await navigator.share(shareData);
      } else {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareData.url);
          setShowShareToast(true);
          setTimeout(() => setShowShareToast(false), 3000);
        } else {
          const input = document.createElement('input');
          input.value = shareData.url;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          setShowShareToast(true);
          setTimeout(() => setShowShareToast(false), 3000);
        }
      }
    } catch (err) {
      console.log("Share failed", err);
    }
  };

  const navItems = [
    { id: 'home', label: 'Accueil', icon: <Home className="w-4 h-4 mr-2" /> },
    { id: 'menu', label: 'La Carte', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { id: 'reserve', label: 'Réservations', icon: <CalendarCheck className="w-4 h-4 mr-2" /> },
    { id: 'admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
  ] as const;

  return (
    <nav className={`fixed w-full z-[150] transition-all duration-500 ${
      scrolled 
        ? 'py-4 bg-white/95 backdrop-blur-2xl shadow-2xl border-b border-stone-100' 
        : 'py-8 bg-transparent'
    }`}>
      {/* Share Toast Global */}
      {showShareToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-4 bg-stone-900 text-white px-8 py-4 rounded-2xl shadow-2xl border-dashed border-amber-500 border">
          <Check className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">Lien de l'expérience copié</span>
        </div>
      )}

      {/* Info Project Modal (Pour le professeur) */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" onClick={() => setShowInfoModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl border border-stone-100 paper-texture gold-liquid-border">
             <button onClick={() => setShowInfoModal(false)} className="absolute top-8 right-8 p-3 hover:bg-stone-100 rounded-full"><X className="w-5 h-5" /></button>
             <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-stone-900 rounded-2xl text-amber-500"><Code2 className="w-8 h-8" /></div>
                <div>
                   <h3 className="text-2xl font-serif font-bold">Détails Techniques du Projet</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">À l'attention du correcteur</p>
                </div>
             </div>
             <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-stone-50 rounded-3xl border border-stone-100">
                   <Cpu className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                   <div>
                      <h4 className="font-bold text-sm">Intelligence Artificielle Générative</h4>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">Utilisation du SDK `@google/genai` avec Gemini 3 Flash pour le chatbot et Gemini 3 Pro pour la génération d'images HD 2K. Les prompts sont enrichis dynamiquement.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-stone-50 rounded-3xl border border-stone-100">
                   <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                   <div>
                      <h4 className="font-bold text-sm">Système de Design (Stitch UI)</h4>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">Framework Tailwind CSS. Implémentation de textures (papier, marbre), de bordures dorées liquides et d'effets "stitched" (pointillés) pour une esthétique de luxe.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-stone-50 rounded-3xl border border-stone-100">
                   <LayoutDashboard className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                   <div>
                      <h4 className="font-bold text-sm">Gestion des États & Data</h4>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">Utilisation de React Hooks (useState, useMemo, useEffect). Dashboard avec Recharts et pagination personnalisée pour les réservations.</p>
                   </div>
                </div>
             </div>
             <div className="mt-10 pt-8 border-t border-dashed border-stone-200 text-center">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Projet de Développement Web & UX - 2024</span>
             </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setView('home')}>
            <div className={`bg-stone-900 p-3 rounded-2xl shadow-xl transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              <UtensilsCrossed className="h-6 w-6 text-amber-500" />
            </div>
            <div className={`flex flex-col transition-all duration-500 ${scrolled ? 'opacity-0 scale-90 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-black tracking-tighter text-stone-900 leading-none">L'ÉCLAT</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] text-amber-600 leading-none mt-2 shimmer-text uppercase">De Saveurs</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="bg-stone-100/50 backdrop-blur-md p-1.5 rounded-[2rem] border border-stone-200/50 flex items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 border ${
                    currentView === item.id 
                      ? 'bg-stone-900 text-white shadow-xl border-dashed border-stone-400' 
                      : 'text-stone-600 border-transparent hover:text-amber-600 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowInfoModal(true)}
                className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                  scrolled ? 'bg-stone-100 text-amber-600 border border-amber-200' : 'bg-white/10 text-amber-400 backdrop-blur-md border border-white/20'
                }`}
                title="Détails techniques"
              >
                <Info className="w-5 h-5" />
              </button>

              <button 
                onClick={handleGlobalShare}
                className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                  scrolled ? 'bg-stone-100 text-stone-900 border border-stone-200' : 'bg-white/10 text-white backdrop-blur-md border border-white/20'
                }`}
                title="Inviter un proche"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button 
                onClick={onOpenCart}
                className={`relative p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 ${
                  scrolled ? 'bg-amber-600 text-white' : 'bg-stone-900 text-white'
                }`}
              >
                <ShoppingCart className="w-5 h-5 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-stone-900 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-stone-900 shadow-xl">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setShowInfoModal(true)} className="p-3 bg-white text-amber-600 rounded-xl shadow-lg border border-amber-100">
              <Info className="h-5 w-5" />
            </button>
            <button onClick={handleGlobalShare} className="p-3 bg-white text-stone-900 rounded-xl shadow-lg">
              <Share2 className="h-5 w-5" />
            </button>
            <button onClick={onOpenCart} className="relative p-3 bg-stone-900 text-white rounded-xl">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-stone-100 rounded-xl">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-100 p-8 space-y-4 shadow-2xl">
           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => { setView(item.id); setIsOpen(false); }}
               className={`w-full flex items-center p-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                 currentView === item.id ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-600'
               }`}
             >
               {item.icon} {item.label}
             </button>
           ))}
        </div>
      )}
    </nav>
  );
};
