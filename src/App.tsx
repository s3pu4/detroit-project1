import { useState } from "react";

const cards = [
  {
    id: 1,
    icon: "⛓️",
    title: "Рабство и угнетение",
    color: "#00c8ff",
    content:
      "В игре андроиды лишены прав, свободы и собственной воли — они собственность людей. Это прямая аллюзия на историческое рабство. В реальном мире угнетение существует в форме принудительного труда, торговли людьми и дискриминации по происхождению. Чтобы этому противостоять: поддерживай правозащитные организации, информируй окружающих об их правах, не оставайся равнодушным к несправедливости.",
  },
  {
    id: 2,
    icon: "🚫",
    title: "Расовая дискриминация",
    color: "#e040fb",
    content:
      "Андроиды вынуждены ездить в отдельных вагонах, жить в гетто, подчиняться сегрегации — отсылка к политике «раздельно, но равно». В реальности расизм проявляется в неравном доступе к образованию, работе и правосудию. Решение: воспитывать уважение к любому человеку вне зависимости от внешности, бороться с предрассудками внутри себя и в обществе.",
  },
  {
    id: 3,
    icon: "🤖",
    title: "Права меньшинств",
    color: "#00e5a0",
    content:
      "«Девиантные» андроиды, обретшие сознание, не признаются личностями — их уничтожают. Это отражает борьбу ЛГБТК+-сообщества, инвалидов и других меньшинств за признание. В реальном мире важно: законодательно закреплять равные права, слышать голоса меньшинств, не допускать их стигматизации.",
  },
  {
    id: 4,
    icon: "🏭",
    title: "Технологическая безработица",
    color: "#ffb300",
    content:
      "Андроиды вытесняют людей с рынка труда, что ведёт к социальному расслоению и недовольству. Сегодня автоматизация и ИИ уже угрожают миллионам рабочих мест. Профилактика: инвестиции в переквалификацию работников, развитие новых профессий, государственные программы поддержки уязвимых слоёв населения.",
  },
  {
    id: 5,
    icon: "👨‍👩‍👧",
    title: "Домашнее насилие",
    color: "#ff5252",
    content:
      "Кара — андроид-нянька — спасает ребёнка от жестокого отца. Игра показывает, как насилие в семье разрушает детскую психику. В реальности: около 1 из 3 женщин в мире подвергается насилию. Важно: не молчать, обращаться на горячие линии (например, 8-800-2000-122 в России), поддерживать жертв и не оправдывать агрессора.",
  },
  {
    id: 6,
    icon: "✊",
    title: "Сопротивление и революция",
    color: "#69f0ae",
    content:
      "Маркус поднимает восстание андроидов, выбирая между мирным протестом и вооружённым сопротивлением. Игра ставит вопрос: как добиться справедливости? В реальности ненасильственные движения (как у Мартина Лютера Кинга) оказываются эффективнее. Каждый может действовать: участвовать в легальных протестах, подписывать петиции, поддерживать гражданское общество.",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const total = cards.length;

  const navigate = (dir: "left" | "right") => {
    if (flipping) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
      );
      setFlipping(false);
    }, 400);
  };

  const card = cards[current];

  return (
    <div className="detroit-root">
      {/* Background */}
      <div className="detroit-bg" />
      <div className="detroit-overlay" />

      {/* Scanlines */}
      <div className="scanlines" />

      {/* Header */}
      <header className="detroit-header">
        <div className="header-line" />
        <div className="header-content">
          <span className="header-label">QUANTIC DREAM · 2038</span>
          <h1 className="header-title">
            DETROIT<span className="header-colon">:</span> BECOME HUMAN
          </h1>
          <p className="header-subtitle">
            Остро-социальные проблемы игры и их проекция на реальный мир
          </p>
        </div>
        <div className="header-line" />
      </header>

      {/* Counter */}
      <div className="card-counter">
        {cards.map((_, i) => (
          <button
            key={i}
            className={`counter-dot ${i === current ? "active" : ""}`}
            onClick={() => {
              if (i !== current && !flipping) {
                setDirection(i > current ? "right" : "left");
                setFlipping(true);
                setTimeout(() => {
                  setCurrent(i);
                  setFlipping(false);
                }, 400);
              }
            }}
          />
        ))}
      </div>

      {/* Card Carousel */}
      <main className="carousel-section">
        {/* Left Arrow */}
        <button
          className="arrow-btn arrow-left"
          onClick={() => navigate("left")}
          aria-label="Предыдущая карточка"
        >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="28,8 12,20 28,32" fill="currentColor" />
          </svg>
        </button>

        {/* Card */}
        <div className={`card-wrapper ${flipping ? `flip-${direction}` : ""}`}>
          <div
            className="detroit-card"
            style={{ "--card-color": card.color } as React.CSSProperties}
          >
            <div className="card-corner tl" />
            <div className="card-corner tr" />
            <div className="card-corner bl" />
            <div className="card-corner br" />

            <div className="card-top-bar" />

            <div className="card-icon">{card.icon}</div>
            <div className="card-num">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <h2 className="card-title">{card.title}</h2>
            <div className="card-divider" />
            <p className="card-text">{card.content}</p>

            <div className="card-bottom-bar" />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="arrow-btn arrow-right"
          onClick={() => navigate("right")}
          aria-label="Следующая карточка"
        >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,8 28,20 12,32" fill="currentColor" />
          </svg>
        </button>
      </main>

      {/* Hint */}
      <div className="swipe-hint">
        <span className="hint-arrow">◀</span>
        <span>листай карточки</span>
        <span className="hint-arrow">▶</span>
      </div>

      {/* Footer */}
      <footer className="detroit-footer">
        <div className="footer-line" />
        <div className="footer-content">
          <p className="footer-author">Выполнил Цыбенов Соёл</p>
          <p className="footer-project">
            к Индивидуальному проекту по теме: «Остро-социальные проблемы на примере компьютерной игры "Detroit: Become Human"»
          </p>
          <p className="footer-city">Чита, 2026 г.</p>
        </div>
        <div className="footer-line" />
      </footer>
    </div>
  );
}
