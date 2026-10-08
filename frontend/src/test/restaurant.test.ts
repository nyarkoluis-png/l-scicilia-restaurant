import { describe, it, expect } from "vitest";
import { restaurant, openingHours } from "../lib/restaurant";
describe("Restaurant facts", () => {
  it("keeps the supplied price range", () => { expect(restaurant.priceRange).toBe("10–20 €"); });
  it("keeps Wednesday closed", () => { expect(openingHours.find(row => row.days === "Mittwoch")?.hours).toBe("Geschlossen"); });
  it("keeps weekend opening hours", () => { expect(openingHours.find(row => row.days === "Samstag & Sonntag")?.hours).toBe("16:00–22:00"); });
  it("keeps weekday service times", () => {
    expect(openingHours.find(row => row.days === "Montag & Dienstag")?.hours).toBe("11:00–14:30 · 16:30–22:00");
    expect(openingHours.find(row => row.days === "Donnerstag & Freitag")?.hours).toBe("11:00–14:30 · 16:30–22:00");
  });
});