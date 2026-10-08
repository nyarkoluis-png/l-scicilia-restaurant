import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Menu, Phone, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LogoMark, Tricolore } from "@/components/logo";
import { restaurant, openingHours } from "@/lib/restaurant";

export function OrderButton({ label = "Jetzt bestellen", testId = "order-open-button" }: { label?: string; testId?: string }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("Abholung");
  return <>
    <Button variant="restaurant" data-testid={testId} onClick={() => setOpen(true)}><ShoppingBag size={14} />{label}</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="order-modal max-w-md" data-testid="order-modal">
        <Tricolore className="order-flag" />
        <DialogTitle>Ein Stück Sicilia für zu Hause.</DialogTitle>
        <DialogDescription>Bestellen bei L’Antica Sicilia</DialogDescription>
        <div className="order-tabs">{["Abholung", "Lieferung"].map(item => <Button key={item} variant="category" data-testid={`order-mode-${item.toLowerCase()}`} aria-pressed={mode === item} onClick={() => setMode(item)}>{item}</Button>)}</div>
        {mode === "Abholung" && <a className="order-provider" data-testid="order-phone-link" href={restaurant.phoneHref}><span>Telefonisch zur Abholung bestellen</span><Phone size={18} /></a>}
        <a className="order-provider" data-testid="order-ubereats-link" href="https://www.ubereats.com/de/search?q=L%27Antica%20Sicilia" target="_blank" rel="noreferrer"><span>Uber Eats</span><ArrowUpRight size={18} /></a>
        <a className="order-provider" data-testid="order-lieferando-link" href="https://www.lieferando.de/" target="_blank" rel="noreferrer"><span>Lieferando</span><ArrowUpRight size={18} /></a>
        <p className="order-note">{mode === "Lieferung" ? "Liefergebühren können anfallen. Die aktuelle Lieferzeit wird beim Anbieter angezeigt." : "Abholzeit bitte bei der Bestellung vereinbaren."} Bei den Anbietern L’Antica Sicilia in Dreieich auswählen.</p>
      </DialogContent>
    </Dialog>
  </>;
}

function Wordmark({ sub = "Ristorante · Pizzeria" }: { sub?: string }) {
  return <Link to="/" className="wordmark" data-testid="wordmark-home-link" aria-label="L’Antica Sicilia – Startseite">
    <LogoMark size={38} className="wordmark-mark" />
    <span className="wordmark-text"><span className="wordmark-main">L’Antica <em>Sicilia</em></span><span className="wordmark-sub">{sub}</span></span>
  </Link>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = () => setMenuOpen(false);
  const navigation = <>
    <Link className="nav-link" data-testid="nav-restaurant" to="/" hash="restaurant" onClick={close}>Unser Restaurant</Link>
    <Link className="nav-link" data-testid="nav-speisekarte" to="/speisekarte" onClick={close}>Speisekarte</Link>
    <Link className="nav-link" data-testid="nav-kontakt" to="/" hash="kontakt" onClick={close}>Besuch & Kontakt</Link>
  </>;
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><Tricolore className="header-flag" /><div className="page-width header-inner">
    <Wordmark />
    <nav className="desktop-nav" aria-label="Hauptnavigation">{navigation}</nav>
    <div className="header-actions"><a className="phone-button" data-testid="header-phone-link" href={restaurant.phoneHref} aria-label="Restaurant anrufen"><Phone size={16} /></a><OrderButton testId="header-order-button" label="Bestellen" /><Button variant="ghost" size="icon" className="mobile-menu-button" data-testid="mobile-menu-toggle" aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
  </div>{menuOpen && <nav className="mobile-nav" data-testid="mobile-nav" aria-label="Mobile Navigation">{navigation}<div className="mobile-nav-order"><OrderButton testId="mobile-order-button" /></div></nav>}</header>;
}

export function Footer() {
  return <footer className="site-footer"><Tricolore className="footer-flag" /><div className="page-width">
    <div className="footer-grid">
      <div><Wordmark sub="Ein Stück Sizilien in Dreieich" /><p className="footer-claim">Buon cibo, <em>buona compagnia.</em></p></div>
      <div><span className="eyebrow">Adresse</span><p>{restaurant.address}</p><a href={restaurant.phoneHref} data-testid="footer-phone-link">{restaurant.phone}</a></div>
      <div><span className="eyebrow">Öffnungszeiten</span>{openingHours.map(row => <p key={row.days}><strong>{row.days}</strong><br />{row.hours}</p>)}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} L’Antica Sicilia · Nur Barzahlung</span><a className="footer-social" data-testid="footer-instagram-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram öffnen"><Instagram size={18} /></a></div>
  </div></footer>;
}
