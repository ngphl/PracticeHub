import { useState, useEffect, useCallback } from "react";
import { summarizeText, summarizeTextStream, getOptions } from "../services/api";

export const useSummarize = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Options
  const [mode, setMode] = useState("medium");
  const [tone, setTone] = useState("professional");
  const [availableOptions, setAvailableOptions] = useState({
    modes: [],
    tones: [],
  });

  // Metadata
  const [tokensUsed, setTokenUsed] = useState(0);
  const [cost, setCost] = useState(0);

  // Streaming mode
  const [useStreaming, setUseStreaming] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  //Load available options
  useEffect(() => {
    const loadOptions = async () => {
      const result = await getOptions();
      if (result.success) {
        setAvailableOptions(result.data);
      }
    };
    loadOptions();
  }, []);

  const handleSummarize = useCallback(async () => {
    //Check
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    if (text.length > 10000) {
      setError("Text is too long (max 10,000 characters)");
      return;
    }

    setError("");
    setSummary("");
    setLoading(true);
    setTokenUsed(0);
    setCost(0);

    if (useStreaming) {
      // Set streaming state and turn off loading
      setIsStreaming(true);
      setLoading(false);

      // Use streaming API
      await summarizeTextStream(
        text,
        mode,
        tone,
        // onChunk - append each chunk to summary
        (chunk) => {
          console.log("Received chunk:", chunk);
          setSummary((prev) => prev + chunk);
        },
        // onDone - update metadata
        (data) => {
          console.log("Stream completed with data:", data);
          setTokenUsed(data.tokensUsed);
          setCost(data.cost);
          setIsStreaming(false);
        },
        // onError - handle errors
        (errorMsg) => {
          console.error("Stream error:", errorMsg);
          setError(errorMsg);
          setIsStreaming(false);
        }
      );
    } else {
      // Use standard API
      const result = await summarizeText(text, mode, tone);

      if (result.success) {
        setSummary(result.data.summary);
        setTokenUsed(result.data.tokensUsed);
        setCost(result.data.cost);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }
  }, [text, mode, tone, useStreaming]);

  const clearAll = useCallback(() => {
    setText("");
    setSummary("");
    setError("");
    setTokenUsed(0);
    setCost(0);
  }, []);

  return {
    // Text state
    text,
    setText,

    // Options state
    mode,
    setMode,
    tone,
    setTone,
    availableOptions,

    // Result state
    summary,
    loading,
    error,
    tokensUsed,
    cost,

    // Actions
    handleSummarize,
    clearAll,

    // Streaming
    useStreaming,
    setUseStreaming,
    isStreaming,
  };
};
