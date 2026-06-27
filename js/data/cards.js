export const cards = [
  // L1 Icebreaker
  { id: 'l1_01', level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: '{player}, pick the player you think gives the best advice. They drink if they disagree.' },
  { id: 'l1_02', level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: 'Never have I ever lied about being "on my way". Drink if you have.' },
  { id: 'l1_03', level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: 'Would you rather expose your search history or your camera roll for 30 seconds?' },
  { id: 'l1_04', level: 1, type: 'Icebreaker', icon: '🧊', tags: ['target'], text: '{player}, stare down {target}. First person to laugh drinks.' },
  { id: 'l1_05', level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: 'Everyone who has ever gone back to someone they swore they were done with drinks.' },
  { id: 'l1_06', level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: '{player}, tell the group your most harmless red flag or drink twice.' },
  { id: 'l1_07', level: 1, type: 'Shot Card',  icon: '🥃', tags: [], text: '{player}, take 1 sip. If you refuse, answer: who here would survive best in a scandal?' },
  { id: 'l1_08', level: 1, type: 'Shot Card',  icon: '🥃', tags: [], text: 'Last person to touch the floor drinks. No arguing.' },
  { id: 'l1_09', level: 1, type: 'Question',   icon: '🎲', tags: [], text: 'Who in the room has the most "innocent face, dangerous mind" energy?' },
  { id: 'l1_10', level: 1, type: 'Vote',       icon: '👀', tags: [], text: 'Group vote: who is most likely to flirt accidentally without noticing?' },

  // L2 Spicy
  { id: 'l2_01', level: 2, type: 'Spicy', icon: '🌶️', tags: ['target'], text: '{player}, choose one player you think has the most attractive aura. They decide whether you drink or compliment them.' },
  { id: 'l2_02', level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: 'Never have I ever had a crush on someone in a friend group. Drink if you have.' },
  { id: 'l2_03', level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: 'Would you rather date someone clingy but loyal or mysterious but inconsistent?' },
  { id: 'l2_04', level: 2, type: 'Spicy', icon: '🌶️', tags: ['target', 'flirt'], text: '{player}, pick someone and give them your smoothest one-line flirt. Group votes if it landed.' },
  { id: 'l2_05', level: 2, type: 'Spicy', icon: '🌶️', tags: ['target', 'contact'], text: '{player}, ask {target} for permission to kiss them on the cheek. If they say no, both can drink/pass.' },
  { id: 'l2_06', level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: '{player}, describe your type without naming anyone. The group gets one guess.' },
  { id: 'l2_07', level: 2, type: 'Spicy', icon: '🌶️', tags: ['target', 'flirt'], text: 'Who here would have the most dangerous talking stage? Explain or drink.' },
  { id: 'l2_08', level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: 'Never have I ever sent a message, deleted it, then acted normal. Drink if you have.' },
  { id: 'l2_09', level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: '{player}, rank these: loyalty, looks, confidence, money, humour. Lowest-ranked one makes you drink.' },
  { id: 'l2_10', level: 2, type: 'Spicy', icon: '🌶️', tags: ['target'], text: '{player}, choose someone to ask you one spicy-but-respectful question. Answer or drink.' },

  // L3 Freaky
  { id: 'l3_01', level: 3, type: 'Freaky', icon: '🫦', tags: ['target', 'flirt'], text: '{player}, choose a player. You have 30 seconds to convince them you are the best date here. They judge.' },
  { id: 'l3_02', level: 3, type: 'Freaky', icon: '🫦', tags: ['contact', 'target'], text: '{player}, ask {target} if you can sit beside them for the next round like you are in a fake couple photoshoot. If no, drink/pass.' },
  { id: 'l3_03', level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: 'Never have I ever had a dream about someone I know and acted normal after. Drink if you have.' },
  { id: 'l3_04', level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: 'Would you rather be with someone who is amazing at texting or amazing in person?' },
  { id: 'l3_05', level: 3, type: 'Freaky', icon: '🫦', tags: ['target', 'contact'], text: '{player}, ask {target} for a 10-second hand-hold. If either person says no, drink/pass.' },
  { id: 'l3_06', level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: '{player}, act out your "trying not to fold" face. Group votes pass or drink.' },
  { id: 'l3_07', level: 3, type: 'Freaky', icon: '🫦', tags: ['target'], text: '{player}, let {target} choose: answer a freaky question from the group or drink twice.' },
  { id: 'l3_08', level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: 'Group vote: who here is most likely to be calm in public and chaotic in private?' },
  { id: 'l3_09', level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: '{player}, describe the difference between flirting and leading someone on. If the group disagrees, drink.' },
  { id: 'l3_10', level: 3, type: 'Freaky', icon: '🫦', tags: ['target', 'contact'], text: '{player}, ask someone for a 5-second slow dance. If they say no, both laugh and you drink/pass.' },

  // L4 OMG
  { id: 'l4_01', level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: '{player}, reveal the most dangerous compliment someone could give you, or drink twice.' },
  { id: 'l4_02', level: 4, type: 'OMG', icon: '😱', tags: ['target'], text: '{player}, choose someone. They ask you the boldest respectful question they can think of. Answer honestly or drink twice.' },
  { id: 'l4_03', level: 4, type: 'OMG', icon: '😱', tags: ['contact', 'target'], text: '{player}, ask {target} for a shoulder massage for 20 seconds. If either person says no, drink/pass.' },
  { id: 'l4_04', level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: 'Never have I ever nearly folded because of eye contact. Drink if you have.' },
  { id: 'l4_05', level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: 'Would you rather have everyone know your crush history or your worst talking-stage messages?' },
  { id: 'l4_06', level: 4, type: 'OMG', icon: '😱', tags: ['target', 'flirt'], text: '{player}, pick someone and give them a dramatic "we should not be left alone" movie line. Group votes.' },
  { id: 'l4_07', level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: '{player}, confess one thing that instantly makes you fold, or drink twice.' },
  { id: 'l4_08', level: 4, type: 'OMG', icon: '😱', tags: ['target'], text: '{player}, let {target} make a dare. You can reject it for any reason and drink/pass instead.' },
  { id: 'l4_09', level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: 'Group vote: who here has the most "I know exactly what I\'m doing" energy?' },
  { id: 'l4_10', level: 4, type: 'OMG', icon: '😱', tags: ['contact', 'target'], text: '{player}, ask {target} for a dramatic fake prom pose photo. If no, drink/pass.' }
];
