import { useState } from "react";

interface ArticlePrompt {
  id: string;
  title: string;
  prompt: string;
}

const ARTICLE_PROMPTS: ArticlePrompt[] = [
  // This is again a fake prompts template gotta make a real db later
  {
    id: "prompt-1",
    title: "Summarize and Emphasize Sicierto Solution",
    prompt:
      "Take these articles {} then create an article that summarizes the key points of those articles. After that, review the Sicierto.com site and create an article emphasizing why the Sicierto solution will be a better approach.",
  },
  {
    id: "prompt-2",
    title: "Summarize and Emphasize other solutions",
    prompt: "Another template",
  },
];

const ArticlesPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<ArticlePrompt | null>(
    null
  );
  const [promptText, setPromptText] = useState("");

  const handlePromptSelect = (prompt: ArticlePrompt | null) => {
    if (prompt) {
      setSelectedPrompt(prompt);
      setPromptText(prompt.prompt);
    } else {
      setSelectedPrompt(null);
      setPromptText("");
    }
  };

  const handleCreateScript = () => {
    // Implement the logic to send the prompt text to ChatGPT
    // For now, we'll just log a custom response
    console.log(
      "Custom Response: This is a sample article generated based on the provided prompt text.",
      promptText
    );
  };

  return (
    <div
      onClick={onClose}
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        right: 0,
        top: 0,
        position: "fixed",
        background: "#808080f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Generate Articles</h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
        <div>
          <label>Prompt:</label>
          <select
            value={selectedPrompt?.id || ""}
            onChange={(e) =>
              handlePromptSelect(
                ARTICLE_PROMPTS.find(
                  (prompt) => prompt.id === e.target.value
                ) || null
              )
            }
          >
            <option value="">Select a prompt</option>
            {ARTICLE_PROMPTS.map((prompt) => (
              <option key={prompt.id} value={prompt.id}>
                {prompt.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            style={{ width: "100%", height: "150px" }}
          />
          <button onClick={handleCreateScript} style={{ marginTop: "10px" }}>
            Create Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPopup;
