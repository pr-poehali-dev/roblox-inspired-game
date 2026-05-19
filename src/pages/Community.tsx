import { useState } from "react";
import Icon from "@/components/ui/icon";
import FriendChat from "@/components/FriendChat";

const COMMUNITY_IMG = "https://cdn.poehali.dev/projects/181fc563-7ad1-4aa5-94f2-217f888c321d/files/96689f52-c741-484b-8241-df55edb395b5.jpg";

const groups = [
  { name: "Мастера рельефа", members: 1240, icon: "Mountain", color: "cyan", tag: "Строительство" },
  { name: "Кланы PvP", members: 3820, icon: "Swords", color: "orange", tag: "Сражения" },
  { name: "Арт-студия", members: 680, icon: "Palette", color: "purple", tag: "Творчество" },
  { name: "Русское сообщество", members: 5100, icon: "Globe", color: "cyan", tag: "Общение" },
  { name: "Про-игроки", members: 920, icon: "Trophy", color: "orange", tag: "Соревнования" },
  { name: "Новички ForgeWorld", members: 7300, icon: "Users", color: "purple", tag: "Помощь" },
];

const chatMessages = [
  { user: "NightWolf_X", avatar: "🐺", text: "Кто хочет совместно пройти Горную крепость?", time: "12:03" },
  { user: "StarBuilder99", avatar: "⭐", text: "Только что опубликовал новый уровень — Лабиринт звёзд, заходите!", time: "12:05" },
  { user: "CrystalMage", avatar: "💎", text: "Уже проверил, очень красиво сделано 🔥", time: "12:06" },
  { user: "ShadowRider", avatar: "🌙", text: "Когда выйдет новый биом?", time: "12:10" },
  { user: "NightWolf_X", avatar: "🐺", text: "На следующей неделе по слухам добавят ледяной биом", time: "12:11" },
  { user: "PixelKnight", avatar: "⚔️", text: "Топчик, ждём ледяной биом!", time: "12:12" },
];

const colorClass: Record<string, string> = {
  cyan: "text-[var(--neon-cyan)] border-[var(--neon-cyan)]/25 bg-[var(--neon-cyan)]/5",
  orange: "text-[var(--neon-orange)] border-[var(--neon-orange)]/25 bg-[var(--neon-orange)]/5",
  purple: "text-[var(--neon-purple)] border-[var(--neon-purple)]/25 bg-[var(--neon-purple)]/5",
};

type Tab = "feed" | "friends" | "chat" | "groups";

export default function Community() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { user: "Ты", avatar: "🎮", text: chatInput, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setChatInput("");
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "feed", label: "Лента", icon: "Rss" },
    { id: "friends", label: "Сообщения", icon: "MessageCircle" },
    { id: "chat", label: "Общий чат", icon: "Hash" },
    { id: "groups", label: "Группы", icon: "Users" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="relative h-48 overflow-hidden">
        <img src={COMMUNITY_IMG} alt="community" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="text-4xl font-rajdhani font-bold text-glow-cyan text-[var(--neon-cyan)]">
              СООБЩЕСТВО
            </h1>
            <p className="text-muted-foreground mt-1">Миллионы игроков. Один мир.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-rajdhani font-semibold transition-all border-b-2 ${
                activeTab === t.id
                  ? "text-[var(--neon-cyan)] border-[var(--neon-cyan)]"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* FEED */}
        {activeTab === "feed" && (
          <div className="space-y-5">
            <div className="card-game rounded-2xl p-5">
              <textarea
                placeholder="Поделись с сообществом..."
                className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none font-golos text-sm h-16"
              />
              <div className="flex justify-between items-center border-t border-border pt-3 mt-2">
                <div className="flex gap-3">
                  <button className="text-muted-foreground hover:text-[var(--neon-cyan)] transition-colors">
                    <Icon name="Image" size={18} />
                  </button>
                  <button className="text-muted-foreground hover:text-[var(--neon-cyan)] transition-colors">
                    <Icon name="Map" size={18} />
                  </button>
                </div>
                <button className="btn-primary px-4 py-1.5 rounded-lg text-xs">
                  Опубликовать
                </button>
              </div>
            </div>

            {[
              {
                user: "StarBuilder99",
                avatar: "⭐",
                time: "2 часа назад",
                text: "Только что завершил свой самый амбициозный уровень — Лабиринт звёзд! 300+ объектов, 3 тайных комнаты и финальный босс. Заходите, жду ваших оценок!",
                likes: 142,
                comments: 28,
                tag: "Новый уровень",
              },
              {
                user: "CrystalMage",
                avatar: "💎",
                time: "5 часов назад",
                text: "Поделился туториалом по созданию реалистичных пещер в конструкторе. Раскрываю все секреты текстурирования и освещения. Ссылка в профиле!",
                likes: 89,
                comments: 14,
                tag: "Туториал",
              },
              {
                user: "IronForge",
                avatar: "🔨",
                time: "вчера",
                text: "Организую турнир по прохождению уровней в следующее воскресенье. Призовой фонд — эксклюзивные скины. Записывайтесь в комментариях!",
                likes: 231,
                comments: 67,
                tag: "Турнир",
              },
            ].map((post, i) => (
              <div key={i} className="card-game rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-rajdhani font-bold">{post.user}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/20">
                        {post.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <p className="text-sm font-golos text-foreground/90 mb-4 leading-relaxed">{post.text}</p>
                <div className="flex gap-5 text-muted-foreground text-sm">
                  <button className="flex items-center gap-1.5 hover:text-[var(--neon-orange)] transition-colors">
                    <Icon name="Heart" size={15} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[var(--neon-cyan)] transition-colors">
                    <Icon name="MessageCircle" size={15} />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[var(--neon-cyan)] transition-colors">
                    <Icon name="Share2" size={15} />
                    Поделиться
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FRIENDS CHAT */}
        {activeTab === "friends" && (
          <FriendChat />
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <div className="card-game rounded-2xl flex flex-col h-[540px]">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Icon name="Hash" size={16} className="text-[var(--neon-cyan)]" />
              <span className="font-rajdhani font-bold">Общий чат</span>
              <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                1 240 онлайн
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-sm font-rajdhani font-bold text-[var(--neon-cyan)]">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm font-golos text-foreground/85 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border flex gap-3">
              <input
                type="text"
                placeholder="Написать сообщение..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--neon-cyan)]/50"
              />
              <button
                onClick={handleSend}
                className="btn-primary px-4 py-2.5 rounded-xl"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* GROUPS */}
        {activeTab === "groups" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-rajdhani font-bold">Группы игроков</h2>
              <button className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2">
                <Icon name="Plus" size={15} />
                Создать группу
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((g, i) => (
                <div key={i} className={`card-game rounded-2xl p-5 border ${colorClass[g.color]}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 ${colorClass[g.color]}`}>
                      <Icon name={g.icon} size={26} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-rajdhani font-bold text-lg text-foreground">{g.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Users" size={11} />
                          {g.members.toLocaleString()} участников
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full border opacity-70" style={{ borderColor: "currentColor" }}>
                          {g.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className={`w-full mt-4 py-2 rounded-xl text-sm font-rajdhani font-semibold border transition-all hover:opacity-80 ${colorClass[g.color]}`}>
                    Вступить
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}