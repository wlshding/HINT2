import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle2, AlertTriangle, Lightbulb, FileEdit, ArrowRight, Sparkles, Copy, Check, Hash } from 'lucide-react';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onOpenEditor: () => void;
  onNewScan: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  result,
  onOpenEditor,
  onNewScan
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedMissingSkill, setSelectedMissingSkill] = useState<string | null>(
    result.missingSkills.length > 0 ? result.missingSkills[0].skill : null
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#059669'; // Emerald-600
    if (score >= 50) return '#d97706'; // Amber-600
    return '#e11d48'; // Rose-600
  };

  const scoreColor = getScoreColor(result.matchScore);

  const handleCopySummary = () => {
    const textToCopy = `[JD Scanner 분석 결과]
직무: ${result.jobTitle}
매칭 점수: ${result.matchScore}% (${result.tier})
일치 키워드: ${result.matchedSkills.map(s => s.skill).join(', ')}
보완 권장 키워드: ${result.missingSkills.map(s => s.skill).join(', ')}

[AI 액션 가이드]
${result.actionGuide.summary}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* 1. Header Card: Match Score Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>분석 완료</span>
          </div>

          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-3 tracking-tight">
            {result.jobTitle}
          </h2>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-2xl">
            {result.actionGuide.summary || "제공된 직무 기술서(JD)와 이력서를 비교했습니다. 아래 인사이트를 검토하여 지원서를 최적화하세요."}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEditor}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-100 active:scale-95 flex items-center gap-2"
            >
              <FileEdit className="w-4 h-4 text-emerald-300" />
              <span>실시간 에디터에서 보완하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopySummary}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-colors shadow-2xs flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? '복사됨!' : '요약 복사'}</span>
            </button>
          </div>
        </div>

        {/* Donut Chart Match Score Display */}
        <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-lg border border-slate-200 min-w-[200px]">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
              <circle
                cx="64"
                cy="64"
                r="50"
                stroke={scoreColor}
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="314.15"
                strokeDashoffset={314.15 - (314.15 * result.matchScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display font-bold text-3xl text-slate-900">{result.matchScore}%</span>
              <span className="text-[11px] font-mono-tag text-slate-400">매치 점수</span>
            </div>
          </div>
          <span 
            className="mt-3 text-xs font-bold px-3 py-1 rounded-md uppercase border"
            style={{ backgroundColor: `${scoreColor}10`, color: scoreColor, borderColor: `${scoreColor}30` }}
          >
            {result.tier} Match
          </span>
        </div>
      </div>

      {/* 2. Middle Grid: JD Decoder (Left) & Gap Analysis (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: JD Decoder */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200">
              <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Hash className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">JD 디코더</h3>
            </div>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono-tag">
                #직무: {result.metadata?.jobTitle || result.jobTitle}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono-tag">
                #연차: {result.metadata?.experienceYears || "경력 무관"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono-tag">
                #핵심역량: {result.metadata?.coreCompetency || "시스템 개발"}
              </span>
            </div>

            {/* Keyword Word Cloud Panel */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-5">
              <span className="text-xs font-bold text-slate-400 uppercase mb-2 block">추출된 주요 키워드</span>
              <div className="flex flex-wrap gap-2">
                {result.extractedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-md shadow-2xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Required & Preferred List */}
            <div className="space-y-3">
              {result.requiredSkills?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" /> 필수 자격요건
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside pl-1">
                    {result.requiredSkills.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.preferredSkills?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-indigo-600 mb-1.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" /> 우대 사항
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside pl-1">
                    {result.preferredSkills.map((pref, i) => (
                      <li key={i}>{pref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Gap Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200">
              <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
                <AlertTriangle className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">갭(Gap) 분석</h3>
            </div>

            {/* Matched Skills */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-emerald-600 mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 일치함 ({result.matchedSkills.length}개)
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-bold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {item.skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <h4 className="text-xs font-bold text-rose-600 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> 누락 / 보완 필요 ({result.missingSkills.length}개)
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.missingSkills.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMissingSkill(item.skill)}
                    className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition-all border ${
                      selectedMissingSkill === item.skill
                        ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                        : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <span>+ {item.skill}</span>
                  </button>
                ))}
              </div>

              {/* Selected Skill Detail Suggestion Card */}
              {selectedMissingSkill && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                  {result.missingSkills.find(m => m.skill === selectedMissingSkill) && (
                    <>
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>보완 전략: {selectedMissingSkill}</span>
                        <span className="text-[10px] font-mono-tag bg-rose-100 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                          {result.missingSkills.find(m => m.skill === selectedMissingSkill)?.importance.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <p className="text-slate-600">
                        {result.missingSkills.find(m => m.skill === selectedMissingSkill)?.reason}
                      </p>
                      <div className="p-2.5 bg-white rounded-md border border-indigo-100 text-slate-800 font-mono-tag">
                        💡 추천 문구: {result.missingSkills.find(m => m.skill === selectedMissingSkill)?.suggestedBulletPoint}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. AI Action Guide Section */}
      <div className="bg-slate-50 border-l-4 border-l-indigo-600 border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">AI 액션 가이드 (수정 제안)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">전략적 수정 조언</h4>
            <ul className="space-y-2 text-xs text-slate-800">
              {result.actionGuide.keyAdvice.map((advice, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-indigo-600 shrink-0">{i + 1}.</span>
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">추천 추가 문안 (이력서에 대입해보세요)</h4>
            <div className="space-y-2">
              {result.actionGuide.tailoredBulletPoints.map((bp, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-indigo-600 mb-1">
                    <span>{bp.category} ({bp.targetKeyword})</span>
                  </div>
                  <p className="font-mono-tag text-slate-800 bg-slate-50 p-2 rounded border border-slate-200">
                    {bp.suggestedText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA to open Real-time Editor */}
        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            추천 문구들을 에디터에 자동으로 넣고 이력서를 실시간으로 가공해보세요.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNewScan}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-2xs"
            >
              새로 스캔하기
            </button>

            <button
              onClick={onOpenEditor}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-100 active:scale-95 flex items-center gap-2"
            >
              <FileEdit className="w-4 h-4 text-emerald-300" />
              <span>실시간 에디터 열기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

