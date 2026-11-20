import { useState } from "react";

interface Props {
  participants: string[];
  onAdd: (name: string) => string | null;
  onRemove: (name: string) => void;
}

export function ParticipantsSection({ participants, onAdd, onRemove }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const err = onAdd(name);
    if (err) {
      setError(err);
    } else {
      setError(null);
      setName("");
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">1. Participants</h2>
      <p className="mt-1 text-sm text-slate-500">Everyone who shares the expenses.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() !== "" && handleAdd()}
          placeholder="Name (e.g. Alice)"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
      {participants.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {participants.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 rounded-full bg-teal-50 py-1 pl-3 pr-1 text-sm font-medium text-teal-900 ring-1 ring-teal-200"
            >
              {p}
              <button
                type="button"
                onClick={() => onRemove(p)}
                aria-label={`Remove ${p}`}
                className="flex h-5 w-5 items-center justify-center rounded-full text-teal-600 transition-colors hover:bg-teal-200 hover:text-teal-900"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm italic text-slate-400">No participants yet.</p>
      )}
    </section>
  );
}
