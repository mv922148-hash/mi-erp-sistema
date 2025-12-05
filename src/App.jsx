import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutGrid, Users, Briefcase, Settings, LogOut,
  Plus, Search, Bell, Menu, X, ChevronRight,
  TrendingUp, Clock, ArrowUpRight, ArrowDownRight,
  ShieldCheck, Activity, UserPlus, FileText, CreditCard,
  Bot, Ghost, Crown, Zap, Star, Smile, Rocket, Gamepad2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  MessageSquare,
  Check,
  Moon,
  Sun,
  Trash2,
  Pencil,
  BarChart3,
  DollarSign,
  PieChart,
  LineChart,
  Globe,
  Wallet,
  Coins,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// --- CONFIGURACIÓN & UTILIDADES ---

const THEMES = {
  blue: {
    name: 'blue',
    gradient: 'from-blue-500 to-cyan-400',
    solid: 'bg-blue-600 hover:bg-blue-700',
    text: 'text-blue-600',
    textDark: 'dark:text-blue-400',
    border: 'border-blue-500',
    ring: 'focus:ring-blue-500',
    shadow: 'shadow-blue-500/30'
  },
  purple: {
    name: 'purple',
    gradient: 'from-violet-500 to-fuchsia-400',
    solid: 'bg-violet-600 hover:bg-violet-700',
    text: 'text-violet-600',
    textDark: 'dark:text-violet-400',
    border: 'border-violet-500',
    ring: 'focus:ring-violet-500',
    shadow: 'shadow-violet-500/30'
  },
  orange: {
    name: 'orange',
    gradient: 'from-orange-500 to-amber-400',
    solid: 'bg-orange-500 hover:bg-orange-600',
    text: 'text-orange-600',
    textDark: 'dark:text-orange-400',
    border: 'border-orange-500',
    ring: 'focus:ring-orange-500',
    shadow: 'shadow-orange-500/30'
  },
  green: {
    name: 'green',
    gradient: 'from-emerald-500 to-teal-400',
    solid: 'bg-emerald-600 hover:bg-emerald-700',
    text: 'text-emerald-600',
    textDark: 'dark:text-emerald-400',
    border: 'border-emerald-500',
    ring: 'focus:ring-emerald-500',
    shadow: 'shadow-emerald-500/30'
  },
  pink: {
    name: 'pink',
    gradient: 'from-pink-500 to-rose-400',
    solid: 'bg-pink-600 hover:bg-pink-700',
    text: 'text-pink-600',
    textDark: 'dark:text-pink-400',
    border: 'border-pink-500',
    ring: 'focus:ring-pink-500',
    shadow: 'shadow-pink-500/30'
  },
};

const WALLPAPERS = {
  aurora: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
  ocean: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900',
  midnight: 'bg-gradient-to-br from-slate-900 via-gray-800 to-black',
  sunrise: 'bg-gradient-to-br from-orange-400 via-red-500 to-purple-600',
  minimal: 'bg-gray-200 dark:bg-gray-900',
};

// Datos Iniciales
const INITIAL_USERS = [
  { id: 1, name: 'Admin Principal', email: 'admin@system.com', role: 'Administrador', status: 'Activo', avatar: 'AP' },
  { id: 2, name: 'Juan Pérez', email: 'juan@system.com', role: 'Contador', status: 'Activo', avatar: 'JP' },
  { id: 3, name: 'Maria Lopez', email: 'maria@system.com', role: 'DevOps', status: 'Inactivo', avatar: 'ML' },
  { id: 4, name: 'Carlos Ruiz', email: 'carlos@system.com', role: 'Ventas', status: 'Activo', avatar: 'CR' },
];

const INITIAL_TRANSACTIONS = [
  { id: 1, desc: 'Pago Licencias Software', amount: 450.00, date: 'Hace 2h', type: 'expense' },
  { id: 2, desc: 'Venta Servicios Consultoría', amount: 1250.00, date: 'Hace 5h', type: 'income' },
  { id: 3, desc: 'Reembolso Cliente #902', amount: 120.00, date: 'Ayer', type: 'expense' },
  { id: 4, desc: 'Suscripción Anual Plan Pro', amount: 2400.00, date: 'Ayer', type: 'income' },
];

const INITIAL_PROJECTS = [
  { id: 1, name: 'Rediseño Web', progress: 75, status: 'En Tiempo', client: 'TechCorp' },
  { id: 2, name: 'Migración DB', progress: 30, status: 'Retrasado', client: 'BancoN' },
  { id: 3, name: 'Campaña Q4', progress: 90, status: 'Finalizando', client: 'RetailX' },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Pago Recibido', desc: 'Factura #1023 pagada', time: '2m', type: 'success' },
  { id: 2, title: 'Nuevo Usuario', desc: 'Ana registro completado', time: '1h', type: 'info' },
  { id: 3, title: 'Alerta Stock', desc: 'Producto #405 bajo', time: '3h', type: 'warning' }
];

const AVATAR_PRESETS = [
  { id: 'robot', icon: Bot, gradient: 'from-blue-400 to-cyan-300' },
  { id: 'alien', icon: Ghost, gradient: 'from-purple-400 to-pink-300' },
  { id: 'king', icon: Crown, gradient: 'from-yellow-400 to-orange-300' },
  { id: 'zap', icon: Zap, gradient: 'from-amber-400 to-yellow-300' },
  { id: 'star', icon: Star, gradient: 'from-red-400 to-rose-300' },
  { id: 'smile', icon: Smile, gradient: 'from-green-400 to-emerald-300' },
  { id: 'rocket', icon: Rocket, gradient: 'from-indigo-400 to-violet-300' },
  { id: 'game', icon: Gamepad2, gradient: 'from-pink-400 to-rose-300' },
];

const AvatarDisplay = ({ avatar, name, size = 24, className = '' }) => {
  if (avatar?.startsWith('preset:')) {
    const presetId = avatar.split(':')[1];
    const preset = AVATAR_PRESETS.find(p => p.id === presetId);
    if (preset) {
      const Icon = preset.icon;
      return (
        <div className={`w-full h-full bg-gradient-to-br ${preset.gradient} flex items-center justify-center text-white ${className}`}>
          <Icon size={size} />
        </div>
      );
    }
  }

  if (avatar?.length > 20) {
    return <img src={avatar} alt={name} className={`w-full h-full object-cover ${className}`} />;
  }

  return (
    <div className={`w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500 ${className}`}>
      {name ? name.substring(0, 2).toUpperCase() : '??'}
    </div>
  );
};

// --- HOOKS ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : initialValue;
      return parsed !== null ? parsed : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const { user, loginWithRedirect, logout, isLoading, isAuthenticated, error } = useAuth0();
  const [localUser, setLocalUser] = useLocalStorage('erp_user_v3', null);

  // Sincronizar usuario de Auth0 con estado local si es necesario
  useEffect(() => {
    if (isAuthenticated && user) {
      setLocalUser({
        username: user.nickname || user.email.split('@')[0],
        email: user.email,
        role: 'Usuario Auth0', // Rol por defecto, idealmente vendría de Auth0 metadata
        token: 'auth0-token',
        avatar: user.picture
      });
    } else if (!isLoading && !isAuthenticated) {
      setLocalUser(null);
    }
  }, [isAuthenticated, user, isLoading]);

  return {
    user: localUser,
    login: loginWithRedirect,
    logout: () => logout({ logoutParams: { returnTo: window.location.origin } }),
    loading: isLoading,
    error: error ? error.message : '',
    setUser: setLocalUser
  };
};

const useMarketData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Forex Data (Frankfurter)
        const forexRes = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,MXN');
        const forexJson = await forexRes.json();

        // 2. Fetch Crypto Data (CoinGecko)
        const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const cryptoJson = await cryptoRes.json();

        const newData = [
          {
            pair: 'USD/MXN',
            price: forexJson.rates.MXN,
            change: 0, // Frankfurter doesn't give 24h change easily, defaulting to 0 or calculating if we had yesterday's
            symbol: 'FX:USDMXN'
          },
          {
            pair: 'EUR/USD',
            price: 1 / forexJson.rates.EUR,
            change: 0,
            symbol: 'FX:EURUSD'
          },
          {
            pair: 'GBP/USD',
            price: 1 / forexJson.rates.GBP,
            change: 0,
            symbol: 'FX:GBPUSD'
          },
          {
            pair: 'USD/JPY',
            price: forexJson.rates.JPY,
            change: 0,
            symbol: 'FX:USDJPY'
          },
          {
            pair: 'BTC/USD',
            price: cryptoJson.bitcoin.usd,
            change: cryptoJson.bitcoin.usd_24h_change,
            symbol: 'BITSTAMP:BTCUSD'
          },
          // Stocks (Simulated for now as free real-time API is hard)
          { pair: 'AAPL', price: 185.50, change: +0.8, symbol: 'NASDAQ:AAPL' },
          { pair: 'TSLA', price: 240.30, change: -1.2, symbol: 'NASDAQ:TSLA' },
          { pair: 'NVDA', price: 480.10, change: +2.1, symbol: 'NASDAQ:NVDA' },
        ];

        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
        // Fallback data
        setData([
          { pair: 'USD/MXN', price: 17.50, change: 0, symbol: 'FX:USDMXN' },
          { pair: 'BTC/USD', price: 42000, change: 0, symbol: 'BITSTAMP:BTCUSD' },
        ]);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return { data, loading };
};

// --- COMPONENTES UI GENÉRICOS ---

const IOSCard = ({ children, className = '', style = {}, onClick }) => (
  <div
    onClick={onClick}
    className={`
      crystal-card p-4 md:p-6 transition-all duration-500
      hover:shadow-white/5 hover:scale-[1.01] active:scale-[0.99]
      ${className}
    `}
    style={style}
  >
    {children}
  </div>
);

// --- COMPONENTE SMART CAPSULE ---
const SmartCapsule = ({ onAction, hasNotifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex justify-center w-full mb-6 z-50 pointer-events-none"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`
          pointer-events-auto bg-black/90 backdrop-blur-xl text-white rounded-[32px] shadow-2xl shadow-black/20
          transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          flex flex-col items-center overflow-hidden border border-white/10
          ${isExpanded ? 'w-[450px] h-32' : 'w-[280px] h-12'}
        `}
      >
        <div className="w-full h-12 flex items-center justify-between px-6 shrink-0 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse z-10"></div>
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="font-medium text-sm tracking-wide">Sistema Activo</span>
          </div>

          <div className="font-mono text-xs opacity-70 tracking-widest">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className={`w-full flex-1 flex flex-col justify-center px-4 pb-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100 delay-75' : 'opacity-0'}`}>
          <div className="flex items-center justify-around w-full">
            <button onClick={() => onAction('invoice')} className="flex flex-col items-center gap-1.5 group">
              <div className="p-3 rounded-full bg-white/10 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all transform group-hover:scale-110">
                <FileText size={20} />
              </div>
              <span className="text-[10px] font-medium opacity-60 group-hover:opacity-100 transition-opacity">Factura</span>
            </button>

            <button onClick={() => onAction('notifications')} className="flex flex-col items-center gap-1.5 group relative">
              <div className="p-3 rounded-full bg-white/10 group-hover:bg-red-500/20 group-hover:text-red-400 transition-all transform group-hover:scale-110 relative">
                <Bell size={20} />
                {hasNotifications && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black/50"></div>
                )}
              </div>
              <span className="text-[10px] font-medium opacity-60 group-hover:opacity-100 transition-opacity">Alertas</span>
            </button>

            <button onClick={() => onAction('user')} className="flex flex-col items-center gap-1.5 group">
              <div className="p-3 rounded-full bg-white/10 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all transform group-hover:scale-110">
                <UserPlus size={20} />
              </div>
              <span className="text-[10px] font-medium opacity-60 group-hover:opacity-100 transition-opacity">Usuario</span>
            </button>

            <button onClick={() => onAction('report')} className="flex flex-col items-center gap-1.5 group">
              <div className="p-3 rounded-full bg-white/10 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all transform group-hover:scale-110">
                <BarChart3 size={20} />
              </div>
              <span className="text-[10px] font-medium opacity-60 group-hover:opacity-100 transition-opacity">Reporte</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MODALES FUNCIONALES ---

const NotificationModal = ({ isOpen, onClose, notifications, onClear, currentTheme }) => {
  const theme = THEMES[currentTheme];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-md mx-4 ios-glass !bg-white/90 dark:!bg-gray-900/90 rounded-[32px] overflow-hidden shadow-2xl animate-spring-in" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className={`w-5 h-5 ${theme.text}`} />
            <h3 className="text-xl font-bold dark:text-white">Notificaciones</h3>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button onClick={onClear} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-all hover:scale-105 px-2">Borrar Todo</button>
            )}
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-110"><X size={20} className="text-gray-500" /></button>
          </div>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3 scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Bell size={48} className="mx-auto mb-4 opacity-20" />
              <p>No tienes notificaciones nuevas</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="p-4 bg-gray-50/50 dark:bg-white/5 rounded-2xl flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group">
                <div className={`mt-1 p-2 rounded-full ${notif.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                  notif.type === 'warning' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                    notif.type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                  }`}>
                  {notif.type === 'success' ? <CheckCircle2 size={16} /> :
                    notif.type === 'warning' ? <AlertTriangle size={16} /> :
                      notif.type === 'error' ? <AlertCircle size={16} /> :
                        <MessageSquare size={16} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold dark:text-white leading-tight">{notif.title}</h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">{notif.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const UserModal = ({ isOpen, onClose, onSave, userToEdit, currentTheme }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Usuario', status: 'Activo', avatar: '' });
  const theme = THEMES[currentTheme];

  useEffect(() => {
    if (userToEdit) setFormData(userToEdit);
    else setFormData({ name: '', email: '', role: 'Usuario', status: 'Activo', avatar: '' });
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 150;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setFormData(prev => ({ ...prev, avatar: canvas.toDataURL(file.type) }));
        };
        img.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md m-4 ios-glass !bg-white/90 dark:!bg-gray-900/90 rounded-[32px] overflow-hidden shadow-2xl animate-spring-in">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white">{userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-110"><X size={20} className="text-gray-500" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div className="flex flex-col items-center mb-6 gap-4">
            <div className="relative group cursor-pointer" onClick={() => document.getElementById('modal-avatar-input').click()}>
              <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${theme.border} shadow-lg transition-transform hover:scale-105`}>
                <AvatarDisplay avatar={formData.avatar} name={formData.name} size={40} />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Subir</span>
              </div>
              <input type="file" id="modal-avatar-input" hidden accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="w-full">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase text-center">O elige un icono</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {AVATAR_PRESETS.map(preset => {
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: `preset:${preset.id}` })}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${preset.gradient} flex items-center justify-center text-white shadow-sm transition-transform hover:scale-110 ${formData.avatar === `preset:${preset.id}` ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`} placeholder="Nombre completo" />
          <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`} placeholder="Correo electrónico" />
          <div className="grid grid-cols-2 gap-4">
            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`}><option>Usuario</option><option>Administrador</option><option>Contador</option><option>Ventas</option></select>
            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`}><option>Activo</option><option>Inactivo</option></select>
          </div>
          <button type="submit" className={`w-full py-3.5 ${theme.solid} text-white rounded-xl font-bold ${theme.shadow} mt-4 transition-transform hover:scale-[1.02] active:scale-95`}>{userToEdit ? 'Guardar' : 'Crear'}</button>
        </form>
      </div>
    </div>
  );
};

const TransactionModal = ({ isOpen, onClose, onSave, type, currentTheme }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const theme = THEMES[currentTheme];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm m-4 ios-glass !bg-white/90 dark:!bg-gray-900/90 rounded-[32px] overflow-hidden shadow-2xl animate-spring-in">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            {type === 'income' ? <FileText className="text-green-500" /> : <CreditCard className="text-red-500" />}
            {type === 'income' ? 'Nueva Factura' : 'Registrar Pago'}
          </h3>
          <button onClick={onClose} className="transition-transform hover:scale-110"><X size={20} className="text-gray-500" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave({ amount: parseFloat(amount), desc, type }); setAmount(''); setDesc(''); }} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-2 mb-1 block">Concepto</label>
            <input required autoFocus type="text" value={desc} onChange={e => setDesc(e.target.value)} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`} placeholder="Ej. Servicios Web" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-2 mb-1 block">Monto ($)</label>
            <input required type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white text-lg font-bold`} placeholder="0.00" />
          </div>
          <button type="submit" className={`w-full py-3.5 ${type === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white rounded-xl font-bold shadow-lg mt-4 transition-transform hover:scale-[1.02] active:scale-95`}>
            Confirmar {type === 'income' ? 'Ingreso' : 'Egreso'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ReportModal = ({ isOpen, onClose, transactions, currentTheme }) => {
  const theme = THEMES[currentTheme];
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const net = income - expenses;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md m-4 ios-glass !bg-white/90 dark:!bg-gray-900/90 rounded-[32px] overflow-hidden shadow-2xl animate-spring-in">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white">Reporte Financiero</h3>
          <button onClick={onClose} className="transition-transform hover:scale-110"><X size={20} className="text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase">Ingresos</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">${income.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
              <p className="text-xs text-red-600 dark:text-red-400 font-bold uppercase">Gastos</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">${expenses.toFixed(2)}</p>
            </div>
          </div>
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg`}>
            <p className="text-sm font-medium opacity-80 uppercase">Balance Neto</p>
            <p className="text-4xl font-bold mt-1">${net.toFixed(2)}</p>
            <p className="text-xs opacity-70 mt-2">Calculado al {new Date().toLocaleDateString()}</p>
          </div>
          <button onClick={onClose} className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform hover:scale-[1.02] active:scale-95">Cerrar Reporte</button>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, onSave, projectToEdit, currentTheme }) => {
  const [formData, setFormData] = useState({ name: '', client: '', progress: 0, status: 'En Tiempo' });
  const theme = THEMES[currentTheme];

  useEffect(() => {
    if (projectToEdit) setFormData(projectToEdit);
    else setFormData({ name: '', client: '', progress: 0, status: 'En Tiempo' });
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md m-4 ios-glass !bg-white/90 dark:!bg-gray-900/90 rounded-[32px] overflow-hidden shadow-2xl animate-spring-in">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white">{projectToEdit ? 'Actualizar Proyecto' : 'Nuevo Proyecto'}</h3>
          <button onClick={onClose} className="transition-transform hover:scale-110"><X size={20} className="text-gray-500" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`} placeholder="Nombre del Proyecto" />
          <input required type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`} placeholder="Cliente" />

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-2 mb-1 block">Progreso: {formData.progress}%</label>
            <input type="range" min="0" max="100" value={formData.progress} onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })} className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-2 mb-1 block">Estado</label>
            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 ${theme.ring} dark:text-white`}>
              <option>En Tiempo</option>
              <option>Retrasado</option>
              <option>Finalizando</option>
              <option>Detenido</option>
            </select>
          </div>

          <button type="submit" className={`w-full py-3.5 ${theme.solid} text-white rounded-xl font-bold ${theme.shadow} mt-4 transition-transform hover:scale-[1.02] active:scale-95`}>Guardar Proyecto</button>
        </form>
      </div>
    </div>
  );
};

const ControlCenter = ({ isOpen, onClose, settings, setSettings, logout }) => {
  if (!isOpen) return null;
  const theme = THEMES[settings.accent];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose}></div>
      <div className="absolute top-20 right-6 z-50 w-80 animate-spring-in origin-top-right">
        <IOSCard className="space-y-6 !p-6 !bg-white/80 dark:!bg-black/80 !backdrop-blur-3xl border border-white/20">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200/20">
            <h3 className="text-lg font-bold dark:text-white">Centro de Control</h3>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wider">Acento del Sistema</label>
            <div className="flex justify-between">
              {Object.keys(THEMES).map(color => (
                <button
                  key={color}
                  onClick={() => setSettings({ ...settings, accent: color })}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${THEMES[color].gradient} shadow-lg transition-transform hover:scale-110 flex items-center justify-center ${settings.accent === color ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900' : ''}`}
                >
                  {settings.accent === color && <div className="w-3 h-3 bg-white rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wider">Entorno (Wallpaper)</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(WALLPAPERS).map(wp => (
                <button
                  key={wp}
                  onClick={() => setSettings({ ...settings, wallpaper: wp })}
                  className={`h-12 rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-105 ${settings.wallpaper === wp ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900' : ''}`}
                >
                  <div className={`w-full h-full ${WALLPAPERS[wp]} opacity-80`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm">
                {settings.darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <span className="text-sm font-medium dark:text-white">Modo Oscuro</span>
            </div>
            <button
              onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
              className={`w-12 h-7 rounded-full transition-all hover:scale-105 relative ${settings.darkMode ? theme.solid.split(' ')[0] : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform duration-300 ${settings.darkMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </IOSCard>
      </div>
    </>
  );
};

// --- DASHBOARD PRINCIPAL ---
const BentoDashboard = ({ users, transactions, projects, accent, onAction }) => {
  const theme = THEMES[accent];
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const net = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up pb-10">

      {/* 1. RESUMEN FINANCIERO (Grande) */}
      <IOSCard className="md:col-span-2 relative overflow-hidden group">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Balance Neto</h3>
            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white">${net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
              <div className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs font-bold flex items-center">
                <ArrowUpRight size={12} className="mr-1" /> Activo
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg`}>
            <DollarSign size={24} />
          </div>
        </div>

        {/* Gráfica de Barras Simulada */}
        <div className="h-32 flex items-end gap-3 px-2 relative z-10">
          {[35, 55, 40, 70, 60, 85, 50, 75, 95, 65, 45, 80].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end group/bar">
              <div
                className={`w-full rounded-t-sm transition-all duration-300 bg-gray-300 dark:bg-gray-700 group-hover/bar:bg-gradient-to-t group-hover/bar:${theme.gradient}`}
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
      </IOSCard>

      {/* 2. ESTADO DEL SISTEMA (Nuevo Widget) */}
      <IOSCard className="md:col-span-1 flex flex-col justify-between group relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className="flex justify-between items-start z-10">
          <Activity size={24} className={theme.text} />
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/10 text-gray-500 dark:text-gray-300">En línea</span>
        </div>
        <div className="z-10">
          <h3 className="text-xl md:text-2xl font-bold dark:text-white mt-2">98%</h3>
          <p className="text-xs text-gray-400">Uptime Servidor</p>
        </div>
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden z-10">
          <div className={`h-full ${theme.solid} w-[98%]`}></div>
        </div>
      </IOSCard>

      {/* 3. ACTIVIDAD DEL EQUIPO (Reemplaza Acciones Rápidas) */}
      <IOSCard className="md:col-span-1 flex flex-col justify-between group relative overflow-hidden cursor-pointer" onClick={() => onAction('users')}>
        <div className="flex justify-between items-start z-10">
          <Users size={24} className={theme.text} />
          <ArrowUpRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
        </div>

        <div className="z-10 mt-4">
          <div className="flex -space-x-3 mb-3 pl-1">
            {users.slice(0, 4).map((u, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 flex items-center justify-center text-xs font-bold overflow-hidden shadow-sm transition-transform hover:scale-110 hover:z-10">
                <AvatarDisplay avatar={u.avatar} name={u.name} size={16} />
              </div>
            ))}
            {users.length > 4 && (
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300 shadow-sm">
                +{users.length - 4}
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold dark:text-white">Equipo Activo</h3>
          <p className="text-xs text-gray-400">{users.length} Miembros</p>
        </div>
      </IOSCard>

      {/* 4. PROYECTOS ACTIVOS */}
      <IOSCard className="md:col-span-2 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={18} className="text-gray-400" />
          <h3 className="font-bold dark:text-white">Proyectos en Curso</h3>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide">
          {projects.slice(0, 3).map(proj => (
            <div key={proj.id} className="group cursor-pointer p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors" onClick={() => onAction('projects')}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium dark:text-gray-200 text-sm">{proj.name}</span>
                <span className={`text-xs font-bold ${proj.status === 'Retrasado' ? 'text-red-500' : 'text-gray-400'}`}>{proj.status}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${proj.status === 'Retrasado' ? 'bg-red-500' : 'bg-gradient-to-r ' + theme.gradient}`}
                  style={{ width: `${proj.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => onAction('projects')} className="w-full mt-auto py-2 text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all border border-gray-200 dark:border-gray-700 rounded-xl hover:scale-[1.02] active:scale-95">
          Gestionar Todos
        </button>
      </IOSCard>

      {/* 5. GRÁFICA DE FLUJO (Expandida) */}
      <IOSCard className="md:col-span-2 lg:col-span-2 h-64 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center mb-4 z-10">
          <div>
            <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
              <TrendingUp size={20} className={theme.text} />
              Flujo de Caja Anual
            </h3>
            <p className="text-xs text-gray-400">Datos en tiempo real</p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center text-xs text-gray-500"><div className={`w-2 h-2 rounded-full mr-1 bg-gradient-to-r ${theme.gradient}`}></div> Ingresos</span>
            <span className="flex items-center text-xs text-gray-500"><div className="w-2 h-2 rounded-full mr-1 bg-gray-400"></div> Gastos</span>
          </div>
        </div>

        <div className="flex-1 flex items-end gap-6 px-2 pb-2 z-10">
          {[65, 45, 75, 55, 80, 60, 90, 70, 85, 50, 60, 75].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group">
              <div
                className={`w-full rounded-t-md transition-all duration-500 bg-gradient-to-t ${theme.gradient} opacity-80 group-hover:opacity-100`}
                style={{ height: `${h}%` }}
              ></div>
              <div
                className="w-full rounded-b-md bg-gray-300 dark:bg-gray-700 opacity-50"
                style={{ height: `${h * 0.6}%` }}
              ></div>
            </div>
          ))}
        </div>
      </IOSCard>

      {/* 6. ÚLTIMAS TRANSACCIONES */}
      <IOSCard className="md:col-span-2 lg:col-span-2 h-64 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold dark:text-white flex items-center gap-2">
            <Clock size={18} className="text-gray-400" /> Recientes
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-3">
          {[...transactions].reverse().map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                  {tx.type === 'income' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                </div>
                <div>
                  <p className="text-xs font-bold dark:text-gray-200 line-clamp-1">{tx.desc}</p>
                  <p className="text-[10px] text-gray-400">{tx.date}</p>
                </div>
              </div>
              <span className={`text-xs font-bold ${tx.type === 'income' ? 'text-green-500' : 'text-gray-500'}`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </IOSCard>
    </div>
  );
};

// Componente Lista de Proyectos (Nueva Vista)
const ProjectList = ({ projects, onCreate, onEdit, accent }) => {
  const theme = THEMES[accent];
  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Gestión de Proyectos</h2>
        <button onClick={onCreate} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold ${theme.solid} ${theme.shadow} transition-transform hover:scale-105 active:scale-95`}>
          <Plus size={18} /> Nuevo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(proj => (
          <IOSCard key={proj.id} onClick={() => onEdit(proj)} className="cursor-pointer group relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${proj.status === 'Retrasado' ? 'bg-red-500' : 'bg-gradient-to-b ' + theme.gradient}`}></div>
            <div className="pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg dark:text-white">{proj.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${proj.status === 'Retrasado' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{proj.client}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${theme.solid}`} style={{ width: `${proj.progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-gray-500">{proj.progress}%</span>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>
    </div>
  );
};

// Componente Lista de Usuarios
const IOSList = ({ users, onDelete, onEdit, onCreate, accent }) => {
  const [search, setSearch] = useState('');
  const theme = THEMES[accent];
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <div className="mb-6 sticky top-0 z-20 pt-2">
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:${theme.text}`} size={18} />
          <input type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-md border-none rounded-2xl py-3 pl-12 pr-4 text-gray-800 dark:text-white placeholder-gray-500 focus:ring-0 focus:bg-white/80 dark:focus:bg-black/50 transition-all shadow-inner" />
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map((user, idx) => (
          <div key={user.id} onClick={() => onEdit(user)} className="ios-glass-list-item flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl group transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer gap-3 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden`}>
                <AvatarDisplay avatar={user.avatar} name={user.name} />
              </div>
              <div><h4 className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</h4><p className="text-sm text-gray-500 dark:text-gray-400">{user.role} • {user.email}</p></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className={`hidden sm:flex px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Activo' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>{user.status}</div>
              <button onClick={(e) => { e.stopPropagation(); onDelete(user.id); }} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-red-500 opacity-80 hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all shadow-sm hover:scale-110 active:scale-90"><Trash2 size={16} /></button>
              <ChevronRight className="text-gray-300 dark:text-gray-600" size={20} />
            </div>
          </div>
        ))}
        <button onClick={onCreate} className={`w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-400 font-bold hover:${theme.border} hover:${theme.text} transition-all flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99]`}>
          <div className={`w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 group-hover:${theme.solid.split(' ')[0]} flex items-center justify-center transition-colors`}><Plus size={14} className="text-gray-500 group-hover:text-white" /></div>Crear Nuevo Usuario
        </button>
      </div>
    </div>
  );
};

// Componente Lista de Finanzas (Nueva Vista)
const FinanceList = ({ transactions, onAction, accent }) => {
  const theme = THEMES[accent];

  // Cálculos
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const net = income - expense;

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Finanzas</h2>
        <div className="flex gap-2">
          <button onClick={() => onAction('invoice')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/30 transition-transform hover:scale-105 active:scale-95`}>
            <Plus size={18} /> Ingreso
          </button>
          <button onClick={() => onAction('payment')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 transition-transform hover:scale-105 active:scale-95`}>
            <Plus size={18} /> Gasto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <IOSCard className="p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div><p className="text-sm text-gray-500 font-bold">Balance Neto</p><h3 className="text-3xl font-bold dark:text-white mt-1">${net.toLocaleString()}</h3></div>
            <div className={`p-3 rounded-2xl ${net >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}><DollarSign size={24} /></div>
          </div>
        </IOSCard>
        <IOSCard className="p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div><p className="text-sm text-gray-500 font-bold">Ingresos Totales</p><h3 className="text-3xl font-bold text-green-500 mt-1">+${income.toLocaleString()}</h3></div>
            <div className="p-3 rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30"><TrendingUp size={24} /></div>
          </div>
        </IOSCard>
        <IOSCard className="p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div><p className="text-sm text-gray-500 font-bold">Gastos Totales</p><h3 className="text-3xl font-bold text-red-500 mt-1">-${expense.toLocaleString()}</h3></div>
            <div className="p-3 rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30"><TrendingUp size={24} className="rotate-180" /></div>
          </div>
        </IOSCard>
      </div>

      <IOSCard className="mb-8 h-64 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center mb-4 z-10">
          <h3 className="font-bold text-lg dark:text-white flex items-center gap-2"><BarChart3 size={20} className={theme.text} /> Flujo de Caja</h3>
        </div>
        <div className="flex-1 flex items-end gap-6 px-2 pb-2 z-10">
          {[65, 45, 75, 55, 80, 60, 90, 70, 85, 50, 60, 75].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group">
              <div className={`w-full rounded-t-md transition-all duration-500 bg-gradient-to-t ${theme.gradient} opacity-80 group-hover:opacity-100`} style={{ height: `${h}%` }}></div>
              <div className="w-full rounded-b-md bg-gray-300 dark:bg-gray-700 opacity-50" style={{ height: `${h * 0.6}%` }}></div>
            </div>
          ))}
        </div>
      </IOSCard>

      <h3 className="text-xl font-bold dark:text-white mb-4">Historial de Transacciones</h3>
      <div className="space-y-3">
        {[...transactions].reverse().map((tx) => (
          <div key={tx.id} className="ios-glass-list-item flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl group transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${tx.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                {tx.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div>
                <p className="font-bold dark:text-gray-200 text-lg">{tx.desc}</p>
                <p className="text-sm text-gray-400">{tx.date}</p>
              </div>
            </div>
            <span className={`text-lg font-bold ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
              {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NUEVAS VISTAS ---

const ExpenseControlView = ({ transactions, accent }) => {
  const theme = THEMES[accent];
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const budget = 5000; // Mock budget
  const percentage = Math.min((totalExpenses / budget) * 100, 100);

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto pb-10">
      <h2 className="text-2xl font-bold dark:text-white mb-6">Control de Gastos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <IOSCard className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Presupuesto Mensual</p>
              <h3 className="text-3xl font-bold dark:text-white mt-1">${budget.toLocaleString()}</h3>
            </div>
            <div className={`p-3 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30`}><Wallet size={24} /></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Gastado: ${totalExpenses.toLocaleString()}</span>
              <span>{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${percentage > 90 ? 'bg-red-500' : 'bg-gradient-to-r ' + theme.gradient}`} style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </IOSCard>

        <IOSCard className="p-6">
          <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2"><PieChart size={20} className={theme.text} /> Distribución</h3>
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm italic">
            Gráfica de distribución próximamente
          </div>
        </IOSCard>
      </div>

      <h3 className="text-xl font-bold dark:text-white mb-4">Últimos Gastos</h3>
      <div className="space-y-3">
        {expenses.slice(0, 5).map((tx) => (
          <div key={tx.id} className="ios-glass-list-item flex items-center justify-between p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30"><ArrowUpRight size={20} /></div>
              <div><p className="font-bold dark:text-gray-200">{tx.desc}</p><p className="text-xs text-gray-400">{tx.date}</p></div>
            </div>
            <span className="font-bold text-red-500">-${tx.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const InvestmentPortfolioView = ({ accent }) => {
  const theme = THEMES[accent];
  const portfolio = [
    { id: 1, asset: 'Bitcoin', symbol: 'BTC', amount: 0.45, value: 28500, change: +2.4 },
    { id: 2, asset: 'Apple Inc.', symbol: 'AAPL', amount: 15, value: 2625, change: -0.8 },
    { id: 3, asset: 'S&P 500 ETF', symbol: 'VOO', amount: 10, value: 4150, change: +0.5 },
  ];
  const totalValue = portfolio.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto pb-10">
      <h2 className="text-2xl font-bold dark:text-white mb-6">Portafolio de Inversión</h2>

      <IOSCard className="mb-8 p-8 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-10`}></div>
        <div className="relative z-10 text-center">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Valor Total</p>
          <h1 className="text-5xl font-bold dark:text-white mt-2 mb-4">${totalValue.toLocaleString()}</h1>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-bold">+1.2% (Hoy)</span>
        </div>
      </IOSCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.map(item => (
          <IOSCard key={item.id} className="p-5 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-xs ${theme.text}`}>{item.symbol}</div>
              <div>
                <h4 className="font-bold dark:text-white">{item.asset}</h4>
                <p className="text-xs text-gray-500">{item.amount} {item.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold dark:text-white">${item.value.toLocaleString()}</p>
              <p className={`text-xs font-bold ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </p>
            </div>
          </IOSCard>
        ))}
      </div>
    </div>
  );
};

const TradingViewWidget = ({ theme, symbol }) => {
  const container = React.useRef();

  useEffect(
    () => {
      if (container.current) {
        // Limpiar el contenedor antes de insertar el nuevo script
        container.current.innerHTML = '';
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "${theme === 'dark' ? 'dark' : 'light'}",
          "style": "1",
          "locale": "es",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
      }
    },
    [theme, symbol]
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
};

const FinancialDataView = ({ accent }) => {
  const theme = THEMES[accent];
  // Detectar si es modo oscuro basado en la clase 'dark' en html o prop
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [selectedSymbol, setSelectedSymbol] = useState('FX:USDMXN');
  const { data: currencies, loading } = useMarketData();

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto pb-10">
      <h2 className="text-2xl font-bold dark:text-white mb-6">Datos Financieros (En Vivo)</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          // Skeleton Loading
          [...Array(4)].map((_, i) => (
            <IOSCard key={i} className="p-4 h-24 animate-pulse bg-gray-200 dark:bg-gray-800"></IOSCard>
          ))
        ) : (
          currencies.map((c, i) => (
            <IOSCard
              key={i}
              onClick={() => setSelectedSymbol(c.symbol)}
              className={`p-4 cursor-pointer transition-all duration-300 ${selectedSymbol === c.symbol ? `ring-2 ring-offset-2 ${theme.ring} dark:ring-offset-gray-900 scale-105` : 'opacity-70 hover:opacity-100'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400">{c.pair}</span>
                {c.change !== 0 && (c.change >= 0 ? <ArrowUp size={16} className="text-green-500" /> : <ArrowDown size={16} className="text-red-500" />)}
              </div>
              <h3 className="text-xl font-bold dark:text-white">
                {c.pair.includes('JPY') ? c.price.toFixed(2) :
                  c.pair.includes('BTC') ? c.price.toLocaleString() :
                    c.price.toFixed(4)}
              </h3>
              <span className={`text-xs font-bold ${c.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {c.change > 0 ? '+' : ''}{c.change.toFixed(2)}%
              </span>
            </IOSCard>
          ))
        )}
      </div>

      <IOSCard className="h-[600px] p-0 overflow-hidden border border-gray-200 dark:border-gray-700">
        <TradingViewWidget theme={isDarkMode ? 'dark' : 'light'} symbol={selectedSymbol} />
      </IOSCard>
    </div>
  );
};


// --- APP PRINCIPAL ---

export default function App() {
  const { user, login, logout, loading, error, setUser } = useAuth();
  // Persistencia para Configuración
  const [settings, setSettings] = useLocalStorage('erp_settings_v1', { darkMode: true, accent: 'blue', wallpaper: 'midnight' });

  const [currentPage, setCurrentPage] = useState('dashboard'); // Navegación no necesariamente se persiste, pero se podría.
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);



  // States para Datos - AHORA PERSISTENTES
  const [users, setUsers] = useLocalStorage('erp_users_v1', INITIAL_USERS);
  const [transactions, setTransactions] = useLocalStorage('erp_transactions_v1', INITIAL_TRANSACTIONS);
  const [projects, setProjects] = useLocalStorage('erp_projects_v1', INITIAL_PROJECTS);
  const [notifications, setNotifications] = useLocalStorage('erp_notifications_v1', INITIAL_NOTIFICATIONS);

  // States para Modales
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isTxModalOpen, setTxModalOpen] = useState(false);
  const [txType, setTxType] = useState('income');

  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [settings.darkMode]);

  // Handlers Dashboard Actions
  const handleDashboardAction = (action) => {
    switch (action) {
      case 'invoice':
        setTxType('income');
        setTxModalOpen(true);
        break;
      case 'payment':
        setTxType('expense');
        setTxModalOpen(true);
        break;
      case 'user':
        setEditingUser(null);
        setUserModalOpen(true);
        break;
      case 'report':
        setReportModalOpen(true);
        break;
      case 'projects':
        setCurrentPage('projects');
        break;
      case 'notifications':
        setNotificationModalOpen(true);
        break;
      default:
        break;
    }
  };

  // Handlers CRUD
  const handleSaveTransaction = (txData) => {
    const newTx = {
      id: transactions.length + 1,
      ...txData,
      date: 'Ahora'
    };
    setTransactions([...transactions, newTx]);
    setTxModalOpen(false);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    else setUsers([...users, { id: users.length + 1, ...userData, avatar: userData.avatar || userData.name.substring(0, 2).toUpperCase() }]);
    setUserModalOpen(false);
  };

  const handleDeleteUser = (id) => { if (window.confirm("Eliminar usuario?")) setUsers(users.filter(u => u.id !== id)); };

  const handleSaveProject = (projData) => {
    if (editingProject) setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...projData } : p));
    else setProjects([...projects, { id: projects.length + 1, ...projData }]);
    setProjectModalOpen(false);
  };



  if (!user) {
    return (
      <div className={`relative h-screen w-screen overflow-hidden flex items-center justify-center font-sans ${settings.darkMode ? 'dark' : ''}`}>
        {/* Dynamic Background */}
        <div className="aurora-bg"></div>
        <div className="aurora-blob top-0 left-0 w-96 h-96 bg-purple-500/30"></div>
        <div className="aurora-blob bottom-0 right-0 w-96 h-96 bg-blue-500/30 animation-delay-2000"></div>

        {/* Login Card */}
        <IOSCard className="w-full max-w-md !p-8 !bg-white/10 dark:!bg-black/30 backdrop-blur-3xl border-white/20 shadow-2xl animate-spring-in mx-4">
          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-4 animate-float">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">ERP System</h1>
            <p className="text-white/60 text-sm mt-2">Bienvenido de nuevo</p>
          </div>

          {error && <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-white text-xs text-center backdrop-blur-md">{error}</div>}

          <div className="space-y-5 animate-fade-in">
            <p className="text-white/70 text-center text-sm mb-4">Inicia sesión de forma segura con tu cuenta.</p>
            <button
              onClick={() => login()}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <ShieldCheck size={20} />
              {loading ? 'Redirigiendo...' : 'Continuar con Auth0'}
            </button>
          </div>
        </IOSCard>

        <div className="absolute bottom-6 text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium">
          Powered by Antigravity
        </div>
        <style>{`.animate-float { animation: float 6s ease-in-out infinite; } @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 ${settings.darkMode ? 'dark' : ''}`}>
      {/* DYNAMIC WALLPAPER BACKGROUND */}
      <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${WALLPAPERS[settings.wallpaper]}`}></div>

      {/* AURORA BLOBS OVERLAY */}
      <div className="aurora-blob bg-purple-500 w-96 h-96 top-0 -left-20 mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="aurora-blob bg-cyan-500 w-96 h-96 top-0 -right-20 mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="aurora-blob bg-pink-500 w-96 h-96 -bottom-32 left-20 mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* CONTENIDO PRINCIPAL CON GLASS EFFECT */}
      <div className="relative z-10 flex w-full h-full bg-white/10 dark:bg-black/40 backdrop-blur-[100px]">

        {/* SIDEBAR FLOTANTE */}
        {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
        <aside
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`
          fixed lg:relative z-50 h-[90%] lg:h-[96%] my-auto ml-4
          flex flex-col items-center justify-between py-8 
          rounded-[44px] ios-glass border border-white/10 shadow-2xl
          transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          ${isSidebarOpen ? 'translate-x-4' : '-translate-x-[200%] lg:translate-x-0'}
          ${isSidebarHovered ? 'w-[240px] items-start px-6' : 'w-[90px] items-center'}
        `}>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/20 shadow-inner transition-all duration-500 ${isSidebarHovered ? 'w-full flex-row gap-3 justify-start px-4' : ''}`}>
            <ShieldCheck className="text-white drop-shadow-md shrink-0" size={28} />
            <span className={`text-white font-bold text-lg whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>ERP System</span>
          </div>

          <nav className={`space-y-4 flex flex-col w-full ${isSidebarHovered ? 'items-start' : 'items-center'}`}>
            <button
              onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'dashboard' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <LayoutGrid size={24} strokeWidth={currentPage === 'dashboard' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Dashboard</span>
            </button>

            <button
              onClick={() => { setCurrentPage('projects'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'projects' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <Briefcase size={24} strokeWidth={currentPage === 'projects' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Proyectos</span>
            </button>

            <button
              onClick={() => { setCurrentPage('users'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'users' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <Users size={24} strokeWidth={currentPage === 'users' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Usuarios</span>
            </button>

            <button
              onClick={() => { setCurrentPage('finances'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'finances' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <DollarSign size={24} strokeWidth={currentPage === 'finances' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Finanzas</span>
            </button>

            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

            <button
              onClick={() => { setCurrentPage('expenses'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'expenses' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <PieChart size={24} strokeWidth={currentPage === 'expenses' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Gastos</span>
            </button>

            <button
              onClick={() => { setCurrentPage('portfolio'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'portfolio' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <LineChart size={24} strokeWidth={currentPage === 'portfolio' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Inversión</span>
            </button>

            <button
              onClick={() => { setCurrentPage('market'); setSidebarOpen(false); }}
              className={`p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group flex items-center gap-4 ${currentPage === 'market' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5 hover:scale-110 active:scale-90'} ${isSidebarHovered ? 'w-full justify-start px-4' : ''}`}
            >
              <Globe size={24} strokeWidth={currentPage === 'market' ? 2.5 : 2} className="shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>Mercado</span>
            </button>

            <button
              onClick={logout}
              className="p-4 rounded-full text-red-400/60 hover:text-red-500 hover:bg-red-500/10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-125 active:scale-90"
            >
              <LogOut size={24} />
            </button>
          </nav>

          <div className="relative group cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-95" onClick={() => document.getElementById('sidebar-avatar-input').click()}>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/80 transition-all shadow-lg">
              <AvatarDisplay avatar={user?.avatar} name={user?.username} />
            </div>
            <div className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">EDIT</div>
            <input
              type="file"
              id="sidebar-avatar-input"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (readerEvent) => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const MAX_WIDTH = 150;
                      const scaleSize = MAX_WIDTH / img.width;
                      canvas.width = MAX_WIDTH;
                      canvas.height = img.height * scaleSize;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                      const dataUrl = canvas.toDataURL(file.type);
                      setUser({ ...user, avatar: dataUrl });
                    };
                    img.src = readerEvent.target.result;
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative h-full w-full">
          <header className="flex justify-between items-start pt-2 px-4 mb-4">
            <div className="lg:hidden z-30"><button className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md border border-white/5" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button></div>

            <SmartCapsule onAction={handleDashboardAction} hasNotifications={notifications.length > 0} />

            <div className="ml-auto flex gap-4 z-30 items-center">
              <button
                onClick={() => setControlCenterOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/10 transition-all text-white group hover:scale-105 active:scale-95"
              >
                <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-sm font-medium">Ajustes</span>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-6 scrollbar-hide">
            <div className="max-w-7xl mx-auto pt-10">
              {currentPage === 'dashboard' && <BentoDashboard users={users} transactions={transactions} projects={projects} accent={settings.accent} onAction={handleDashboardAction} />}
              {currentPage === 'users' && <IOSList users={users} onDelete={handleDeleteUser} onEdit={(u) => { setEditingUser(u); setUserModalOpen(true) }} onCreate={() => { setEditingUser(null); setUserModalOpen(true) }} accent={settings.accent} />}
              {currentPage === 'projects' && <ProjectList projects={projects} onEdit={(p) => { setEditingProject(p); setProjectModalOpen(true) }} onCreate={() => { setEditingProject(null); setProjectModalOpen(true) }} accent={settings.accent} />}
              {currentPage === 'finances' && <FinanceList transactions={transactions} onAction={handleDashboardAction} accent={settings.accent} />}
              {currentPage === 'expenses' && <ExpenseControlView transactions={transactions} accent={settings.accent} />}
              {currentPage === 'portfolio' && <InvestmentPortfolioView accent={settings.accent} />}
              {currentPage === 'market' && <FinancialDataView accent={settings.accent} />}
            </div>
          </div>
        </main>

        <UserModal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} onSave={handleSaveUser} userToEdit={editingUser} currentTheme={settings.accent} />
        <TransactionModal isOpen={isTxModalOpen} onClose={() => setTxModalOpen(false)} onSave={handleSaveTransaction} type={txType} currentTheme={settings.accent} />
        <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} transactions={transactions} currentTheme={settings.accent} />
        <ProjectModal isOpen={isProjectModalOpen} onClose={() => setProjectModalOpen(false)} onSave={handleSaveProject} projectToEdit={editingProject} currentTheme={settings.accent} />
        <NotificationModal isOpen={isNotificationModalOpen} onClose={() => setNotificationModalOpen(false)} notifications={notifications} onClear={() => setNotifications([])} currentTheme={settings.accent} />
        <ControlCenter isOpen={controlCenterOpen} onClose={() => setControlCenterOpen(false)} settings={settings} setSettings={setSettings} logout={logout} />
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .ios-glass { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2); } .dark .ios-glass { background: rgba(20, 20, 25, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05); } .animate-spring-in { animation: springIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; } @keyframes springIn { from { opacity: 0; transform: scale(0.9) translateY(-10px); } to { opacity: 1; transform: scale(1) translateY(0); } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }`}</style>
    </div>
  );
}