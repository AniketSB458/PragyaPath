# PragyaPath – Full-Stack MERN Project (100% Pure JavaScript, No TypeScript)

Welcome to **PragyaPath**, the intelligent career and competitive examination navigator built as a complete **100% Pure JavaScript MERN Stack** application (MongoDB, Express.js, React JSX, Node.js) with **zero TypeScript / no .tsx files**.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | File Extensions | Role |
| :--- | :--- | :--- | :--- |
| **M** | **MongoDB & Mongoose** | `.js` | Document database with schemas for `User`, `StudySession`, `TestAttempt`, `PersonalNote` |
| **E** | **Express.js** | `.js` | REST API routes (`/api/auth`, `/api/sessions`, `/api/practice`, `/api/notes`, `/api/health`) |
| **R** | **React.js 19 + Vite** | `.jsx` | Pure JSX components, Tailwind styling, Context API, Recharts analytics, Canvas Confetti |
| **N** | **Node.js** | `.js` | Backend server runtime executing `node server.js` |

---

## 📁 100% Pure JavaScript File Structure

```text
pragyapath-mern/
├── index.html                   # HTML entry point (pointing to src/main.jsx)
├── package.json                 # Full MERN scripts & dependencies
├── vite.config.js               # Pure JS Vite configuration with API proxy
├── server.js                    # Pure Node/Express REST API server
├── .env.example                 # Environment variables template
├── models/                      # Pure Mongoose Schema definitions
│   ├── User.js                  # User profile, exam goals & consistency streak model
│   ├── StudySession.js          # Planned study tasks & reminder schedules model
│   ├── TestAttempt.js           # Mock test attempts & diagnostics model
│   └── PersonalNote.js          # Personal revision notes vault model
├── routes/                      # Pure Express API router endpoints
│   ├── auth.js                  # User profile & goal settings API
│   ├── sessions.js              # Daily planner tasks & reminders API
│   ├── practice.js              # Test attempts & topic accuracy API
│   └── notes.js                 # Personal notes CRUD API
└── src/
    ├── main.jsx                 # Pure React DOM entry point
    ├── App.jsx                  # Main application component & layout
    ├── index.css                # Tailwind CSS styling & animations
    ├── context/
    │   └── AppContext.jsx       # State management & persistence
    ├── data/
    │   └── mockData.js          # Comprehensive syllabus, careers, exams, roadmaps & PYQs
    ├── translations/
    │   └── translations.js      # Trilingual localization (English, Hindi, Marathi)
    ├── services/
    │   ├── api.js               # Axios / Fetch client connecting to Express server
    │   └── geminiService.js     # AI mentor reasoning & career recommendations
    ├── utils/
    │   ├── sound.js             # Web Audio API chime & celebration fanfare
    │   └── eligibilityEngine.js # Formal cutoff & age eligibility calculation rules
    └── components/              # 100% Pure React JSX Components (NO .tsx)
        ├── DashboardView.jsx
        ├── VisualPerformanceDashboard.jsx
        ├── TopicMasteryHeatmap.jsx
        ├── ConsistencyStreak.jsx
        ├── Badges.jsx
        ├── FocusTimer.jsx
        ├── DailyPlannerView.jsx
        ├── RoadmapView.jsx
        ├── CareerDiscoveryView.jsx
        ├── ExamEligibilityView.jsx
        ├── AdaptivePracticeView.jsx
        ├── MockTestsView.jsx
        ├── FreeResourcesView.jsx
        ├── MyLibraryView.jsx
        ├── MentorChatView.jsx
        ├── ProfileModal.jsx
        ├── Header.jsx
        ├── Navigation.jsx
        ├── Toast.jsx
        └── ErrorBoundary.jsx
```

---

## 🚀 How to Run the Project Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance running on `localhost:27017` OR a free MongoDB Atlas connection string)

### 1. Extract the ZIP File
Unzip `pragyapath-mern-pure-javascript.zip` into your desired workspace directory.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root folder:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pragyapath_mern
NODE_ENV=development
# Optional: GEMINI_API_KEY=your_gemini_api_key_here
```
*(If MongoDB is not installed locally, the server automatically operates gracefully in offline fallback mode with built-in state!)*

### 4. Start Development Servers

**Option A: Run Frontend & Backend Simultaneously**
- Terminal 1 (Backend Express REST Server):
  ```bash
  npm run server
  ```
- Terminal 2 (Frontend React Vite App):
  ```bash
  npm run client
  ```

**Option B: Standard Frontend Development**
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## ✨ Included Features & Systems
- 📊 **Visual Performance Dashboard**: Recharts-based score trends, accuracy radar, and topic distribution.
- 🎯 **Topic Mastery Heatmap**: Granular competency matrix with strength/weakness diagnostics.
- 🔥 **Consistency Streak**: Daily study streak tracker with 7-day rolling calendar and milestone shields.
- 🏆 **Achievement Badges**: Activity-driven badges ('Early Bird', 'Consistency King') with particle confetti.
- ⏱️ **Active Focus Timer**: Pomodoro & deep study sprints automatically logged to performance records.
- 🗺️ **Comprehensive Roadmaps**: Multi-phase exam roadmaps for UPSC, SSC, Banking, GATE, and State PCS.
- ⚖️ **Official Eligibility Engine**: Complete age, category reservation, and educational qualification verification.
- 📝 **Offline Resource Vault & Notes**: Bookmarking, PYQ drills, and personal revision notes.
