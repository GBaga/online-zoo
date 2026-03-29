const fs = require("fs");
const path = require("path");

const enPath = path.join(__dirname, "..", "public", "locales", "en.json");
const frPath = path.join(__dirname, "..", "public", "locales", "fr.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const frJson = JSON.parse(fs.readFileSync(frPath, "utf8"));

const cameras = [
  {
    id: 1,
    text: "Watch live from China's Panda Center",
    fr: "Regardez en direct depuis le Centre des Pandas en Chine",
  },
  {
    id: 2,
    text: "Watch The Bald Eagles Nest from West End cam",
    fr: "Regardez le Nid des Pygargues à têtes blanches depuis la caméra West End",
  },
  {
    id: 3,
    text: "Livestream from Gorilla Forest Corridor habitat cam",
    fr: "En direct depuis la caméra de l'habitat du Couloir Forestier des Gorilles",
  },
  {
    id: 4,
    text: "The ring-tailed lemurs play in Madagascar, Lemuria Land",
    fr: "Les lémuriens catta jouent à Madagascar, Lemuria Land",
  },
  {
    id: 5,
    text: "Watch Mike the Chinese Alligator in his protected habitat",
    fr: "Regardez Mike l'Alligator chinois dans son habitat protégé",
  },
  {
    id: 6,
    text: "Watch Liz the Australian Koala in the elevated walkways",
    fr: "Regardez Liz le Koala australien dans les allées surélevées",
  },
  {
    id: 7,
    text: "Livestream of Shake the African Lion roaming the savanna",
    fr: "En direct de Shake le Lion africain errant dans la savane",
  },
  {
    id: 8,
    text: "Watch Senja the Sumatran Tiger from Indonesia",
    fr: "Regardez Senja le Tigre de Sumatra d'Indonésie",
  },
  {
    id: 9,
    text: "Watch Bella the Red Panda in the Himalayan habitat",
    fr: "Regardez Bella le Panda Roux dans l'habitat himalayen",
  },
  {
    id: 10,
    text: "Livestream of Rocky the Mountain Gorilla in Central Africa",
    fr: "En direct de Rocky le Gorille des Montagnes en Afrique Centrale",
  },
  {
    id: 11,
    text: "Watch Zara the African Elephant in the grasslands",
    fr: "Regardez Zara l'Éléphant d'Afrique dans les prairies",
  },
  {
    id: 12,
    text: "Watch Neptune the Sea Otter playing in the kelp forest",
    fr: "Regardez Neptune la Loutre de Mer jouer dans la forêt de varech",
  },
  {
    id: 13,
    text: "Livestream of Amber the Bengal Tiger from India",
    fr: "En direct d'Amber le Tigre du Bengale d'Inde",
  },
  {
    id: 14,
    text: "Watch Duke the Gray Wolf hunting with his pack",
    fr: "Regardez Duke le Loup Gris chasser avec sa meute",
  },
  {
    id: 15,
    text: "Watch Sunny the Fennec Fox in the Sahara Desert habitat",
    fr: "Regardez Sunny le Fennec dans l'habitat du désert du Sahara",
  },
  {
    id: 16,
    text: "Livestream of Koda the Grizzly Bear fishing for salmon",
    fr: "En direct de Koda le Grizzly pêchant le saumon",
  },
  {
    id: 17,
    text: "Watch Marina the Bottlenose Dolphin in the marine sanctuary",
    fr: "Regardez Marina le Grand Dauphin dans le sanctuaire marin",
  },
  {
    id: 18,
    text: "Watch Oscar the Snow Leopard in the mountain habitat",
    fr: "Regardez Oscar la Panthère des Neiges dans l'habitat montagnard",
  },
  {
    id: 19,
    text: "Livestream of Pearl the Polar Bear in the Arctic environment",
    fr: "En direct de Pearl l'Ours Polaire dans l'environnement arctique",
  },
  {
    id: 20,
    text: "Watch Jasper the Jaguar in the Americas rainforest",
    fr: "Regardez Jasper le Jaguar dans la forêt tropicale des Amériques",
  },
  {
    id: 21,
    text: "Watch Willow the Ring-Tailed Lemur from Madagascar",
    fr: "Regardez Willow le Lémurien Catta de Madagascar",
  },
  {
    id: 22,
    text: "Livestream of Thunder the White Rhinoceros in African savanna",
    fr: "En direct de Thunder le Rhinocéros Blanc dans la savane africaine",
  },
  {
    id: 23,
    text: "Watch Luna the Arctic Fox in the tundra landscape",
    fr: "Regardez Luna le Renard Polaire dans le paysage de la toundra",
  },
  {
    id: 24,
    text: "Watch Atlas the Saltwater Crocodile in Southeast Asia",
    fr: "Regardez Atlas le Crocodile Marin en Asie du Sud-Est",
  },
  {
    id: 25,
    text: "Livestream of Ruby the Scarlet Macaw in the rainforest",
    fr: "En direct de Ruby l'Ara Macao dans la forêt tropicale",
  },
  {
    id: 26,
    text: "Watch Titan the Komodo Dragon on the Indonesian islands",
    fr: "Regardez Titan le Dragon de Komodo sur les îles indonésiennes",
  },
  {
    id: 27,
    text: "Watch Olive the Sloth in the Central American forest",
    fr: "Regardez Olive le Paresseux dans la forêt d'Amérique Centrale",
  },
  {
    id: 28,
    text: "Livestream of Blaze the Cheetah on the African plains",
    fr: "En direct de Blaze le Guépard dans les plaines africaines",
  },
];

cameras.forEach((cam) => {
  enJson[`camera.${cam.id}`] = cam.text;
  frJson[`camera.${cam.id}`] = cam.fr;
});

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2), "utf8");
fs.writeFileSync(frPath, JSON.stringify(frJson, null, 2), "utf8");
console.log("Update complete");
