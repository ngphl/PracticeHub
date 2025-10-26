import { useState, useEffect } from "react";
import { summarizeText } from "../services/api";
import { getOptions } from "../services/api";

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

  const handleSummarize = async () => {
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

    //Call API
    const result = await summarizeText(text, mode, tone);

    if (result.success) {
      setSummary(result.data.summary);
      setTokenUsed(result.data.tokensUsed);
      setCost(result.data.cost);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setError("");
    setTokenUsed(0);
    setCost(0);
  };

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
  };
};
