import OpenAI from "openai";

//Initialize OpenAI client

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Summarization modes configuration
const SUMMARIZATION_MODES = {
  short: {
    systemPrompt:
      "You are a concise summarizer. Provide brief, clear summaries.",
    maxTokens: 100,
    instruction: "Summarize this text in 2-3 sentences",
  },
  medium: {
    systemPrompt:
      "You are a thorough summarizer. Provide comprehensive summaries.",
    maxTokens: 250,
    instruction: "Summarize this text in a detailed paragraph",
  },
  bullets: {
    systemPrompt: "You are a structured summarizer. Extract key points.",
    maxTokens: 200,
    instruction: "Summarize this text as 5-7 bullet points",
  },
  detailed: {
    systemPrompt:
      "You are an analytical summarizer. Provide in-depth analysis.",
    maxTokens: 400,
    instruction: "Provide a detailed summary with key themes and insights",
  },
};

//Tones
const TONES = {
  professional: "Use professional, formal language",
  casual: "Use casual, conversational language",
  academic: "Use academic, scholarly language",
  simple: "Use simple language suitable for a general audience",
};

// Generate Summary
export async function generateSummary(
  text,
  mode = "medium",
  tone = "professional"
) {
  try {
    //Validate inputs
    if (!text || text.trim().length == 0) {
      throw new Error("Text cannot be empty");
    }

    if (!SUMMARIZATION_MODES[mode]) {
      throw new Error(`Invalid mode: ${mode}`);
    }

    if (!TONES[tone]) {
      throw new Error(`Invalid tone: ${mode}`);
    }

    //Get configuration
    const modeConfig = SUMMARIZATION_MODES[mode];
    const toneInstruction = TONES[tone];

    //Construct input
    const input = [
      {
        role: "system",
        content: `${modeConfig.systemPrompt} ${toneInstruction}`,
      },
      {
        role: "user",
        content: `${modeConfig.instruction}:\n\n ${text}`,
      },
    ];

    console.log("------------------------");
    console.log("Detected API request");
    console.log(input);
    console.log("------------------------");

    //Call OpenAI API
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: input,
      max_output_tokens: modeConfig.maxTokens,
      temperature: 0.7,
    });
    console.log(response);
    console.log("------------------------");
    //Extract data
    const summary = response.output_text;
    const tokensUsed = response.usage.total_tokens;

    //Calculate cost per 1M Tokens
    const model_inputCost = 0.4;
    const model_outputCost = 1.6;
    const inputCost =
      response.usage.input_tokens * (model_inputCost / 1_000_000);
    const outputCost =
      response.usage.output_tokens * (model_outputCost / 1_000_000);
    const totalCost = inputCost + outputCost;
    return {
      success: true,
      summary,
      tokensUsed,
      cost: totalCost.toFixed(6),
      mode,
      tone,
    };
  } catch (error) {
    console.log("OpenAI error:", error);

    //Handle errors
    if (error.status === 401) {
      return {
        success: false,
        error: "Invalid API key. Please check your OpenAI API key.",
      };
    }

    if (error.status === 429) {
      return {
        success: false,
        error: "Rate limit exceeded. Please try again in a moment.",
      };
    }

    if (error.status === 500) {
      return {
        success: false,
        error: "OpenAI service error. Please try again.",
      };
    }

    return {
      success: false,
      error: error.output || "Failed to generate summary",
    };
  }
}

// Get available modes and tones
export function getAvailableOptions() {
  return {
    modes: Object.keys(SUMMARIZATION_MODES).map((key) => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })),

    tones: Object.keys(TONES).map((key) => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })),
  };
}
