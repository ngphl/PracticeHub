import { useState, useEffect } from "react";

export default function TaskItem({ t, editTask, removeTask }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(t.title);
  const [doneDraft, setDoneDraft] = useState(!!t.done);

  useEffect(() => {
    setDraft(t.title);
    setDoneDraft(!!t.done);
  }, [t.title, t.done]);

  useEffect(() => {
    if (doneDraft !== !!t.done) {
      editTask(t.id, { title: draft, done: doneDraft });
    }
  }, [doneDraft]);

  async function handleBlurOrEnter(e) {
    if (e.type == "blur" || e.key == "Enter") {
      setEditing(false);
      if (draft.trim() !== t.title.trim()) {
        editTask(t.id, { title: draft, done: doneDraft });
      }
    }
  }

  return (
    <li
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: "6px 0",
      }}
    >
      <input
        type="checkbox"
        checked={doneDraft}
        onChange={(e) => setDoneDraft(e.target.checked)}
      />
      {editing ? (
        <form>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleBlurOrEnter}
          ></input>
        </form>
      ) : (
        <span
          style={{ textDecoration: t.done ? "line-through" : "none" }}
          onDoubleClick={() => setEditing(true)}
        >
          {t.title}
        </span>
      )}

      <button
        type="button"
        style={{ marginLeft: "auto" }}
        onClick={() => removeTask(t.id)}
      >
        🗑
      </button>
    </li>
  );
}
