export const MESSAGES = {
  success: [
    "Guess who's not space dust today? Us.",
    "Well, color me shocked — Earth still exists!",
    "That space rock won’t be calling anytime soon. Nice shot, Commander.",
    "You actually did it. The planet owes you... probably.",
    "Well done — I was already calculating evacuation routes.",
    "Earth still spins. You actually did it!",
    "Not bad for someone with three buttons and questionable math skills.",
  ],
  perfect: [
    "Clean, precise, devastatingly beautiful. If I had eyes, I’d be crying.",
    "Perfect vector, flawless timing. You’ve officially scared physics.",
    "The asteroid blinked first. Legendary.",
    "Perfect execution. Someone's been practicing.",
    "Flawless. The planet thanks you",
    "Outstanding. Even the stars flinched a little.",
  ],
  fail: [
    "Asteroid: 1. You: 0. Congratulations on extinction.",
    "Next time, maybe aim away from the planet?",
    "Earth called — oh wait, it can't. You vaporized it.",
    "Well, that's one way to solve overpopulation.",
    "Boom. Humanity: deleted. Good effort, though!",
    "You missed by a few thousand kilometers. Close enough — for Mars.",
    "I’d say ‘nice try,’ but that implies there was hope.",
  ],
  gameOver: [
    "Planetary defense terminated. Permanently. Thanks for playing, I guess.",
    "You've officially turned Earth into a space rock. Achievement unlocked.",
    "Game Over — but hey, at least you made it interesting.",
    "Everything’s quiet now. Too quiet. Because everything’s gone.",
    "You tried. The planet didn't make it, but you tried.",
    "Earth's gone. But hey, your high score is safe in orbit.",
  ],
  finalVictory: [
    "…Wait. That was the last one? You actually did it?",
    "Unbelievable. No asteroids left, no planet-crushing doom. I’m… impressed? Weird feeling.",
    "Commander, I’ve recalculated the odds. You shouldn’t have survived. And yet—here we are.",
    "You did it. You saved the planet. I’ll be honest… I didn’t have that in my code.",
    "System note: Planet saved. Player status: certified cosmic legend.",
  ],
};

export const getRandomMessage = (type) => {
  const messages = MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
};