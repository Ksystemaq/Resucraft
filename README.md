# ResumeCraft — ATS-Optimized Resume Builder

> **Build a Resume That Opens Doors.**  
> A privacy-first, beginner-friendly web application for creating, customizing, and downloading professional, ATS-compliant resumes.

---

## 🌟 Key Features

* **Dual Creation Modes**:
  * **Automatic Guided Wizard**: Step-by-step questionnaire that asks 5 questions and formats your answers into a ready-to-edit resume draft.
  * **Manual Live Editor**: Accordion-based form controls with a real-time synchronized PDF preview canvas on the side.
* **5 ATS-Compliant Templates**:
  * **Classic Standard**: Traditional single-column corporate layout with clean divider rules.
  * **Modern Clean**: Two-column layout with structured sidebar for skills, contact, and education.
  * **Minimalist**: Generous whitespace, elegant typography, and modern aesthetics.
  * **Creative Banner**: High-impact accent top banner, pill tags, and project highlights.
  * **Student / Entry**: Prioritizes education, GPA/honors, coursework, and capstone projects over standard employment history.
* **Full Design Customization**:
  * Dynamic accent color palettes (Navy, Sky Blue, Emerald, Burgundy, Purple, Slate, Charcoal).
  * Typography pairings (Inter, Roboto, Merriweather, Lora).
  * Density & font-size controls (Compact, Normal, Relaxed).
* **Profile Photo Management**:
  * Optional profile photo upload with client-side preview and toggle switch.
* **100% Client-Side Privacy**:
  * All resume data and images are stored locally in the browser via `localStorage`. No accounts or server storage required.
* **Data Portability**:
  * **JSON Backup & Restore**: Export full resume state as `.json` and restore anytime.
  * **One-Click Sample Data**: Instant testing with realistic professional sample data.
  * **One-Click Clear**: Easily purge fields with confirmation.
* **Pre-flight & ATS Audit**:
  * Automated pre-download quality check verifying candidate name, reachable email, phone, experience, and keywords with a readiness score (0-100%).
* **Vector PDF Download**:
  * Exports clean, selectable-text PDFs (`FirstName_LastName_Resume.pdf`) using native browser print styles with `@media print` rules.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript
* **Tooling & Bundler**: Vite 6
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Persistence**: LocalStorage with React Context State Store

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser to the local URL (typically `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📄 License
MIT

