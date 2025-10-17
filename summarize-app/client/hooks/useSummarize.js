import { useState } from "react";
import { summarizeText } from "../services/api";

export const useSummarize = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    //Check
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    setError("");
    setSummary("");
    setLoading(true);

    //Call API
    const result = await summarizeText(text);

    if (result.success) {
      setSummary(result.data.summary);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setError("");
  };

  return {
    //State
    text,
    summary,
    loading,
    error,
    // Actions,
    setText,
    handleSummarize,
    clearAll,
  };
};
