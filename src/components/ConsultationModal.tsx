import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      branch: formData.get("branch"),
      goal: formData.get("goal"),
      experience: formData.get("experience"),
      time: formData.get("time"),
      inquiries: formData.get("inquiries"),
    };

    try {
      const response = await fetch("http://localhost:3001/api/submit-form", {
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
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
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
                      <option value="songdo">송도점</option>
                      <option value="jakjeon">작전점</option>
                      <option value="bupyeong">부평점</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">운동 목적 <span className="text-brand-point">*</span></label>
                    <select required name="goal" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium appearance-none bg-white">
                      <option value="">가장 큰 목적을 선택해주세요</option>
                      <option value="diet">다이어트</option>
                      <option value="muscle">근력증가</option>
                      <option value="posture">체형교정</option>
                      <option value="bodyprofile">바디프로필</option>
                      <option value="pain">통증케어</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">운동 경험 유무</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['처음', '1년 미만', '1년 이상'].map((exp) => (
                        <label key={exp} className="cursor-pointer">
                          <input type="radio" name="experience" className="peer sr-only" value={exp} defaultChecked={exp === '처음'} />
                          <div className="text-center px-2 py-3 rounded-lg border border-gray-200 peer-checked:border-brand-point peer-checked:bg-brand-point/5 peer-checked:text-brand-point font-bold text-sm text-gray-500 transition-all">
                            {exp}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">상담 희망 시간 <span className="text-brand-point">*</span></label>
                    <input required name="time" type="text" placeholder="예) 평일 오후 7시 이후, 주말 오전" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-point focus:ring-1 focus:ring-brand-point outline-none transition-all font-medium" />
                  </div>

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
