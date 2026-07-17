/**
 * Mock API Services for MediBridge AI
 * These functions act as placeholders for a FastAPI + Gemma 4 backend integration.
 */

// AI Chat Integration (Placeholder for Gemma 4)
export const sendChatMessage = async (message: string, context?: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        role: "assistant",
        content: `(Mock Gemma 4 Response): I received your message "${message}". How else can I assist you with your health today?`,
      });
    }, 1000);
  });
};

// Prescription Analyzer (Placeholder for OCR + Gemma 4 extraction)
export const analyzePrescriptionImage = async (file: File) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        medicines: [
          { name: "Amoxicillin 500mg", purpose: "Bacterial Infection", timing: { morning: true, night: true } },
          { name: "Paracetamol 650mg", purpose: "Fever relief", timing: { morning: true, afternoon: true, night: true } }
        ],
        warnings: "Ensure full course is completed."
      });
    }, 2000);
  });
};

// Medical Report Analyzer (Placeholder for PDF parsing + Gemma 4)
export const analyzeMedicalReportPDF = async (file: File) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        summary: "Your report shows mild anemia with lower Hemoglobin levels.",
        riskIndicators: [{ name: "Hemoglobin", value: "11.2", status: "low" }],
        normalValues: ["WBC", "Platelets", "RBC"],
        recommendations: ["Increase iron-rich foods", "Consult doctor"]
      });
    }, 2500);
  });
};

// Appointments (Placeholder for Booking API)
export const bookAppointment = async (doctorId: string, date: string, time: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, bookingId: `BKG-${Date.now()}`, status: "confirmed" });
    }, 1000);
  });
};

// Translation (Placeholder for Translation API / Gemma)
export const translateMedicalText = async (text: string, targetLang: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        originalText: text,
        translatedText: `(Mock ${targetLang} Translation) ${text}`
      });
    }, 500);
  });
};
