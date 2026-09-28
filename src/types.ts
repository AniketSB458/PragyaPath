export type EducationStage =
  | '10th'
  | '12th_science'
  | '12th_commerce'
  | '12th_arts'
  | 'diploma'
  | 'ug_engineering'
  | 'ug_general'
  | 'graduate_job_seeker';

export type Language = 'en' | 'hi' | 'mr';

export interface UserProfile {
  name: string;
  email?: string;
  educationStage: EducationStage;
  degreeOrStream: string;
  currentYear: string;
  targetGoal: string;
  targetExamId?: string;
  targetYear: string;
  dailyHours: number;
  language: Language;
  weakTopics: string[];
  strongTopics: string[];
  completedTopicIds: string[];
  bookmarkedResourceIds: string[];
  bookmarkedQuestionIds: string[];
  streakDays: number;
  totalStudyMinutes: number;
  questionsSolved: number;
  correctAnswers: number;
  lastActiveDate: string;
}

export interface Career {
  id: string;
  title: string;
  sector: string;
  shortDescription: string;
  fullDescription: string;
  requiredEducation: string[];
  coreSkills: string[];
  salaryRangeINR: string;
  growthOutlook: string;
  topRecruiters: string[];
  entryExams: string[];
  dayInTheLife: string;
  pathwayFrom10th: string[];
  pathwayFromDiploma: string[];
  pathwayFromBTech: string[];
  recommendedRoadmapId: string;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  conductingBody: string;
  officialWebsite: string;
  notificationPeriod: string;
  examDates: string;
  educationalQualification: string;
  allowedStreams: string[];
  minimumMarks: string;
  ageCriteriaGeneral: string;
  ageRelaxations: {
    obc: string;
    scSt: string;
    pwd: string;
    ews: string;
  };
  examStages: {
    stageName: string;
    format: string;
    marks: number;
    duration: string;
    negativeMarking: string;
  }[];
  subjectWeightage: {
    subject: string;
    weightagePercentage: number;
    keyTopics: string[];
  }[];
  verifiedDate: string;
  officialSourceLabel: string;
}

export interface EligibilityInput {
  examId: string;
  educationLevel: EducationStage;
  degreeOrBranch: string;
  graduationStatus: 'completed' | 'final_year' | 'pre_final_year' | 'pursuing_early';
  age: number;
  category: 'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'PwD';
  nationality: 'Indian' | 'Other';
  aggregatePercentage: number;
}

export interface EligibilityEvaluation {
  isEligible: 'eligible' | 'conditionally_eligible' | 'not_eligible';
  headline: string;
  summary: string;
  checks: {
    category: string;
    passed: boolean | 'conditional';
    requirement: string;
    userStatus: string;
    explanation: string;
  }[];
  officialClause: string;
  officialSourceLink: string;
  actionAdvice: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  estimatedHours: number;
  description: string;
  coreConcepts: string[];
  freeResourceLink?: string;
  pyqCount: number;
  completed?: boolean;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseName: string;
  durationWeeks: number;
  objective: string;
  topics: RoadmapTopic[];
}

export interface Roadmap {
  id: string;
  goalId: string;
  title: string;
  description: string;
  totalWeeks: number;
  phases: RoadmapPhase[];
}

export interface FreeResource {
  id: string;
  title: string;
  platform: 'NPTEL / Swayam' | 'YouTube Open Lecture' | 'MIT OpenCourseWare' | 'Government Portal' | 'Gate Overflow' | 'Standard Doc' | string;
  instructorOrEntity: string;
  subject: string;
  topic: string;
  format: 'Video Playlist' | 'Comprehensive Notes' | 'Interactive Simulator' | 'PYQ Archive' | 'Video Lecture' | 'Web Article' | string;
  language: 'English' | 'Hindi' | 'Bilingual' | 'Marathi' | string;
  syllabusRelevancePercent: number;
  rating: number;
  linkUrl: string;
  verifiedDate: string;
  stepCategory: 'Learn' | 'Understand' | 'Practice' | 'Evaluate';
  description: string;
  thumbnailUrl?: string;
  videoId?: string;
  isLiveApiResult?: boolean;
  sourceType?: 'youtube' | 'web' | 'nptel' | 'curated';
}

export interface DailyStudySession {
  id: string;
  title: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  sessionType: 'Concept & Theory' | 'PYQ Practice' | 'Weak Topic Revision' | 'Adaptive Quiz' | 'Mock Test';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface PYQQuestion {
  id: string;
  exam: string;
  year: number;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  keyConcept: string;
  frequencyRating: number; // 1 to 5 stars
  recommendedLectureTopic?: string;
}

export interface MockTest {
  id: string;
  title: string;
  exam: string;
  durationMinutes: number;
  totalMarks: number;
  negativeMarkRatio: number; // e.g. 0.33
  questions: PYQQuestion[];
}

export interface MockSubmissionResult {
  testId: string;
  score: number;
  totalMarks: number;
  accuracyPercent: number;
  timeSpentSeconds: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  strongAreas: string[];
  weakAreas: string[];
  actionRecommendation: string;
}

export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionChips?: string[];
}
