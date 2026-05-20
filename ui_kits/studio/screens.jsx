/* global React, PrimarySidebar, AppHeader, WarningBanner, FilterTabs, ContentCard, StatusBadge, Button, TextField, Icon, FeatureCard */
// Midiacode Studio — screens

const { useState } = React;

// ── seed content ──────────────────────────────────────────
const CONTENT = [
  { id: "1",  title: "Spring Menu 2026",         type: "menu",     icon: "restaurant_menu",  iconSet: "symbols", author: "Lara Chen",   date: "Apr 14",  status: "Published", scans: 12438 },
  { id: "2",  title: "AR Try-On — Sneakers",     type: "ar",       icon: "view_in_ar",       iconSet: "symbols", author: "Marco Torres",date: "Apr 12",  status: "Draft",     scans: 0 },
  { id: "3",  title: "Holiday Q4 Campaign",      type: "campaign", icon: "campaign",         iconSet: "symbols", author: "Priya N.",    date: "Dec 3",   status: "Archived",  scans: 84210 },
  { id: "4",  title: "Café del Mar — Drinks",    type: "menu",     icon: "local_bar",        iconSet: "symbols", author: "Esra Kaya",   date: "Apr 9",   status: "Published", scans: 5621 },
  { id: "5",  title: "Vintage Watches PDP",      type: "product",  icon: "shoppingmode",     iconSet: "symbols", author: "Will Park",   date: "Apr 7",   status: "Published", scans: 2104 },
  { id: "6",  title: "How to scan — onboarding", type: "video",    icon: "play_circle",      iconSet: "symbols", author: "Lara Chen",   date: "Apr 5",   status: "Published", scans: 944 },
  { id: "7",  title: "Loyalty signup page",      type: "page",     icon: "article",          iconSet: "symbols", author: "Marco Torres",date: "Apr 3",   status: "Draft",     scans: 0 },
  { id: "8",  title: "Museum exhibit · Room B",  type: "ar",       icon: "museum",           iconSet: "symbols", author: "Aiko Mori",   date: "Mar 30",  status: "Scheduled", scans: 0 },
  { id: "9",  title: "Sustainability report",    type: "page",     icon: "eco",              iconSet: "symbols", author: "Priya N.",    date: "Mar 28",  status: "Published", scans: 1820 },
  { id: "10", title: "Black Friday teaser",      type: "campaign", icon: "local_offer",      iconSet: "symbols", author: "Will Park",   date: "Mar 22",  status: "Archived",  scans: 38120 },
];

// ── Library screen ────────────────────────────────────────
const ContentLibraryScreen = ({ onOpen, onCreate, tab, setTab }) => {
  const filtered = tab === "all" ? CONTENT : CONTENT.filter(c => c.status.toLowerCase().startsWith(tab));
  const counts = {
    all: CONTENT.length,
    published: CONTENT.filter(c => c.status === "Published").length,
    draft: CONTENT.filter(c => c.status === "Draft").length,
    archived: CONTENT.filter(c => c.status === "Archived").length,
  };
  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Content Library</h1>
          <div className="page-subtitle">All workspaces · {CONTENT.length} items</div>
        </div>
        <Button variant="primary" icon="add" onClick={onCreate}>Create content</Button>
      </div>

      <FilterTabs
        tabs={[
          { id: "all",       label: "All",        count: counts.all },
          { id: "published", label: "Published",  count: counts.published },
          { id: "draft",     label: "Drafts",     count: counts.draft },
          { id: "archived",  label: "Archived",   count: counts.archived },
        ]}
        active={tab}
        onSelect={setTab}
      />

      <div className="grid">
        {filtered.map(item => <ContentCard key={item.id} item={item} onClick={onOpen} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 64, color: "rgba(0,0,0,.6)" }}>
          <Icon name="inbox" style={{ fontSize: 48, opacity: .3 }} />
          <div style={{ marginTop: 12, fontSize: 16 }}>No content in this tab.</div>
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <div className="text-overline" style={{ marginBottom: 12, color: "rgba(0,0,0,.6)" }}>Learn the platform</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <FeatureCard icon="qr_code_2"   title="Dynamic QR codes"   description="Change where a code points without reprinting. Add audience, schedule and A/B rules." ctaLabel="Watch" />
          <FeatureCard icon="insights"    title="Live scan analytics" description="See scans by city, device and campaign in real time. Filter to any time window."     ctaLabel="Watch" />
          <FeatureCard icon="view_in_ar"  title="AR experiences"      description="Drop a glTF model behind any code and let visitors view it without an app install."   ctaLabel="Watch" />
        </div>
      </div>
    </div>
  );
};

// ── Detail screen ─────────────────────────────────────────
const ContentDetailScreen = ({ item, onBack, onPublish, onArchive }) => (
  <div className="page">
    <Button variant="flat" icon="arrow_back" onClick={onBack} style={{ marginBottom: 12, marginLeft: -8 }}>Back to library</Button>

    <div className="detail">
      <div>
        <div className="detail-hero">
          <div className={`head thumb-${item.type}`}>
            <Icon name={item.icon} symbols={item.iconSet === "symbols"} />
            <StatusBadge status={item.status} />
          </div>
          <div className="body">
            <h2>{item.title}</h2>
            <div className="meta">
              <span>by {item.author}</span><span className="content-meta"><span className="dot" /></span>
              <span>Updated {item.date}, 2026</span>
            </div>
            <div className="detail-actions">
              {item.status !== "Published" && <Button variant="primary" icon="publish" onClick={onPublish}>Publish</Button>}
              <Button variant="outline" icon="edit">Edit content</Button>
              <Button variant="flat" icon="link">Copy URL</Button>
              {item.status !== "Archived" && <Button variant="flat" icon="inventory_2" onClick={onArchive}>Archive</Button>}
            </div>
          </div>
        </div>

        <div className="detail-card" style={{ marginTop: 16 }}>
          <div className="text-overline" style={{ color: "rgba(0,0,0,.6)", marginBottom: 12 }}>Routing rules</div>
          <table className="table" style={{ boxShadow: "none" }}>
            <thead><tr><th>Audience</th><th>Window</th><th>Destination</th><th></th></tr></thead>
            <tbody>
              <tr><td>en-US · mobile</td><td>Always</td><td>/spring-menu</td><td><Icon name="more_vert" style={{ color: "rgba(0,0,0,.4)", cursor: "pointer" }} /></td></tr>
              <tr><td>es-MX · mobile</td><td>Always</td><td>/menu-primavera</td><td><Icon name="more_vert" style={{ color: "rgba(0,0,0,.4)", cursor: "pointer" }} /></td></tr>
              <tr><td>Any · desktop</td><td>Mon–Fri 09:00–17:00</td><td>/wholesale-pdf</td><td><Icon name="more_vert" style={{ color: "rgba(0,0,0,.4)", cursor: "pointer" }} /></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="kpi-row">
          <div className="kpi">
            <div className="lbl">Scans · 30d</div>
            <div className="val">{item.scans.toLocaleString()}<span className="delta"><Icon name="arrow_upward" />+12%</span></div>
          </div>
          <div className="kpi">
            <div className="lbl">Unique visitors</div>
            <div className="val">{Math.round(item.scans * 0.74).toLocaleString()}</div>
          </div>
        </div>
        <div className="qr-block">
          <div className="qr-img"><img src="../../assets/logomark.svg" width="100" alt="QR" style={{ width: "100%", height: "100%" }} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>QR code</div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,.6)", marginBottom: 12 }}>midiacode.io/c/{item.id}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline" size="sm" icon="download">PNG</Button>
              <Button variant="flat" size="sm" icon="picture_as_pdf">PDF</Button>
            </div>
          </div>
        </div>
        <div className="detail-card" style={{ marginTop: 16 }}>
          <div className="text-overline" style={{ color: "rgba(0,0,0,.6)", marginBottom: 12 }}>Recent activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div style={{ display: "flex", gap: 10 }}><div className="user-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>LC</div><div><b>Lara Chen</b> published this · <span style={{ color: "rgba(0,0,0,.6)" }}>2 days ago</span></div></div>
            <div style={{ display: "flex", gap: 10 }}><div className="user-avatar" style={{ width: 28, height: 28, fontSize: 11, background: "#9C27B0" }}>MT</div><div><b>Marco Torres</b> added 2 routing rules · <span style={{ color: "rgba(0,0,0,.6)" }}>3 days ago</span></div></div>
            <div style={{ display: "flex", gap: 10 }}><div className="user-avatar" style={{ width: 28, height: 28, fontSize: 11, background: "#26A69A" }}>PN</div><div><b>Priya N.</b> updated thumbnail · <span style={{ color: "rgba(0,0,0,.6)" }}>5 days ago</span></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Create-content drawer ─────────────────────────────────
const TYPES = [
  { id: "menu",     icon: "restaurant_menu",  t: "Menu",         d: "Linked menu page with items, prices and modifiers." },
  { id: "page",     icon: "article",          t: "Web page",     d: "Hosted content page — text, images, embeds." },
  { id: "product",  icon: "shoppingmode",     t: "Product",      d: "Product page with gallery, specs, buy link." },
  { id: "video",    icon: "play_circle",      t: "Video",        d: "Single video destination (YouTube, Vimeo, file)." },
  { id: "ar",       icon: "view_in_ar",       t: "AR experience",d: "glTF model + USDZ viewer, app-free." },
  { id: "campaign", icon: "campaign",         t: "Campaign",     d: "Multi-rule destination with A/B + audience." },
];
const CreateContentDrawer = ({ onClose, onCreate }) => {
  const [step, setStep] = useState("type");
  const [type, setType] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submit = () => onCreate({ type: type.id, title: title || `Untitled ${type.t.toLowerCase()}`, icon: type.icon });
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-hdr">
          <h3>{step === "type" ? "Create content" : `New · ${type.t}`}</h3>
          <div className="hdr-ico" onClick={onClose}><Icon name="close" /></div>
        </div>
        <div className="drawer-body">
          {step === "type" && (
            <>
              <div style={{ fontSize: 13, color: "rgba(0,0,0,.6)", marginBottom: 16 }}>Pick a content type. You can change rules later.</div>
              <div className="type-grid">
                {TYPES.map(t =>
                  <div key={t.id} className={`type-card ${type?.id === t.id ? "selected" : ""}`} onClick={() => setType(t)}>
                    <Icon name={t.icon} symbols />
                    <div className="t">{t.t}</div>
                    <div className="d">{t.d}</div>
                  </div>
                )}
              </div>
            </>
          )}
          {step === "details" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <TextField label="Content title" value={title} onChange={setTitle} help="Shown in the library and as the page title." />
              <TextField label="Description" value={description} onChange={setDescription} multiline help="Optional — for your team only." />
              <div>
                <div className="text-overline" style={{ color: "rgba(0,0,0,.6)", marginBottom: 8 }}>Workspace</div>
                <div className="chip">Default workspace</div>
              </div>
            </div>
          )}
        </div>
        <div className="drawer-foot">
          <Button variant="flat" onClick={onClose}>Cancel</Button>
          {step === "type"
            ? <Button variant="primary" disabled={!type} onClick={() => setStep("details")} iconRight="arrow_forward">Continue</Button>
            : <>
                <Button variant="flat" onClick={() => setStep("type")}>Back</Button>
                <Button variant="primary" icon="check" onClick={submit}>Create</Button>
              </>}
        </div>
      </div>
    </div>
  );
};

// ── Settings ──────────────────────────────────────────────
const SETTINGS_GROUPS = [
  {
    h: "Workspace",
    items: [
      { id: "general",     icon: "tune",            label: "General" },
      { id: "branding",    icon: "palette",         label: "Branding" },
      { id: "domains",     icon: "language",        label: "Custom domains" },
    ],
  },
  {
    h: "Members",
    items: [
      { id: "team",        icon: "groups",          label: "Team & permissions" },
      { id: "invitations", icon: "mail_outline",    label: "Invitations" },
    ],
  },
  {
    h: "Billing",
    items: [
      { id: "plan",        icon: "credit_card",     label: "Plan & billing" },
      { id: "invoices",    icon: "receipt_long",    label: "Invoices" },
    ],
  },
];
const TEAM = [
  { name: "Lara Chen",     email: "lara@acme.com",     role: "Owner",  status: "Active",  initials: "LC", color: "#1976D2" },
  { name: "Marco Torres",  email: "marco@acme.com",    role: "Admin",  status: "Active",  initials: "MT", color: "#9C27B0" },
  { name: "Priya Natarajan",email: "priya@acme.com",   role: "Editor", status: "Active",  initials: "PN", color: "#26A69A" },
  { name: "Will Park",     email: "will@acme.com",     role: "Editor", status: "Active",  initials: "WP", color: "#F2C037" },
  { name: "Aiko Mori",     email: "aiko@acme.com",     role: "Viewer", status: "Invited", initials: "AM", color: "#9E9E9E" },
  { name: "Esra Kaya",     email: "esra@partner.io",   role: "Editor", status: "Active",  initials: "EK", color: "#C10015" },
];
const SettingsScreen = () => {
  const [active, setActive] = useState("team");
  return (
    <div className="page-with-side">
      <aside className="sec-sb">
        <div style={{ padding: "0 24px 16px" }}>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,.6)", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 500 }}>Settings</div>
        </div>
        {SETTINGS_GROUPS.map(g =>
          <div className="sec-sb-group" key={g.h}>
            <h4>{g.h}</h4>
            {g.items.map(it =>
              <div key={it.id} className={`sec-sb-item ${active === it.id ? "active" : ""}`} onClick={() => setActive(it.id)}>
                <Icon name={it.icon} />{it.label}
              </div>
            )}
          </div>
        )}
      </aside>
      <div className="settings-page">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Team &amp; permissions</h1>
            <div className="page-subtitle">Invite teammates and manage access. 5 of 10 seats used.</div>
          </div>
          <Button variant="primary" icon="person_add">Invite member</Button>
        </div>
        <div className="table-card">
          <table className="table">
            <thead>
              <tr><th>Member</th><th>Role</th><th>Status</th><th>Last active</th><th></th></tr>
            </thead>
            <tbody>
              {TEAM.map(m =>
                <tr key={m.email}>
                  <td>
                    <div className="row-flex">
                      <div className="user-avatar" style={{ background: m.color }}>{m.initials}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(0,0,0,.6)" }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{m.role}</td>
                  <td>{m.status === "Active" ? <span style={{ color: "var(--color-positive)", fontWeight: 500 }}>● Active</span> : <span style={{ color: "rgba(0,0,0,.6)" }}>○ Invited</span>}</td>
                  <td style={{ color: "rgba(0,0,0,.6)" }}>{m.status === "Active" ? "2h ago" : "—"}</td>
                  <td style={{ textAlign: "right" }}><Icon name="more_vert" style={{ color: "rgba(0,0,0,.4)", cursor: "pointer" }} /></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ContentLibraryScreen, ContentDetailScreen, CreateContentDrawer, SettingsScreen, CONTENT });
