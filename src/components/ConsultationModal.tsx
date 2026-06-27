import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, X } from "lucide-react";
import React, { useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const benefits = ["인바디 측정", "AI 체형분석", "1:1 운동 루틴 처방"];

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [timeMessage, setTimeMessage] = useState("");

  const holidays = [
    "2026-01-01",
    "2026-02-16",
    "2026-02-17",
    "2026-02-18",
    "2026-03-01",
    "2026-05-05",
    "2026-05-24",
    "2026-06-06",
    "2026-08-15",
    "2026-09-24",
    "2026-09-25",
    "2026-09-26",
    "2026-10-03",
    "2026-10-09",
    "2026-12-25",
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setSelectedDate(dateStr);

    if (!dateStr) {
      setAvailableTimes([]);
      setTimeMessage("");
      return;
    }

    const date = new Date(dateStr);
    const day = date.getDay();
    const isHoliday = holidays.includes(dateStr);

    if (day === 0) {
      setAvailableTimes([]);
      setTimeMessage("일요일은 휴무입니다.");
      return;
    }

    if (day === 6 || isHoliday) {
      const times = [];
      for (let i = 10; i <= 18; i += 1) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        times.push(`${hour}:00`);
      }
      setAvailableTimes(times);
      setTimeMessage("주말/공휴일 운영시간: 10:00 - 18:00");
      return;
    }

    const times = [];
    for (let i = 8; i <= 22; i += 1) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      times.push(`${hour}:00`);
    }
    setAvailableTimes(times);
    setTimeMessage("평일 운영시간: 08:00 - 22:00");
  };

  const getTodayKST = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kst = new Date(utc + 9 * 3600000);
    return kst.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      branch: formData.get("branch"),
      goal: formData.get("goal"),
      time: `${formData.get("date")} ${formData.get("time")}`,
      inquiries: formData.get("inquiries"),
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("API 연동 오류");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedDate("");
        setAvailableTimes([]);
        setTimeMessage("");
        onClose();
      }, 2200);
    } catch (error) {
      console.error(error);
      alert("전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative shrink-0 bg-brand-outer p-6 text-white">
              <button
                type="button"
                aria-label="상담 신청창 닫기"
                onClick={onClose}
                className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="mb-2 inline-block rounded-sm bg-brand-point px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Free Body Diagnosis
              </div>
              <h2 className="text-2xl font-black italic">무료 운동진단 예약</h2>
              <p className="mt-2 break-keep text-sm font-medium text-gray-400">
                희망 시간을 남겨주시면 담당자가 확인 후 빠르게 안내드립니다.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white/90">
                    <CheckCircle2 size={14} className="shrink-0 text-brand-point" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="custom-scrollbar overflow-y-auto p-6">
              {isSubmitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                    <CheckCircle2 size={64} className="mb-4 text-brand-point" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-black">신청이 완료되었습니다!</h3>
                  <p className="break-keep font-medium text-gray-500">빠른 시일 내에 담당자가 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">
                        이름 <span className="text-brand-point">*</span>
                      </label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="홍길동"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">
                        연락처 <span className="text-brand-point">*</span>
                      </label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="010-0000-0000"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">
                      희망 지점 <span className="text-brand-point">*</span>
                    </label>
                    <select
                      required
                      name="branch"
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point"
                    >
                      <option value="">지점을 선택해주세요</option>
                      <option value="송도점">송도점</option>
                      <option value="작전점">작전점</option>
                      <option value="부평점">부평점</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">
                      가장 큰 고민 <span className="text-brand-point">*</span>
                    </label>
                    <select
                      required
                      name="goal"
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point"
                    >
                      <option value="">가장 가까운 고민을 선택해주세요</option>
                      <option value="다이어트">다이어트</option>
                      <option value="근력증가">근력증가</option>
                      <option value="체형교정">체형교정</option>
                      <option value="통증케어">통증케어</option>
                      <option value="운동습관">운동습관</option>
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">
                        상담 희망 일자 <span className="text-brand-point">*</span>
                      </label>
                      <input
                        required
                        name="date"
                        type="date"
                        min={getTodayKST()}
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">
                        상담 희망 시간 <span className="text-brand-point">*</span>
                      </label>
                      <select
                        required
                        name="time"
                        disabled={availableTimes.length === 0}
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        <option value="">{availableTimes.length === 0 ? "일자 선택 필요" : "시간 선택"}</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {timeMessage && (
                    <p className={`-mt-2 text-xs ${selectedDate && new Date(selectedDate).getDay() === 0 ? "text-red-500" : "text-brand-point"}`}>
                      {timeMessage}
                    </p>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">문의사항</label>
                    <textarea
                      name="inquiries"
                      placeholder="궁금하신 점이나 편한 방문 시간대를 남겨주세요."
                      rows={3}
                      className="custom-scrollbar w-full resize-none rounded-lg border border-gray-200 px-4 py-3 font-medium outline-none transition-all focus:border-brand-point focus:ring-1 focus:ring-brand-point"
                    />
                  </div>

                  <label className="flex gap-3 rounded-xl bg-gray-50 p-4 text-sm font-medium text-gray-600">
                    <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-brand-point" />
                    <span>상담 안내를 위한 개인정보 수집 및 연락에 동의합니다.</span>
                  </label>

                  <div className="pt-2">
                    <button type="submit" className="btn-primary w-full py-4 text-lg shadow-lg shadow-brand-point/30">
                      무료 운동진단 신청 완료
                    </button>
                  </div>

                  <p className="break-keep text-center text-xs font-medium text-gray-400">
                    상담 당일 등록 강요 없이, 몸 상태와 운동 방향을 먼저 안내드립니다.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
