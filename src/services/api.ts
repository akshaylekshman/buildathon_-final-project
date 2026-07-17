/**
 * API Services for MediBridge AI
 * Connects the frontend to local Ollama AI via Next.js server routes.
 */

// Helper to load Tesseract.js dynamically from CDN on client-side
const loadTesseract = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load Tesseract.js on the server side"));
      return;
    }
    if ((window as any).Tesseract) {
      resolve((window as any).Tesseract);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = () => {
      resolve((window as any).Tesseract);
    };
    script.onerror = () => {
      reject(new Error("Failed to load Tesseract.js from CDN"));
    };
    document.head.appendChild(script);
  });
};

// Helper to load PDF.js dynamically from CDN on client-side
const loadPdfJs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load PDF.js on the server side"));
      return;
    }
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js";
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
      resolve(pdfjsLib);
    };
    script.onerror = () => {
      reject(new Error("Failed to load PDF.js from CDN"));
    };
    document.head.appendChild(script);
  });
};

// AI Chat Integration
export const sendChatMessage = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send chat message");
    }

    const data = await response.json();
    return data.message; // returns { role: 'assistant', content: '...' }
  } catch (error: any) {
    console.error("Chat service error:", error);
    throw error;
  }
};

// Prescription Analyzer (OCR + Ollama Gemma 4 extraction)
export const analyzePrescriptionImage = async (file: File) => {
  try {
    const Tesseract = await loadTesseract();
    
    // Perform Client-side OCR
    const worker = await Tesseract.createWorker("eng");
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();

    if (!text || text.trim() === "") {
      throw new Error("No readable text found in prescription image. Please ensure the photo is clear and well-lit.");
    }

    // Call API proxy
    const response = await fetch("/api/analyze-prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze prescription");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Prescription analyzer service error:", error);
    throw error;
  }
};

// Medical Report Analyzer (PDF parsing + Ollama Gemma 4)
export const analyzeMedicalReportPDF = async (file: File) => {
  try {
    const pdfjs = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let extractedText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      extractedText += pageText + "\n";
    }

    if (!extractedText || extractedText.trim() === "") {
      throw new Error("No text could be extracted from the PDF report.");
    }

    // Call API proxy
    const response = await fetch("/api/analyze-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: extractedText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze medical report");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Medical report analyzer service error:", error);
    throw error;
  }
};

// Appointments (Mock Booking API - unchanged)
export const bookAppointment = async (doctorId: string, date: string, time: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, bookingId: `BKG-${Date.now()}`, status: "confirmed" });
    }, 1000);
  });
};

// Medicine Reviewer (Ollama Gemma 4)
export const reviewMedicine = async (medicineName: string, sickness?: string) => {
  try {
    const response = await fetch("/api/review-medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineName, sickness }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to review medicine");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Medicine reviewer service error:", error);
    throw error;
  }
};

// Translation (Mock Translation API - unchanged)
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
