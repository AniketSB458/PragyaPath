import { EXAMS_DATABASE } from "../data/mockData";
function evaluateEligibility(input) {
  const exam = EXAMS_DATABASE.find((e) => e.id === input.examId) || EXAMS_DATABASE[0];
  const checks = [];
  let isEligible = "eligible";
  const nationalityPass = input.nationality === "Indian";
  checks.push({
    category: "Nationality / Citizenship",
    passed: nationalityPass,
    requirement: "Citizen of India (or eligible subject as per official rules)",
    userStatus: input.nationality,
    explanation: nationalityPass ? "Verified: You satisfy Indian citizenship criteria." : "Review required: Non-citizens must satisfy specific Ministry of Home Affairs eligibility certificates."
  });
  if (!nationalityPass) isEligible = "not_eligible";
  if (input.examId === "gate_exam" || input.examId === "gate_cse") {
    const validStage = input.educationLevel === "ug_engineering" || input.educationLevel === "graduate_job_seeker" || input.educationLevel === "ug_general" || input.educationLevel === "diploma";
    const validYear = input.graduationStatus === "final_year" || input.graduationStatus === "pre_final_year" || input.graduationStatus === "completed";
    const eduPassed = validStage && validYear;
    if (input.graduationStatus === "pre_final_year" && isEligible === "eligible") {
      isEligible = "conditionally_eligible";
    }
    checks.push({
      category: "Educational Qualification & Year of Study",
      passed: eduPassed,
      requirement: "Currently in 3rd year (pre-final) or higher of undergraduate degree, or already graduated.",
      userStatus: `${input.educationLevel} (${input.graduationStatus})`,
      explanation: eduPassed ? "Eligible: GATE regulations explicitly permit 3rd-year undergraduate students and graduates to appear without penalty." : "Not eligible yet: Students in 1st/2nd year of undergraduate or diploma holders prior to lateral degree entry cannot appear for GATE."
    });
    if (!eduPassed) isEligible = "not_eligible";
    checks.push({
      category: "Age Limit",
      passed: true,
      requirement: "No minimum or maximum age limit set by GATE National Coordination Board.",
      userStatus: `${input.age} years old`,
      explanation: "Eligible: There is absolutely no age barrier for appearing in GATE."
    });
    checks.push({
      category: "Minimum Qualifying Marks",
      passed: true,
      requirement: "No minimum percentage required in qualifying degree.",
      userStatus: `${input.aggregatePercentage}%`,
      explanation: "Eligible: Passing certificate is sufficient to obtain a valid GATE score."
    });
  } else if (input.examId === "upsc_cse") {
    const degPassed = input.graduationStatus === "completed" || input.graduationStatus === "final_year";
    checks.push({
      category: "Degree Requirement",
      passed: degPassed,
      requirement: "Must hold a recognized Bachelor Degree, or currently in the final year/semester.",
      userStatus: `${input.graduationStatus}`,
      explanation: degPassed ? "Eligible: Final year students can sit for Prelims (must produce proof of passing before Mains DAF-I)." : "Ineligible: 1st, 2nd, or 3rd year students (of a 4-year degree) cannot appear for UPSC CSE."
    });
    if (!degPassed) isEligible = "not_eligible";
    let maxAge = 32;
    if (input.category === "OBC-NCL") maxAge = 35;
    else if (input.category === "SC" || input.category === "ST") maxAge = 37;
    else if (input.category === "PwD") maxAge = 42;
    const agePassed = input.age >= 21 && input.age <= maxAge;
    checks.push({
      category: "Age Limit & Category Relaxations",
      passed: agePassed,
      requirement: `Age must be between 21 and ${maxAge} years for ${input.category} category as on 1st August.`,
      userStatus: `${input.age} years old (Category: ${input.category})`,
      explanation: agePassed ? `Eligible: Your age of ${input.age} is safely within the permitted limit (${maxAge} years max).` : `Age out of bounds: Minimum is 21 years and maximum for ${input.category} is ${maxAge} years.`
    });
    if (!agePassed) isEligible = "not_eligible";
    let maxAttempts = input.category === "SC" || input.category === "ST" ? "Unlimited" : input.category === "OBC-NCL" ? "9 attempts" : "6 attempts";
    checks.push({
      category: "Attempt Limits",
      passed: true,
      requirement: `${maxAttempts} permitted for ${input.category}`,
      userStatus: "Active candidate",
      explanation: `You are allotted ${maxAttempts} under UPSC rules.`
    });
  } else if (input.examId === "ssc_cgl" || input.examId === "ssc_je") {
    const degPassed = input.graduationStatus === "completed" || input.graduationStatus === "final_year";
    checks.push({
      category: "Degree Qualification",
      passed: degPassed,
      requirement: "Bachelor Degree in any discipline from a recognized University.",
      userStatus: `${input.educationLevel} (${input.graduationStatus})`,
      explanation: degPassed ? "Eligible: Degree holders and final year candidates (meeting cutoff date) qualify for SSC CGL." : "Ineligible: Must be in final year or completed bachelor degree."
    });
    if (!degPassed) isEligible = "not_eligible";
    let maxAge = input.category === "SC" || input.category === "ST" ? 37 : input.category === "OBC-NCL" ? 35 : 32;
    const agePassed = input.age >= 18 && input.age <= maxAge;
    checks.push({
      category: "Age Limit (18-32 Years)",
      passed: agePassed,
      requirement: `Age between 18 and ${maxAge} years for ${input.category}.`,
      userStatus: `${input.age} years`,
      explanation: agePassed ? "Eligible: Within statutory age bracket." : "Ineligible: Age criteria not met."
    });
    if (!agePassed) isEligible = "not_eligible";
  } else if (input.examId === "banking_ibps_po") {
    const degPassed = input.graduationStatus === "completed";
    checks.push({
      category: "Graduation Degree",
      passed: degPassed,
      requirement: "Recognized graduation degree (marksheet required on registration date).",
      userStatus: `${input.graduationStatus}`,
      explanation: degPassed ? "Eligible: Graduation certificate available." : "Conditionally eligible: Must have final result declared before the official registration closing date."
    });
    if (!degPassed) isEligible = "conditionally_eligible";
    let maxAge = input.category === "SC" || input.category === "ST" ? 35 : input.category === "OBC-NCL" ? 33 : 30;
    const agePassed = input.age >= 20 && input.age <= maxAge;
    checks.push({
      category: "Age Bracket (20-30 Years)",
      passed: agePassed,
      requirement: `Age between 20 and ${maxAge} years for ${input.category}.`,
      userStatus: `${input.age} years`,
      explanation: agePassed ? "Eligible: Within prescribed age bracket." : "Ineligible: Age criteria not met."
    });
    if (!agePassed) isEligible = "not_eligible";
  } else if (input.examId === "state_psc") {
    const degPassed = input.graduationStatus === "completed" || input.graduationStatus === "final_year";
    checks.push({
      category: "Bachelor Degree",
      passed: degPassed,
      requirement: "Graduation in any stream from an accredited university.",
      userStatus: `${input.educationLevel}`,
      explanation: degPassed ? "Eligible: Degree requirement satisfied." : "Ineligible: Degree required."
    });
    if (!degPassed) isEligible = "not_eligible";
    let maxAge = input.category === "SC" || input.category === "ST" ? 43 : input.category === "OBC-NCL" ? 41 : 38;
    const agePassed = input.age >= 19 && input.age <= maxAge;
    checks.push({
      category: "State PSC Age Limit (19-38+ Years)",
      passed: agePassed,
      requirement: `Age between 19 and ${maxAge} years for ${input.category}.`,
      userStatus: `${input.age} years`,
      explanation: agePassed ? "Eligible: Satisfies state age regulations." : "Ineligible: Exceeds upper limit."
    });
    if (!agePassed) isEligible = "not_eligible";
  } else if (input.examId === "nda_defence" || input.examId === "nda_exam") {
    const is12th = input.educationLevel === "12th_science" || input.educationLevel === "12th_commerce" || input.educationLevel === "12th_arts";
    const agePassed = input.age >= 16.5 && input.age <= 19.5;
    checks.push({
      category: "10+2 Schooling Qualification",
      passed: is12th || input.graduationStatus === "completed",
      requirement: "12th Class pass of the 10+2 pattern (appearing or passed).",
      userStatus: `${input.educationLevel}`,
      explanation: "Eligible: 12th appearing and passed students can apply."
    });
    checks.push({
      category: "Strict Armed Forces Age Bracket",
      passed: agePassed,
      requirement: "Strictly between 16.5 and 19.5 years on course commencement. No category age relaxation.",
      userStatus: `${input.age} years`,
      explanation: agePassed ? "Eligible: Meets strict defence academy age standards." : "Ineligible: Exceeds NDA upper age threshold (19.5 years). Consider CDS examination instead."
    });
    if (!agePassed) isEligible = "not_eligible";
  } else if (input.examId === "cat_management" || input.examId === "cat_exam") {
    const cutoffPercent = input.category === "SC" || input.category === "ST" || input.category === "PwD" ? 45 : 50;
    const marksPassed = input.aggregatePercentage >= cutoffPercent;
    checks.push({
      category: "Minimum Graduation Percentage",
      passed: marksPassed,
      requirement: `At least ${cutoffPercent}% marks or equivalent CGPA in bachelor degree for ${input.category}.`,
      userStatus: `${input.aggregatePercentage}%`,
      explanation: marksPassed ? `Eligible: Your aggregate of ${input.aggregatePercentage}% exceeds the ${cutoffPercent}% cutoff.` : `Ineligible: Minimum ${cutoffPercent}% required.`
    });
    if (!marksPassed) isEligible = "not_eligible";
    checks.push({
      category: "Age Limit",
      passed: true,
      requirement: "No upper age limit for CAT examination.",
      userStatus: `${input.age} years`,
      explanation: "Eligible: IIMs do not impose any age barrier."
    });
  } else {
    checks.push({
      category: "Standard Criteria Check",
      passed: true,
      requirement: "Standard qualification as per official notification",
      userStatus: `${input.educationLevel}, ${input.age} years`,
      explanation: "Criteria verified against published notification guidelines."
    });
  }
  const headline = isEligible === "eligible" ? `\u{1F389} Congratulations! You are 100% Eligible for ${exam.name}` : isEligible === "conditionally_eligible" ? `\u26A0\uFE0F Conditionally Eligible for ${exam.name}` : `\u274C Currently Ineligible for ${exam.name}`;
  const summary = isEligible === "eligible" ? `Based on official rules from ${exam.conductingBody}, your profile satisfies all statutory age, education, and percentage norms.` : `You do not meet one or more primary criteria for this specific examination cycle. Review the breakdown below for alternative pathways.`;
  const actionAdvice = isEligible === "eligible" ? `Next Step: Enroll in the personalized roadmap, add high-yield study sessions to your Daily Planner, and review official PYQs.` : input.examId === "nda_exam" && input.age > 19.5 ? `Alternative Recommendation: Since you have passed the NDA age limit (19.5 yrs), prepare for the CDS (Combined Defence Services) or AFCAT exams during your graduation!` : `Alternative Recommendation: Check related examinations in the directory that accept your current educational stage and stream.`;
  return {
    isEligible,
    headline,
    summary,
    checks,
    officialClause: exam.officialSourceLabel,
    officialSourceLink: exam.officialWebsite,
    actionAdvice
  };
}
export {
  evaluateEligibility
};
