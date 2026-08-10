import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Download, RefreshCw, Sparkles, Copy, Check, Bold, Italic, List, Plus, FileText, ArrowLeft } from 'lucide-react';

interface ResumeEditorViewProps {
  initialResumeText: string;
  jdText: string;
  analysisResult: AnalysisResult | null;
  onReAnalyze: (updatedResumeText: string) => void;
  onBackToResult: () => void;
}

export const ResumeEditorView: React.FC<ResumeEditorViewProps> = ({
  initialResumeText,
  jdText,
  analysisResult,
  onReAnalyze,
  onBackToResult
}) => {
  const [resumeText, setResumeText] = useState(initialResumeText);
  const [copied, setCopied] = useState(false);
  const [insertedItems, setInsertedItems] = useState<string[]>([]);

  const handleInsertSuggestion = (textToInsert: string, id: string) => {
    setResumeText(prev => prev + '\n\n- ' + textToInsert.replace(/^["']|["']$/g, ''));
    if (!insertedItems.includes(id)) {
      setInsertedItems(prev => [...prev, id]);
    }
  };

  const handleCopyResume = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>이력서 - JD Scanner 최적화</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; padding: 40px; color: #111; }
              pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
            </style>
          </head>
          <body>
            <h2>이력서 (JD Scanner AI 최적화)</h2>
            <hr />
            <pre>${resumeText}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToResult}
            className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-1 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> 분석 리포트로 돌아가기
          </button>
          <h2 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            실시간 최적화 에디터
          </h2>
          <p className="text-xs text-slate-500">직무 기술서에 맞게 이력서를 가공하고 AI 제안을 1클릭으로 대입하세요.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onReAnalyze(resumeText)}
            className="px-3.5 py-2 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>다시 분석하기</span>
          </button>

          <button
            onClick={handleCopyResume}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? '복사 완료' : '텍스트 복사'}</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-100 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF 저장</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        {/* Left Side: Read-only JD Reference (4 columns) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 flex flex-col shadow-xs overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <span className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" /> 원본 채용 기술서 (JD)
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono-tag">읽기 전용</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 font-mono-tag leading-relaxed whitespace-pre-wrap">
            {jdText || "입력된 채용 공고가 없습니다."}
          </div>
        </div>

        {/* Middle/Right Side: Editable Resume + AI Gap Bar (8 columns) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
          {/* Resume Editor Area (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 p-4 flex flex-col shadow-xs h-full">
            {/* Formatting Toolbar Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setResumeText(prev => prev + ' **강조** ')} 
                  title="굵게"
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setResumeText(prev => prev + ' *기울임* ')} 
                  title="기울임"
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setResumeText(prev => prev + '\n- 항목 추가')} 
                  title="목록"
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-600"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-slate-400 font-mono-tag">{resumeText.length}자</span>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="flex-1 w-full p-4 rounded-lg bg-slate-50 focus:outline-none text-xs text-slate-800 font-mono-tag leading-relaxed resize-none border border-slate-200 focus:border-indigo-500 focus:bg-white"
            />
          </div>

          {/* Right AI Gap Panel (5 cols) */}
          <div className="md:col-span-5 bg-indigo-50/40 rounded-xl border border-indigo-100 p-4 flex flex-col shadow-xs h-full overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-indigo-100">
              <span className="font-display font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" /> AI 격차 분석
              </span>
              <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-600 font-bold px-2 py-0.5 rounded-md">
                {analysisResult?.missingSkills.length || 0}개 보완 권장
              </span>
            </div>

            <p className="text-[11px] text-slate-600 mb-3">
              버튼을 클릭하여 AI가 제안하는 성과 중심 문구를 이력서 하단에 즉시 삽입하세요.
            </p>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {analysisResult?.missingSkills.map((missing, idx) => {
                const itemKey = `missing_${idx}`;
                const isInserted = insertedItems.includes(itemKey);

                return (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-600">+ {missing.skill}</span>
                      {isInserted && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> 삽입됨
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-800 font-mono-tag bg-slate-50 p-2 rounded border border-slate-200">
                      {missing.suggestedBulletPoint}
                    </p>
                    <button
                      onClick={() => handleInsertSuggestion(missing.suggestedBulletPoint, itemKey)}
                      className={`w-full py-1.5 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        isInserted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-100'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isInserted ? '다시 삽입' : '이력서에 삽입'}</span>
                    </button>
                  </div>
                );
              })}

              {analysisResult?.actionGuide.tailoredBulletPoints.map((bp, idx) => {
                const itemKey = `tailored_${idx}`;
                const isInserted = insertedItems.includes(itemKey);

                return (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600">{bp.category}</span>
                      {isInserted && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> 삽입됨
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-800 font-mono-tag bg-slate-50 p-2 rounded border border-slate-200">
                      {bp.suggestedText}
                    </p>
                    <button
                      onClick={() => handleInsertSuggestion(bp.suggestedText, itemKey)}
                      className={`w-full py-1.5 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        isInserted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-100'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isInserted ? '다시 삽입' : '이력서에 삽입'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

