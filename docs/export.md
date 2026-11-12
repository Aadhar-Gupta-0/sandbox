# Local editor export

The Sandbox editor supports two downloads: its structured BlockNote JSON snapshot and a readable text representation of the current blocks.

The text export intentionally walks BlockNote's visible text nodes and nested blocks without interpreting HTML, executing embedded content, or sending anything to a server. Inline formatting, attachments, and block metadata are not preserved in plain text.

JSON snapshots are more suitable for recovering editing structure, but the prototype does not currently support importing JSON. There is no autosave or server-side storage. Export before closing the tab.

The editor can count words locally. These counts are approximate for non-whitespace-separated languages.
