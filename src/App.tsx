import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  User,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import ConsultationModal from "./components/ConsultationModal";

const CTA_TEXT = "무료 운동진단 예약하기";

const navItems = [
  { href: "#offer", label: "무료진단" },
  { href: "#process", label: "진행과정" },
  { href: "#proof", label: "후기/증거" },
  { href: "#branches", label: "지점안내" },
  { href: "#faq", label: "FAQ" },
];

const problemCards = [
  {
    id: "routine",
    tag: "ROUTINE",
    title: "등록만 하고 안 가게 됨",
    desc: "처음엔 의욕이 있었지만 막상 가면 뭘 해야 할지 몰라 런닝머신만 타게 됩니다.",
  },
  {
    id: "burden",
    tag: "BURDEN",
    title: "PT는 부담스럽고 혼자는 막막함",
    desc: "비용도 부담되고, 강요받을까 걱정돼 시작 자체를 미루게 됩니다.",
  },
  {
    id: "body",
    tag: "BODY",
    title: "통증·체형·다이어트가 같이 꼬임",
    desc: "허리, 어깨, 거북목, 체중 변화까지 어디서부터 해결해야 할지 막막합니다.",
  },
];

const offerItems = [
  {
    id: "inbody",
    title: "인바디 측정",
    desc: "체중만 보는 것이 아니라 근육량, 체지방률, 신체 균형을 함께 확인합니다.",
    icon: Activity,
  },
  {
    id: "ai-posture",
    title: "AI 체형분석",
    desc: "라운드숄더, 골반, 자세 불균형 등 현재 몸 상태를 시각적으로 확인합니다.",
    icon: User,
  },
  {
    id: "routine",
    title: "1:1 운동 루틴 처방",
    desc: "다이어트, 근력증가, 체형교정, 통증케어 중 내 목표에 맞는 운동 방향을 제안받습니다.",
    icon: CheckCircle2,
  },
];

const processSteps = [
  {
    id: "apply",
    num: "01",
    title: "10초 신청",
    desc: "이름, 연락처, 희망 지점과 가장 큰 고민만 남겨주세요.",
  },
  {
    id: "call",
    num: "02",
    title: "담당자 연락",
    desc: "방문 가능한 시간과 가까운 지점을 확인해드립니다.",
  },
  {
    id: "diagnosis",
    num: "03",
    title: "무료 운동진단 방문",
    desc: "인바디, 체형분석, 운동목표 상담을 함께 진행합니다.",
  },
  {
    id: "routine",
    num: "04",
    title: "나에게 맞는 시작 방법 안내",
    desc: "시설 이용만 할지, PT와 함께할지 상담 후 편하게 결정하시면 됩니다.",
  },
];

const stats = [
  { id: "renewal", value: "85%", label: "시설 이용권 재등록률" },
  { id: "satisfaction", value: "90%", label: "회원 평균 만족도" },
  { id: "completion", value: "95%", label: "PT 완주율" },
];

const programs = [
  {
    id: "membership",
    title: "헬스 회원권",
    desc: "혼자 운동하고 싶지만 기구 사용법과 루틴이 필요한 분께 적합합니다.",
    points: ["프리미엄 기구 이용", "기본 O.T 제공", "목적별 루틴 방향 안내"],
    icon: MapPin,
  },
  {
    id: "pt-pilates",
    title: "1:1 PT & 필라테스",
    desc: "체형교정, 통증케어, 다이어트, 근력증가처럼 목표가 명확한 분께 적합합니다.",
    points: ["체형 분석 기반 루틴 설계", "운동·식단·습관 관리", "개인 목표별 피드백"],
    icon: Activity,
  },
  {
    id: "passive-stretching",
    title: "패시브 스트레칭",
    desc: "혼자 풀기 어려운 목, 어깨, 허리 긴장을 전문가의 보조로 편안하게 회복하고 싶은 분께 적합합니다.",
    points: ["누워서 받는 회복 스트레칭", "목·어깨·허리 긴장 완화", "운동 전후 컨디션 관리"],
    icon: CheckCircle2,
  },
  {
    id: "barre",
    title: "바레 클래스",
    location: "(작전점)",
    desc: "작전점에서 운영하는 프로그램으로 코어, 자세, 바디라인 관리를 원하는 분께 적합합니다.",
    points: ["발레 동작 기반 저충격 운동", "코어 중심 실루엣 정리", "하루 50분 자기관리"],
    icon: User,
  },
];

const branches = [
  {
    id: "songdo",
    name: "송도점",
    title: "송도점 (인천대입구역)",
    address: ["인천광역시 연수구 하모니로138번길 11", "(송도캐슬센트럴파크) 102동 324호"],
    mapUrl: "https://map.naver.com/p/search/프롬바디피트니스 송도점",
    phone: "032)834-0401",
  },
  {
    id: "jakjeon",
    name: "작전점",
    title: "작전점",
    address: ["인천광역시 계양구 장제로 708", "한샘프라자 2층"],
    mapUrl: "https://map.naver.com/p/search/프롬바디피트니스 작전점",
    phone: "032)553-0401",
  },
  {
    id: "bupyeong",
    name: "부평점",
    title: "부평점",
    address: ["인천광역시 부평구 경원대로 1404", "그랑프리빌딩 4층 405호"],
    mapUrl: "https://map.naver.com/p/search/프롬바디피트니스 부평점",
    phone: "032)719-3336",
  },
];

const faqs = [
  {
    id: "beginner",
    q: "운동을 한 번도 안 해봤는데 괜찮을까요?",
    a: "네. 프롬바디는 운동 초보 회원 상담이 많습니다. 처음부터 잘하는 것보다, 내 몸에 맞는 방법을 찾는 것부터 시작합니다.",
  },
  {
    id: "pressure",
    q: "상담 받으면 꼭 등록해야 하나요?",
    a: "아닙니다. 무료 운동진단 후 등록 여부는 직접 결정하시면 됩니다. 강요 없이 몸 상태와 운동 방향을 안내드립니다.",
  },
  {
    id: "price",
    q: "PT 가격이 부담스러운데 괜찮을까요?",
    a: "상담 시 회원권, PT, 필라테스, 바레 등 목표와 예산에 맞는 선택지를 안내드립니다. 바로 PT를 결정하지 않아도 됩니다.",
  },
  {
    id: "branch",
    q: "어떤 지점으로 가야 하나요?",
    a: "송도, 작전, 부평 중 생활 동선에 가까운 지점을 선택하시면 됩니다. 신청 후 담당자가 방문 시간을 도와드립니다.",
  },
  {
    id: "time",
    q: "무료 운동진단은 얼마나 걸리나요?",
    a: "보통 30~50분 정도 소요됩니다. 인바디 측정, 체형 확인, 목표 상담이 함께 진행됩니다.",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const reviewRow1Ref = useRef<HTMLDivElement>(null);
  const reviewRow2Ref = useRef<HTMLDivElement>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const openForm = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e?.preventDefault();
    setIsFormOpen(true);
    setIsMenuOpen(false);
  };

  const scrollSlider = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-brand-outer">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/85 text-white backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="text-2xl font-black italic tracking-tighter text-brand-point">
            FROMBODY
          </a>

          <div className="hidden items-center gap-8 text-sm font-bold md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-brand-point">
                {item.label}
              </a>
            ))}
            <a href="#" onClick={openForm} className="btn-primary px-6 py-2 text-sm">
              {CTA_TEXT}
            </a>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute flex w-full flex-col gap-6 border-b border-gray-100 bg-white px-6 py-8 font-bold text-black shadow-xl md:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#" onClick={openForm} className="btn-primary">
              {CTA_TEXT}
            </a>
          </div>
        )}
      </nav>

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-outer pt-20 text-white">
          <div className="absolute inset-0 z-0 opacity-35">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
              <source src="/0501.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

          <div className="container relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-4xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/20">
                인천 송도 · 작전 · 부평
              </div>
              <h1 className="mb-7 break-keep text-4xl font-black leading-[1.14] tracking-tight sm:text-5xl md:text-7xl">
                헬스장 등록만 하고 못 갔다면,
                <br />
                이번엔 <span className="text-brand-point">내 몸에 맞는 운동 루틴</span>부터 받아가세요.
              </h1>
              <p className="mb-8 max-w-2xl break-keep text-lg font-bold leading-relaxed text-white/85 md:text-2xl">
                인바디 측정, AI 체형분석, 1:1 운동처방까지 무료로 받아보고 내 몸에 맞는 운동 방향을 먼저 확인하세요.
              </p>

              <div className="mb-8 grid max-w-3xl gap-3 text-sm font-bold text-white/85 sm:grid-cols-2 lg:grid-cols-4">
                {["인천 10년 운영", "송도·작전·부평", "운동 초보 가능", "PT 강요 없는 상담"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                    <CheckCircle2 size={18} className="shrink-0 text-brand-point" />
                    {badge}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#" onClick={openForm} className="btn-primary group px-9 py-5 text-xl">
                  {CTA_TEXT}
                  <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" size={22} />
                </a>
                <a
                  href="#branches"
                  className="inline-block rounded-full bg-white px-9 py-5 text-center text-lg font-black text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  가까운 지점 보기
                </a>
              </div>
              <p className="mt-4 text-sm font-medium text-white/60">무료 진단 후 바로 등록하지 않아도 됩니다.</p>
            </motion.div>
          </div>
        </section>

        <section id="problem" className="section-padding bg-gray-50">
          <div className="mx-auto mb-16 max-w-4xl px-4 text-center">
            <motion.h2 {...fadeIn} className="mb-6 break-keep text-3xl font-black leading-tight md:text-6xl">
              헬스장에서 효과를 못 본 건
              <br />
              <span className="text-brand-point">당신 의지가 약해서가 아닙니다.</span>
            </motion.h2>
            <motion.p {...fadeIn} className="break-keep text-lg font-medium leading-relaxed text-gray-600">
              대부분은 운동을 못해서가 아니라 “무엇을 해야 하는지 몰라서” 멈춥니다.
              <br />
              그래서 프롬바디는 등록 전에 먼저 몸 상태와 운동 방향부터 확인합니다.
            </motion.p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
            {problemCards.map((item, index) => (
              <motion.div
                key={item.id}
                {...fadeIn}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
              >
                <div className="mb-4 text-sm font-black tracking-widest text-brand-point">{item.tag}</div>
                <h3 className="mb-4 break-keep text-2xl font-black">{item.title}</h3>
                <p className="break-keep font-medium leading-relaxed text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#" onClick={openForm} className="btn-primary">
              {CTA_TEXT}
            </a>
          </div>
        </section>

        <section id="offer" className="section-padding bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...fadeIn}>
              <div className="mb-4 text-sm font-black uppercase tracking-widest text-brand-point">Free Body Diagnosis</div>
              <h2 className="mb-6 break-keep text-4xl font-black leading-tight md:text-6xl">
                방문하면 이 3가지를
                <br />
                <span className="text-brand-point">무료로 확인합니다.</span>
              </h2>
              <p className="mb-8 break-keep text-lg font-medium leading-relaxed text-gray-600">
                PT 등록을 먼저 결정하는 구조가 아닙니다. 내 몸 상태와 현재 목표에 맞는 운동 방향을 먼저 확인하는 과정입니다.
              </p>
              <div className="rounded-3xl bg-black p-6 text-white">
                <p className="break-keep text-xl font-black">
                  무료 진단 후 바로 등록하지 않아도 됩니다.
                  <br />
                  내 몸 상태를 먼저 확인하는 것만으로도 충분합니다.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-5">
              {offerItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    {...fadeIn}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="flex gap-5 rounded-3xl border border-gray-100 bg-gray-50 p-6 shadow-sm"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-point/10 text-brand-point">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="mb-2 text-2xl font-black">{item.title}</h3>
                      <p className="break-keep font-medium leading-relaxed text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="section-padding bg-brand-outer text-white">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <motion.div {...fadeIn} className="mb-16">
              <h2 className="mb-5 break-keep text-3xl font-black md:text-5xl">
                프롬바디는 <span className="text-brand-point">이렇게</span> 시작됩니다.
              </h2>
              <p className="break-keep text-lg font-medium text-gray-400">신청부터 방문까지 복잡하지 않게, 부담 없이 진행합니다.</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
              {processSteps.map((item) => (
                <div key={item.id} className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-point text-2xl font-black shadow-xl shadow-brand-point/20">
                    {item.num}
                  </div>
                  <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
                  <p className="break-keep px-2 text-sm font-medium leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="break-keep text-lg font-black">상담 당일 등록 강요 없이, 내 몸에 맞는 선택지를 안내드립니다.</p>
            </div>

            <div className="mt-10">
              <a href="#" onClick={openForm} className="btn-primary">
                {CTA_TEXT}
              </a>
            </div>
          </div>
        </section>

        <section id="proof" className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <motion.div {...fadeIn} className="mb-14">
              <h2 className="mb-6 break-keep text-3xl font-black md:text-5xl">
                처음 온 분들도 대부분
                <br />
                <span className="text-brand-point">비슷한 마음</span>이었습니다.
              </h2>
              <div className="mx-auto mb-8 max-w-2xl space-y-2 break-keep text-lg font-bold text-gray-500">
                <p>“운동을 한 번도 안 해봤어요.”</p>
                <p>“헬스장이 무서워요.”</p>
                <p>“PT는 부담스러워요.”</p>
                <p>“혼자 하니까 매번 작심삼일이에요.”</p>
              </div>
              <p className="break-keep text-lg font-black">
                이미 잘하는 사람을 위한 공간이 아니라, 다시 시작하고 싶은 사람을 위한 공간입니다.
              </p>
            </motion.div>

            <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="rounded-3xl bg-black p-8 text-white">
                  <div className="mb-3 text-6xl font-black text-brand-point">{stat.value}</div>
                  <div className="font-bold text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mb-16 flex flex-col gap-4 lg:gap-6">
              <div className="relative group">
                <button
                  type="button"
                  aria-label="후기 왼쪽으로 보기"
                  onClick={() => scrollSlider(reviewRow1Ref, "left")}
                  className="absolute -left-12 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 opacity-0 shadow-lg transition-colors hover:text-brand-point group-hover:opacity-100 lg:flex"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  aria-label="후기 오른쪽으로 보기"
                  onClick={() => scrollSlider(reviewRow1Ref, "right")}
                  className="absolute -right-12 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 opacity-0 shadow-lg transition-colors hover:text-brand-point group-hover:opacity-100 lg:flex"
                >
                  <ChevronRight size={24} />
                </button>
                <div ref={reviewRow1Ref} className="grid snap-x snap-mandatory grid-flow-col auto-cols-[75%] gap-4 overflow-x-auto scroll-smooth sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%] lg:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {["review1.png", "review2.png", "review3.png", "review4.png", "review5.png"].map((img) => (
                    <div key={img} className="snap-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                      <img src={`/reviews/${img}`} alt={`프롬바디 회원 후기 ${img.replace(/\D/g, "")}`} className="h-auto w-full pointer-events-none" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button
                  type="button"
                  aria-label="후기 왼쪽으로 보기"
                  onClick={() => scrollSlider(reviewRow2Ref, "left")}
                  className="absolute -left-12 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 opacity-0 shadow-lg transition-colors hover:text-brand-point group-hover:opacity-100 lg:flex"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  aria-label="후기 오른쪽으로 보기"
                  onClick={() => scrollSlider(reviewRow2Ref, "right")}
                  className="absolute -right-12 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 opacity-0 shadow-lg transition-colors hover:text-brand-point group-hover:opacity-100 lg:flex"
                >
                  <ChevronRight size={24} />
                </button>
                <div ref={reviewRow2Ref} className="grid snap-x snap-mandatory grid-flow-col auto-cols-[75%] gap-4 overflow-x-auto scroll-smooth pb-4 sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%] lg:gap-6 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {["review6.png", "review7.png", "review8.png", "review9.png", "review10.png"].map((img) => (
                    <div key={img} className="snap-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                      <img src={`/reviews/${img}`} alt={`프롬바디 회원 후기 ${img.replace(/\D/g, "")}`} className="h-auto w-full pointer-events-none" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="mb-8 break-keep text-2xl font-black md:text-4xl">
              프롬바디가 <span className="text-brand-point">증명한 변화들</span>
            </h3>
            <div className="grid snap-x snap-mandatory grid-flow-col auto-cols-[85%] gap-4 overflow-x-auto sm:auto-cols-[45%] lg:grid-flow-row lg:grid-cols-4 lg:auto-cols-auto lg:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {[6, 7, 8, 9, 10, 11, 12, 13].map((num) => (
                <div key={num} className="snap-center overflow-hidden rounded-xl bg-white shadow-xl transition-transform lg:hover:-translate-y-2">
                  <img src={`/transformations/transform${num}.jpg`} alt={`프롬바디 변화 증명 ${num}`} className="h-auto w-full object-cover pointer-events-none" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="section-padding bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 break-keep text-4xl font-black md:text-5xl">
                운동진단 후
                <br />
                <span className="text-brand-point">나에게 맞는 방식</span>으로 시작하세요.
              </h2>
              <p className="break-keep text-lg font-medium text-gray-500">어떤 프로그램이 맞는지는 방문 상담에서 함께 확인합니다.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <motion.div key={program.id} {...fadeIn} className="flex flex-col rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-point/10 text-brand-point">
                      <Icon size={32} />
                    </div>
                    <h3 className="mb-4 flex flex-wrap items-center gap-2 break-keep text-2xl font-black">
                      {program.title}
                      {"location" in program && program.location && (
                        <span className="rounded-full bg-brand-point/10 px-3 py-1 text-sm font-black text-brand-point">
                          {program.location}
                        </span>
                      )}
                    </h3>
                    <p className="mb-6 break-keep font-medium leading-relaxed text-gray-500">{program.desc}</p>
                    <ul className="mt-auto space-y-3">
                      {program.points.map((point) => (
                        <li key={point} className="flex gap-2 break-keep text-sm font-bold text-gray-700">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-point" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <a href="#" onClick={openForm} className="btn-primary">
                내게 맞는 운동 방식 확인하기
              </a>
            </div>
          </div>
        </section>

        <section id="branches" className="section-padding bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeIn} className="mb-16 text-center">
              <h2 className="mb-4 break-keep text-4xl font-black">
                가까운 <span className="text-brand-point">프롬바디 지점</span>을 선택하세요.
              </h2>
              <p className="break-keep font-medium text-gray-500">전 지점 동일한 퀄리티의 무료 운동진단을 약속합니다.</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {branches.map((branch) => (
                <motion.div key={branch.id} {...fadeIn} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                  <a href={branch.mapUrl} target="_blank" rel="noreferrer" className="group relative block h-64 w-full cursor-pointer overflow-hidden bg-gray-200">
                    <img src="/map_placeholder.png" alt={`${branch.name} 지도`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center gap-2 rounded-full bg-[#03c75a] px-5 py-2 font-bold text-white shadow-xl">
                        <MapPin size={18} /> 네이버지도 길찾기
                      </div>
                    </div>
                  </a>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="text-brand-point" size={20} />
                      <h3 className="text-xl font-bold">{branch.title}</h3>
                    </div>
                    <p className="mb-4 break-keep text-sm text-gray-500">
                      {branch.address.map((line) => (
                        <React.Fragment key={line}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                    <p className="mb-5 text-sm font-bold text-gray-700">{branch.phone}</p>
                    <div className="mt-auto">
                      <a href="#" onClick={openForm} className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-sm">
                        {branch.name} 무료 운동진단 예약
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-padding bg-white">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-12 text-center text-4xl font-black">자주 묻는 질문</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.id} className="group cursor-pointer border-b border-gray-100 pb-4">
                  <summary className="flex list-none items-center justify-between gap-4 py-2 text-lg font-bold">
                    <span className="break-keep">{faq.q}</span>
                    <ChevronRight size={18} className="shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 break-keep font-medium leading-relaxed text-gray-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black px-6 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 text-xl font-black italic tracking-tight text-brand-point">이번에도 혼자 시작하려다 멈출 것 같다면</div>
            <h2 className="mb-8 break-keep text-4xl font-black leading-tight md:text-6xl">
              먼저 내 몸에 맞는 운동 방향부터 확인하세요.
            </h2>
            <p className="mb-10 break-keep text-lg font-bold text-gray-300">
              인바디 측정 + AI 체형분석 + 1:1 운동처방
              <br />
              프롬바디 무료 운동진단은 송도 · 작전 · 부평 지점에서 가능합니다.
            </p>
            <a href="#" onClick={openForm} className="btn-primary px-12 py-6 text-xl">
              {CTA_TEXT}
            </a>
            <p className="mt-4 text-sm font-medium text-gray-500">신청 후 담당자가 방문 가능 시간을 안내드립니다.</p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 text-sm font-bold md:grid-cols-3">
          <div>
            <div className="mb-4 font-black text-brand-point">LOCATIONS</div>
            <ul className="space-y-4">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <span className="text-brand-point">{branch.name}</span> {branch.phone}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-black text-brand-point">HOURS</div>
            <p>평일 09:00 ~ 23:00</p>
            <p>토요일 10:00 ~ 18:00</p>
            <p className="mt-2 text-xs text-gray-400">일요일 공휴일 별도공지</p>
          </div>
          <div>
            <div className="mb-4 font-black text-brand-point">CONTACT</div>
            <div className="mb-4 flex gap-4">
              <a href="#" aria-label="인스타그램" className="rounded-full border bg-white p-2 shadow-sm hover:text-brand-point">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="메시지 문의" className="rounded-full border bg-white p-2 shadow-sm hover:text-brand-point">
                <MessageCircle size={20} />
              </a>
              <a href="#" aria-label="전화 문의" className="rounded-full border bg-white p-2 shadow-sm hover:text-brand-point">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-400">© 2026 FROMBODY FITNESS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="무료 운동진단 예약하기"
        onClick={() => openForm()}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-brand-point p-4 font-black text-white shadow-2xl md:hidden"
      >
        <Activity size={20} />
        무료 운동진단
      </button>

      <ConsultationModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
