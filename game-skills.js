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
  lamplight: { subject: "Religious and Moral Education", skills: {
    "lp-noah": { name: "Noah’s Ark: God keeps his promises", topic: "Old Testament stories" },
    "lp-david": { name: "David and Goliath: courage and trusting God", topic: "Old Testament stories" },
    "lp-daniel": { name: "Daniel and the Lions: staying faithful in prayer", topic: "Old Testament stories" },
    "lp-loaves": { name: "Five Loaves and Two Fish: sharing what we have", topic: "The life of Jesus" },
    "lp-storm": { name: "Jesus Calms the Storm: trusting Jesus when we are afraid", topic: "The life of Jesus" },
    "lp-sheep": { name: "The Lost Sheep: everyone matters to God", topic: "Parables of Jesus" },
  } },
  inkbound: { subject: "English", skills: {
    "ib-adjectives": { name: "Using adjectives (describing words) to change things", topic: "Grammar: adjectives" },
    "ib-choosing-verbs": { name: "Choosing the right verb (doing word) for the job", topic: "Grammar: verbs" },
    "ib-past-tense": { name: "Writing verbs in the past tense, including irregular ones like stood and ran", topic: "Grammar: verb tenses" },
    "ib-future-tense": { name: "Writing verbs in the future tense with will", topic: "Grammar: verb tenses" },
  } },
};
