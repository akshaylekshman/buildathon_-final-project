# MediBridge AI

## Problem Statement

Navigating complex medical information, such as handwritten prescriptions and dense laboratory reports, is overwhelming for the average patient. People often struggle to understand their symptoms, medication dosages, side effects, and test results without constant and immediate access to a healthcare professional, leading to anxiety and potential medication errors.

## Project Description

MediBridge AI is a comprehensive, privacy-conscious health companion app that acts as a 24/7 AI healthcare assistant. It helps users bridge the gap between complex medical data and plain-English understanding. 
Key features include:
- **AI Health Chatbot**: A friendly assistant (Gemma persona) that helps users understand symptoms in a non-alarmist way (with voice-to-text support).
- **Prescription Analyzer**: Uses client-side OCR and AI to extract medicines, purposes, dosage timings, and side effects from prescription images.
- **Medical Report Analyzer**: Parses PDF reports and uses AI to summarize key findings and highlight risk indicators in easy-to-understand terms.
- **Medicine Reviewer**: Uses Retrieval-Augmented Generation (RAG) with the OpenFDA API to provide detailed, accurate reviews of specific medications.
- **Hybrid AI Backend**: Supports toggling between the cloud-based Google Gemini 2.0 Flash API (for speed) and a local Ollama instance (running Gemma) for maximum privacy.

---

## Google AI Usage

### Tools / Models Used

- Google Gemini 2.0 Flash (via `generativelanguage.googleapis.com`)
- Local Gemma (via Ollama integration fallback)
- Tesseract.js (OCR)
- PDF.js (Report parsing)

## Tech Stack used

- Next.js 16 (React 19)
- Tailwind CSS & Framer Motion (Glassmorphism UI)
- Google Gemini API
- Local Ollama AI integration
- OpenFDA API & Wikipedia API (for RAG context)
- Web Speech API (Voice Recognition)

### How Google AI Was Used

Google's Gemini model (Gemini 2.0 Flash) is the core reasoning engine for MediBridge AI. It is integrated in several ways:
1. **Conversational AI**: Powers the chatbot to process user queries, maintaining a compassionate, clear, and safe medical assistant persona.
2. **Structured Data Extraction**: Processes raw OCR text from prescriptions to output strictly typed JSON (medicines, timing, food instructions, warnings).
3. **Medical Report Summarization**: Ingests dense medical test results and translates them into a 2-3 sentence patient-friendly summary, extracting normal vs. out-of-range metrics.
4. **RAG-Enhanced Reviews**: Synthesizes real-world data fetched from the OpenFDA API to generate comprehensive drug reviews, prioritizing factual medical data over baseline training.

---

### GitHub repo link of the project

[Link of the github repository](https://github.com/athul-joseph-aj/buildathon)


## Proof of Google AI Usage

Please see the files included in the `/proofs` folder.

## Screenshots

Please see the project screenshots in the `/screenshots` folder.

---

## Demo Video

Upload your demo video to Google Drive and paste the shareable link here(max 3 minutes). [Watch Demo](https://)

---

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/athul-joseph-aj/buildathon.git
   cd buildathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   USE_LOCAL_AI=false
   ```
   *(Set `USE_LOCAL_AI=true` if you wish to run a local Ollama Gemma instance instead).*

## Live Project Link

You can view the deployed project live on Vercel at:
[https://buildathon.vercel.app](https://buildathon.vercel.app)
