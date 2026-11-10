import { DefaultBlockSchema } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useState } from "react";

const MAX_EXPORT_BYTES = 2 * 1024 * 1024;

function EditorSandbox() {
  const [changeCount, setChangeCount] = useState(0);
  const [message, setMessage] = useState("Changes remain in memory until you export.");
  const editor = useBlockNote<DefaultBlockSchema>({
    onEditorContentChange: () => setChangeCount((n) => n + 1),
    theme: "light",
  });

  function exportJson() {
    const text = JSON.stringify(editor.topLevelBlocks, null, 2);
    if (new Blob([text]).size > MAX_EXPORT_BYTES) {
      setMessage("Document is too large to export in this demo.");
      return;
    }
    const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url; link.download = "sandbox-document.json"; link.click();
    URL.revokeObjectURL(url);
    setMessage("Document exported locally. No server upload occurred.");
  }

  return (
    <main style={{ maxWidth: 940, margin: "32px auto", padding: "0 22px", fontFamily: "system-ui" }}>
      <header style={{ borderBottom: "1px solid #e4e6f0", paddingBottom: 18, marginBottom: 24 }}>
        <p style={{ letterSpacing: "0.14em", color: "#6654cf", fontSize: 12 }}>EDITOR LAB / EXPERIMENTAL</p>
        <h1 style={{ fontSize: 44, letterSpacing: "-0.06em", margin: "8px 0" }}>sandbox.</h1>
        <p style={{ color: "#64748b" }}>A distraction-free BlockNote playground. Compose rich blocks, then export your draft as JSON.</p>
        <button onClick={exportJson} style={{ background: "#5846c4", color: "white", border: 0, borderRadius: 10, padding: "12px 20px", cursor: "pointer" }}>
          Download JSON
        </button>
        <span style={{ marginLeft: 14, fontSize: 13, color: "#64748b" }}>{changeCount} editor updates</span>
      </header>
      <section aria-label="Block editor" style={{ background: "#fff", border: "1px solid #ececf3", borderRadius: 16, minHeight: 280, padding: "24px 8px" }}>
        <BlockNoteView editor={editor} />
      </section>
      <p role="status" style={{ fontSize: 13, color: "#69778d", marginTop: 20 }}>{message}</p>
      <p style={{ fontSize: 12, color: "#8490a5" }}>Prototype only: no authentication, autosave or collaboration. Export before closing the tab.</p>
    </main>
  );
}
export default EditorSandbox;
