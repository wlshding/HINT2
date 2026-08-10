import React from 'react';
import { Rocket, Play, FileSearch, LineChart, Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SAMPLE_JOBS } from '../data/samples';

interface HeroLandingProps {
  onStart: () => void;
  onLoadDemo: (sampleId: string) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ onStart, onLoadDemo }) => {
  return (
    <div className="w-full">
      {/* Hero Header Section */}
      <section className="relative pt-12 pb-16 px-4 md:px-8 flex flex-col items-center text-center max-w-7xl mx-auto overflow-hidden">
        {/* Background Subtle Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/40 via-slate-100/50 to-slate-100" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI ATS Resume Optimization Engine</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 max-w-4xl leading-tight mb-6 tracking-tight">
          JD 해독부터 내 이력서와의<br className="hidden sm:block" />
          <span className="text-indigo-600 relative inline-block mx-2">
            Gap 분석까지
            <span className="absolute bottom-1 left-0 w-full h-2 bg-indigo-100 -z-10 rounded-xs" />
          </span>
          10초 컷.
        </h1>

        <p className="text-slate-600 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          AI 기반 채용 공고 분석 및 이력서 매칭 시스템. 복잡한 요구사항을 명확한 데이터로 변환하여, 합격 확률을 극대화하는 전략적 피드백을 제공합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14">
          <button
            id="hero-start-btn"
            onClick={onStart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2.5"
          >
            <Rocket className="w-5 h-5 text-indigo-200" />
            <span>지금 시작하기</span>
          </button>

          <button
            id="hero-demo-btn"
            onClick={() => onLoadDemo(SAMPLE_JOBS[0].id)}
            className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold text-base px-8 py-3.5 rounded-lg transition-all shadow-xs flex items-center justify-center gap-2.5"
          >
            <Play className="w-4 h-4 text-indigo-600 fill-current" />
            <span>데모 체험하기</span>
          </button>
        </div>

        {/* Interactive Dashboard Mockup Frame */}
        <div className="w-full max-w-5xl rounded-xl border border-slate-200 shadow-md bg-white p-4 md:p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-10 bg-slate-50 border-b border-slate-200 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              <span className="ml-3 text-xs text-slate-400 font-mono-tag">jdscanner.ai/dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
              <span>LIVE MATCH PREVIEW</span>
            </div>
          </div>

          {/* Simulated App Screen inside Mockup */}
          <div className="mt-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
            {/* Left Score Card */}
            <div className="md:col-span-5 bg-slate-50 p-5 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Market Match</span>
                <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-md border border-emerald-100">88% High Match</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#e2e8f0" strokeWidth="10" fill="transparent" />
                    <circle cx="48" cy="48" r="40" stroke="#4f46e5" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="30.1" strokeLinecap="round" />
                  </svg>
                  <span className="absolute font-display font-extrabold text-2xl text-indigo-600">88%</span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-800">시니어 백엔드 엔지니어</h4>
                  <p className="text-xs text-slate-500">핵심 요구기술 12개 중 10개 일치</p>
                  <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ATS 서류 통과 가능성 높음
                  </div>
                </div>
              </div>
            </div>

            {/* Right Gap Analysis Preview */}
            <div className="md:col-span-7 bg-slate-50 p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Actionable Skill Gaps</span>
                <div className="mt-2 space-y-2">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-start justify-between gap-2 shadow-2xs">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-800">누락된 키워드: Kafka / 분산처리</span>
                        <p className="text-[11px] text-slate-500">"대용량 트래픽 메시지 큐 활용 경험" 문구를 프로젝트 설명에 추가하세요.</p>
                      </div>
                    </div>
                    <button className="text-[11px] font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2 py-1 rounded transition-colors whitespace-nowrap">
                      + 자동 삽입
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-slate-800">Spring Boot, MySQL, AWS, Docker</span>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded font-mono-tag">검증 완료</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button 
                  onClick={onStart}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  내 이력서로 직접 스캔해보기 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="py-16 bg-slate-100/60 border-t border-slate-200 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800 mb-2">
              핵심 기능
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              강력한 AI 엔진이 직무 요구사항의 이면을 분석하고, 이력서 합격률을 끌어올립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-indigo-500 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileSearch className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">JD 해독 (Decoder)</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                복잡하고 모호한 채용 공고(JD)를 AI가 분석하여 핵심 직무 역량, 우대 사항, 필수 기술 스택을 명확한 데이터 포인트로 추출합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-indigo-500 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <LineChart className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">ATS 매칭 점수</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                추출된 JD 데이터와 사용자의 이력서를 비교 분석하여, 실제 ATS(지원자 추적 시스템) 통과 확률을 정밀한 매칭 스코어로 시각화합니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-indigo-500 transition-all shadow-xs hover:shadow-sm group">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Lightbulb className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">실행 가능한 피드백</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                부족한 역량(Gap)을 파악하고, 이를 보완하기 위한 구체적이고 실행 가능한(Actionable) 이력서 수정 가이드라인과 실시간 에디터를 제공합니다.
              </p>
            </div>
          </div>

          {/* Quick Demo Selector Panel */}
          <div className="mt-12 bg-white rounded-xl p-6 md:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-semibold mb-2 border border-indigo-100">
                <ShieldCheck className="w-3.5 h-3.5" /> 바로 테스트해볼 샘플 직무 선택
              </div>
              <h3 className="font-display font-bold text-xl text-slate-800">어떤 공고를 분석해볼까요?</h3>
              <p className="text-slate-500 text-xs mt-1">원클릭으로 실제 JD와 이력서를 불러와 스캔 결과를 체험하세요.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SAMPLE_JOBS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onLoadDemo(sample.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  {sample.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 md:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display font-bold text-sm text-slate-800">JD Scanner</div>
          <div>© 2026 JD Scanner AI System</div>
          <div className="flex gap-4 font-mono-tag">
            <span className="hover:text-indigo-600 cursor-pointer">개인정보 처리방침</span>
            <span className="hover:text-indigo-600 cursor-pointer">이용약관</span>
            <span className="hover:text-indigo-600 cursor-pointer">문의하기</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

