/* ==========================================================================
   Cartoon Vaala — Master Cartoon Archival Lore & Metadata Registry
   Complete Historical Data, Character Roster, Hindi Dub Folklore,
   Channel Frequencies, Catchphrases & Multi-Track Soundtracks
   ========================================================================== */

const masterCartoonsData = [
  {
    id: "doremon",
    name: "Doraemon",
    hindiTitle: "डोरेमोन: 22वीं सदी का जादुई साथी",
    tagline: "Anatomy of a 22nd Century Companion",
    channel: "Hungama TV",
    channelCode: "CH-04",
    networkKey: "hungama",
    frequency: "184.25 MHz",
    slot: "16:00 IST (The Sacred 4:00 PM Slot)",
    era: "2005–Present (Hungama Golden Era)",
    image: "Images/Doremon.jpg",
    accentColor: "var(--color-channel-hungama)",
    quote: "Nobita, whether you succeed or fail is not written in stone. It depends entirely on your effort today.",
    synopsis: "Unlike western superhero narratives predicated on invincible power, Fujiko F. Fujio's masterpiece was deeply human. Nobita Nobi was neither athletic nor academically gifted; he was clumsy, procrastinated endlessly on homework, and relied on a robotic cat from the 22nd century with a magical 4D pocket. Every gadget functioned as a gentle parable on unintended consequences and emotional resilience.",
    characters: [
      { name: "Doraemon", role: "22nd Century Earless Cat Robot with 4D Pocket" },
      { name: "Nobita Nobi", role: "Kind-Hearted, Clumsy Dreamer & Student" },
      { name: "Shizuka Minamoto", role: "Studious, Empathetic Classmate & Violinist" },
      { name: "Takeshi 'Gian' Goda", role: "Neighborhood Strongman with Musical Ambitions" },
      { name: "Suneo Honekawa", role: "Wealthy Braggart with Model Robots" },
      { name: "Hidetoshi Dekisugi", role: "Flawless All-Rounder & Academic Prodigy" }
    ],
    gadgets: [
      "Bamboo Copter (Hopter)",
      "Anywhere Door (Kahin Bhi Jaane Wala Darwaza)",
      "Time Machine (Inside Nobita's Desk Drawer)",
      "Memory Bread (Exam Prep Lifesaver)",
      "Small Light (Shrink Ray)",
      "Translation Konjac (Bhasha Jelly)"
    ],
    hindiDubFolklore: "The Hindi dub broadcast on Hungama TV was a landmark achievement in Indian voice dubbing. Voice artists like Sonal Kaushal (Doraemon) and Simran Kaur (Nobita) infused the characters with unforgettable warmth, cadence, and Indian colloquial phrasing that made the show an everyday household staple.",
    catchphrases: [
      "Doraemon! Mujhe koi aisa gadget do na!",
      "Are Nobita! Tum phir se late ho gaye!",
      "Main hoon Gian, main hoon bada taakatwar!",
      "Mera gale ka sur to sabse sundar hai!"
    ],
    playgroundImprint: "Drawing Doraemon with round circles on the back of rough notebooks during math class, arguing over which gadget would be best for school exams, and singing the opening title track in unison on the school bus.",
    tracks: [
      {
        id: "doremon-1",
        title: "Doraemon Title Track",
        subtitle: "Original Hungama Hindi Theme",
        audio: "Audio/Doremon/Doremon1.mp3"
      },
      {
        id: "doremon-2",
        title: "Doraemon Gadget Groove",
        subtitle: "Upbeat High-Energy Theme",
        audio: "Audio/Doremon/Doremon2.mp3"
      },
      {
        id: "doremon-3",
        title: "Doraemon Nostalgic Melody",
        subtitle: "Soothing Evening Broadcast Theme",
        audio: "Audio/Doremon/Doremon3.mp3"
      }
    ]
  },
  {
    id: "shinchan",
    name: "Shinchan",
    hindiTitle: "शिनचैन: शरारत से भरा पाँच साल का तूफ़ान",
    tagline: "Subversive Comedy & Kasukabe Mayhem",
    channel: "Hungama TV",
    channelCode: "CH-04",
    networkKey: "hungama",
    frequency: "184.25 MHz",
    slot: "16:30 IST (Prime Comedy Slot)",
    era: "2006–Present (Hungama TV)",
    image: "Images/Shinchan.jpg",
    accentColor: "var(--color-channel-hungama)",
    quote: "Misae! Shiro wants his dinner, and Action Kamen is starting on TV right now!",
    synopsis: "Yoshito Usui’s five-year-old protagonist Shinnosuke Nohara dismantled adult pretension with effortless wit. Shinchan’s unfiltered observations, frantic grocery shopping sprees with his mother Misae, bizarre dance numbers, and undying reverence for Action Kamen produced the sharpest comedic pacing on Indian television.",
    characters: [
      { name: "Shinnosuke 'Shinchan' Nohara", role: "Unfiltered 5-Year-Old Comedy Mastermind" },
      { name: "Misae Nohara", role: "Long-Suffering, Fiery Mother & Shopper" },
      { name: "Hiroshi Nohara", role: "Hardworking Salaryman Father with Weary Feet" },
      { name: "Himawari Nohara", role: "Jewelry-Loving, Fast-Crawling Baby Sister" },
      { name: "Shiro", role: "Ultra-Smart White Puppy (Cotton Candy Trick)" },
      { name: "Kasukabe Defense Force", role: "Kazama, Nene, Masao, Bo-chan" }
    ],
    gadgets: [
      "Action Kamen Card Collection",
      "Chocobi Snack Boxes",
      "Buri Buri Zaemon Pig Sword",
      "Kasukabe Defense Force Badges"
    ],
    hindiDubFolklore: "The Hindi dub of Shinchan is considered one of the greatest localization feats in Indian broadcast history. Voice talents like Akanksha Sharma and Pooja Punjabi gave Shinchan a distinctive nasal flair, impeccable comic delivery, and hilarious rhyming catchphrases that transcended language barriers.",
    catchphrases: [
      "Mera naam hi hai Shinchan, main shararat se bhara!",
      "Badi badi aankhein, pyari pyari soorat!",
      "Mujhe Shimla Mirch bilkul pasand nahi hai!",
      "Aha! Buri Buri Buri Buri!"
    ],
    playgroundImprint: "Mimicking Shinchan's signature hip-shake dance in front of classmates, eating biscuits pretending they were Chocobi, and pleading with parents not to switch channels during commercial breaks.",
    tracks: [
      {
        id: "shinchan-1",
        title: "Shinchan Pagal Yeh Dil Theme",
        subtitle: "Iconic Opening Title Song",
        audio: "Audio/Shinchan/Shinchan1.mp3"
      },
      {
        id: "shinchan-2",
        title: "Shinchan Kasukabe Fun Theme",
        subtitle: "High-Spirited Kasukabe Melody",
        audio: "Audio/Shinchan/Shinchan2.mp3"
      }
    ]
  },
  {
    id: "pokemon",
    name: "Pokémon: Indigo League",
    hindiTitle: "पोकेमॉन: इंडिगो लीग (कांटो रीजन यात्रा)",
    tagline: "The Kanto Odyssey & Cheetos Tazo Craze",
    channel: "Cartoon Network",
    channelCode: "CH-08",
    networkKey: "cn",
    frequency: "216.25 MHz",
    slot: "17:00 IST (Afternoon Adventure Block)",
    era: "2003–2008 (CN Toonami / Cartoon Network India)",
    image: "Images/Pokemon.jpg",
    accentColor: "var(--color-channel-cn)",
    quote: "Gotta Catch 'Em All! 150 Pokémon in the Kanto Region.",
    synopsis: "From leaving Pallet Town on a bicycle with Pikachu to challenging Gym Leaders for badges across Kanto, Ash Ketchum’s journey was the definitive coming-of-age anime for Indian 90s and 2000s kids. It transformed playgrounds with Cheetos 3D Tazos, collector sticker albums, and spirited playground gym battles.",
    characters: [
      { name: "Ash Ketchum (Satoshi)", role: "Determined Trainer from Pallet Town" },
      { name: "Pikachu", role: "Electric Mouse & Ash's Inseparable Partner" },
      { name: "Misty (Kasumi)", role: "Cerulean Gym Leader & Water Specialist" },
      { name: "Brock (Takeshi)", role: "Pewter Gym Leader & Pokémon Breeder" },
      { name: "Team Rocket", role: "Jessie, James, and Talking Meowth" },
      { name: "Gary Oak (Shigeru)", role: "Smug Rival Trainer & Professor Oak's Grandson" }
    ],
    gadgets: [
      "Poké Balls & Great Balls",
      "Red Handheld Pokédex (Kanto Model)",
      "Indigo League 8 Gym Badges",
      "Cheetos 3D Pokémon Tazos & Slammers"
    ],
    hindiDubFolklore: "The Hindi theme song — 'Banunga main itna zabardast, na koi ho jitna...' — became a childhood national anthem. Voice actor Prasad Barve gave Ash Ketchum a distinct spirit of fearless optimism, while Team Rocket's dramatic poetic rhyming motto in Hindi remains unforgettable.",
    catchphrases: [
      "Pikachu, main tumhe chunta hoon!",
      "Pikachu, Thunderbolt hamla karo!",
      "Duniya ko tabahi se bachane ke liye... Team Rocket!",
      "Yeh to bas ek jhatke mein behosh ho gaya!"
    ],
    playgroundImprint: "Flipping Cheetos Tazos during school lunch recess, drawing Charizard and Blastoise on school desks, and shouting 'Pikachu, 10 Lakh Volt!' during gully cricket matches.",
    tracks: [
      {
        id: "pokemon-1",
        title: "Pokémon Indigo League Theme",
        subtitle: "Gotta Catch 'Em All! • Hindi Title Anthem",
        audio: "Audio/Pokemon/Pokemon1.mp3"
      }
    ]
  },
  {
    id: "ninjahathori",
    name: "Ninja Hattori-kun",
    hindiTitle: "निंजा हथौड़ी: ईगा गांव का सच्चा दोस्त",
    tagline: "Iga Clan Ninjutsu in Modern Tokyo",
    channel: "Hungama TV",
    channelCode: "CH-04",
    networkKey: "hungama",
    frequency: "184.25 MHz",
    slot: "17:30 IST (Pre-Sunset Ninja Hour)",
    era: "2006–Present (Hungama TV)",
    image: "Images/NinjaHathori.jpg",
    accentColor: "var(--color-channel-hungama)",
    quote: "Pahadon ke upar, jungle ke paar... dekho kaun apne sheher aaya yaar!",
    synopsis: "Kanzo Hattori, a little ninja from the mountains of Iga, moves into the home of elementary schooler Kenichi Mitsuba. Alongside his little brother Shinzo and sweet ninja dog Shishimaru (who is obsessed with chocolate rolls), Hattori uses traditional ninjutsu techniques to help Kenichi outsmart the mischievous Koga ninja Kemumaki and his black cat Kagechiyo.",
    characters: [
      { name: "Kanzo Hattori", role: "Master Iga Ninja (Blue Kimono & Shuriken)" },
      { name: "Shinzo Hattori", role: "Crying Little Brother with Sonic Teardrops" },
      { name: "Shishimaru", role: "Chubby Ninja Dog who Craves Chocula Rolls" },
      { name: "Kenichi Mitsuba", role: "Average Schoolboy in Need of Guidance" },
      { name: "Kemumaki Kemuzou", role: "Sneaky Koga Clan Ninja Rival" },
      { name: "Yumeko Kawai", role: "Kind Classmate Adored by Kenichi & Kemumaki" }
    ],
    gadgets: [
      "Shuriken & Smoke Bombs",
      "Water Walking Shoes (Mizu-Gumo)",
      "Ninja Glider Kite (Tobi-Dako)",
      "Shishimaru's Fireball Technique"
    ],
    hindiDubFolklore: "The Hindi theme song is etched into the collective memory of every 2000s kid. Hattori's signature catchphrase 'Ding Ding Ding!' became a universal synonym for ninja agility and clever problem-solving in Indian schools.",
    catchphrases: [
      "Ding Ding Ding! Hattori hazir hai!",
      "Pahadon ke upar, jungle ke paar... Ninja Hattori!",
      "Shishimaru ko chocula roll chahiye!",
      "Shinzo, rona band karo!"
    ],
    playgroundImprint: "Making ninja hand seals (mudras) while running around the school corridor, folding origami ninja stars from notebook pages, and shouting 'Ding Ding Ding!' while jumping over school benches.",
    tracks: [
      {
        id: "ninjahathori-1",
        title: "Ninja Hattori Opening Theme",
        subtitle: "Pahadon Ke Upar • Original Title Track",
        audio: "Audio/NinjaHathori/NinjaHathori1.mp3"
      },
      {
        id: "ninjahathori-2",
        title: "Ninja Hattori Adventure Tune",
        subtitle: "High-Paced Iga Clan Action Score",
        audio: "Audio/NinjaHathori/NinjaHathori2.mp3"
      }
    ]
  },
  {
    id: "oggy",
    name: "Oggy and the Cockroaches",
    hindiTitle: "ऑगी एंड द कॉकरोचेस: बॉलीवुड का महाहंगामा",
    tagline: "The Bollywood Slapstick Masterpiece",
    channel: "Cartoon Network",
    channelCode: "CH-08",
    networkKey: "cn",
    frequency: "216.25 MHz",
    slot: "18:00 IST (Evening Slapstick Block)",
    era: "2009–2014 (CN India Legendary Dub Era)",
    image: "Images/Oggy.jpg",
    accentColor: "var(--color-channel-cn)",
    quote: "Kissa kursi ka, billi aur jhingur ka! Dhobi pachhad deke rakh diya!",
    synopsis: "Originally a silent French animated slapstick comedy created by Jean-Yves Raimbaud, Cartoon Network India transformed Oggy into cultural immortality by layering a rich, comedic Bollywood mimicry voice-over track that became an instant sensation across the subcontinent.",
    characters: [
      { name: "Oggy (Voice of Amitabh Bachchan)", role: "Blue Lazy Cat Seeking Peace & TV Time" },
      { name: "Jack (Voice of Sunny Deol)", role: "Green Muscular Cousin with Short Temper" },
      { name: "Joey, Marky & Dee Dee", role: "Mischievous Cockroach Trio & Fridge Raiders" },
      { name: "Bob / Moti (Voice of Nana Patekar)", role: "Formidable Neighboring Pitbull" },
      { name: "Narrator (Voice of Shah Rukh Khan)", role: "Dramatic Comic Monologue Commentator" }
    ],
    gadgets: [
      "Massive Fly Swatters",
      "Dynamite & Firecracker Traps",
      "Giant Refrigerator Stashes",
      "Jack's Monster Trucks & Gadgets"
    ],
    hindiDubFolklore: "Voice artist Saurav Chakraborty accomplished what many consider a miracle of voice acting: single-handedly voicing Oggy (as Amitabh Bachchan), Jack (as Sunny Deol), Bob (as Nana Patekar), and narrator (as Shah Rukh Khan). His one-liners and dialogue delivery defined mid-2000s slang.",
    catchphrases: [
      "Haye main mar gaya! Meri pyaari fridge khali ho gayi!",
      "Dhai kilo ka haath padega to jhingur gayab ho jayenge!",
      "Accha hai! Bahut accha hai!",
      "Ae jhinguron! Tumhara khel ab khatam!"
    ],
    playgroundImprint: "Practicing the Sunny Deol 'Dhai Kilo Ka Haath' and Amitabh Bachchan baritone mimicry in between school classes, watching marathon episodes during summer holidays with cousins.",
    tracks: [
      {
        id: "oggy-1",
        title: "Oggy & The Cockroaches Anthem",
        subtitle: "Iconic Hindi Mimicry Soundtrack",
        audio: "Audio/Oggy/Oggy1.mp3"
      }
    ]
  },
  {
    id: "tomjerry",
    name: "Tom & Jerry",
    hindiTitle: "टॉम एंड जेरी: कैट और माउस का अमर संगीत",
    tagline: "The Timeless Symphonic Slapstick",
    channel: "Cartoon Network",
    channelCode: "CH-08",
    networkKey: "cn",
    frequency: "216.25 MHz",
    slot: "18:30 IST (Sunset Classic Hour)",
    era: "1995–Present (Cartoon Network South Asia)",
    image: "Images/Tom&Jerry.jpg",
    accentColor: "var(--color-channel-cn)",
    quote: "The timeless symphonic cat-and-mouse chase that entertained three generations.",
    synopsis: "Created by William Hanna and Joseph Barbera with breathtaking orchestrations by Scott Bradley, Tom & Jerry transcended language and geography. Every chase, frying pan crash, and piano recital was accompanied by a full classical orchestra that taught millions of Indian kids the rhythm of musical storytelling.",
    characters: [
      { name: "Tom Cat (Thomas)", role: "Persistent Blue-Grey Tuxedo Domestic Cat" },
      { name: "Jerry Mouse (Jerome)", role: "Clever, Agile Brown House Mouse" },
      { name: "Spike the Bulldog", role: "Protective Father to Tyke & Tom's Nemesis" },
      { name: "Tyke", role: "Sweet Little Pup Spike Protects Fiercely" },
      { name: "Nibbles / Tuffy", role: "Diaper-Wearing, Hungry Orphan Mouse" },
      { name: "Mammy Two Shoes", role: "Classic Housekeeper with Broom & Slippers" }
    ],
    gadgets: [
      "Cast Iron Frying Pans & Rakes",
      "Grand Concert Piano",
      "Mouse Traps & Swiss Cheese",
      "Homemade Firecracker Rockets"
    ],
    hindiDubFolklore: "On Cartoon Network India, Tom & Jerry was the cornerstone that ran across afternoon, evening, and weekend slots. Later variants with playful Hindi commentary brought an extra layer of humor to Indian living rooms.",
    catchphrases: [
      "Symphonic Piano Glissando & Cymbal Crashes",
      "Tom's Famous High-Pitched Scream: 'YAAAAA-HOO-HOO-HOO!'",
      "Jerry's Little Giggle as Tom Steps on a Rake"
    ],
    playgroundImprint: "Sitting on the floor with stainless steel plates eating hot dal-chawal while Tom chased Jerry through the living room rug, and sharing hearty laughs with grandparents.",
    tracks: [
      {
        id: "tomjerry-1",
        title: "Tom & Jerry Classic Chase Symphony",
        subtitle: "Scott Bradley Orchestral Jazz Masterpiece",
        audio: "Audio/Tom&Jerry/Tom&Jerry1.mp3"
      }
    ]
  },
  {
    id: "bheem",
    name: "Chhota Bheem",
    hindiTitle: "छोटा भीम: ढोलकपुर का लड्डू-पावर्ड हीरो",
    tagline: "Homegrown Dholakpur Blockbuster",
    channel: "Pogo TV",
    channelCode: "CH-06",
    networkKey: "pogo",
    frequency: "200.25 MHz",
    slot: "19:00 IST (Prime Family Dholakpur Slot)",
    era: "2008–Present (Pogo TV Renaissance)",
    image: "Images/Bheem.jpg",
    accentColor: "var(--color-channel-pogo)",
    quote: "Dholakpur ka ladoo-powered superhero!",
    synopsis: "Created by Rajiv Chilaka and Green Gold Animation, Chhota Bheem became India's first indigenous modern animation phenomenon. Set in the mythical kingdom of Dholakpur, Bheem and his trusted circle solved problems, defended the realm from invading kings, and inspired millions of young kids.",
    characters: [
      { name: "Chhota Bheem", role: "9-Year-Old Super-Strong Hero of Dholakpur" },
      { name: "Chutki", role: "Brave, Smart Friend & Daughter of Tuntun Mausi" },
      { name: "Raju", role: "Fearless 4-Year-Old Archer with Blue Dhoti" },
      { name: "Jaggu", role: "Talking Monkey with Acrobatic Fruit Tricks" },
      { name: "Kalia Pahelwan", role: "Boastful Neighborhood Rival with Twin Sidekicks" },
      { name: "Dholu & Bholu", role: "Mischievous Twin Flunkies to Kalia" },
      { name: "King Indraverma & Indumati", role: "Rulers of Peaceful Dholakpur" },
      { name: "Tuntun Mausi", role: "Legendary Maker of Magic Energy Laddoos" }
    ],
    gadgets: [
      "Tuntun Mausi's Fresh Motichoor Laddoos",
      "Raju's Bow and Arrow",
      "Dholakpur Golden Shield",
      "Bullock Carts & Forest Treehouses"
    ],
    hindiDubFolklore: "The title track — 'Bheem Bheem Bheem, Chhota Bheem Chhota Bheem!' — composed by Sunil Kaushik was an unstoppable sensation that every Indian child knew by heart. It marked the moment domestic Indian storytelling took center stage.",
    catchphrases: [
      "Jab tak Tuntun Mausi ke laddu hain, Bheem ko koi nahi hara sakta!",
      "Bheem Bheem Bheem, Chhota Bheem!",
      "Kalia pahelwan ki jai ho!",
      "Chutki, laddu lao!"
    ],
    playgroundImprint: "Eating motichoor and besan laddoos at festivals pretending they gave superhuman strength, wearing yellow dhotis on school cultural days, and collecting Chhota Bheem water bottles and pencil boxes.",
    tracks: [
      {
        id: "bheem-1",
        title: "Chhota Bheem Title Song",
        subtitle: "Original Pogo TV Dholakpur Theme",
        audio: "Audio/Bheem/Bheem1.mp3"
      }
    ]
  }
];

// Freeze to prevent accidental external mutations
if (typeof Object.freeze === 'function') {
  Object.freeze(masterCartoonsData);
  masterCartoonsData.forEach(c => {
    Object.freeze(c);
    if (c.characters) Object.freeze(c.characters);
    if (c.gadgets) Object.freeze(c.gadgets);
    if (c.catchphrases) Object.freeze(c.catchphrases);
    if (c.tracks) Object.freeze(c.tracks);
  });
}
