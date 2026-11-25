// What each game teaches, by the code it reports to the API (events of type "answer" and "mastered").
// The parent dashboard uses this to turn codes into plain words. Xed has its own, larger list in xed-skills.js.
// To add a game: give it an entry here and have the game send those codes.
const GAME_SKILLS = {
  sworld: { subject: "Science", skills: {
    "sw-neutralise": { name: "Neutralisation: choosing an acid or an alkali to cancel the other", topic: "Acids and alkalis" },
    "sw-ph-scale": { name: "The pH scale: stopping at neutral (pH 7) without overshooting", topic: "Acids and alkalis" },
    "sw-metal-acid": { name: "Reactive metal + acid makes a salt and hydrogen", topic: "Reactivity of metals" },
    "sw-reactivity": { name: "The reactivity series: copper does not react with dilute acid", topic: "Reactivity of metals" },
  } },
};
