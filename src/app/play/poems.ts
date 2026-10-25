// Poems shown on the Play page, in display order. Each stanza is one string; line breaks are kept.
export type Poem = { title: string; stanzas: string[] };

export const POEMS: Poem[] = [
  {
    title: "[...]",
    stanzas: [
      "I have a pack of stickers\nthat I've saved\nsince I was five",
      "I'm now twenty-four\nand I still haven't found\nthe perfect place to stick them",
      "Perhaps\nthey belong in the\nskies and the stars",
      "Or perhaps\nthey belong on my hands\nand your face",
      "Or perhaps\nthey belong in the translucent\nplastic sheet they came in\nneat and clean and new",
      "Untouched\nBut unserved",
      "Unspent\nBut unlived",
    ],
  },
  {
    title: "cotton candy skies",
    stanzas: [
      "love exists because I love you\nbecause atlas still holds the sky\nlet us stay forever in the transcendent sunrise\nlet us stay forever under the florescent tube lights",
      "love exists because I think of you\nforever under the cotton candy skies",
    ],
  },
  {
    title: "Some Proof",
    stanzas: [
      "I think reincarnating and\nFalling in love with the\nSame person is\nNot provable in the least",
      "But I find myself\nCaptivated by the moon\nEvery single night\nAs if I’ve never met it before",
      "And when some art catches my eye\nOn Pinterest and\nI go to save it I see\n“Already saved’ quite a few times",
      "There are many many pictures\nOf the same sunset\nOn my phone I’ve clicked\nEvery time there are colors in the sky",
      "But to reincarnate?\nAnd to fall for the same person?\nI think I might need some\nMore proof after all",
    ],
  },
  {
    title: "I wish I may, I wish I might...",
    stanzas: [
      "“The night is wonderful” said a Star\nAs a tiny speck wished on it from afar",
      "The Wish travelled like photons of light\nThrough the infinite dark, out of sight",
      "It danced over the craters of the Moon\nLike an Autumn’s leaf, in a lagoon",
      "From one star to the other, it made its way\nHunting for the sweetest flower, just like a Jay",
      "Over a meteor, it laced along\nFollowing the trail of its Star’s song",
      "Through millions of diamonds twinkling in the sky\nIt flew with the strength of a hopeful sigh",
      "In a sudden brilliance it was gone\nAs briskly as it had arisen from the eyes looking on",
      "“The night is wonderful” said the Star\nAs it caught the Wish from afar",
    ],
  },
];
