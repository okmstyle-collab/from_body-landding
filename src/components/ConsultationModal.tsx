import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [timeMessage, setTimeMessage] = useState("");

  const holidays = [
    "2026-01-01", "2026-02-16", "2026-02-17", "2026-02-18", "2026-03-01",
    "2026-05-05", "2026-05-24", "2026-06-06", "2026-08-15", "2026-09-24",
    "2026-09-25", "2026-09-26", "2026-10-03", "2026-10-09", "2026-12-25"
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
    } else if (day === 6 || isHoliday) {
      const times = [];
      for (let i = 10; i <= 18; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        times.push(`${hour}:00`);
      }
      setAvailableTimes(times);
      setTimeMessage("주말/공휴일 운영시간: 10:00 - 18:00");
    } else {
      const times = [];
      for (let i = 8; i <= 22; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        times.push(`${hour}:00`);
      }
      setAvailableTimes(times);
      setTimeMessage("평일 운영시간: 08:00 - 22:00");
    }
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
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  // 현재 한국 시간 기준으로 오늘 날짜(YYYY-MM-DD) 구하기
  const getTodayKST = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kst = new Date(utc + (9 * 3600000));
    return kst.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-brand-outer text-white p-6 relative shrink-0">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="inline-block bg-brand-point text-white text-xs font-bold px-2 py-1 rounded-sm mb-2 tracking-widest uppercase">
                Free Consultation
              </div>
              <h2 className="text-2xl font-black italic">방문상담 신청</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">
                작성해주신 정보를 바탕으로 꼼꼼한 상담을 도와드립니다.
              </p>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 size={64} className="text-brand-point mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-black mb-2">신청이 완료되었습니다!</h3>
                  <p className="text-gray-500 font-medium">
                    빠른 시일 내에 담당 트레이너가 연락드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">이름 <span className="text-brand-point">*</span></label>
                      <input required name="name" type="text" placeholder="홍길동" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">연락처 <span className="text-brand-point">*</span></label>
                      <input required name="phone" type="tel" placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">희망 지점 <span className="text-brand-point">*</span></label>
                    <select required name="branch" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium appearance-none bg-white">
                      <option value="">지점을 선택해주세요</option>
                      <option value="송도점">송도점</option>
                      <option value="작전점">작전점</option>
                      <option value="부평점">부평점</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">운동 목적 <span className="text-brand-point">*</span></label>
                    <select required name="goal" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium appearance-none bg-white">
                      <option value="">가장 큰 목적을 선택해주세요</option>
                      <option value="다이어트">다이어트</option>
                      <option value="근력증가">근력증가</option>
                      <option value="체형교정">체형교정</option>
                      <option value="바디프로필">바디프로필</option>
                      <option value="통증케어">통증케어</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">상담 희망 일자 <span className="text-brand-point">*</span></label>
                      <input required name="date" type="date" min={getTodayKST()} value={selectedDate} onChange={handleDateChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium bg-white" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">상담 희망 시간 <span className="text-brand-point">*</span></label>
                      <select required name="time" disabled={availableTimes.length === 0} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-400">
                        <option value="">{availableTimes.length === 0 ? "일자 선택 필요" : "시간 선택"}</option>
                        {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  {timeMessage && <p className={`text-xs mt-1 -translate-y-2 ${selectedDate && new Date(selectedDate).getDay() === 0 ? 'text-red-500' : 'text-brand-point'}`}>{timeMessage}</p>}

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">문의사항 (자유롭게 작성해주세요)</label>
                    <textarea name="inquiries" placeholder="궁금하신 점이나 추가로 남기고 싶은 말씀을 적어주세요." rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium resize-none custom-scrollbar"></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full btn-primary py-4 text-lg shadow-lg shadow-brand-point/30">
                      무료 운동처방 신청완료
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 font-medium">
                    입력하신 정보는 상담 목적 외에는 사용되지 않습니다.
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
