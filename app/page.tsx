import Script from "next/script";
import Link from "next/link";
import {getAccessState} from "../lib/access";
import {AccessShell} from "./_components/access-shell";

export const dynamic="force-dynamic";

export default async function HomePage() {
  const access=await getAccessState();
  if(access.status!=="approved")return <AccessShell access={access}/>;
  return <>
    <a className="skip-link" href="#main">Přeskočit na obsah</a>
    <div className="app-shell">
      <aside className="sidebar" aria-label="Hlavní navigace">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>
          <div><strong>InfraBase</strong><small>SDM Knowledge Base</small></div>
        </div>
        <nav id="mainNav" className="main-nav" />
        <div className="sidebar-footer">
          <div className="level-label"><span>Studijní úroveň</span><strong id="levelName">Start</strong></div>
          <div className="progress-track" aria-label="Celkový postup"><span id="sidebarProgress" /></div>
          <small id="sidebarProgressText">0 % zvládnuto</small>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="menu-button" id="menuButton" aria-label="Otevřít navigaci" aria-expanded="false">☰</button>
          <label className="search-box"><span aria-hidden="true">⌕</span><input id="globalSearch" type="search" placeholder="Hledat produkt, pojem nebo otázku…" autoComplete="off" /><kbd>/</kbd></label>
          {access.isAdmin&&<Link className="topbar-link" href="/admin/users">Schvalování</Link>}
          <Link className="topbar-link" href="/account">{access.user?.email}</Link>
          <button className="icon-button" id="randomTermButton" title="Náhodný pojem" aria-label="Otevřít náhodný pojem">?</button>
        </header>
        <main id="main" tabIndex={-1}><div id="view" aria-live="polite" /></main>
      </div>
    </div>
    <dialog id="termDialog" className="term-dialog"><form method="dialog"><button className="dialog-close" aria-label="Zavřít">×</button></form><div id="termDialogContent" /></dialog>
    <div id="toast" className="toast" role="status" aria-live="polite" />
    <Script src="/legacy-app" strategy="afterInteractive" />
    <Script id="register-infrabase-sw" strategy="afterInteractive">{`if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw').then(r => r.update()).catch(() => {});`}</Script>
  </>;
}
