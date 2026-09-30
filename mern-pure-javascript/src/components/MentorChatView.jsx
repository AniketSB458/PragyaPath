import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BotMessageSquare,
  Send,
  Sparkles,
  User,
  RotateCcw,
  Loader2
} from "lucide-react";
const MentorChatView = () => {
  const { profile, activeExam, addDailySession, setActiveTab, addWeakTopic, showToast, t } = useApp();
  const getInitialWelcomeMessage = () => ({
    id: "m-1",
    role: "assistant",
    content: `Namaste ${profile.name}! I am **Pragya**, your dedicated career and learning mentor. 

I have full visibility into your profile:
\u2022 **Target Goal:** ${profile.targetGoal}
\u2022 **Current Stage:** ${profile.degreeOrStream} (${profile.currentYear})
\u2022 **Daily Effort:** ${profile.dailyHours} hours/day
\u2022 **Detected Weak Areas:** ${profile.weakTopics.length > 0 ? profile.weakTopics.join(", ") : "None yet (all clear)"}

How can I guide your preparation today? You can ask me about study schedules, complex concept derivations, exam eligibility, or career pathways.`,
    timestamp: "Just now",
    actionChips: [
      "How should I prioritize my study hours today?",
      "Explain Fundamental Rights vs Directive Principles",
      "Shortcut trick for Percentage & Profit-Loss problems",
      "Civil Services vs Banking PO vs Corporate Career"
    ]
  });
  const [messages, setMessages] = useState([getInitialWelcomeMessage()]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;
    const userMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: "Just now"
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          userProfile: {
            name: profile.name,
            educationStage: profile.educationStage,
            degreeOrStream: profile.degreeOrStream,
            currentYear: profile.currentYear,
            targetGoal: profile.targetGoal,
            targetExamId: profile.targetExamId,
            dailyHours: profile.dailyHours,
            weakTopics: profile.weakTopics,
            strongTopics: profile.strongTopics,
            language: profile.language
          }
        })
      });
      const data = await response.json();
      const replyContent = data.reply || "I have analyzed your query based on verified examination patterns. Let us break this down into clear actionable steps.";
      const assistantMessage = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: replyContent,
        timestamp: "Just now",
        actionChips: [
          "Add a study session on this topic",
          "Solve related GATE PYQs",
          "Explain this in simpler terms"
        ]
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage = {
        id: `asst-err-${Date.now()}`,
        role: "assistant",
        content: "I encountered a network difficulty while connecting to the mentor knowledge base. Please check your query or try again.",
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, errorMessage]);
      showToast("Network error while reaching mentor advisor.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChipClick = (chip) => {
    if (chip === "Add a study session on this topic") {
      const topicName = profile.weakTopics[0] || "Target Concept Revision";
      addDailySession({
        title: `Targeted Study: ${topicName}`,
        subject: "Computer Science",
        topic: topicName,
        durationMinutes: 45,
        sessionType: "Weak Topic Revision",
        priority: "high"
      });
      showToast(`Added 45m study session for "${topicName}" to Daily Planner`, "success");
      setActiveTab("planner");
      return;
    }
    if (chip === "Solve related GATE PYQs") {
      setActiveTab("practice");
      return;
    }
    handleSendMessage(chip);
  };
  const handleClearChat = () => {
    setMessages([getInitialWelcomeMessage()]);
    showToast("Conversation refreshed", "info");
  };
  return <div className="space-y-4 max-w-4xl mx-auto">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BotMessageSquare className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t("mentor_banner_title")}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Target: <strong className="text-slate-800">{profile.targetGoal}</strong> • {profile.dailyHours}h/day
            {profile.weakTopics.length > 0 && <> • Focus: <span className="text-rose-600 font-semibold">{profile.weakTopics.slice(0, 2).join(", ")}</span></>}
          </p>
        </div>

        <button
    onClick={handleClearChat}
    className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-white/80 bg-white/60 hover:bg-white text-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs backdrop-blur-md"
    title="Reset conversation"
  >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>{t("mentor_btn_new_chat")}</span>
        </button>
      </div>

      {
    /* Glass Chat Container */
  }
      <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-white/80 flex flex-col h-[520px] max-h-[70vh]">
        {
    /* Messages Stream */
  }
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
    const isUser = msg.role === "user";
    return <div
      key={msg.id}
      className={`flex items-start space-x-2.5 sm:space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
    >
                <div
      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${isUser ? "bg-indigo-600 text-white shadow-xs" : "bg-linear-to-tr from-purple-600 to-indigo-600 text-white shadow-xs border border-white/20"}`}
    >
                  {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                <div
      className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${isUser ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 border border-white/20" : "bg-white/70 backdrop-blur-md border border-white/80 text-slate-800 shadow-2xs"}`}
    >
                  <div className="whitespace-pre-line font-sans">{msg.content}</div>

                  {
      /* Suggestion Chips */
    }
                  {msg.actionChips && msg.actionChips.length > 0 && <div className="pt-2 border-t border-slate-200/50 flex flex-wrap gap-1.5">
                      {msg.actionChips.map((chip, cIdx) => <button
      key={cIdx}
      onClick={() => handleChipClick(chip)}
      className="text-[11px] font-bold bg-white/90 text-indigo-700 hover:bg-white border border-indigo-200/80 px-2.5 py-1 rounded-lg transition-colors shadow-2xs cursor-pointer text-left backdrop-blur-xs"
    >
                          {chip} →
                        </button>)}
                    </div>}
                </div>
              </div>;
  })}

          {isLoading && <div className="flex items-center space-x-3 animate-in fade-in duration-150">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white/70 backdrop-blur-md border border-white/80 p-3 rounded-2xl text-xs text-slate-600 font-medium animate-pulse shadow-2xs">
                Pragya is formulating contextual advice from examination syllabi...
              </div>
            </div>}

          <div ref={messagesEndRef} />
        </div>

        {
    /* Glass Input Bar */
  }
        <div className="p-3 sm:p-4 bg-white/40 backdrop-blur-md border-t border-white/60">
          <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSendMessage();
    }}
    className="flex items-center space-x-2"
  >
            <input
    type="text"
    value={inputPrompt}
    onChange={(e) => setInputPrompt(e.target.value)}
    placeholder={t("mentor_input_placeholder")}
    className="flex-1 px-3 sm:px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-900"
  />
            <button
    type="submit"
    disabled={isLoading || !inputPrompt.trim()}
    className="px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/25 border border-white/20 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
  >
              <span>{t("mentor_btn_send")}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>;
};
export {
  MentorChatView
};
