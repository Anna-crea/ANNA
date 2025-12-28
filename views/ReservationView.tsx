
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Mail, User, CheckCircle2, ChevronRight, Loader2, Info, ExternalLink, ShieldCheck } from 'lucide-react';

type Availability = 'Available' | 'Limited' | 'Full';

interface TimeSlot {
  time: string;
  status: Availability;
}

export const ReservationView: React.FC = () => {
  const [useJotForm, setUseJotForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    area: 'Standard'
  });
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [jotformLoading, setJotformLoading] = useState(true);

  // Generate slots when date/guests change
  useEffect(() => {
    if (formState.date) {
      setCheckingAvailability(true);
      const timer = setTimeout(() => {
        const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
        const slots: TimeSlot[] = times.map(t => {
          const rand = Math.random();
          let status: Availability = 'Available';
          if (rand > 0.8) status = 'Full';
          else if (rand > 0.5) status = 'Limited';
          return { time: t, status };
        });
        setAvailableSlots(slots);
        setCheckingAvailability(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [formState.date, formState.guests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border border-stone-100 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Table Réservée</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">Merci, {formState.name} ! Votre expérience gastronomique commence le <span className="font-bold text-stone-900">{formState.date}</span> à <span className="font-bold text-stone-900">{formState.time}</span>.</p>
          <div className="space-y-4 text-left p-8 bg-stone-50 rounded-3xl mb-8 border border-stone-100">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
              <span>Section</span>
              <span className="text-stone-900">{formState.area}</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
              <span>Convives</span>
              <span className="text-stone-900">{formState.guests} Personnes</span>
            </div>
          </div>
          <button 
            onClick={() => { setSubmitted(false); setStep(1); setFormState({ ...formState, time: '' }); }}
            className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl"
          >
            Nouvelle Réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-6xl font-serif font-bold leading-tight text-stone-900">Une Table d'Exception.</h2>
          <p className="text-xl text-stone-600 mt-4 leading-relaxed max-w-2xl">Réservez votre place dans notre sanctuaire culinaire. Chaque détail est pensé pour sublimer votre soirée.</p>
        </div>
        <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200 shadow-inner shrink-0">
          <button 
            onClick={() => setUseJotForm(false)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${!useJotForm ? 'bg-white text-stone-900 shadow-md border-dashed border-stone-300' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
          >
            Natif
          </button>
          <button 
            onClick={() => setUseJotForm(true)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${useJotForm ? 'bg-white text-stone-900 shadow-md border-dashed border-stone-300' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
          >
            JotForm Premium
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="lg:sticky lg:top-32 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Info className="w-3 h-3" />
            Vérification en temps réel {useJotForm && "& Airtable Sync"}
          </div>
          
          <div className="space-y-10">
            <div className={`flex items-start transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-4'}`}>
              <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center shrink-0 mr-6 border border-stone-100">
                <Calendar className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">1. Choisissez votre date</h4>
                <p className="text-stone-500 text-sm">Disponibilités ouvertes jusqu'à 3 mois à l'avance.</p>
              </div>
            </div>
            <div className={`flex items-start transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-4'}`}>
              <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center shrink-0 mr-6 border border-stone-100">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">2. Sélectionnez l'heure</h4>
                <p className="text-stone-500 text-sm">Vérification instantanée des créneaux libres.</p>
              </div>
            </div>
            <div className="p-8 bg-stone-900 rounded-[2.5rem] text-white relative overflow-hidden mt-12">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                    <h4 className="text-lg font-bold font-serif">Sécurité & Confidentialité</h4>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed italic">"Vos données sont chiffrées et synchronisées en toute sécurité via nos protocoles JotForm et Airtable Enterprise."</p>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          {!useJotForm ? (
            <div className="bg-white p-10 sm:p-14 rounded-[3rem] shadow-2xl border border-stone-100 relative animate-in fade-in duration-500">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* STEP 1: DATE & GUESTS */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Date de visite</label>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600 pointer-events-none" />
                        <input 
                          required
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                          value={formState.date}
                          onChange={(e) => { setFormState({...formState, date: e.target.value}); if(step < 2) setStep(2); }}
                          className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Personnes</label>
                      <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600 pointer-events-none" />
                        <select 
                          value={formState.guests}
                          onChange={(e) => setFormState({...formState, guests: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium appearance-none"
                        >
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Convives</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: TIME PICKER */}
                {formState.date && (
                  <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Heure de service</label>
                      {checkingAvailability && <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {availableSlots.map((slot) => {
                        const isSelected = formState.time === slot.time;
                        const isFull = slot.status === 'Full';
                        
                        return (
                          <button
                            type="button"
                            key={slot.time}
                            disabled={isFull}
                            onClick={() => { setFormState({...formState, time: slot.time}); if(step < 3) setStep(3); }}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all relative ${
                              isSelected 
                                ? 'bg-stone-900 border-stone-900 text-white shadow-xl scale-[1.02] border-dashed border-stone-300' 
                                : isFull
                                  ? 'bg-stone-50 border-stone-100 opacity-40 cursor-not-allowed'
                                  : 'bg-white border-stone-100 hover:border-amber-500 hover:text-amber-600'
                            }`}
                          >
                            <span className="font-bold text-sm">{slot.time}</span>
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                              slot.status === 'Available' ? 'bg-green-500' : slot.status === 'Limited' ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                            {isSelected && <div className="absolute -top-1.5 -right-1.5 bg-amber-500 p-0.5 rounded-full"><CheckCircle2 className="w-3 h-3 text-white" /></div>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT INFO */}
                {formState.time && (
                  <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                    <div className="space-y-6 pt-6 border-t border-stone-100">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nom complet</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600" />
                          <input 
                            required
                            type="text" 
                            value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                            placeholder="Jean Dupont"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email de confirmation</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600" />
                          <input 
                            required
                            type="email" 
                            value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                            placeholder="jean@exemple.fr"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-6 bg-stone-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-amber-600 shadow-2xl shadow-stone-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      Confirmer la Réservation
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] shadow-2xl border border-stone-100 overflow-hidden min-h-[700px] flex flex-col animate-in fade-in duration-500">
              <div className="bg-stone-50 p-6 flex items-center justify-between border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="bg-[#ff6100] p-2 rounded-lg">
                    <img src="https://www.jotform.com/resources/assets/logo/jotform-icon-transparent.png" alt="JotForm" className="w-4 h-4 invert" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-stone-900">Formulaire JotForm Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Live Sync Airtable</span>
                </div>
              </div>
              
              <div className="flex-1 relative">
                {jotformLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                    <Loader2 className="w-10 h-10 text-amber-600 animate-spin mb-4" />
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Initialisation sécurisée...</p>
                  </div>
                )}
                <iframe
                  id="jotform-iframe"
                  title="Reservation Form"
                  src="https://form.jotform.com/241234567890123" // URL de démonstration
                  className="w-full h-full min-h-[600px] border-none"
                  onLoad={() => setJotformLoading(false)}
                />
              </div>
              
              <div className="p-6 bg-stone-50 border-t border-stone-200 flex justify-center">
                <a 
                  href="https://form.jotform.com/241234567890123" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors"
                >
                  Ouvrir dans un nouvel onglet <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
