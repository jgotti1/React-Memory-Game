import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

function cardButtons(container) {
  return [...container.querySelectorAll("[data-card-key]")];
}

describe("Poppy's Match Game", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("deals a complete board immediately", () => {
    const { container } = render(<App />);

    expect(screen.getByRole("heading", { name: "Poppy's Match Game" })).toBeInTheDocument();
    expect(cardButtons(container)).toHaveLength(12);
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });

  it("counts a comparison and unlocks mismatched cards", () => {
    const { container } = render(<App />);
    const cards = cardButtons(container);
    const firstCard = cards[0];
    const secondCard = cards.find((card) => card.dataset.cardKey !== firstCard.dataset.cardKey);

    fireEvent.click(firstCard);
    fireEvent.click(secondCard);

    expect(screen.getByText("1", { selector: ".scoreboard__item strong" })).toBeInTheDocument();
    expect(cards.every((card) => card.disabled)).toBe(true);

    act(() => vi.advanceTimersByTime(1000));

    expect(firstCard).not.toBeDisabled();
    expect(secondCard).not.toBeDisabled();
  });

  it("does not allow the same card to be chosen twice", () => {
    const { container } = render(<App />);
    const firstCard = cardButtons(container)[0];

    fireEvent.click(firstCard);
    fireEvent.click(firstCard);

    expect(firstCard).toBeDisabled();
    expect(screen.queryByText("1", { selector: ".scoreboard__item strong" })).not.toBeInTheDocument();
  });

  it("shows a win summary after all pairs are matched", () => {
    const { container } = render(<App />);
    const cards = cardButtons(container);
    const pairs = cards.reduce((groups, card) => {
      const key = card.dataset.cardKey;
      return { ...groups, [key]: [...(groups[key] ?? []), card] };
    }, {});

    Object.values(pairs).forEach(([firstCard, secondCard]) => {
      fireEvent.click(firstCard);
      fireEvent.click(secondCard);
      act(() => vi.advanceTimersByTime(500));
    });

    expect(screen.getByRole("dialog", { name: "You found every match!" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play again" })).toHaveFocus();
    expect(window.localStorage.getItem("poppy-match-best-score")).not.toBeNull();
  });

  it("resets the board and score", () => {
    const { container } = render(<App />);
    const [firstCard, secondCard] = cardButtons(container);

    fireEvent.click(firstCard);
    fireEvent.click(secondCard);
    fireEvent.click(screen.getByRole("button", { name: "New game" }));

    expect(cardButtons(container)).toHaveLength(12);
    expect(screen.getByText("0", { selector: ".scoreboard__item strong" })).toBeInTheDocument();
  });

  it("leaves music off until the player opts in", () => {
    render(<App />);
    const musicButton = screen.getByRole("button", { name: "Music off" });

    expect(musicButton).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(musicButton);
    expect(screen.getByRole("button", { name: "Music on" })).toHaveAttribute("aria-pressed", "true");
  });
});
