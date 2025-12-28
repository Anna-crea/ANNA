
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  ShoppingBag, Users, TrendingUp, DollarSign, Plus, Settings, 
  Calendar, Utensils, ChartBar, CheckCircle, XCircle, Clock, Edit3, Trash2, 
  Link as LinkIcon, Database, RefreshCw, Zap, Server, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MENU_ITEMS } from '../constants';

const salesData = [
  { name: 'Lun', revenue: 4500, orders: 120 },
  { name: 'Mar', revenue: 5200, orders: 145 },
  { name: 'Mer', revenue: 4800, orders: 130 },
  { name: 'Jeu', revenue: 6100, orders: 160 },
  { name: 'Ven', revenue: 8900, orders: 210 },
  { name: 'Sam', revenue: 9500, orders: 240 },
  { name: 'Dim', revenue: 7800, orders: 190 },
];

const mockReservations = [
  { id: '1', name: 'Jean-Pierre Laurent', date: '2024-05-20', time: '20:00', guests: 4, status: 'Confirmé' },
  { id: '2', name: 'Sophie Bernard', date: '2024-05-20', time: '19:30', guests: 2, status: 'Confirmé' },
  { id: '3', name: 'Marc Antoine', date: '2024-05-21', time: '21:00', guests: 6, status: 'En attente' },
  { id: '4', name: 'Famille Durand', date: '2024-05-21', time: '12:30', guests: 8, status: 'Annulé' },
  { id: '5', name: 'Lucie Meunier', date: '2024-05-22', time: '20:15', guests: 2, status: 'En attente' },
  { id: '6', name: 'Thomas Dubois', date: '2024-05-22', time: '19:00', guests: 3, status: 'Confirmé' },
  { id: '7', name: 'Isabelle Petit', date: '2024-05-23', time: '20:30', guests: 2, status: 'En attente' },
  { id: '8', name: 'Antoine Morel', date: '2024-05-23', time: '21:15', guests: 4, status: 'Confirmé' },
  { id: '9', name: 'Clara Simon', date: '2024-05-24', time: '19:45', guests: 5, status: 'Confirmé' },
  { id: '10', name: 'Nicolas Roux', date: '2024-05-24', time: '12:00', guests: 2, status: 'Annulé' },
  { id: '11', name: 'Elodie Fontaine', date: '2024-05-25', time: '20:00', guests: 2, status: 'En attente' },
  { id: '12', name: 'Julien Vincent', date: '2024-05-25', time: '21:00', guests: 4, status: 'Confirmé' },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'reservations' | 'menu' | 'integrations'>('stats');
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [airtableConfig, setAirtableConfig] = useState({
    baseId: 'appL8xP9jK2mN1qW',
    tableName: 'Reservations_Eclat',
    connected: true
  });

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  // Pagination logic
  const totalPages = Math.ceil(mockReservations.length / itemsPerPage);
  const currentReservations = mockReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900">Tableau de Bord</h2>
          <p className="text-stone-500 mt-2 font-medium tracking-tight">Gestion opérationnelle de L'Éclat de Saveurs</p>
        </div>
        <div className="flex flex-wrap bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shadow-inner">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'stats' ? 'bg-white text-stone-900 shadow-md border-dashed border-stone-300' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
          >
            <ChartBar className="w-3.5 h-3.5 mr-2" /> Analyses
          </button>
          <button 
            onClick={() => { setActiveTab('reservations'); setCurrentPage(1); }}
            className={`flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'reservations' ? 'bg-white text-stone-900 shadow-md border-dashed border-stone-300' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
          >
            <Calendar className="w-3.5 h-3.5 mr-2" /> Réservations
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'menu' ? 'bg-white text-stone-900 shadow-md border-dashed border-stone-300' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
          >
            <Utensils className="w-3.5 h-3.5 mr-2" /> Carte
          </button>
          <button 
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeTab === 'integrations' ? 'bg-white text-stone-900 shadow-md border-dashed border-stone-300' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
          >
            <LinkIcon className="w-3.5 h-3.5 mr-2" /> Intégrations
          </button>
        </div>
      </div>

      {/* Analytics View */}
      {activeTab === 'stats' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { label: 'Revenu Hebdo', value: '46,800€', icon: <DollarSign />, color: 'blue', change: '+12.5%' },
              { label: 'Commandes', value: '1,195', icon: <ShoppingBag />, color: 'amber', change: '+8.2%' },
              { label: 'Visiteurs', value: '842', icon: <Users />, color: 'purple', change: '-2.4%' },
              { label: 'Ticket Moyen', value: '39.16€', icon: <TrendingUp />, color: 'green', change: '+5.1%' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-center mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${stat.color === 'blue' ? 'blue-50' : stat.color === 'amber' ? 'amber-50' : stat.color === 'purple' ? 'purple-50' : 'green-50'} text-${stat.color === 'blue' ? 'blue-600' : stat.color === 'amber' ? 'amber-600' : stat.color === 'purple' ? 'purple-600' : 'green-600'} group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
                  </div>
                  <span className={`text-[10px] font-black uppercase ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                </div>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <h4 className="text-3xl font-black text-stone-900">{stat.value}</h4>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold font-serif">Flux de Revenus</h3>
                <div className="flex gap-3">
                  <button className="text-[10px] font-black uppercase bg-stone-100 px-4 py-1.5 rounded-full text-stone-600">Mois</button>
                  <button className="text-[10px] font-black uppercase bg-stone-900 px-4 py-1.5 rounded-full text-white shadow-lg">Semaine</button>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 11, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 11, fontWeight: 'bold'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px' }}
                      cursor={{fill: '#fafaf9'}}
                    />
                    <Bar dataKey="revenue" fill="#d97706" radius={[12, 12, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm">
              <h3 className="text-xl font-bold mb-10 font-serif">Top 5 de la Carte</h3>
              <div className="space-y-8">
                {MENU_ITEMS.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-stone-50 group-hover:scale-110 transition-transform">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate group-hover:text-amber-600 transition-colors">{item.name}</h4>
                      <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-stone-900">{Math.floor(Math.random() * 80) + 40}</p>
                      <p className="text-[8px] text-green-500 font-black uppercase tracking-tighter mt-0.5">Ventes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservations Table View with Pagination */}
      {activeTab === 'reservations' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-[3rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 flex flex-col sm:flex-row justify-between items-center border-b border-stone-100 gap-6">
            <h3 className="text-2xl font-serif font-bold">Tableau des Réservations</h3>
            <div className="flex gap-4 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder="Chercher un client..."
                className="bg-stone-50 border border-stone-200 px-6 py-3 rounded-2xl text-xs w-full focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all"
              />
              <button className="bg-amber-600 text-white px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-colors">
                + Nouvelle
              </button>
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50 text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] border-b border-stone-100">
                  <th className="px-10 py-6">Client</th>
                  <th className="px-6 py-6 text-center">Date & Heure</th>
                  <th className="px-6 py-6 text-center">Couverts</th>
                  <th className="px-6 py-6">Statut</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {currentReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-stone-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-600 border border-stone-200 uppercase">
                          {res.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">{res.name}</p>
                          <p className="text-[10px] text-stone-400">ID: #{res.id}9923</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <div className="text-center">
                        <p className="font-bold text-stone-900">{res.date}</p>
                        <p className="text-[10px] text-amber-600 font-bold">{res.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <div className="flex items-center justify-center gap-1.5">
                        <Users className="w-3 h-3 text-stone-400" />
                        <span className="font-black text-stone-900">{res.guests}</span>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        res.status === 'Confirmé' ? 'bg-emerald-50 text-emerald-600' : 
                        res.status === 'En attente' ? 'bg-amber-50 text-amber-600' : 
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {res.status === 'Confirmé' && <CheckCircle className="w-3 h-3 mr-1.5" />}
                        {res.status === 'En attente' && <Clock className="w-3 h-3 mr-1.5" />}
                        {res.status === 'Annulé' && <XCircle className="w-3 h-3 mr-1.5" />}
                        {res.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-400 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="p-10 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6 bg-stone-50/30">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, mockReservations.length)} sur {mockReservations.length} entrées
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-stone-200 bg-white text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              
              <div className="flex items-center gap-1.5 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] h-10 rounded-xl text-[10px] font-black transition-all border ${
                      currentPage === page
                        ? 'bg-stone-900 text-white shadow-lg border-dashed border-stone-300'
                        : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-stone-200 bg-white text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Management View */}
      {activeTab === 'menu' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-serif font-bold">Configuration de la Carte</h3>
              <p className="text-stone-400 text-sm mt-1">Mettez à jour vos plats, prix et visuels.</p>
            </div>
            <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center shadow-xl shadow-stone-900/10 hover:bg-amber-600 transition-all">
              <Plus className="w-5 h-5 mr-3" /> Ajouter un Plat
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl font-black text-stone-900 text-sm">
                    {item.price}€
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-stone-900 text-lg leading-tight">{item.name}</h4>
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">{item.category}</span>
                  </div>
                  <p className="text-stone-400 text-xs line-clamp-2 italic mb-6 leading-relaxed">"{item.description}"</p>
                  <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[9px] font-black text-stone-500 uppercase">Visible</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-stone-400 hover:text-stone-900 transition-colors p-2 rounded-lg bg-stone-50"><Edit3 className="w-4 h-4" /></button>
                      <button className="text-stone-400 hover:text-rose-600 transition-colors p-2 rounded-lg bg-stone-50"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrations View */}
      {activeTab === 'integrations' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
          {/* External Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Airtable Card */}
            <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:rotate-12 transition-transform">
                    <Database className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif">Airtable</h3>
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Base de Données Client</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${airtableConfig.connected ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-50 text-stone-400'}`}>
                  {airtableConfig.connected ? 'Connecté' : 'Déconnecté'}
                </span>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Base ID</label>
                  <input 
                    type="text" 
                    value={airtableConfig.baseId}
                    onChange={(e) => setAirtableConfig({...airtableConfig, baseId: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-2xl text-xs font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    placeholder="app..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nom de la Table</label>
                  <input 
                    type="text" 
                    value={airtableConfig.tableName}
                    onChange={(e) => setAirtableConfig({...airtableConfig, tableName: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 px-5 py-3 rounded-2xl text-xs font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    placeholder="Reservations..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button 
                  onClick={handleSync}
                  className="flex-1 bg-stone-900 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center shadow-xl shadow-stone-900/10 hover:bg-blue-600 transition-all"
                >
                  {isSyncing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                  Forcer Sync
                </button>
                <button className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16"></div>
            </div>

            {/* JotForm Card */}
            <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ff6100] group-hover:rotate-12 transition-transform">
                    <Server className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif">JotForm</h3>
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Interface de Réservation</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">
                  Actif
                </span>
              </div>
              
              <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-stone-500">Flux de Webhook Entrant</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-stone-400 uppercase tracking-widest">Dernière Entrée</span>
                    <span className="text-stone-900">Il y a 12 min</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-stone-400 uppercase tracking-widest">Formulaire ID</span>
                    <span className="text-stone-900">#24123456789</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex-1 bg-stone-900 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center shadow-xl shadow-stone-900/10 hover:bg-orange-600 transition-all">
                  Éditeur JotForm
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16"></div>
            </div>
          </div>

          {/* Sync History / Simulated Airtable Data */}
          <div className="bg-white rounded-[3.5rem] border border-stone-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <div className="p-10 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <h3 className="text-xl font-serif font-bold flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                Données Synchronisées (Airtable)
              </h3>
              <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                4 Enregistrements récents
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[9px] font-black text-stone-400 uppercase tracking-[0.2em] border-b border-stone-100">
                    <th className="px-10 py-6">Record ID (Airtable)</th>
                    <th className="px-6 py-6">Source (JotForm)</th>
                    <th className="px-6 py-6">Statut de Synchro</th>
                    <th className="px-10 py-6 text-right">Date de création</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {[
                    { id: 'rec9sK8jL2w', source: 'Form_Web_01', status: 'Success', date: '20 Mai, 14:32' },
                    { id: 'rec1pM3qN5v', source: 'Form_Web_01', status: 'Success', date: '20 Mai, 12:05' },
                    { id: 'rec4vD6tY9z', source: 'Admin_Direct', status: 'Manual', date: '19 Mai, 22:45' },
                    { id: 'rec8hX1rB0m', source: 'Form_Web_01', status: 'Success', date: '19 Mai, 18:20' },
                  ].map((sync) => (
                    <tr key={sync.id} className="text-[11px] font-bold text-stone-600 hover:bg-stone-50 transition-colors">
                      <td className="px-10 py-6 font-mono text-blue-600">{sync.id}</td>
                      <td className="px-6 py-6">{sync.source}</td>
                      <td className="px-6 py-6">
                        <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase">
                          {sync.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right text-stone-400">{sync.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
