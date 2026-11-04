export const weekFacts = {
  4:  { size: 'Poppy seed',   emoji: '🌱', fact: 'The embryo is implanting in the uterus. The neural tube — which becomes the brain and spinal cord — is beginning to form.' },
  5:  { size: 'Sesame seed',  emoji: '🌿', fact: 'The heart starts beating! Tiny arm and leg buds are forming. The embryo is now about 2mm.' },
  6:  { size: 'Lentil',       emoji: '🫘', fact: 'Facial features are starting to develop. The nose, mouth, and ears are taking shape.' },
  7:  { size: 'Blueberry',    emoji: '🫐', fact: 'The brain is growing rapidly — generating around 100 new cells per minute.' },
  8:  { size: 'Raspberry',    emoji: '🍓', fact: 'All essential organs have begun to form. Fingers and toes are starting to emerge.' },
  9:  { size: 'Cherry',       emoji: '🍒', fact: 'Your baby now officially graduates from embryo to fetus. Tiny muscles are forming.' },
  10: { size: 'Strawberry',   emoji: '🍓', fact: 'Fingernails and hair follicles are forming. The baby can move, though you can\'t feel it yet.' },
  11: { size: 'Fig',          emoji: '🍑', fact: 'The baby\'s bones are beginning to harden. Tooth buds are forming under the gums.' },
  12: { size: 'Lime',         emoji: '🍋', fact: 'Reflexes are developing — the baby can open and close its fingers. The first trimester is almost complete!' },
  13: { size: 'Peach',        emoji: '🍑', fact: 'Welcome to the second trimester! The risk of miscarriage drops significantly.' },
  14: { size: 'Lemon',        emoji: '🍋', fact: 'The baby can squint, frown, and grimace. The kidneys are producing urine.' },
  15: { size: 'Apple',        emoji: '🍎', fact: 'The baby is practicing breathing movements. Bones are getting stronger.' },
  16: { size: 'Avocado',      emoji: '🥑', fact: 'You may start feeling the first flutters of movement — called quickening.' },
  17: { size: 'Pear',         emoji: '🍐', fact: 'The baby is developing fat stores that will keep it warm after birth.' },
  18: { size: 'Bell pepper',  emoji: '🫑', fact: 'This is a great week for the anatomy scan ultrasound — you may find out the sex!' },
  19: { size: 'Mango',        emoji: '🥭', fact: 'The baby is covered in vernix — a white, creamy coating that protects the skin.' },
  20: { size: 'Banana',       emoji: '🍌', fact: 'Halfway there! The baby can hear your voice and may respond to loud sounds.' },
  24: { size: 'Ear of corn',  emoji: '🌽', fact: 'The baby\'s face is fully formed. At 24 weeks, the baby reaches the threshold of viability outside the womb.' },
  28: { size: 'Eggplant',     emoji: '🍆', fact: 'The third trimester begins. The baby can open its eyes and may dream during REM sleep.' },
  32: { size: 'Jicama',       emoji: '🥔', fact: 'The baby is practicing breathing, sucking, and swallowing. Most major development is complete.' },
  36: { size: 'Papaya',       emoji: '🍈', fact: 'The baby is considered early term. The lungs are nearly fully mature.' },
  40: { size: 'Watermelon',   emoji: '🍉', fact: 'Full term! The average baby weighs 3.4kg and is 51cm long. Any day now!' },
}

export function getWeekFact(week) {
  if (weekFacts[week]) return weekFacts[week]
  const keys = Object.keys(weekFacts).map(Number).sort((a, b) => a - b)
  const closest = keys.reduce((prev, curr) => Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev)
  return weekFacts[closest]
}
