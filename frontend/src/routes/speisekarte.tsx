import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header, Footer, OrderButton } from "@/components/restaurant-layout";
import { MaskLines, Reveal } from "@/components/motion";
import { Tricolore } from "@/components/logo";
import { menuCategories, menuItemCount, type MenuCategory } from "@/lib/menu";

export const Route = createFileRoute("/speisekarte")({
  head: () => ({ meta: [
    { title: "Speisekarte & Preise · L’Antica Sicilia Dreieich" },
    { name: "description", content: "Die komplette Speisekarte von L’Antica Sicilia mit Preisen: Pizza, Pizza Bianche, Pasta, Al Forno, Fleisch, Fisch, Salate, Dolci und Getränke." },
    { property: "og:title", content: "Unsere Speisekarte · L’Antica Sicilia" },
    { property: "og:description", content: "Pizza, Pasta und Salate aus unserer sizilianischen Küche – alle Gerichte mit Preisen." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: MenuPage,
});

function MenuSection({ section, index }: { section: MenuCategory; index: number }) {
  return (
    <section className="menu-section" id={section.id} data-testid={`menu-section-${section.id}`}>
      <div className="menu-section-head">
        <span className="menu-section-num">{String(index + 1).padStart(2, "0")}</span>
        <div><span className="eyebrow eyebrow-red">{section.italian}</span><h2>{section.name}</h2><span className="menu-section-count">{section.items.length} Gerichte</span></div>
      </div>
      <div className="menu-items">
        {section.items.map((item, i) => (
          <motion.article className="menu-item" key={item.name} data-testid={`menu-item-${section.id}-${i}`}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: Math.min(i % 6, 5) * 0.04 }}>
            <div className="menu-item-line">
              <h3>{item.nr && <span className="menu-item-nr">{item.nr}</span>}{item.name}</h3>
              <span className="menu-item-dots" aria-hidden="true" />
              <span className="menu-item-price" data-testid={`menu-price-${section.id}-${i}`}>{item.price}</span>
            </div>
            {item.description && <p>{item.description}</p>}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function MenuPage() {
  const [category, setCategory] = useState("alle");
  const [query, setQuery] = useState("");
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuCategories
      .filter(c => category === "alle" || c.id === category)
      .map(c => ({ ...c, items: q ? c.items.filter(i => `${i.name} ${i.description ?? ""}`.toLowerCase().includes(q)) : c.items }))
      .filter(c => c.items.length > 0);
  }, [category, query]);

  return <><Header /><main className="menu-page">
    <section className="menu-hero"><div className="page-width">
      <Reveal><span className="eyebrow eyebrow-red"><Tricolore /> Fatto con amore</span></Reveal>
      <MaskLines className="menu-title" lines={["Unsere", <em key="s">Speisekarte.</em>]} delay={0.1} />
      <Reveal delay={0.3}><p className="lead">{menuItemCount} Gerichte aus der sizilianischen Küche – von der Pizza Semplice bis zur Pasta Mista. Alle Preise in Euro.</p></Reveal>
    </div></section>
    <div className="menu-toolbar" data-testid="menu-toolbar"><div className="page-width menu-toolbar-inner">
      <div className="category-list" aria-label="Speisekartenkategorien">
        {[{ id: "alle", name: "Alle" }, ...menuCategories].map(c => <Button key={c.id} variant="category" data-testid={`menu-filter-${c.id}`} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.name}</Button>)}
      </div>
      <label className="menu-search"><Search size={16} /><input data-testid="menu-search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Gericht oder Zutat suchen…" aria-label="Speisekarte durchsuchen" />{query && <button data-testid="menu-search-clear" onClick={() => setQuery("")} aria-label="Suche löschen"><X size={14} /></button>}</label>
    </div></div>
    <div className="page-width menu-body">
      {sections.length ? sections.map(s => <MenuSection key={s.id} section={s} index={menuCategories.findIndex(c => c.id === s.id)} />)
        : <p className="menu-empty" data-testid="menu-empty">Kein Gericht gefunden. Versuch es mit einer anderen Zutat.</p>}
      <div className="menu-cta"><Tricolore /><h2>Lust bekommen?</h2><p>Bestelle zur Abholung oder lass dir dein Lieblingsgericht liefern.</p><OrderButton testId="menu-order-button" /></div>
      <p className="order-note text-center">Bei Fragen zu Zutaten und Allergenen sprich uns bitte an. Wir akzeptieren nur Barzahlung.</p>
    </div>
  </main><Footer /></>;
}
