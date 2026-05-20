/* global React */
// Midiacode Studio — atomic components

const { useState, useEffect } = React;

// ── Icon helpers ───────────────────────────────────────────
const Icon = ({ name, outlined, symbols, style }) =>
  <span className={symbols ? "material-symbols-outlined" : outlined ? "material-icons-outlined" : "material-icons"} style={style}>{name}</span>;

// ── Buttons ────────────────────────────────────────────────
const Button = ({ variant = "primary", size, icon, iconRight, children, onClick, disabled, type, style }) => {
  const cls = ["btn", `btn-${variant}`, size === "sm" && "btn-sm"].filter(Boolean).join(" ");
  return (
    <button className={cls} onClick={onClick} disabled={disabled} type={type || "button"} style={style}>
      {icon && <Icon name={icon} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
};

// ── Inputs ─────────────────────────────────────────────────
const TextField = ({ label, value, onChange, state, help, multiline, placeholder }) => {
  const [focused, setFocused] = useState(false);
  const visual = state === "error" ? "error" : focused ? "focus" : "";
  const isFloating = focused || value || placeholder;
  return (
    <div>
      <div className={`field ${visual}`} style={multiline ? { height: 96, alignItems: "flex-start", paddingTop: 12 } : null}>
        {label && (isFloating
          ? <label>{label}</label>
          : <label style={{ position: "static", background: "transparent", fontSize: 14, color: "rgba(0,0,0,.6)", padding: 0 }}>{label}</label>
        )}
        {multiline
          ? <textarea value={value} onChange={e => onChange?.(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} rows={3} />
          : <input value={value} onChange={e => onChange?.(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} />}
      </div>
      {help && <div className={`field-help ${state === "error" ? "err" : ""}`}>{help}</div>}
    </div>
  );
};

// ── Status badge ───────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = { Published: "badge-pub", Draft: "badge-draft", Archived: "badge-arch", Scheduled: "badge-info" };
  return <span className={`badge ${map[status] || "badge-arch"}`}>{status}</span>;
};

// ── Warning banner ─────────────────────────────────────────
const WarningBanner = ({ children, ctaLabel = "UPGRADE", onCta, onClose }) => (
  <div className="banner">
    <Icon name="warning_amber" />
    {children}
    <div className="spacer" />
    {ctaLabel && <a onClick={onCta}>{ctaLabel}</a>}
    <div className="x" onClick={onClose}><Icon name="close" /></div>
  </div>
);

// ── Primary sidebar ────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: "library",   icon: "grid_view",       label: "Content" },
  { id: "qrcodes",   icon: "qr_code_2",       label: "QR codes" },
  { id: "analytics", icon: "insights",        label: "Analytics" },
  { id: "audiences", icon: "groups",          label: "Audiences" },
  { id: "integrations", icon: "extension",    label: "Integrations" },
];
const SIDEBAR_BOTTOM = [
  { id: "help",     icon: "help_outline", label: "Help" },
  { id: "settings", icon: "settings",     label: "Settings" },
];
const PrimarySidebar = ({ active, onNavigate }) => (
  <nav className="sb">
    <div className="sb-logo"><img src="../../assets/logomark.svg" width="32" alt="Midiacode" /></div>
    {SIDEBAR_ITEMS.map(it =>
      <div key={it.id} className={`sb-item ${active === it.id ? "active" : ""}`} onClick={() => onNavigate(it.id)}>
        <Icon name={it.icon} /><span className="sb-tip">{it.label}</span>
      </div>
    )}
    <div className="sb-spacer" />
    {SIDEBAR_BOTTOM.map(it =>
      <div key={it.id} className={`sb-item ${active === it.id ? "active" : ""}`} onClick={() => onNavigate(it.id)}>
        <Icon name={it.icon} /><span className="sb-tip">{it.label}</span>
      </div>
    )}
  </nav>
);

// ── App header ─────────────────────────────────────────────
const AppHeader = ({ searchValue, onSearchChange, onCreate, onUpgrade, onAvatarClick }) => (
  <div className="hdr">
    <Button variant="cta" icon="add" onClick={onCreate}>Create</Button>
    <div className="hdr-search">
      <Icon name="search" style={{ color: "rgba(0,0,0,.6)" }} />
      <input placeholder="Search content, tags, authors" value={searchValue || ""} onChange={e => onSearchChange?.(e.target.value)} />
    </div>
    <div className="spacer" />
    <button className="hdr-upgrade" onClick={onUpgrade}><Icon name="bolt" style={{ fontSize: 14 }} />Upgrade</button>
    <div className="hdr-ico"><Icon name="filter_list" /></div>
    <div className="hdr-ico"><Icon name="notifications_none" /></div>
    <div className="hdr-avatar" onClick={onAvatarClick}>LC</div>
  </div>
);

// ── Filter tabs ────────────────────────────────────────────
const FilterTabs = ({ tabs, active, onSelect }) => (
  <div className="tabs">
    {tabs.map(t =>
      <div key={t.id} className={`tab ${active === t.id ? "active" : ""}`} onClick={() => onSelect(t.id)}>
        {t.label}<span className="tab-count">{t.count}</span>
      </div>
    )}
  </div>
);

// ── Content card ───────────────────────────────────────────
const ContentCard = ({ item, onClick }) => (
  <div className="content-card" onClick={() => onClick?.(item)}>
    <div className={`content-thumb thumb-${item.type}`}>
      <Icon name={item.icon} symbols={item.iconSet === "symbols"} />
      <StatusBadge status={item.status} />
    </div>
    <div className="content-body">
      <div className="content-title">{item.title}</div>
      <div className="content-meta">
        <span>{item.author}</span><span className="dot" /><span>{item.date}</span>
      </div>
    </div>
  </div>
);

// ── Feature card ───────────────────────────────────────────
const FeatureCard = ({ icon, title, description, ctaLabel, onCta }) => (
  <div className="feature-card">
    <div className="feature-ico"><Icon name={icon} /></div>
    <div className="feature-t">{title}</div>
    <div className="feature-d">{description}</div>
    {ctaLabel && <div style={{ marginTop: 8 }}><Button variant="outline" size="sm" onClick={onCta}>{ctaLabel}</Button></div>}
  </div>
);

// ── Toasts ─────────────────────────────────────────────────
const Toast = ({ type, message }) => (
  <div className={`toast ${type}`}>
    <div className="ico">
      {type === "ongoing"
        ? <span className="spin"><Icon name="refresh" /></span>
        : <Icon name={{ pos: "check", neg: "close", warn: "warning", info: "info" }[type] || "info"} />}
    </div>
    {message}
  </div>
);
const ToastStack = ({ items }) =>
  items?.length ? <div className="toast-stack">{items.map(t => <Toast key={t.id} type={t.type} message={t.message} />)}</div> : null;

// Export
Object.assign(window, {
  Icon, Button, TextField, StatusBadge, WarningBanner,
  PrimarySidebar, AppHeader, FilterTabs, ContentCard, FeatureCard,
  Toast, ToastStack,
  SIDEBAR_ITEMS, SIDEBAR_BOTTOM,
});
