import { motion } from "motion/react";
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  CreditCard,
  User,
  Activity
} from "lucide-react";
import React, { useState } from "react";
import ConsultationModal from "./components/ConsultationModal";

/**
 * [헤드라인 대안 리스트]
 * 1. "할 땐 하고 놀 땐 노는, 당신을 위한 진짜 운동 파트너"
 * 2. "인천 직장인들이 검증한 통증 해결의 정석, 프롬바디" (선택됨)
 * 3. "당신의 인생 마지막 PT가 될 데이터 기반 맞춤 관리"
 */

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
    setIsMenuOpen(false);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const ctaLink = "#"; // 나중에 상담신청 링크로 교체 예정

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black text-2xl tracking-tighter text-brand-point italic">
            FROMBODY
          </div>
          <div className="hidden md:flex gap-8 font-medium text-sm items-center">
            <a href="#problem" className="hover:text-brand-point transition-colors">운동고민</a>
            <a href="#system" className="hover:text-brand-point transition-colors">관리시스템</a>
            <a href="#programs" className="hover:text-brand-point transition-colors">프로그램</a>
            <a href="#faq" className="hover:text-brand-point transition-colors">FAQ</a>
            <a href="#" onClick={handleOpenForm} className="btn-primary py-2 px-6 text-sm">무료 운동처방 신청</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-6 py-8 flex flex-col gap-6 font-bold absolute w-full border-b shadow-xl">
            <a href="#problem" onClick={() => setIsMenuOpen(false)}>운동고민</a>
            <a href="#system" onClick={() => setIsMenuOpen(false)}>관리시스템</a>
            <a href="#programs" onClick={() => setIsMenuOpen(false)}>프로그램</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a href="#" onClick={handleOpenForm} className="btn-primary">무료 운동처방 신청</a>
          </div>
        )}
      </nav>

      {/* 01. Hero Section */}
      {/* 심리: 호기심의 틈 & 주목 효과 */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-outer">
        <div className="absolute inset-0 z-0 opacity-40">
          <video 
            autoPlay 
            loop 
            muted
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/0501.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-brand-point text-white text-xs font-bold px-3 py-1 rounded-sm mb-6 tracking-widest uppercase">
              10 Years of Trust in Incheon
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] md:leading-[1.1] break-keep tracking-tight mb-8">
              <span className="whitespace-nowrap">인천에서 10년간 운영한</span><br/>
              <span className="text-brand-point">가장 신뢰가는</span><br/>
              프롬바디 피트니스
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-medium break-keep">
              10년의 신뢰는 다릅니다.<br/>
              수많은 회원님들이 10년간 증명해준<br/>
              정말 회원님들을 위한 피트니스 프롬바디입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a href="#" onClick={handleOpenForm} className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 inline-block text-center shadow-lg group flex-1 sm:flex-none">
                  방문예약하기
                </a>
                <a href="#" onClick={handleOpenForm} className="btn-primary group flex-1 sm:flex-none">
                  무료운동 처방신청하기
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm font-medium sm:ml-2">
                <CheckCircle2 size={16} className="text-brand-point shrink-0" /> 인바디 측정 및 1:1 상담 포함
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02. Problem Section */}
      {/* 심리: 부정 편향 - 고통을 구체적으로 명명 */}
      <section id="problem" className="section-padding bg-gray-50 uppercase tracking-tighter">
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <motion.h2 {...fadeIn} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight break-keep tracking-tight">
            헬스장에서 효과를 못 본건<br/>
            <span className="text-brand-point whitespace-nowrap">당신 탓이 아닙니다.</span>
          </motion.h2>
          <motion.p {...fadeIn} className="text-lg text-gray-600 font-medium break-keep leading-relaxed">
            헬스장 등록하고 기부하신 적 있으신가요?<br/>
            뭘 해야 할지 몰라 런닝머신만 타셨나요?<br/>
            그건 의지의 문제가 아닌 <span className="text-brand-point font-black">제대로 된 환경과 시스템</span>이 없었기 때문입니다.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { tag: "Pain", title: "어깨와 허리의 묵직함", desc: "앉아만 있어도 몰려오는 통증, 파스나 마사지로는 한계가 있습니다." },
            { tag: "Posture", title: "무너진 거울 속 실루엣", desc: "라운드 숄더와 거북목. 예쁜 옷을 입어도 왠지 모르게 태가 안 납니다." },
            { tag: "Habit", title: "작심삼일 반복되는 운동", desc: "의욕만 앞선 등록. 결국 돈만 날리고 다시 제자리걸음인 일상." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              {...fadeIn} 
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 border-b-4 border-brand-point shadow-sm"
            >
              <div className="text-brand-point font-black text-sm mb-4">{item.tag}</div>
              <h3 className="text-2xl font-black mb-4 break-keep">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium break-keep">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 03. Brand Culture Section */}
      {/* 심리: 아하! 모먼트 - "아, 이게 답이구나" */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <img src="/culture_image.jpg" alt="활기찬 센터 분위기" className="w-full rounded-2xl shadow-2xl object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              운동은 정확하게,<br/>
              효과는 확실하게,<br/>
              분위기는 즐겁게,<br/>
              <span className="text-brand-point">그게 프롬바디니까!</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium break-keep">
              운동하러 가는 길이 스트레스가 되면 안 됩니다.<br/>
              프롬바디는 활기찬 에너지가 흐르는 공간에서<br/>
              트레이너는 조력자가 되고 옆 사람들은 동료가 되어 함께<br/>
              목표를 달성하는 문화를 지향합니다.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "어느 지점을 가도 동일한 직영 퀄리티",
                "수업이 끝나도 이어지는 철저한 개인 관리",
                "부담 없는 상담과 전문적인 트레이닝",
                "위압감 없고 PT강요 없는곳",
                "청결 친절 진정성이 가장 우선"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                  <CheckCircle2 className="text-brand-point" size={20} />
                  {text}
                </li>
              ))}
            </ul>
            <a href="#" onClick={handleOpenForm} className="btn-primary">프롬바디 문화 체험하기</a>
          </div>
        </div>
      </section>

      {/* 04. System Section */}
      {/* 심리: 노력 인식 효과 - 데이터 관리 강조 */}
      <section id="system" className="section-padding bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="font-black text-[15rem] leading-none select-none text-white/5">SYSTEM</div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <span className="text-brand-point font-black tracking-widest mb-4 block uppercase">Exclusive Management</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                기대만 하는 것이 아니라<br/>
                <span className="text-brand-point">데이터로 확인</span>하는 변화
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4 items-start text-left">
                  <div className="bg-brand-point/10 p-3 rounded-lg"><Activity className="text-brand-point" size={24} /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-balance">AI 체형분석부터 식단까지 철저한 관리 시스템</h3>
                    <p className="text-gray-400 font-medium">
                      전용 앱을 이용하여 개인최적화 관리 시스템으로 체형분석부터<br/>
                      운동 전 컨디션 체크, 운동일지, 식단기록까지 실패없는 운동을 전달합니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start text-left">
                  <div className="bg-brand-point/10 p-3 rounded-lg"><User className="text-brand-point" size={24} /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">1:1 전담 마킹 시스템</h3>
                    <p className="text-gray-400 font-medium">
                      단순히 50분 수업으로 끝내지 않습니다.<br/>
                      수업 외 시간에 대한 피드백까지 전담 트레이너가 함께합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 w-full h-auto">
                <img 
                  src="/system-dashboard.jpg" 
                  alt="프롬바디 관리 시스템" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04-5. Comparison Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="text-brand-point">프롬바디</span>는 이렇게 달라요
            </h2>
          </div>
          <div className="bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-white/10 text-lg md:text-xl font-black text-center items-center">
              <div className="p-4 md:p-6 text-transparent select-none">구분</div>
              <div className="p-4 md:p-6 bg-brand-point/10 text-brand-point border-x border-white/10">프롬바디피트니스</div>
              <div className="p-4 md:p-6 text-gray-400">일반 헬스장</div>
            </div>
            
            {/* Rows */}
            {[
              { label: "기구 사용법", pro: "QR 스캔으로 즉시 확인", con: "물어보기 눈치" },
              { label: "운동 루틴", pro: "회원권만으로 루틴 완성", con: "PT 강요" },
              { label: "목적별 프로그램", pro: "맞춤형 전문 프로그램", con: "획일화된 프로그램" },
              { label: "AI 체형 분석", pro: "매월 정밀 측정", con: "없음" },
              { label: "회원 관리 시스템", pro: "밀착 케어", con: "방치" },
              { label: "평균 목표 달성", pro: "3개월", con: "작심삼일" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/10 last:border-0 text-xs sm:text-sm md:text-base transition-colors hover:bg-white/5">
                <div className="p-4 md:p-6 text-white font-bold flex items-center justify-center md:justify-start break-keep text-center md:text-left">{row.label}</div>
                <div className="p-4 md:p-6 bg-brand-point/5 text-brand-point font-bold flex flex-col md:flex-row items-center justify-center border-x border-white/10 gap-1 md:gap-2 text-center break-keep">
                  <CheckCircle2 size={18} className="shrink-0" /> {row.pro}
                </div>
                <div className="p-4 md:p-6 text-gray-500 font-medium flex items-center justify-center text-center break-keep">{row.con}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Service Section */}
      {/* 심리: 미끼 효과 & 중앙 무대 효과 */}
      <section id="programs" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">최상의 결과를 위한<br/>프롬바디 프로그램</h2>
            <p className="text-gray-500 font-medium italic">당신의 목적에 맞는 최적의 플랜을 제안합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Health */}
            <motion.div {...fadeIn} className="bg-white p-10 ring-4 ring-brand-point relative flex flex-col items-center text-center -translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-point text-white text-xs font-black px-4 py-1 uppercase tracking-widest">Best Choice</div>
              <div className="flex items-center justify-center p-4 rounded-full bg-brand-point/10 mb-6">
                <MapPin size={32} className="text-brand-point" />
              </div>
              <h3 className="text-2xl font-black mb-4">헬스 (회원권)</h3>
              <p className="text-gray-500 mb-8 font-medium">쾌적한 시설과 최신 기구를<br/>자유롭게 이용하는 실속 플랜</p>
              <ul className="text-left w-full space-y-3 mb-8">
                {["최상급 프리미엄 기구 완비", "여유로운 스트레칭 존", "등록 시 기본 O.T 제공"].map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={16} className="text-brand-point shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t w-full text-sm text-gray-400 font-bold">센터 전체 기초 시설 이용 가능</div>
            </motion.div>

            {/* PT (Main) */}
            <motion.div 
              {...fadeIn} 
              className="bg-white p-10 ring-4 ring-brand-point relative flex flex-col items-center text-center -translate-y-4 shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-point text-white text-xs font-black px-4 py-1 uppercase tracking-widest">Best Choice</div>
              <div className="flex items-center justify-center p-4 rounded-full bg-brand-point/10 mb-6">
                <Activity size={32} className="text-brand-point" />
              </div>
              <h3 className="text-2xl font-black mb-4">1:1 맞춤형 PT&필라테스</h3>
              <p className="text-gray-500 mb-8 font-medium">재활부터 통증 케어, 고강도 근력 증강까지<br/>오직 당신만을 위한 설계</p>
              <ul className="text-left w-full space-y-3 mb-8">
                {["체형 분석 기반 루틴 설계", "개인 대시보드 리포팅", "식단 및 생활 습관 서포트"].map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={16} className="text-brand-point shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <a href="#" onClick={handleOpenForm} className="btn-primary w-full shadow-brand-point/30">상담 후 시작하기</a>
            </motion.div>

            {/* Pilates */}
            <motion.div {...fadeIn} className="bg-white p-10 ring-4 ring-brand-point relative flex flex-col items-center text-center -translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-point text-white text-xs font-black px-4 py-1 uppercase tracking-widest">Best Choice</div>
              <div className="flex items-center justify-center p-4 rounded-full bg-brand-point/10 mb-6">
                <User size={32} className="text-brand-point" />
              </div>
              <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2">
                바레 (barre)
                <span className="text-brand-point text-base font-bold">작전점</span>
              </h3>
              <p className="text-gray-500 mb-8 font-medium">우아한 움직임 속 강력한 코어 밸런스를 통해,<br/>선명한 바디라인을 잡아보세요</p>
              <ul className="text-left w-full space-y-3 mb-8">
                {[
                  "발레 동작 기반 - 몸선을 따라 흐르는 동작", 
                  "고강도 근육 자극 - 코어 중심 실루엣 정리", 
                  "저충격 설계 - 관절에 무리 없이 꾸준히"
                ].map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm font-bold text-gray-700 break-keep">
                    <CheckCircle2 size={16} className="text-brand-point shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t w-full text-sm text-gray-400 font-bold">하루 50분 나를위한 가장 우아한 자기관리</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 06. Results/Proof Section */}
      {/* 심리: 사회적 증거 & 후광 효과 */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-16">프롬바디가 증명한 변화들</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="rounded-xl overflow-hidden shadow-xl bg-white transform transition-transform hover:-translate-y-2">
                <img src={`/transformations/transform${i}.jpg`} alt={`프롬바디 변화 증명 ${i}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-8 justify-center items-center grayscale opacity-60">
            <div className="font-black text-4xl">500+</div>
            <div className="font-black text-4xl italic">FROMBODY</div>
            <div className="font-black text-4xl tracking-tighter">FITNESS</div>
            <div className="font-black text-4xl uppercase">Certified</div>
          </div>
        </div>
      </section>

      {/* 06-2. Proof Statistics Section */}
      <section className="section-padding bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 break-keep">처음엔 다들 비슷한 마음으로 오셨습니다.</h2>
          <div className="w-12 h-1 bg-brand-point mx-auto mb-10"></div>
          
          <div className="text-gray-400 font-medium space-y-2 mb-10 text-lg">
            <p>"운동 경험이 없어서요",</p>
            <p>"헬스장이 너무 무서워서요",</p>
            <p>"PT는 부담스러워서요"</p>
          </div>
          
          <p className="text-gray-300 font-medium mb-20 text-lg break-keep">
            하지만 프롬바디를 경험하고 진솔하게 남긴 후기를 읽어주세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl md:text-7xl font-black text-brand-point mb-4">85%</div>
              <div className="text-gray-400 font-bold">시설 이용권 재등록률</div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-black text-brand-point mb-4">90%</div>
              <div className="text-gray-400 font-bold">회원 평균 만족도</div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-black text-brand-point mb-4">95%</div>
              <div className="text-gray-400 font-bold">PT 완주율</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06-3. Real Member Reviews Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 break-keep">프롬바디 실제 회원님들의 후기</h2>
          <div className="grid grid-rows-2 grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] lg:grid-rows-none lg:grid-flow-row lg:grid-cols-5 lg:auto-cols-auto gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {[
              'review1.png', 'review2.png', 'review3.png', 'review4.png', 'review5.png',
              'review6.png', 'review7.png', 'review8.png', 'review9.png', 'review10.png'
            ].map((img, i) => (
              <div key={i} className="snap-center rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white border border-gray-100">
                <img src={`/reviews/${img}`} alt={`프롬바디 회원 후기 ${i+1}`} className="w-full h-auto pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07. Process Section */}
      {/* 심리: 목표 그라데이션 효과 - 6단계로 확장하여 신뢰도 강화 */}
      <section className="section-padding bg-brand-outer text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16">프롬바디는 이렇게 시작됩니다</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6 relative">
            {[
              { num: "01", title: "설문지 작성", desc: "1분이면 됩니다. 이름·연락처·목표만 입력하면 OK" },
              { num: "02", title: "담당자 연락", desc: "작성 후 24시간 내 트레이너가 직접 연락드립니다" },
              { num: "03", title: "무료 방문 상담", desc: <>부담 없이 공간을 먼저 경험해보세요<br/>(구매 강요 없음)</> },
              { num: "04", title: "나만의 루틴으로 시작", desc: <>시설만 이용할지, PT와 함께할지<br/>그때 결정하면 됩니다</> }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                <div className="w-20 h-20 bg-brand-point rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-xl shadow-brand-point/20 group-hover:scale-110 transition-transform duration-300">
                  {item.num}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium px-2 leading-relaxed break-keep">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <a href="#" onClick={handleOpenForm} className="btn-primary">간편 상담 예약하기</a>
          </div>
        </div>
      </section>

      {/* 08. FAQ Section */}
      {/* 심리: 반발감 효과 회피 & 손실 회피 */}
      <section id="faq" className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12 text-center">자주 묻는 질문</h2>
          <div className="space-y-6">
            {[
              { q: "운동을 한 번도 안 해봤는데 괜찮을까요?", a: "네, 대다수의 회원님이 프롬바디에서 운동을 처음 시작하십니다. 초점은 '잘 하는 것'이 아니라 '바르게 하는 것'부터 시작하므로 걱정하지 않으셔도 됩니다." },
              { q: "PT 가격/회원권 가격은 어떻게 되나요?", a: "회권수와 기간에 따라 상이하며, 자세한 내용은 상담 시 투명하게 안내해 드립니다. 합리적인 가격으로 최상의 관리를 받으실 수 있도록 조율해 드립니다." },
              { q: "주차는 가능한가요?", a: "네, 각 지점(작전/송도/부평 등) 모두 건물 내 지하 또는 지상 주차가 가능하여 편하게 방문하실 수 있습니다." },
              { q: "체험은 어떻게 진행되나요? 당일 가입해야 하나요?", a: "당일 가입 강요는 절대 없습니다. 체험은 약 50분 내외로 진행되며, 직접 받아보시고 결정하시는 것을 권장합니다." },
              { q: "다른 지점과 교차 이용 가능한가요?", a: "네, 프롬바디는 인천 지역 주요 거점에 직영 체제로 운영되므로, 지점 간 협의를 통해 편리한 연계 관리가 가능합니다." }
            ].map((faq, i) => (
              <details key={i} className="group border-b border-gray-100 pb-4 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg list-none py-2 uppercase tracking-tighter">
                  {faq.q}
                  <ChevronRight size={18} className="group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-500 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 09. Footer / Final CTA */}
      {/* 심리: 결핍 & 새 출발 효과 */}
      <footer className="bg-gray-50 pt-20 pb-12 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-brand-point text-2xl md:text-3xl font-black mb-3 italic tracking-tight">지금바로 당장!</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter">
              CHANGE YOUR BODY & LIFE
            </h2>
            <p className="text-xl text-gray-600 mb-10 font-bold">
              오늘의 미룸이 내일의 통증을 만듭니다.<br/>
              선착순 무료 체험 혜택을 놓치지 마세요.
            </p>
            <a href="#" onClick={handleOpenForm} className="btn-primary px-12 py-6 text-xl shadow-brand-point/40 uppercase tracking-widest italic">
              지금 바로 무료 체험 신청
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t text-sm font-bold opacity-80 uppercase tracking-tighter">
            <div>
              <div className="text-brand-point mb-4 font-black">LOCATIONS</div>
              <ul className="space-y-4">
                <li><span className="text-brand-point">송도점</span> 032)834-0401</li>
                <li><span className="text-brand-point">작전점</span> 032)553-0401</li>
                <li><span className="text-brand-point">부평점</span> 032)719-3336</li>
              </ul>
            </div>
            <div>
              <div className="text-brand-point mb-4 font-black">HOURS</div>
              <p>평일 09:00 ~ 23:00</p>
              <p>토요일 10:00 ~ 18:00</p>
              <p className="text-xs text-gray-400 mt-2">일요일 공휴일 별도공지</p>
            </div>
            <div>
              <div className="text-brand-point mb-4 font-black">CONTACT</div>
              <div className="flex gap-4 mb-4">
                <a href="#" className="hover:text-brand-point bg-white p-2 rounded-full border shadow-sm"><Instagram size={20} /></a>
                <a href="#" className="hover:text-brand-point bg-white p-2 rounded-full border shadow-sm"><MessageCircle size={20} /></a>
                <a href="#" className="hover:text-brand-point bg-white p-2 rounded-full border shadow-sm"><Phone size={20} /></a>
              </div>
              <p className="text-xs text-gray-400">© 2026 FROMBODY FITNESS. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Mobile */}
      <a 
        href="#" onClick={handleOpenForm} 
        className="md:hidden fixed bottom-6 right-6 z-[60] bg-brand-point text-white font-black p-4 rounded-full shadow-2xl flex items-center gap-2 group italic uppercase tracking-tighter"
      >
        <CreditCard size={20} />
        무료체험 신청
      </a>

      <ConsultationModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
