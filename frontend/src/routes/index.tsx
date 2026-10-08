import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, MapPin, Phone, ShoppingBag, Sun, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer, Header, OrderButton } from "@/components/restaurant-layout";
import { MaskLines, Marquee, Reveal } from "@/components/motion";
import { Tricolore } from "@/components/logo";
import { directionsUrl, openingHours, restaurant } from "@/lib/restaurant";
import { menuCategories } from "@/lib/menu";
import heroPhoto from "@/assets/pizza-table.jpg";
import gardenPhoto from "@/assets/garden.jpg";
import pizzaPhoto from "@/assets/pizza.jpg";
import saladPhoto from "@/assets/salad.jpg";
import exteriorPhoto from "@/assets/exterior.jpg";
import interiorPhoto from "@/assets/interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "L’Antica Sicilia · Sizilianisches Restaurant in Dreieich" },
    { name: "description", content: "Pizza, Pasta und sizilianische Gastfreundschaft in Dreieich. Entdecke unsere Speisekarte mit Preisen und den Sommergarten. Fahrgasse 1 · 06103 63330." },
    { property: "og:title", content: "L’Antica Sicilia · Ein Stück Sizilien in Dreieich" },
    { property: "og:description", content: "Sizilianisch genießen: Pizza, Pasta, frische Salate und ein gemütlicher Sommergarten." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});

const find = (name: string) => menuCategories.flatMap(c => c.items).find(i => i.name === name);

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const onMove = (e: React.MouseEvent) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  return (
    <section ref={ref} className="hero" aria-label="L’Antica Sicilia" data-testid="hero-section" onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <div className="hero-flag-col" aria-hidden="true"><i /><i /><i /></div>
      <div className="page-width hero-grid">
        <motion.div className="hero-copy-col" style={{ y: textY }}>
          <motion.span className="eyebrow hero-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}><Tricolore /> Cucina siciliana · Dreieich</motion.span>
          <MaskLines className="hero-title" lines={["L’Antica", <em key="s">Sicilia</em>]} delay={0.2} />
          <motion.p className="hero-tagline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }}>Ein Stück Sizilien. Ganz nah.</motion.p>
          <motion.p className="hero-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}>Knusprige Pizza, Pasta mit Leidenschaft und die Freude, gemeinsam gutes Essen zu genießen. Benvenuti!</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05 }}>
            <Button variant="restaurant" asChild><Link to="/speisekarte" data-testid="hero-menu-button">Zur Speisekarte <ArrowRight /></Link></Button>
            <a className="hero-call" href={restaurant.phoneHref} data-testid="hero-call-link"><Phone size={15} />{restaurant.phone}</a>
          </motion.div>
        </motion.div>
        <div className="hero-visual">
          <motion.div className="hero-arch" style={{ rotateX: rotX, rotateY: rotY }} initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)" }} transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}>
            <motion.img src={pizzaPhoto} alt="Knusprige Pizza mit Oliven bei L’Antica Sicilia" style={{ y: imgY, scale: 1.18 }} fetchPriority="high" />
          </motion.div>
          <motion.div className="hero-badge" data-testid="hero-rating-badge" initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 1.2 }}>
            <svg viewBox="0 0 120 120" className="hero-badge-ring" aria-hidden="true"><defs><path id="ring" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs><text><textPath href="#ring">225 Google-Bewertungen · Grazie mille · </textPath></text></svg>
            <span className="hero-badge-core"><strong>4,7</strong><span>★★★★★</span></span>
          </motion.div>
          <motion.div className="hero-chip" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.35 }}><span className="dot-green" />Heute frisch aus dem Ofen</motion.div>
        </div>
      </div>
      <div className="page-width hero-foot"><span><MapPin size={14} />Fahrgasse 1 · 63303 Dreieich</span><a href="#geniessen" className="hero-scroll" data-testid="hero-scroll-link" aria-label="Gerichte entdecken"><ArrowDown size={16} /> Scrollen</a></div>
    </section>
  );
}

function Cucina() {
  const margherita = find("Pizza Margherita"), lasagne = find("Lasagne"), caprese = find("Caprese"), tiramisu = find("Tiramisu");
  return (
    <section id="geniessen" className="section" data-testid="cucina-section"><div className="page-width">
      <div className="split-intro">
        <Reveal><span className="eyebrow eyebrow-red">01 — La nostra cucina</span></Reveal>
        <MaskLines as="h2" className="display-h2" lines={["Einfach gut.", <em key="e">Echt sizilianisch.</em>]} />
        <Reveal delay={0.15}><p className="lead">Von der ersten Gabel bis zum letzten Stück Pizza: über 80 Gerichte, frisch zubereitet in unserer kleinen Küche in der Fahrgasse.</p></Reveal>
      </div>
      <div className="bento">
        <Reveal className="bento-a"><article className="bento-card bento-photo" data-testid="bento-pizza"><img src={heroPhoto} alt="Zwei Pizzen und Wein auf einem Holztisch" loading="lazy" /><div className="bento-overlay"><span className="eyebrow">Pizza · Il nostro cuore</span><h3>Pizza, wie wir sie lieben.</h3><p>Goldbrauner Rand, 25 Klassiker und 8 Pizze Bianche.</p><span className="price-tag">{margherita?.name} · {margherita?.price}</span></div></article></Reveal>
        <Reveal className="bento-b" delay={0.1}><article className="bento-card bento-green" data-testid="bento-pasta"><span className="eyebrow">La Pasta</span><h3>28 Nudelgerichte</h3><p>Von Napoli bis Pasta Mista – und dazu Klassiker aus dem Ofen.</p><span className="price-big">{lasagne?.name}<strong>{lasagne?.price}</strong></span></article></Reveal>
        <Reveal className="bento-c" delay={0.15}><article className="bento-card bento-photo" data-testid="bento-salad"><img src={saladPhoto} alt="Bunter frischer Salat" loading="lazy" /><div className="bento-overlay"><span className="eyebrow">Insalate</span><h3>Frische auf dem Teller.</h3><span className="price-tag">{caprese?.name} · {caprese?.price}</span></div></article></Reveal>
        <Reveal className="bento-d" delay={0.2}><article className="bento-card bento-red" data-testid="bento-dolci"><span className="eyebrow">Dolci</span><h3>Ein süßer Abschluss.</h3><span className="price-big">{tiramisu?.name}<strong>{tiramisu?.price}</strong></span></article></Reveal>
        <Reveal className="bento-e" delay={0.25}><Link to="/speisekarte" className="bento-card bento-link" data-testid="bento-menu-link"><span className="eyebrow">Speisekarte</span><h3>Alle Gerichte & Preise ansehen</h3><span className="bento-arrow"><ArrowUpRight /></span></Link></Reveal>
      </div>
    </div></section>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 70]);
  return (
    <section id="restaurant" className="section story-section" data-testid="story-section"><div ref={ref} className="page-width story-layout">
      <div className="story-media">
        <motion.div className="story-frame story-frame-main" style={{ y: y1 }}><img src={gardenPhoto} alt="Gemütlicher Sommergarten mit Pflanzen und Lichterketten" loading="lazy" /></motion.div>
        <motion.div className="story-frame story-frame-small" style={{ y: y2 }}><img src={interiorPhoto} alt="Holztische und Samtsessel im Gastraum" loading="lazy" /></motion.div>
      </div>
      <div className="story-copy">
        <Reveal><span className="eyebrow eyebrow-red">02 — Un piccolo angolo di Sicilia</span></Reveal>
        <MaskLines as="h2" className="display-h2" lines={["Ein kleiner Ort.", <em key="v">Viele schöne Momente.</em>]} />
        <Reveal delay={0.1}><p>Mitten in Dreieich wartet ein Stück sizilianische Lebensfreude auf dich. Ein gemütlicher Tisch, deine Lieblingspizza und Menschen, mit denen du den Abend teilen möchtest.</p><p>Wenn es draußen warm wird, ist unser Sommergarten der schönste Platz dafür: unter grünen Blättern, mit Lichterketten und ganz entspannt.</p></Reveal>
        <Reveal delay={0.2}><div className="story-signature">Buon cibo, buona compagnia.</div><div className="story-details"><span><Sun size={14} />Sommergarten</span><span><Heart size={14} />LGBTQ+-freundlich</span><span><Utensils size={14} />Vor Ort & Abholung</span></div>
          <a className="text-link" href={restaurant.phoneHref} data-testid="story-call-link">Tisch reservieren <ArrowUpRight size={14} /></a></Reveal>
      </div>
    </div></section>
  );
}

const reviews = ["Wir kommen regelmäßig und lieben die Pizzen, Lasagne und Salate!", "Kleines italienisches Restaurant mit gemütlicher Terrasse und gutem Essen.", "Hervorragende, frische Zutaten … insbesondere auch für Veganer! … Tipp: der Sommergarten ist ein echter Wohlfühlort."];

function Reviews() {
  return (
    <section className="section" id="stimmen" data-testid="reviews-section"><div className="page-width">
      <div className="review-heading">
        <div><Reveal><span className="eyebrow eyebrow-red">03 — Le parole dei nostri ospiti</span></Reveal><MaskLines as="h2" className="display-h2" lines={["Was unsere", <em key="g">Gäste sagen.</em>]} /></div>
        <Reveal delay={0.1}><div className="rating-summary" data-testid="rating-summary"><span className="rating-number">4,7</span><div><span className="stars">★★★★★</span><p>{restaurant.reviewCount} Bewertungen auf Google</p></div></div></Reveal>
      </div>
      <div className="reviews-grid">{reviews.map((text, i) => <Reveal key={text} delay={i * 0.1}><article className={`review review-${i}`} data-testid={`review-card-${i}`}><span className="review-quote" aria-hidden="true">“</span><blockquote>{text}</blockquote><span className="review-source"><span className="stars">★★★★★</span> Google-Rezension</span></article></Reveal>)}</div>
    </div></section>
  );
}

function Visit() {
  return (
    <section id="kontakt" className="section visit-section" data-testid="visit-section"><div className="page-width visit-layout">
      <div>
        <Reveal><span className="eyebrow">04 — Ti aspettiamo</span></Reveal>
        <MaskLines as="h2" className="display-h2" lines={["Wir freuen uns", <em key="b">auf deinen Besuch.</em>]} />
        <Reveal delay={0.1}><p className="visit-address">{restaurant.name}<br />Fahrgasse 1<br />63303 Dreieich</p>
          <div className="visit-links"><a className="text-link" href={directionsUrl} target="_blank" rel="noreferrer" data-testid="visit-directions-link">Route planen <ArrowUpRight size={14} /></a><a className="text-link" href={restaurant.phoneHref} data-testid="visit-phone-link"><Phone size={14} />{restaurant.phone}</a></div>
          <div className="mt-8"><OrderButton label="Abholung & Lieferung" testId="visit-order-button" /></div></Reveal>
      </div>
      <Reveal delay={0.15}><div className="hours-card"><span className="eyebrow">Unsere Öffnungszeiten</span><dl className="hours-list" data-testid="opening-hours">{openingHours.map(row => <div className={`hours-row ${row.hours === "Geschlossen" ? "is-closed" : ""}`} key={row.days}><dt>{row.days}</dt><dd>{row.hours}</dd></div>)}</dl><p className="hours-note"><ShoppingBag size={14} />Vor Ort · Zum Mitnehmen · Kontaktlose Lieferung</p></div></Reveal>
      <Reveal delay={0.2} className="visit-photo-wrap"><img className="visit-photo" src={exteriorPhoto} alt="Eingang und Fassade von L’Antica Sicilia in der Fahrgasse" loading="lazy" /></Reveal>
    </div></section>
  );
}

function Index() {
  return <><Header /><main>
    <Hero />
    <Marquee items={["Pizza", "Pasta fatta con amore", "Insalate", "Al Forno", "Dolci", "Benvenuti a Dreieich"]} />
    <Cucina />
    <Story />
    <Reviews />
    <Visit />
  </main><Footer /></>;
}
