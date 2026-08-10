import React, { useState, useRef } from 'react';
import { Briefcase, FileText, Upload, Sparkles, RefreshCw, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { SAMPLE_JOBS } from '../data/samples';

interface AnalysisInputViewProps {
  jdText: string;
  setJdText: (text: string) => void;
  resumeText: string;
  setResumeText: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onLoadSample: (sampleId: string, matchType: 'matching' | 'weak') => void;
}

export const AnalysisInputView: React.FC<AnalysisInputViewProps> = ({
  jdText,
  setJdText,
  resumeText,
  setResumeText,
  onAnalyze,
  isAnalyzing,
  onLoadSample
}) => {
  const [resumeInputTab, setResumeInputTab] = useState<'upload' | 'text'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setResumeText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            스캔 워크스페이스
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            채용 공고와 이력서를 입력하고 [AI 분석하기]를 누르면 10초 만에 Gap 리포트가 생성됩니다.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">샘플 자동 입력:</span>
          {SAMPLE_JOBS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onLoadSample(sample.id, 'matching')}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md transition-colors shadow-2xs"
            >
              {sample.title.split(' ')[0]} {sample.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Card: Job Description */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col h-[500px]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Briefcase className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-800">채용 공고 (JD)</h3>
            </div>

            <div className="flex items-center gap-2">
              {jdText && (
                <button
                  onClick={() => setJdText('')}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
                >
                  초기화
                </button>
              )}
              <span className="text-xs font-mono-tag text-slate-400">
                {jdText.length}자
              </span>
            </div>
          </div>

          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="여기에 채용공고(JD) 텍스트를 복사해서 붙여넣으세요.&#10;&#10;예시:&#10;- 주요 업무: Spring Boot 기반 API 개발, DB 인덱스 최적화&#10;- 자격 요건: 경력 3년 이상, MySQL, AWS 경험..."
            className="w-full flex-1 p-4 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none font-mono-tag leading-relaxed"
          />
        </div>

        {/* Right Card: Resume Input */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col h-[500px]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
                <FileText className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-800">이력서 입력</h3>
            </div>

            {/* Input Toggle Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200">
              <button
                onClick={() => setResumeInputTab('upload')}
                className={`px-3 py-1 rounded-xs text-xs font-semibold transition-all ${
                  resumeInputTab === 'upload'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                파일 업로드
              </button>
              <button
                onClick={() => setResumeInputTab('text')}
                className={`px-3 py-1 rounded-xs text-xs font-semibold transition-all ${
                  resumeInputTab === 'text'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                텍스트 직접 입력
              </button>
            </div>
          </div>

          {resumeInputTab === 'upload' ? (
            <div className="flex-1 flex flex-col justify-between">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-50'
                    : uploadedFileName
                    ? 'border-emerald-500/50 bg-emerald-50/30'
                    : 'border-slate-300 hover:border-indigo-500 bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5 text-indigo-600" />
                </div>

                {uploadedFileName ? (
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {uploadedFileName}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">이력서 텍스트가 성공적으로 로드되었습니다.</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-800">이력서 드래그 앤 드롭</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, DOCX, TXT 지원 (최대 5MB)</p>
                    <button
                      type="button"
                      className="mt-4 px-4 py-1.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      파일 찾기
                    </button>
                  </div>
                )}
              </div>

              {/* Preview or Fallback Textarea if loaded */}
              {resumeText && (
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-800">이력서 본문 미리보기</span>
                    <button
                      onClick={() => setResumeInputTab('text')}
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      수정하기
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 font-mono-tag">{resumeText}</p>
                </div>
              )}
            </div>
          ) : (
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="여기에 보유 이력서 또는 경력 기술서 내용을 복사해서 붙여넣으세요..."
              className="w-full flex-1 p-4 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none font-mono-tag leading-relaxed"
            />
          )}
        </div>
      </div>

      {/* Main Submit Action Area */}
      <div className="flex flex-col items-center justify-center text-center">
        {!jdText.trim() || !resumeText.trim() ? (
          <div className="mb-3 text-xs text-rose-600 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-4 h-4" /> 채용 공고와 이력서를 모두 입력하셔야 AI 분석이 가능합니다.
          </div>
        ) : null}

        <button
          id="analyze-submit-btn"
          onClick={onAnalyze}
          disabled={isAnalyzing || !jdText.trim() || !resumeText.trim()}
          className={`w-full max-w-md py-4 px-8 rounded-lg font-display font-bold text-base text-white shadow-md transition-all flex items-center justify-center gap-3 active:scale-95 ${
            isAnalyzing || !jdText.trim() || !resumeText.trim()
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 hover:shadow-lg'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-indigo-200" />
              <span>AI가 JD 해독 및 Gap 분석을 진행 중입니다...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>AI ATS 매칭 분석하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

