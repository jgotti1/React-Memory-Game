import { CARD_IMAGES, createDeck, formatTime, isBetterScore, shuffle } from "./game";

describe("game helpers", () => {
  it("creates two uniquely identified cards for every image", () => {
    const deck = createDeck(() => 0.5);

    expect(deck).toHaveLength(CARD_IMAGES.length * 2);
    expect(new Set(deck.map((card) => card.id)).size).toBe(deck.length);

    CARD_IMAGES.forEach(({ key }) => {
      expect(deck.filter((card) => card.key === key)).toHaveLength(2);
    });
  });

  it("shuffles without changing the original array", () => {
    const original = [1, 2, 3, 4];
    const shuffled = shuffle(original, () => 0);

    expect(original).toEqual([1, 2, 3, 4]);
    expect(shuffled).toEqual([2, 3, 4, 1]);
  });

  it("formats elapsed time", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(65)).toBe("1:05");
  });

  it("ranks fewer tries first and uses time as a tie-breaker", () => {
    expect(isBetterScore({ turns: 8, seconds: 40 }, null)).toBe(true);
    expect(isBetterScore({ turns: 7, seconds: 80 }, { turns: 8, seconds: 30 })).toBe(true);
    expect(isBetterScore({ turns: 8, seconds: 25 }, { turns: 8, seconds: 30 })).toBe(true);
    expect(isBetterScore({ turns: 9, seconds: 10 }, { turns: 8, seconds: 30 })).toBe(false);
  });
});
