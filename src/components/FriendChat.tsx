import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const friends = [
  { id: 1, name: "NightWolf_X", avatar: "🐺", status: "online", game: "Горная крепость" },
  { id: 2, name: "StarBuilder99", avatar: "⭐", status: "online", game: "Конструктор" },
  { id: 3, name: "ShadowRider", avatar: "🌙", status: "away", game: null },
  { id: 4, name: "PixelKnight", avatar: "⚔️", status: "offline", game: null },
  { id: 5, name: "CrystalMage", avatar: "💎", status: "online", game: "Огненная пустыня" },
  { id: 6, name: "IronForge", avatar: "🔨", status: "offline", game: null },
];

type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

const initialHistory: Record<number, Message[]> = {
  1: [
    { id: 1, from: "them", text: "Эй, заходи в мою крепость, нужна помощь!", time: "11:42" },
    { id: 2, from: "me", text: "Уже иду, жди минуту", time: "11:43" },
    { id: 3, from: "them", text: "Ок, не умирай 😄", time: "11:43" },
  ],
  2: [
    { id: 1, from: "them", text: "Смотрел мой новый уровень — Лабиринт звёзд?", time: "10:05" },
    { id: 2, from: "me", text: "Да, очень классно сделано!", time: "10:10" },
    { id: 3, from: "them", text: "Спасибо! Скоро выложу ещё один", time: "10:11" },
  ],
  3: [
    { id: 1, from: "them", text: "Привет, во что играешь?", time: "вчера" },
  ],
  4: [],
  5: [
    { id: 1, from: "them", text: "Видел новый кристальный биом?", time: "09:00" },
    { id: 2, from: "me", text: "Нет ещё, где найти?", time: "09:05" },
    { id: 3, from: "them", text: "На северном континенте, левее главной горы", time: "09:06" },
  ],
  6: [],
};

const statusColor: Record<string, string> = {
  online: "bg-green-400",
  away: "bg-yellow-400",
  offline: "bg-gray-500",
};

const statusLabel: Record<string, string> = {
  online: "В сети",
  away: "Отошёл",
  offline: "Не в сети",
};

function now() {
  return new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
}

export default function FriendChat() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [history, setHistory] = useState(initialHistory);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const selected = friends.find((f) => f.id === selectedId) ?? null;
  const messages = selectedId ? (history[selectedId] ?? []) : [];
  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !selectedId) return;
    const msg: Message = { id: Date.now(), from: "me", text: input.trim(), time: now() };
    setHistory((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] ?? []), msg] }));
    setInput("");

    // Simulate reply after 1.2s
    const friend = friends.find((f) => f.id === selectedId);
    if (friend?.status !== "offline") {
      setTimeout(() => {
        const replies = [
          "Понял, принял 👍",
          "Окей!",
          "Заходи, поиграем",
          "Круто!",
          "Согласен 😄",
          "Ха, точно!",
        ];
        const reply: Message = {
          id: Date.now() + 1,
          from: "them",
          text: replies[Math.floor(Math.random() * replies.length)],
          time: now(),
        };
        setHistory((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] ?? []), reply] }));
      }, 1200);
    }
  };

  return (
    <div className="flex h-[600px] rounded-2xl overflow-hidden border border-border bg-card">
      {/* Sidebar */}
      <div className="w-64 flex flex-col border-r border-border flex-shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Icon
              name="Search"
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg pl-8 pr-3 py-1.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--neon-cyan)]/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {filtered.map((f) => {
            const lastMsg = (history[f.id] ?? []).at(-1);
            const isSelected = selectedId === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedId(f.id)}
                className={`w-full px-3 py-2.5 flex items-center gap-3 transition-all text-left ${
                  isSelected
                    ? "bg-[var(--neon-cyan)]/10 border-l-2 border-[var(--neon-cyan)]"
                    : "hover:bg-secondary border-l-2 border-transparent"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    {f.avatar}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${statusColor[f.status]}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-rajdhani font-bold truncate ${isSelected ? "text-[var(--neon-cyan)]" : "text-foreground"}`}>
                    {f.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lastMsg ? lastMsg.text : statusLabel[f.status]}
                  </p>
                </div>
                {lastMsg && (
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    {lastMsg.time}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      {selected ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-base">
                {selected.avatar}
              </div>
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${statusColor[selected.status]}`} />
            </div>
            <div>
              <p className="font-rajdhani font-bold text-sm text-foreground">{selected.name}</p>
              <p className="text-xs text-muted-foreground">
                {selected.game ? `🎮 ${selected.game}` : statusLabel[selected.status]}
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                title="Пригласить в игру"
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-[var(--neon-cyan)]/10 hover:text-[var(--neon-cyan)] text-muted-foreground transition-all flex items-center justify-center"
              >
                <Icon name="Gamepad2" size={15} />
              </button>
              <button
                title="Профиль"
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground transition-all flex items-center justify-center"
              >
                <Icon name="User" size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <span className="text-4xl mb-3">{selected.avatar}</span>
                <p className="text-sm text-muted-foreground font-golos">
                  Начни общение с {selected.name}
                </p>
              </div>
            )}
            {messages.map((msg) => {
              const isMe = msg.from === "me";
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm flex-shrink-0">
                      {selected.avatar}
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm font-golos leading-relaxed ${
                      isMe
                        ? "bg-[var(--neon-cyan)]/15 text-foreground rounded-br-sm border border-[var(--neon-cyan)]/20"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    <div className={`text-[10px] mt-1 ${isMe ? "text-[var(--neon-cyan)]/50 text-right" : "text-muted-foreground"}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <button className="text-muted-foreground hover:text-[var(--neon-cyan)] transition-colors flex-shrink-0">
              <Icon name="Smile" size={18} />
            </button>
            <input
              type="text"
              placeholder={selected.status === "offline" ? `${selected.name} не в сети...` : "Написать сообщение..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--neon-cyan)]/50"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="btn-primary w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
          <Icon name="MessageCircle" size={48} className="text-[var(--neon-cyan)] mb-3" />
          <p className="font-rajdhani text-lg text-muted-foreground">Выбери друга слева</p>
          <p className="text-sm text-muted-foreground mt-1">чтобы начать переписку</p>
        </div>
      )}
    </div>
  );
}
