
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Lock, 
  MessageCircle, 
  PhoneCall, 
  ChevronLeft, 
  Zap,
  Award,
  Layers,
  Fingerprint,
  Send,
  Unlock,
  CheckCircle2,
  MapPin,
  Clock,
  MonitorSmartphone,
  Facebook,
  Instagram,
  Mail,
  Music,
  Camera,
  Settings,
  AppWindow,
  Wifi,
  Battery,
  Signal,
  Compass,
  LayoutGrid,
  Video,
  StickyNote,
  Sparkles,
  Search,
  Bot,
  UserRound,
  Info,
  Users,
  Eye,
  Globe,
  Share2,
  Radio,
  ExternalLink,
  Radar,
  Languages,
  Cpu,
  RefreshCw,
  Image as ImageIcon,
  Play,
  Phone,
  Rocket,
  GraduationCap,
  HardDrive,
  Cable,
  TabletSmartphone,
  CheckCircle,
  Star
} from 'lucide-react';
import { geminiService } from './geminiService';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [adviceRequest, setAdviceRequest] = useState('');
  const [adviceResponse, setAdviceResponse] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  
  // Visitor Tracking States
  const [visitorCount, setVisitorCount] = useState(0);
  const [showVisitorInfo, setShowVisitorInfo] = useState(false);
  const [referrer, setReferrer] = useState<{ platform: string, label: string, icon: React.ReactNode, color: string, bgColor: string }>({ 
    platform: 'direct',
    label: 'زائر مباشر', 
    icon: <Globe className="w-5 h-5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20'
  });

  const phoneNumber = "07700583840";
  const waLink = `https://wa.me/964${phoneNumber.substring(1)}`;
  const tgLink = "https://t.me/iraq20252";

  const services = [
    {
      title: "تخطي iCloud الشامل",
      desc: "الحل النهائي والآمن لفك قفل التنشيط من iPhone 6 وصولاً إلى iPhone 17 Pro Max مع تفعيل كافة الوظائف والشبكة.",
      icon: <Lock className="w-6 h-6 text-[#00f2ff]" />,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      color: "border-[#00f2ff]/30",
      msg: "مرحباً، أود الاستفسار عن خدمة تخطي الأيكلود لأحدث الموديلات."
    },
    {
      title: "تبديل شاشات الوكالة",
      desc: "نقدم خدمة استبدال شاشات أصلية (وكالة) مع ضمان الألوان وسرعة اللمس وكأن الجهاز خرج للتو من المصنع.",
      icon: <Smartphone className="w-6 h-6 text-[#d4af37]" />,
      image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&q=80&w=800",
      color: "border-[#d4af37]/30",
      msg: "مرحباً، أود استبدال شاشة جهازي بشاشة وكالة أصلية."
    },
    {
      title: "صيانة آيسيات الشحن",
      desc: "متخصصون في تبديل آيسيات الشحن (U2) وحل مشاكل استنزاف البطارية أو توقف الشحن المفاجئ بدقة متناهية.",
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
      color: "border-blue-400/30",
      msg: "مرحباً، لدي مشكلة في آيسي الشحن وأحتاج لصيانته."
    },
    {
      title: "قواعد الشحن الأصلية",
      desc: "نبدل قاعدة الشحن مع الحفاظ التام على بورد الشحن الأصلي لضمان ثبات الشبكة وسرعة الشحن الحقيقية.",
      icon: <Cable className="w-6 h-6 text-emerald-400" />,
      image: "https://images.unsplash.com/photo-1601524909162-cd872528dec5?auto=format&fit=crop&q=80&w=800",
      color: "border-emerald-400/30",
      msg: "مرحباً، أود تبديل قاعدة الشحن مع الحفاظ على البورد الأصلي."
    },
    {
      title: "تبديل الكنكترات",
      desc: "خدمة احترافية لتبديل جميع أنواع الكنكترات للهواتف (كنكتر شاشة، بطارية، بصمة) بأحدث المجهر الرقمي.",
      icon: <Settings className="w-6 h-6 text-purple-400" />,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
      color: "border-purple-400/30",
      msg: "مرحباً، أحتاج لتبديل كنكتر في بورد جهازي."
    },
    {
      title: "كلاسات الآيباد",
      desc: "تبديل زجاج (كلاس) الآيباد لجميع الموديلات بدقة عالية مع الحفاظ على الشاشة الداخلية الأصلية.",
      icon: <TabletSmartphone className="w-6 h-6 text-rose-400" />,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
      color: "border-rose-400/30",
      msg: "مرحباً، أود تبديل كلاس الآيباد الخاص بي."
    }
  ];

  const courses = [
    {
      title: "دورات صيانة الهاردوير",
      desc: "تعلم أسرار صيانة البورد وتبديل القطع بنصف السعر لفترة محدودة. تعليم عملي مكثف.",
      icon: <HardDrive className="w-10 h-10 text-[#d4af37]" />,
      highlight: "خصم 50%"
    },
    {
      title: "دورات السوفت وير والأيكلود",
      desc: "كن محترفاً في برمجة الهواتف، تخطي الأيكلود، وحذف حسابات السيرفر بأحدث الثغرات العالمية.",
      icon: <GraduationCap className="w-10 h-10 text-[#00f2ff]" />,
      highlight: "احترافي"
    }
  ];

  const iOSIcons = [
    { icon: <Mail className="w-6 h-6 text-white" />, color: 'bg-blue-500', name: 'Mail' },
    { icon: <ImageIcon className="w-6 h-6 text-blue-400" />, color: 'bg-white', name: 'Photos' },
    { icon: <Camera className="w-6 h-6 text-white" />, color: 'bg-gray-400', name: 'Camera' },
    { icon: <Settings className="w-6 h-6 text-white" />, color: 'bg-gray-600', name: 'Settings' },
    { icon: <Compass className="w-6 h-6 text-blue-600" />, color: 'bg-white', name: 'Safari' },
    { icon: <MessageCircle className="w-6 h-6 text-white" />, color: 'bg-green-500', name: 'Messages' },
  ];

  const dockIcons = [
    { icon: <Phone className="w-6 h-6 text-white" />, color: 'bg-green-600' },
    { icon: <Music className="w-6 h-6 text-white" />, color: 'bg-red-500' },
    { icon: <Video className="w-6 h-6 text-white" />, color: 'bg-blue-600' },
    { icon: <Play className="w-6 h-6 text-white" />, color: 'bg-black' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    setVisitorCount(Math.floor(Math.random() * 50) + 160);
    const activityInterval = setInterval(() => {
      setVisitorCount(v => v + (Math.random() > 0.5 ? 1 : -1));
    }, 4500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(activityInterval);
    };
  }, []);

  const handleGetAdvice = async () => {
    if (!adviceRequest) return;
    setLoadingAdvice(true);
    try {
      const result = await geminiService.getAdvice(adviceRequest);
      setAdviceResponse(result || "");
    } catch (e) {
      setAdviceResponse("تفضل بزيارتنا في بعقوبة حي المعلمين وسنجد الحل المناسب لهاتفك.");
    }
    setLoadingAdvice(false);
  };

  return (
    <div className="min-h-screen bg-[#050b1a] overflow-x-hidden text-slate-200 selection:bg-[#00f2ff] selection:text-black font-['Cairo']">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'py-2 bg-[#050b1a]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-lg' : 'py-4 bg-transparent'}`}>
        <div className="container mx-auto px-4 flex justify-between items-start">
          
          {/* Logo Section (Right) */}
          <div className="flex flex-col items-end gap-2 relative">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-[#00f2ff] via-[#d4af37] to-[#556b2f] p-1.5 rounded-lg shadow-[0_0_15px_rgba(0,242,255,0.4)]">
                <Smartphone className="text-slate-900 w-5 h-5" />
              </div>
              <div className="text-right">
                <h1 className="text-lg font-black tracking-tight text-white leading-none">كلاسك <span className="text-[#00f2ff]">فون</span></h1>
                <span className="text-[7px] text-[#d4af37] font-black uppercase block tracking-widest mt-0.5">DIALA - BAQUBAH</span>
              </div>
            </div>

            {/* RADAR BUTTON */}
            <div className="relative">
              <button 
                onClick={() => setShowVisitorInfo(!showVisitorInfo)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all active:scale-95 shadow-lg ${showVisitorInfo ? 'bg-[#00f2ff]/10 border-[#00f2ff]' : 'bg-black/40 border-[#d4af37]/50 hover:border-[#00f2ff]'} group`}
              >
                <div className="relative">
                  <Eye className={`w-4 h-4 ${showVisitorInfo ? 'text-[#00f2ff]' : 'text-[#d4af37]'} group-hover:scale-110 transition-transform`} />
                  <div className="absolute -top-1 -right-1">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
                  </div>
                </div>
                <span className={`text-[10px] font-black ${showVisitorInfo ? 'text-[#00f2ff]' : 'text-white'}`}>رادار الزوار</span>
              </button>

              {/* RADAR INFO BOX */}
              <div className={`absolute top-full right-0 mt-3 w-64 glass-premium p-4 rounded-[1.5rem] border-[#00f2ff]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-end gap-3 transition-all duration-300 origin-top-right z-[300] ${showVisitorInfo ? 'scale-100 opacity-100 translate-y-0 visible' : 'scale-95 opacity-0 -translate-y-4 invisible pointer-events-none'}`}>
                <div className="flex items-center gap-3 w-full justify-between border-b border-white/10 pb-2">
                   <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/20">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">Live Monitor</span>
                   </div>
                   <span className="text-[8px] text-[#d4af37] font-bold uppercase tracking-widest">Active Radar</span>
                </div>
                <div className="flex items-baseline gap-2 w-full justify-end">
                   <span className="text-3xl font-black text-[#00f2ff] leading-none tracking-tighter tabular-nums">{visitorCount}</span>
                   <span className="text-[9px] text-slate-400 font-bold uppercase">زائر نشط</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 w-full flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-full border border-white/10 ${referrer.color}`}>
                    <span className="text-[8px] font-black">{referrer.label}</span>
                    {referrer.icon}
                  </div>
                  <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons (Left) */}
          <div className="flex gap-3 mt-1">
            <a href={tgLink} target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:brightness-110 shadow-lg flex items-center gap-2 transition-all active:scale-95">
              <Send className="w-4 h-4" /> انضمو الى كروبنا في التلكرام
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:brightness-110 shadow-lg flex items-center gap-2 transition-all active:scale-95">
              <MessageCircle className="w-4 h-4" /> واتساب
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <header className="pt-48 pb-16 px-4 relative overflow-hidden">
        <div className="container mx-auto flex flex-col items-center text-center">
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 glass-premium rounded-full border border-[#d4af37]/40 shadow-2xl animate-float">
              <Award className="w-6 h-6 text-[#d4af37]" />
              <span className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.3em]">بإدارة المبدع: أحمد النعيمي</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#00f2ff]/10 backdrop-blur-md rounded-full border border-[#00f2ff]/40 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
              <Star className="w-5 h-5 text-[#00f2ff]" />
              <span className="text-[#00f2ff] text-[11px] font-black uppercase tracking-[0.2em]">خبرة 10 سنوات من الإبداع</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-[#00f2ff] text-xl font-black tracking-widest uppercase opacity-80">نحن نصنع المستقبل في عالم الهواتف</h3>
            <h2 className="text-4xl md:text-7xl font-black leading-tight text-white">
              تخطي الأيكلود <span className="text-[#00f2ff]">الشامل</span> <br />
              <span className="text-[#d4af37] italic text-2xl md:text-5xl block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] to-[#00f2ff]">من iPhone 6 إلى iPhone 17 Pro Max</span>
            </h2>
          </div>

          <div className="max-w-3xl mb-12">
            <p className="text-slate-200 text-xl md:text-3xl font-black leading-relaxed bg-[#00f2ff]/5 p-6 rounded-[2rem] border border-[#00f2ff]/20 shadow-xl backdrop-blur-sm">
               بوابتك لـ <span className="text-[#00f2ff]">مستقبل الهواتف</span>؛ خبراء السيرفرات العالمية وتخطي الأيكلود وصيانة الهاردوير الاحترافية.
            </p>
          </div>

          {/* iPhone Comparison Section */}
          <div className="relative mb-20 scale-100 w-full max-w-2xl mx-auto">
             <div className="absolute -inset-24 bg-[#00f2ff]/10 blur-[150px] rounded-full opacity-60"></div>
             <div className="relative glass-premium p-10 rounded-[4rem] border-[#00f2ff]/40 shadow-[0_0_120px_rgba(0,242,255,0.25)]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
                  
                  {/* Left Side: iPhone (LOCKED - White Mode) */}
                  <div className="flex-1 flex flex-col items-center gap-6 group">
                    <div className="relative w-56 h-[460px] bg-white rounded-[3.8rem] border-[8px] border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-transform duration-500 group-hover:scale-105">
                       <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20"></div>
                       <div className="absolute inset-0 flex flex-col items-center pt-24 px-6 text-slate-900">
                          <div className="bg-slate-100 p-4 rounded-full mb-8">
                            <Lock className="w-12 h-12 text-slate-800" />
                          </div>
                          <h3 className="text-xl font-black mb-2 text-center leading-tight">iPhone مقيد بمالك</h3>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-bold text-center px-2">
                             يرتبط هذا الـ iPhone بـ Apple ID. الرجاء إدخال البريد الإلكتروني وكلمة السر التي تم استخدامها لإعداد هذا الـ iPhone.
                          </p>
                          <div className="mt-auto mb-16 w-full flex flex-col gap-4">
                             <div className="w-full flex justify-between items-center border-b border-slate-200 py-2">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Apple ID</span>
                                <div className="w-1/2 h-2 bg-slate-100 rounded-full"></div>
                             </div>
                             <div className="w-full flex justify-between items-center border-b border-slate-200 py-2">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Password</span>
                                <div className="w-1/2 h-2 bg-slate-100 rounded-full"></div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="bg-red-500/20 px-8 py-3 rounded-2xl border border-red-500/30 shadow-lg backdrop-blur-sm">
                       <span className="text-red-500 text-sm font-black uppercase tracking-widest">قبل التخطي</span>
                    </div>
                  </div>

                  {/* Central Unlock Animation */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                    <div className="bg-gradient-to-br from-[#00f2ff] to-[#d4af37] p-6 rounded-full shadow-[0_0_60px_rgba(0,242,255,1)] border-2 border-white animate-pulse">
                       <Rocket className="w-12 h-12 text-slate-900" />
                    </div>
                  </div>

                  {/* Right Side: iPhone (UNLOCKED - Real iOS UI) */}
                  <div className="flex-1 flex flex-col items-center gap-6 group">
                    <div className="relative w-56 h-[460px] bg-slate-900 rounded-[3.8rem] border-[8px] border-[#00f2ff] shadow-[0_0_80px_rgba(0,242,255,0.4)] overflow-hidden ring-1 ring-[#00f2ff]/50 transition-transform duration-500 group-hover:scale-105">
                       <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-20 flex items-center justify-between px-4">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="text-[9px] text-white font-black tracking-widest uppercase">9:41</div>
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-br from-[#00f2ff] via-[#1a2a6c] to-[#050b1a] opacity-95"></div>
                       <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden z-10 flex flex-col items-center pt-20 px-4">
                          <div className="grid grid-cols-3 gap-y-6 gap-x-6 w-full px-2">
                             {iOSIcons.map((item, idx) => (
                               <div key={idx} className="flex flex-col items-center gap-1">
                                  <div className={`w-11 h-11 ${item.color} rounded-[22%] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110`}>
                                     {React.cloneElement(item.icon as React.ReactElement<any>, { className: `${(item.icon as any).props.className}` })}
                                  </div>
                                  <span className="text-[7px] text-white font-black truncate w-full text-center">{item.name}</span>
                               </div>
                             ))}
                          </div>
                          <div className="mt-auto mb-6 w-full px-2">
                             <div className="bg-white/20 backdrop-blur-3xl py-3 px-3 rounded-[2rem] border border-white/20 shadow-2xl flex items-center justify-around gap-2">
                                {dockIcons.map((item, idx) => (
                                   <div key={idx} className={`w-10 h-10 ${item.color} rounded-[22%] flex items-center justify-center shadow-md transform transition-transform hover:scale-110`}>
                                      {item.icon}
                                   </div>
                                ))}
                             </div>
                          </div>
                          <div className="absolute bottom-1.5 w-20 h-1 bg-white/40 rounded-full"></div>
                       </div>
                    </div>
                    <div className="bg-[#00f2ff]/20 px-8 py-3 rounded-2xl border border-[#00f2ff]/30 shadow-xl backdrop-blur-sm">
                       <span className="text-[#00f2ff] text-sm font-black uppercase tracking-widest">تم التخطي</span>
                    </div>
                  </div>

                </div>
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
            <a href={tgLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#0088cc] text-white px-8 py-6 rounded-[2rem] font-black text-lg shadow-[0_25px_60px_rgba(0,136,204,0.4)] flex items-center justify-center gap-5 hover:scale-105 active:scale-95 transition-all">
              <Send className="w-8 h-8" /> انضمو الى كروبنا في التلكرام
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] text-white px-8 py-6 rounded-[2rem] font-black text-lg shadow-[0_25px_60px_rgba(37,211,102,0.4)] flex items-center justify-center gap-5 hover:scale-105 active:scale-95 transition-all">
              <MessageCircle className="w-8 h-8" /> ابدأ صيانة هاتفك الآن
            </a>
          </div>
        </div>
      </header>

      {/* Services Grid Section */}
      <section className="py-24 px-4 bg-[#070d1d]/80 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-5xl font-black text-white">خدماتنا <span className="text-[#d4af37]">الاحترافية</span></h3>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic">
              "دقة في الأداء، سرعة في الإنجاز، وأمان تام لبياناتك."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <a 
                key={index}
                href={`${waLink}?text=${encodeURIComponent(service.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-premium rounded-[2.5rem] border-2 ${service.color} transition-all hover:-translate-y-2 group overflow-hidden flex flex-col text-right`}
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                   <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a2d] to-transparent"></div>
                   <div className="absolute top-6 right-6 p-4 bg-[#050b1a]/80 backdrop-blur-md rounded-2xl border border-white/10 group-hover:scale-110 transition-transform shadow-lg shadow-black/40">
                    {service.icon}
                   </div>
                </div>

                <div className="p-8 flex flex-col items-end flex-grow">
                  <h4 className="text-xl font-black text-[#00f2ff] mb-3 tracking-tight group-hover:text-white transition-colors">{service.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">{service.desc}</p>
                  
                  <div className="mt-auto w-full pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Premium Service</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#00f2ff]">
                      <span className="text-xs font-black uppercase tracking-widest">اطلب الآن</span>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Training Academy Section */}
      <section className="py-24 px-4 bg-[#050b1a] relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="container mx-auto">
            <div className="text-center mb-16">
               <h3 className="text-3xl md:text-5xl font-black text-white mb-4">أكاديمية <span className="text-[#00f2ff]">كلاسك للتدريب</span></h3>
               <p className="text-slate-500 font-medium">نقل الخبرة للأجيال القادمة بأعلى معايير التدريب المهني</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               {courses.map((course, idx) => (
                  <div key={idx} className="glass-premium p-10 rounded-[3rem] border-[#d4af37]/20 flex flex-col items-center text-center group hover:border-[#00f2ff]/50 transition-all">
                     <div className="mb-6 p-6 bg-white/5 rounded-[2rem] border border-white/10 group-hover:scale-110 transition-transform relative">
                        {course.icon}
                        <div className="absolute -top-3 -right-3 bg-[#d4af37] text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                           {course.highlight}
                        </div>
                     </div>
                     <h4 className="text-2xl font-black text-white mb-4">{course.title}</h4>
                     <p className="text-slate-400 font-medium mb-8 leading-relaxed">{course.desc}</p>
                     <a href={waLink} target="_blank" className="mt-auto flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-[#00f2ff]/20 rounded-2xl border border-white/10 transition-all font-black text-[#00f2ff]">
                        <CheckCircle className="w-5 h-5" />
                        سجل الآن في الدورة
                     </a>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* AI Assistant */}
      <section className="py-24 px-4 bg-[#050b1a]">
        <div className="container mx-auto">
          <div className="glass-premium p-12 md:p-20 rounded-[5rem] border-[#d4af37]/30 max-w-5xl mx-auto shadow-2xl text-center">
             <div className="flex flex-col items-center gap-6 mb-12">
                <div className="bg-gradient-to-br from-[#00f2ff] to-[#d4af37] p-6 rounded-[2.5rem] shadow-2xl animate-bounce">
                   <Bot className="text-slate-900 w-14 h-14" />
                </div>
                <h3 className="text-4xl font-black text-white">المساعد الذكي لكلاسك فون</h3>
                <p className="text-slate-400 font-medium">نحن هنا لتشخيص أعطال هاتفك بأحدث تقنيات الذكاء الاصطناعي</p>
             </div>
             <div className="relative group mb-12">
                <textarea 
                  value={adviceRequest}
                  onChange={(e) => setAdviceRequest(e.target.value)}
                  placeholder="صف مشكلة هاتفك بدقة هنا... (مثال: جهازي مقفل أيكلود)"
                  className="w-full bg-[#050b1a]/90 rounded-[3rem] p-10 outline-none border border-white/10 focus:border-[#00f2ff] h-56 text-white text-xl text-right shadow-inner transition-all placeholder:text-slate-700 resize-none leading-relaxed font-['Cairo']"
                />
                <button 
                  onClick={handleGetAdvice}
                  disabled={loadingAdvice || !adviceRequest}
                  className="absolute bottom-10 left-10 bg-gradient-to-br from-[#00f2ff] to-[#00a3ff] text-slate-900 px-12 py-5 rounded-[2rem] font-black text-base flex items-center gap-4 shadow-2xl disabled:opacity-30 active:scale-95 transition-all"
                >
                  {loadingAdvice ? <Clock className="animate-spin w-7 h-7" /> : <Search className="w-7 h-7" />}
                  {loadingAdvice ? "جاري التحليل..." : "بدء التشخيص الذكي"}
                </button>
             </div>
             {adviceResponse && (
                <div className="p-12 bg-[#0a1628]/95 rounded-[4rem] border border-[#d4af37]/40 text-right shadow-2xl animate-in zoom-in duration-500">
                   <p className="text-white text-lg md:text-xl leading-relaxed font-medium whitespace-pre-wrap">{adviceResponse}</p>
                </div>
             )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050b1a] py-24 border-t border-[#d4af37]/20 rounded-t-[6rem] shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-20"></div>
        <div className="container mx-auto px-4">
          <div className="mb-16 space-y-8 flex flex-col items-center">
            <h2 className="text-5xl font-black text-white tracking-[0.5em] mb-4">كلاسك <span className="text-[#00f2ff]">فون</span></h2>
            <p className="text-[#d4af37] font-black text-xl mb-4 italic">"نحن نصنع المستقبل في عالم الهواتف"</p>
            <p className="text-slate-500 text-lg font-medium max-w-[500px] leading-relaxed">
              المقر الأول والموثوق لصيانة وبرمجة الهواتف في ديالى - بعقوبة. بإشراف التقني المبدع <span className="text-white font-black underline underline-offset-8 decoration-[#00f2ff]">أحمد النعيمي</span>.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center mb-12">
             <a href={tgLink} target="_blank" className="p-4 glass-premium rounded-full border-blue-500/30 text-[#0088cc] hover:scale-110 transition-all">
                <Send className="w-6 h-6" />
             </a>
             <a href={waLink} target="_blank" className="p-4 glass-premium rounded-full border-green-500/30 text-[#25D366] hover:scale-110 transition-all">
                <MessageCircle className="w-6 h-6" />
             </a>
          </div>

          <div className="pt-16 border-t border-white/5 text-[10px] text-slate-700 font-black uppercase tracking-[0.8em]">
              © 2024 KLASK PHONE LAB • BAQUBAH - DIALA • FUTURE IS HERE
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
