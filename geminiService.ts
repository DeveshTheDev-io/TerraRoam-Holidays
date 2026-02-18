
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateItinerary(prefs: UserPreferences) {
  const prompt = `
    Generate a highly detailed and aesthetic travel itinerary for an Indian destination.
    User Preferences:
    - Age Group: ${prefs.ageGroup}
    - Vibe: ${prefs.vibe}
    - Budget: ${prefs.budget}
    - Dates: From ${prefs.startDate || 'flexible'} to ${prefs.endDate || 'flexible'}
    - Preferred Activities: ${prefs.activities.join(", ") || 'General sightseeing'}
    - Requested Theme/Area: ${prefs.destinationHint || 'Any popular Indian gem'}

    The output MUST be in JSON format with the following structure:
    {
      "destination": "Name of the city/region",
      "summary": "Short atmospheric description",
      "duration": "Calculated number of days",
      "days": [
        {
          "day": 1,
          "title": "Day Theme",
          "activities": ["Activity 1", "Activity 2", "Activity 3"],
          "dining": "Recommendation for food",
          "stay": "Type of luxury or theme-based stay recommended"
        }
      ],
      "estimatedCost": "Approx total in INR",
      "travelTip": "Expert tip for this specific demographic",
      "vibeCheck": "One word vibe of this trip"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            summary: { type: Type.STRING },
            duration: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  dining: { type: Type.STRING },
                  stay: { type: Type.STRING }
                },
                required: ["day", "title", "activities", "dining", "stay"]
              }
            },
            estimatedCost: { type: Type.STRING },
            travelTip: { type: Type.STRING },
            vibeCheck: { type: Type.STRING }
          },
          required: ["destination", "summary", "duration", "days", "estimatedCost", "travelTip", "vibeCheck"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
}
