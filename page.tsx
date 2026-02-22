'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Phone, 
  MessageCircle,
  Clock,
  Settings,
  GraduationCap,
  Send,
  Monitor,
  CheckCircle2,
  Wrench,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { ServiceAssistant } from "@/components/ServiceAssistant";
import { ReferralTracker } from "@/components/ReferralTracker";
import { useFirestore, useCollection, useDoc, useMemoFirebase, useFirebase } from "@/firebase";
import { collection, doc } from "firebase/firestore";

export default function Home() {
  const { isInitialized } = useFirebase();
  const [mounted, setMounted] = useState(false);
  const db = useFirestore();
  const [currentYear, setCurrentYear] = useState<number>(2024);
  
  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const servicesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, 'services');
  }, [db]);
  const { data: dbServices } = useCollection(servicesQuery);
  
  const showcasesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, 'repairShowcases');
  }, [db]);
  const { data: dbProjects } = useCollection(showcasesQuery);

  const coursesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, 'courses');
  }, [db]);
  const { data: dbCourses } = useCollection(coursesQuery);
  
  const profileRef = useMemoFirebase(() => {
    if (!db) return null;
    return doc(db, 'businessProfile', 'classic_mobile');
  }, [db]);
  const { data: info } = useDoc(profileRef);

  const getImg = (id: string) => (PlaceHolderImages || []).find(img => img.id === id);

  const iconMap: Record<string, any> = {
    Monitor: <Monitor className="w-10 h-10 text-primary" />,
    Zap: <Zap className="w-10 h-10 text-primary" />,
    ShieldCheck: <ShieldCheck className="w-10 h-10 text-primary" />,
    Cpu: <Cpu className="w-10 h-10 text-primary" />,
    Settings: <Settings className="w-10 h-10 text-primary" />,
    Smartphone: <Smartphone className="w-10 h-10 text-primary" />,
    Wrench: <Wrench className="w-10 h-10 text-primary" />
  };

  if (!mounted || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const whatsAppNumber = info?.whatsappNumber || "9647700583840";
  const whatsAppUrl = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}`;

  const handleServiceClick = (serviceName: string) => {
    const message = encodeURIComponent(`مرحباً كلاسك فون، أود الاستفسار عن خدمة: ${serviceName}`);
    window.open(`${whatsAppUrl}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(191,155,48,0.3)]">
              <Smartphone className="text-background w-8 h-8" />
            </div>
            <div>
              <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">{info?.name || "كلاسك فون"}</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Classic Mobile</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="#services" className="hover:text-primary transition-colors text-sm">الخدمات</Link>
            <Link href="#courses" className="hover:text-primary transition-colors text-sm">الدورات</Link>
            <Link href="#gallery" className="hover:text-primary transition-colors text-sm">المعرض</Link>
            <Link href="#ai-assistant" className="hover:text-primary transition-colors text-sm">المساعد الذكي</Link>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-background font-bold rounded-full px-6">
            <a href={whatsAppUrl} target="_blank">
              <MessageCircle className="ml-2 w-5 h-5" />
              صيانة فورية
            </a>
          </Button>
        </div>
      </nav>

      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImg('hero-bg')?.imageUrl || "https://picsum.photos/seed/repair1/1200/600"}
            alt="Hero Background"
            fill
            className="object-cover opacity-30 scale-105"
            priority
            data-ai-hint="mobile repair"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="max-w-3xl space-y-10 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-sm backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>نستخدم قطع غيار وكالة أصلية بضمان ملكي</span>
            </div>
            <h2 className="font-headline text-6xl md:text-8xl font-extrabold leading-[1.1] text-foreground text-right">
              فن الصيانة <br />
              <span className="text-primary italic">بلمسة ذهبية</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-r-4 border-primary/40 pr-6">
              نحن لا نصلح الهواتف فقط، بل نعيدها لحالتها الأصلية في قلب بعقوبة. متخصصون في الحلول المستعصية.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Button size="lg" className="h-16 px-10 text-xl bg-primary hover:bg-primary/90 text-background rounded-full font-bold shadow-lg" asChild>
                <a href="#services">استكشف خدماتنا</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-24">
            <h3 className="font-headline text-4xl md:text-6xl font-bold text-foreground">خدماتنا الملكية</h3>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(dbServices && dbServices.length > 0 ? dbServices : []).map((service, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer hover:border-primary/50 transition-all duration-500 bg-secondary/30 border-primary/10 backdrop-blur-sm overflow-hidden flex flex-col"
                onClick={() => handleServiceClick(service.name)}
              >
                {service.imageUrl && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image src={service.imageUrl} alt={service.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110" />
                  </div>
                )}
                <CardContent className="p-10 space-y-6 flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    {iconMap[service.iconName || 'Wrench'] || iconMap.Wrench}
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{service.name}</h4>
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {dbCourses && dbCourses.length > 0 && (
        <section id="courses" className="py-32 bg-secondary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
              <div className="space-y-4">
                <h3 className="font-headline text-5xl font-bold text-primary">أكاديمية كلاسك فون</h3>
                <p className="text-muted-foreground text-lg">احترف صيانة الهواتف بأيدي خبراء معتمدين.</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20">
                <GraduationCap className="w-12 h-12 text-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {dbCourses.map((course, i) => (
                <Card key={i} className="bg-background border-primary/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                  <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto">
                    {course.imageUrl ? (
                      <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 flex items-center justify-center"><GraduationCap className="w-20 h-20 text-primary/20" /></div>
                    )}
                    {course.discountPrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-1 rounded-full text-sm animate-pulse">عرض خاص</div>
                    )}
                  </div>
                  <CardContent className="p-8 lg:w-1/2 space-y-6">
                    <h4 className="font-headline text-3xl font-bold text-foreground">{course.title}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4 text-primary" /> المدة: {course.durationHours}</div>
                      <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4 text-primary" /> الموقع: {course.location}</div>
                      <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-primary" /> شهادة معتمدة من المركز</div>
                    </div>
                    <div className="flex items-end gap-3 pt-4 border-t border-primary/10">
                      {course.discountPrice ? (
                        <>
                          <span className="text-3xl font-bold text-primary">{course.discountPrice}</span>
                          <span className="text-lg text-muted-foreground line-through opacity-50 mb-1">{course.price}</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-primary">{course.price}</span>
                      )}
                    </div>
                    <Button className="w-full h-14 bg-primary text-background font-bold text-lg" asChild>
                      <a href={`https://wa.me/${course.contactNumber?.replace(/\D/g, '') || whatsAppNumber.replace(/\D/g, '')}?text=أريد التسجيل في دورة: ${course.title}`} target="_blank">
                        سجل الآن في الدورة
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="ai-assistant" className="bg-secondary/10 py-24 relative border-y border-primary/10">
        <ServiceAssistant />
      </section>

      <section id="gallery" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <h3 className="font-headline text-5xl font-bold text-foreground">معرض التميز (قبل وبعد)</h3>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {dbProjects?.map((project, i) => (
              <div key={i} className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-primary/10">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative h-full border-l border-primary/20">
                    {project.beforePhotoUrl && <Image src={project.beforePhotoUrl} alt="Before" fill className="object-cover" />}
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded-full font-bold">قبل</div>
                  </div>
                  <div className="relative h-full">
                    {project.afterPhotoUrl && <Image src={project.afterPhotoUrl} alt="After" fill className="object-cover" />}
                    <div className="absolute top-2 right-2 bg-primary text-background text-[10px] font-bold px-2 py-1 rounded-full">بعد</div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background p-6">
                  <p className="text-white font-headline text-xl font-bold">{project.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-secondary text-foreground relative border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h3 className="font-headline text-6xl font-bold text-foreground">تواصل معنا</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-8 bg-background/50 rounded-3xl border border-primary/10">
                  <MapPin className="text-primary w-7 h-7" />
                  <div>
                    <p className="text-xs text-primary uppercase font-bold">العنوان</p>
                    <p className="text-2xl font-bold">{info?.address || "بعقوبة - حي المعلمين"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-8 bg-background/50 rounded-3xl border border-primary/10">
                  <Phone className="text-primary w-7 h-7" />
                  <div>
                    <p className="text-xs text-primary uppercase font-bold">واتساب</p>
                    <p className="text-2xl font-bold" dir="ltr">{info?.whatsappNumber || "07700583840"}</p>
                  </div>
                </div>
                {info?.telegramUrl && (
                  <div className="flex items-center gap-6 p-8 bg-background/50 rounded-3xl border border-primary/10">
                    <Send className="text-primary w-7 h-7" />
                    <div>
                      <p className="text-xs text-primary uppercase font-bold">تليجرام</p>
                      <p className="text-2xl font-bold">قناة المركز الرسمية</p>
                      <Link href={info.telegramUrl} target="_blank" className="text-primary text-sm hover:underline">اضغط هنا للانضمام</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-primary/5 p-12 rounded-[3rem] border border-primary/20">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                   <Smartphone className="text-background w-10 h-10" />
                 </div>
                 <h4 className="font-headline text-3xl font-bold">كلاسك فون الملكي</h4>
               </div>
               <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                 نحن هنا لخدمتكم بأحدث الأجهزة والتقنيات العالمية. صيانة فورية، قطع غيار وكالة، ودورات تعليمية احترافية.
               </p>
               <Button className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-background font-bold text-xl" asChild>
                  <a href={whatsAppUrl} target="_blank">بدء محادثة فورية</a>
               </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-background border-t border-primary/10 text-center">
        <p className="text-muted-foreground text-sm">© {currentYear} كلاسك فون لصيانة الهواتف. بعقوبة، العراق.</p>
        <Link href="/admin/login" className="text-primary/20 hover:text-primary block mt-4 text-xs">نظام الإدارة</Link>
      </footer>

      <ReferralTracker />
    </div>
  );
}
