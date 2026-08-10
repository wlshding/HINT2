import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { History, Trash2, ArrowRight, FileEdit, Search, Clock, CheckCircle2 } from 'lucide-react';

interface HistoryViewProps {
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onOpenEditorWithResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectResult,
  onOpenEditorWithResult,
  onClearHistory,
  onDeleteHistoryItem
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item =>
    item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <History className="w-6 h-6 text-indigo-600" />
            내 분석 기록
          </h2>
          <p className="text-xs text-slate-500">이전에 진행했던 JD & 이력서 매칭 스캔 결과를 다시 확인하고 가공하세요.</p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors flex items-center gap-1 font-semibold self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> 전체 삭제
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <History className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-1">저장된 기록이 없습니다</h3>
          <p className="text-xs text-slate-500">새로운 JD와 이력서를 스캔하여 나만의 매칭 스코어와 Gap 분석 리포트를 남겨보세요.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="직무명 검색..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHistory.map((item) => {
              const scoreColor = item.matchScore >= 80 ? '#059669' : item.matchScore >= 50 ? '#d97706' : '#e11d48';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-mono-tag text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(item.timestamp).toLocaleString('ko-KR')}
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">
                          {item.jobTitle}
                        </h4>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="font-display font-bold text-xl" style={{ color: scoreColor }}>
                          {item.matchScore}%
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs border uppercase" style={{ backgroundColor: `${scoreColor}10`, color: scoreColor, borderColor: `${scoreColor}30` }}>
                          {item.tier}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.matchedSkills.slice(0, 4).map((s, i) => (
                        <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-xs flex items-center gap-0.5 font-semibold">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> {s.skill}
                        </span>
                      ))}
                      {item.missingSkills.slice(0, 2).map((m, i) => (
                        <span key={i} className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-xs font-semibold">
                          + {m.skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      삭제
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenEditorWithResult(item)}
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <FileEdit className="w-3.5 h-3.5" /> 에디터
                      </button>

                      <button
                        onClick={() => onSelectResult(item)}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <span>리포트 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

