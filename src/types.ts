export interface JobMetadata {
  jobTitle: string;       // e.g., "백엔드 엔지니어"
  experienceYears: string;// e.g., "3년 이상"
  coreCompetency: string; // e.g., "API 개발 및 DB 최적화"
  companyType?: string;    // e.g., "IT 스타트업", "대기업"
}

export interface MatchedItem {
  skill: string;
  category: 'tech' | 'experience' | 'qualification' | 'soft_skill';
  description?: string;
}

export interface MissingItem {
  skill: string;
  category: 'tech' | 'experience' | 'qualification' | 'soft_skill';
  importance: 'high' | 'medium' | 'low';
  reason: string;
  suggestedBulletPoint: string;
}

export interface ActionGuide {
  summary: string;
  keyAdvice: string[];
  tailoredBulletPoints: {
    category: string;
    originalContext?: string;
    suggestedText: string;
    targetKeyword: string;
  }[];
  atsOptimizationTips: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  jobTitle: string;
  companyName?: string;
  matchScore: number; // 0 - 100
  tier: 'High' | 'Moderate' | 'Low'; // Match tier
  metadata: JobMetadata;
  extractedKeywords: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  matchedSkills: MatchedItem[];
  missingSkills: MissingItem[];
  actionGuide: ActionGuide;
  rawJdText: string;
  rawResumeText: string;
}

export interface AnalysisHistoryItem {
  id: string;
  timestamp: string;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  result: AnalysisResult;
}

export interface SampleData {
  id: string;
  title: string;
  company: string;
  category: string;
  jdText: string;
  matchingResume: string;
  weakResume: string;
}
