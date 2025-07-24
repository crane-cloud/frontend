import { useState } from "react";

export const useHuggingFaceTasks = () => {
  const [tasks, setTasks] = useState([
    { value: "text-generation", label: "Text Generation" },
    { value: "text-classification", label: "Text Classification" },
    { value: "question-answering", label: "Question Answering" },
    { value: "summarization", label: "Summarization" },
    { value: "translation", label: "Translation" },
    { value: "image-classification", label: "Image Classification" },
    { value: "object-detection", label: "Object Detection" },
    { value: "other", label: "Other" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://huggingface.co/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const tasksData = await response.json();
      const formattedTasks = Object.entries(tasksData).map(
        ([key, task]: [string, any]) => ({
          value: key,
          label:
            task.displayName ||
            task.name ||
            key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        }),
      );

      formattedTasks.push({ value: "other", label: "Other" });
      setTasks(formattedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  return { tasks, loading, error, fetchTasks };
};
