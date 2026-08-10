import { AnalysisResult } from '../types';

export function generateClientFallbackAnalysis(jdText: string, resumeText: string): AnalysisResult {
  const commonTechs = [
    "React", "TypeScript", "JavaScript", "Next.js", "Node.js", "Spring Boot",
    "Java", "Python", "MySQL", "PostgreSQL", "Redis", "Docker", "Kubernetes",
    "AWS", "GCP", "RESTful API", "GraphQL", "Git", "CI/CD", "JPA", "Zustand",
    "Redux", "Kafka", "ElasticSearch", "Cypress", "Jest", "Tailwind CSS",
    "Figma", "JIRA", "GA4", "Amplitude", "SQL"
  ];

  const jdLower = jdText.toLowerCase();
  const resumeLower = resumeText.toLowerCase();

  const foundInJd = commonTechs.filter(tech => jdLower.includes(tech.toLowerCase()));
  const matched = foundInJd.filter(tech => resumeLower.includes(tech.toLowerCase()));
  const missing = foundInJd.filter(tech => !resumeLower.includes(tech.toLowerCase()));

  const matchRatio = foundInJd.length > 0 ? (matched.length / foundInJd.length) : 0.6;
  let matchScore = Math.min(95, Math.max(35, Math.round(matchRatio * 100)));
  if (foundInJd.length === 0) matchScore = 65;

  let tier: 'High' | 'Moderate' | 'Low' = 'Moderate';
  if (matchScore >= 80) tier = 'High';
  else if (matchScore < 50) tier = 'Low';

  const firstLine = jdText.split('\n')[0] || "소프트웨어 엔지니어";
  const jobTitle = firstLine.length < 30 ? firstLine.replace(/[\[\]]/g, '').trim() : "백엔드 / 프론트엔드 개발자";

  return {
    id: "scan_" + Date.now(),
    timestamp: new Date().toISOString(),
    jobTitle,
    companyName: "채용 기업",
    matchScore,
    tier,
    metadata: {
      jobTitle,
      experienceYears: "3년 이상",
      coreCompetency: "핵심 기술 스택 및 문제 해결",
      companyType: "IT/소프트웨어 기업"
    },
    extractedKeywords: foundInJd.length > 0 ? foundInJd.slice(0, 8) : ["Spring Boot", "MySQL", "AWS", "RESTful API"],
    requiredSkills: foundInJd.slice(0, 4),
    preferredSkills: foundInJd.slice(4, 8),
    matchedSkills: matched.map(s => ({
      skill: s,
      category: "tech" as const,
      description: `이력서에 ${s} 항목이 명시되어 있습니다.`
    })),
    missingSkills: (missing.length > 0 ? missing : ["AWS CI/CD", "성능 최적화", "트러블슈팅 수치화"]).map(s => ({
      skill: s,
      category: "tech" as const,
      importance: "high" as const,
      reason: `JD에서 중점적으로 요구하는 ${s} 관련 실무 경험과 구체적 서술이 부족합니다.`,
      suggestedBulletPoint: `"${s} 기술을 사용하여 복잡한 모듈을 설계하고 기존 대비 안정성을 향상시킴."`
    })),
    actionGuide: {
      summary: `JD의 주요 키워드 중 ${matched.length}개가 일치합니다. 부족한 ${missing.length > 0 ? missing.join(', ') : '인프라/성능 지표'} 항목을 수치화된 경험으로 보완하면 ATS 합격 확률이 높아집니다.`,
      keyAdvice: [
        "JD의 '문제 해결 능력'을 어필하기 위해 트러블슈팅 경험의 결과(성능 개선치 %)를 수치로 추가해보세요.",
        "핵심 기술 스택을 이력서 상단 [주요 역량] 섹션에 명확히 배치하세요.",
        "프로젝트 서술 시 담당 역할과 기여도를 명확히 구분하여 서술하세요."
      ],
      tailoredBulletPoints: (missing.length > 0 ? missing.slice(0, 3) : ["AWS CI/CD", "성능 최적화", "트러블슈팅"]).map(item => ({
        category: "기술 역량 보완",
        originalContext: "기존 일반적인 프로젝트 서술",
        suggestedText: `"${item} 방식을 도입하여 자동화 파이프라인을 구축하고 처리 속도를 30% 개선함."`,
        targetKeyword: item
      })),
      atsOptimizationTips: [
        "이미지나 복잡한 표 대신 텍스트 중심의 표준 라인 포맷을 사용하세요.",
        "JD에 명시된 주요 단어(키워드)를 문맥에 맞게 정확히 포함하세요."
      ]
    },
    rawJdText: jdText,
    rawResumeText: resumeText
  };
}
