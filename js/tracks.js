/* ==========================================================================
   Cartoon Vaala — Centralized Cartoon Tracks & Asset Metadata Registry
   Single Source of Truth mapping Audio Tracks to Cartoon & Representative Images
   ========================================================================== */

const cartoonTracks = [
  {
    id: "doremon-1",
    title: "Doraemon Title Track",
    cartoon: "Doremon",
    displayName: "Doraemon",
    channel: "Hungama TV",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "16:00 IST",
    frequency: "184.25 MHz",
    audio: "Audio/Doremon/Doremon1.mp3",
    image: "Images/Doremon.jpg"
  },
  {
    id: "shinchan-1",
    title: "Shinchan Pagal Yeh Dil Theme",
    cartoon: "Shinchan",
    displayName: "Shinchan",
    channel: "Hungama TV",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "16:30 IST",
    frequency: "184.25 MHz",
    audio: "Audio/Shinchan/Shinchan1.mp3",
    image: "Images/Shinchan.jpg"
  },
  {
    id: "pokemon-1",
    title: "Pokémon Indigo League Theme",
    cartoon: "Pokemon",
    displayName: "Pokémon",
    channel: "Cartoon Network",
    channelCode: "CH-08",
    channelTag: "CARTOON NETWORK",
    slot: "17:00 IST",
    frequency: "216.25 MHz",
    audio: "Audio/Pokemon/Pokemon1.mp3",
    image: "Images/Pokemon.jpg"
  },
  {
    id: "ninjahathori-1",
    title: "Ninja Hattori Opening Theme",
    cartoon: "NinjaHathori",
    displayName: "Ninja Hattori",
    channel: "Hungama TV / Nick",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "17:30 IST",
    frequency: "184.25 MHz",
    audio: "Audio/NinjaHathori/NinjaHathori1.mp3",
    image: "Images/NinjaHathori.jpg"
  },
  {
    id: "oggy-1",
    title: "Oggy & The Cockroaches Anthem",
    cartoon: "Oggy",
    displayName: "Oggy and the Cockroaches",
    channel: "Cartoon Network",
    channelCode: "CH-08",
    channelTag: "CARTOON NETWORK",
    slot: "18:00 IST",
    frequency: "216.25 MHz",
    audio: "Audio/Oggy/Oggy1.mp3",
    image: "Images/Oggy.jpg"
  },
  {
    id: "tomjerry-1",
    title: "Tom & Jerry Classic Chase Symphony",
    cartoon: "Tom&Jerry",
    displayName: "Tom & Jerry",
    channel: "Cartoon Network",
    channelCode: "CH-08",
    channelTag: "CARTOON NETWORK",
    slot: "18:30 IST",
    frequency: "216.25 MHz",
    audio: "Audio/Tom&Jerry/Tom&Jerry1.mp3",
    image: "Images/Tom&Jerry.jpg"
  },
  {
    id: "bheem-1",
    title: "Chhota Bheem Title Song",
    cartoon: "Bheem",
    displayName: "Chhota Bheem",
    channel: "Pogo TV",
    channelCode: "CH-06",
    channelTag: "POGO TV",
    slot: "19:00 IST",
    frequency: "200.25 MHz",
    audio: "Audio/Bheem/Bheem1.mp3",
    image: "Images/Bheem.jpg"
  },
  {
    id: "doremon-2",
    title: "Doraemon Gadget Groove",
    cartoon: "Doremon",
    displayName: "Doraemon",
    channel: "Hungama TV",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "16:00 IST",
    frequency: "184.25 MHz",
    audio: "Audio/Doremon/Doremon2.mp3",
    image: "Images/Doremon.jpg"
  },
  {
    id: "doremon-3",
    title: "Doraemon Nostalgic Melody",
    cartoon: "Doremon",
    displayName: "Doraemon",
    channel: "Hungama TV",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "16:00 IST",
    frequency: "184.25 MHz",
    audio: "Audio/Doremon/Doremon3.mp3",
    image: "Images/Doremon.jpg"
  },
  {
    id: "shinchan-2",
    title: "Shinchan Kasukabe Fun Theme",
    cartoon: "Shinchan",
    displayName: "Shinchan",
    channel: "Hungama TV",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "16:30 IST",
    frequency: "184.25 MHz",
    audio: "Audio/Shinchan/Shinchan2.mp3",
    image: "Images/Shinchan.jpg"
  },
  {
    id: "ninjahathori-2",
    title: "Ninja Hattori Adventure Tune",
    cartoon: "NinjaHathori",
    displayName: "Ninja Hattori",
    channel: "Hungama TV / Nick",
    channelCode: "CH-04",
    channelTag: "HUNGAMA TV",
    slot: "17:30 IST",
    frequency: "184.25 MHz",
    audio: "Audio/NinjaHathori/NinjaHathori2.mp3",
    image: "Images/NinjaHathori.jpg"
  }
];

// Freeze to prevent accidental external mutations
if (typeof Object.freeze === 'function') {
  Object.freeze(cartoonTracks);
  cartoonTracks.forEach(track => Object.freeze(track));
}
