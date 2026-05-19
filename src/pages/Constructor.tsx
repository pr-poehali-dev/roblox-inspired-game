import { useState } from "react";
import Icon from "@/components/ui/icon";

const EDITOR_IMG = "https://cdn.poehali.dev/projects/181fc563-7ad1-4aa5-94f2-217f888c321d/files/1f2f12f2-ceeb-4c6c-92a8-0a2a55cc49f0.jpg";

const objectCategories = [
  {
    id: "terrain",
    label: "Рельеф",
    icon: "Mountain",
    items: ["Горный склон", "Равнина", "Пещера", "Обрыв", "Долина", "Вулкан"],
  },
  {
    id: "structures",
    label: "Постройки",
    icon: "Building2",
    items: ["Башня", "Мост", "Форт", "Деревня", "Руины", "Маяк"],
  },
  {
    id: "nature",
    label: "Природа",
    icon: "Trees",
    items: ["Лес", "Джунгли", "Река", "Озеро", "Болото", "Пустыня"],
  },
  {
    id: "props",
    label: "Объекты",
    icon: "Box",
    items: ["Ящики", "Камни", "Бочки", "Флаги", "Кристаллы", "Порталы"],
  },
  {
    id: "enemies",
    label: "Враги",
    icon: "Skull",
    items: ["Страж", "Дракон", "Голем", "Призрак", "Робот", "Босс"],
  },
  {
    id: "traps",
    label: "Ловушки",
    icon: "Zap",
    items: ["Пилы", "Шипы", "Огонь", "Лёд", "Молния", "Яма"],
  },
];

const tools = [
  { id: "select", icon: "MousePointer", label: "Выбор" },
  { id: "move", icon: "Move", label: "Перемещение" },
  { id: "rotate", icon: "RotateCw", label: "Поворот" },
  { id: "scale", icon: "Maximize2", label: "Масштаб" },
  { id: "paint", icon: "Paintbrush", label: "Покраска" },
  { id: "erase", icon: "Eraser", label: "Удаление" },
];

const myLevels = [
  { name: "Горная крепость", objects: 142, status: "published", rating: 4.8 },
  { name: "Лабиринт теней", objects: 87, status: "draft", rating: null },
  { name: "Огненная пустыня", objects: 213, status: "published", rating: 4.5 },
];

export default function Constructor() {
  const [activeTool, setActiveTool] = useState("select");
  const [activeCategory, setActiveCategory] = useState("terrain");
  const [activeTab, setActiveTab] = useState<"editor" | "my">("editor");
  const [placedCount, setPlacedCount] = useState(0);
  const [canvasItems, setCanvasItems] = useState<{ label: string; x: number; y: number; id: number }[]>([]);

  const handleDrop = (label: string) => {
    setCanvasItems((prev) => [
      ...prev,
      {
        label,
        x: 20 + Math.random() * 50,
        y: 20 + Math.random() * 50,
        id: Date.now(),
      },
    ]);
    setPlacedCount((n) => n + 1);
  };

  const activeObjects =
    objectCategories.find((c) => c.id === activeCategory)?.items ?? [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-rajdhani font-bold text-[var(--neon-cyan)]">
            КОНСТРУКТОР УРОВНЕЙ
          </h1>
          <div className="flex gap-1">
            {["editor", "my"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "editor" | "my")}
                className={`px-4 py-1.5 rounded-lg text-sm font-rajdhani font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "editor" ? "Редактор" : "Мои уровни"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-golos">
            Объектов: <span className="text-[var(--neon-cyan)]">{placedCount}</span>
          </span>
          <button className="btn-secondary px-4 py-2 rounded-lg text-sm">Сохранить</button>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm">Публиковать</button>
        </div>
      </div>

      {activeTab === "editor" ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel — tools */}
          <div className="w-16 border-r border-border bg-card flex flex-col items-center gap-2 py-4">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                title={t.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeTool === t.id
                    ? "bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon name={t.icon} size={18} />
              </button>
            ))}
            <div className="flex-1" />
            <button title="Отмена" className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <Icon name="Undo2" size={18} />
            </button>
            <button title="Повтор" className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              <Icon name="Redo2" size={18} />
            </button>
          </div>

          {/* Center — canvas */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src={EDITOR_IMG}
              alt="editor"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 grid-bg opacity-60" />

            {/* Placed objects */}
            {canvasItems.map((item) => (
              <div
                key={item.id}
                className="absolute px-3 py-1.5 rounded-lg bg-card border border-[var(--neon-cyan)]/40 text-xs text-[var(--neon-cyan)] font-rajdhani cursor-move select-none shadow-lg"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {item.label}
              </div>
            ))}

            {canvasItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-50">
                  <Icon name="MousePointerClick" size={48} className="mx-auto mb-3 text-[var(--neon-cyan)]" />
                  <p className="font-rajdhani text-lg text-muted-foreground">
                    Перетащи объекты из правой панели на карту
                  </p>
                </div>
              </div>
            )}

            {/* Grid coordinates */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground font-golos opacity-50">
              X: 0 · Y: 0 · Z: 0
            </div>
          </div>

          {/* Right panel — objects */}
          <div className="w-64 border-l border-border bg-card flex flex-col">
            {/* Category tabs */}
            <div className="p-3 border-b border-border">
              <div className="grid grid-cols-3 gap-1">
                {objectCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all ${
                      activeCategory === cat.id
                        ? "bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon name={cat.icon} size={16} />
                    <span className="font-rajdhani">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Object list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {activeObjects.map((obj) => (
                <button
                  key={obj}
                  onClick={() => handleDrop(obj)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-golos text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center justify-between group"
                >
                  <span>{obj}</span>
                  <Icon
                    name="Plus"
                    size={14}
                    className="opacity-0 group-hover:opacity-100 text-[var(--neon-cyan)] transition-opacity"
                  />
                </button>
              ))}
            </div>

            {/* Properties panel */}
            <div className="p-3 border-t border-border">
              <p className="text-xs text-muted-foreground font-rajdhani tracking-wider uppercase mb-2">
                Свойства
              </p>
              <div className="space-y-2">
                {["Позиция X", "Позиция Y", "Масштаб"].map((prop) => (
                  <div key={prop} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{prop}</span>
                    <input
                      type="number"
                      defaultValue={0}
                      className="w-16 text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground text-right focus:outline-none focus:border-[var(--neon-cyan)]/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* My levels tab */
        <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-rajdhani font-bold">Мои уровни</h2>
            <button
              className="btn-primary px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm"
              onClick={() => setActiveTab("editor")}
            >
              <Icon name="Plus" size={16} />
              Новый уровень
            </button>
          </div>
          <div className="space-y-4">
            {myLevels.map((level, i) => (
              <div key={i} className="card-game rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/20 flex items-center justify-center">
                    <Icon name="Map" size={24} className="text-[var(--neon-cyan)]" />
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-bold text-lg">{level.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {level.objects} объектов
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {level.rating && (
                    <div className="flex items-center gap-1 text-[var(--neon-orange)]">
                      <Icon name="Star" size={14} />
                      <span className="text-sm font-bold">{level.rating}</span>
                    </div>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${
                      level.status === "published"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {level.status === "published" ? "Опубликован" : "Черновик"}
                  </span>
                  <button className="btn-secondary px-3 py-1.5 rounded-lg text-xs">
                    Редактировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
