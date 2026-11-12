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

// ── Icon helper for FontAwesome (first-class set in Studio) ──
const Fa = ({ name, style }) => <i className={name} style={style} />;

// ── Content status badge (ContentStatusBadge.vue) ──────────
// Published → green · Draft → red · Archived → grey-8
const StatusBadge = ({ status }) => {
  const map = { Published: "badge-pub", Draft: "badge-draft", Archived: "badge-arch" };
  return <span className={`badge ${map[status] || "badge-draft"}`}>{status}</span>;
};

// ── Plan gate badge (UpgradePlanBadge.vue) ─────────────────
const UpgradePlanBadge = ({ onClick }) => <span className="plan-badge" onClick={onClick}>Upgrade</span>;

// ── Upgrade button (UpgradeAccountButton.vue) ──────────────
const UpgradeButton = ({ onClick }) => (
  <button className="btn btn-cta" onClick={onClick}><Icon name="rocket_launch" symbols />Upgrade</button>
);

// ── Sidebar: workspace switcher (Sidebar.vue) ──────────────
const WORKSPACES = [
  { id: "acme", name: "Acme",         initials: "AC" },
  { id: "bistro", name: "Bistro Lab", initials: "BL" },
  { id: "north", name: "North Tours", initials: "NT" },
];
const PrimarySidebar = ({ workspaces = WORKSPACES, current, onSelect, onHome, onSearch, onAdd }) => (
  <nav className="sb">
    <div className="sb-item"><div className="sb-av sb-logo"><img src="../../assets/logomark.svg" width="28" alt="Midiacode" /></div></div>
    <div className="sb-item" onClick={onHome}><div className={`sb-av ${current ? "sb-tool" : "active"}`}><Icon name="home" /></div><span className="sb-tip">Home</span></div>
    <div className="sb-item" onClick={onSearch}><div className="sb-av sb-tool"><Icon name="search" /></div><span className="sb-tip">Search workspaces</span></div>
    <hr className="sb-sep" />
    {workspaces.map(w =>
      <div key={w.id} className="sb-item" onClick={() => onSelect?.(w.id)}>
        <div className={`sb-av sb-ws ${current === w.id ? "active" : ""}`}>{w.initials}</div><span className="sb-tip">{w.name}</span>
      </div>
    )}
    <div className="sb-item" onClick={onAdd}><div className="sb-av"><Icon name="add" /></div><span className="sb-tip">Create new workspace</span></div>
  </nav>
);

// ── App header (WorkspaceContentsLayout.vue) ───────────────
const AppHeader = ({ searchValue, onSearchChange, onCreate, onFilters, onAvatarClick }) => (
  <div className="hdr">
    <div className="hdr-col"><button className="btn btn-cta" onClick={onCreate}><Icon name="qr_code" />Create</button></div>
    <div className="hdr-search">
      <Icon name="search" />
      <input placeholder="Search" value={searchValue || ""} onChange={e => onSearchChange?.(e.target.value)} />
      <span className="hdr-tune" onClick={onFilters}><Icon name="tune" /></span>
    </div>
    <div className="hdr-col hdr-right">
      <div className="hdr-ico"><Icon name="notifications_none" /></div>
      <div className="hdr-acct" onClick={onAvatarClick}><div className="hdr-avatar"><Fa name="fa-solid fa-user" /></div><Icon name="expand_more" /></div>
    </div>
  </div>
);

// ── Workspace header: name, settings, trial, upgrade, display mode ──
const WorkspaceHeader = ({ name, trial, mode, onMode, onSettings, onUpgrade }) => (
  <div className="ws-head">
    <h1 className="ws-title">{name}</h1>
    <div className="hdr-ico ws-set" onClick={onSettings}><Icon name="settings" /></div>
    <div className="spacer" />
    {trial && <div className="ws-trial">Free trial ends in：<b>{trial}</b></div>}
    {trial && <UpgradeButton onClick={onUpgrade} />}
    <div className="tabs">
      <div className={`tab ${mode === "list" ? "active" : ""}`} onClick={() => onMode?.("list")}><Icon name="list" />List</div>
      <div className={`tab ${mode === "gallery" ? "active" : ""}`} onClick={() => onMode?.("gallery")}><Icon name="grid_view" />Gallery</div>
    </div>
  </div>
);

// ── Status filter tabs (ContentDisplayModeWrapper.vue) ─────
const FilterTabs = ({ tabs, active, onSelect }) => (
  <div className="tabs tabs-center">
    {tabs.map(t =>
      <div key={t.id} className={`tab ${active === t.id ? "active" : ""}`} onClick={() => onSelect(t.id)}>
        {t.fa && <Fa name={t.fa} />}{t.label}
      </div>
    )}
  </div>
);

// ── Content card (ContentGalleyItem.vue) ───────────────────
const ContentCard = ({ item, onClick }) => (
  <div className="content-card">
    <div className="content-stat"><Icon name="bar_chart" />{item.scans}</div>
    <div className="content-thumb" onClick={() => onClick?.(item)}><Icon name="image" /></div>
    <div className="content-body">
      <div className="content-text">
        <div className="content-title"><Icon name={item.icon} />{item.title}</div>
        <div className="content-owner">{item.author}</div>
        <div className="content-meta">Updated: {item.date}</div>
        <div className="content-meta">Version: {item.version || 1}</div>
      </div>
      <div className="hdr-ico content-more"><Icon name="more_vert" /></div>
    </div>
    <div className="content-foot">
      <StatusBadge status={item.status} />
      {item.status !== "Draft" && <span className="content-link">example.com/{item.id}</span>}
      {item.status !== "Draft" && <div className="content-qr" />}
    </div>
  </div>
);

// ── Content type card (ContentTypeCard.vue) ────────────────
const ContentTypeCard = ({ icon, name, onClick }) => (
  <div className="type-tile" onClick={onClick}><Icon name={icon} />{name}</div>
);

// ── Empty state (WorkspaceNoContents.vue) ──────────────────
const EmptyState = ({ children }) => (
  <div className="empty"><div className="empty-ico"><Icon name="qr_code" /></div>{children}</div>
);

// ── Toasts ─────────────────────────────────────────────────
const Toast = ({ type, message }) => (
  <div className={`toast ${type}`}>
    <div className="ico">
      {type === "ongoing"
        ? <span className="spin"><Icon name="refresh" /></span>
        : <Icon name={{ pos: "check_circle", neg: "error", warn: "warning", info: "info" }[type] || "info"} />}
    </div>
    {message}
  </div>
);
const ToastStack = ({ items }) =>
  items?.length ? <div className="toast-stack">{items.map(t => <Toast key={t.id} type={t.type} message={t.message} />)}</div> : null;

// Export
Object.assign(window, {
  Icon, Fa, Button, TextField, StatusBadge, UpgradePlanBadge, UpgradeButton,
  PrimarySidebar, AppHeader, WorkspaceHeader, FilterTabs, ContentCard, ContentTypeCard, EmptyState,
  Toast, ToastStack,
  WORKSPACES,
});
