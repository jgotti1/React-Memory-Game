export const CARD_IMAGES = [
  { key: "bear", label: "Freddy bear", src: "/img/bear-1.webp" },
  { key: "blue", label: "Blue bunny", src: "/img/blue-1.webp" },
  { key: "fox", label: "Red fox", src: "/img/fox-1.webp" },
  { key: "girl", label: "Red-haired doll", src: "/img/girl-1.webp" },
  { key: "mommy", label: "Pink character", src: "/img/mommy-1.webp" },
  { key: "poppy", label: "Poppy doll", src: "/img/poppy-1.webp" },
];

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function createDeck(random = Math.random) {
  const pairs = CARD_IMAGES.flatMap((card) => [0, 1].map((copy) => ({
    ...card,
    id: `${card.key}-${copy}`,
    matched: false,
  })));

  return shuffle(pairs, random);
}

export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function isBetterScore(candidate, currentBest) {
  if (!currentBest) return true;
  if (candidate.turns !== currentBest.turns) {
    return candidate.turns < currentBest.turns;
  }
  return candidate.seconds < currentBest.seconds;
}
