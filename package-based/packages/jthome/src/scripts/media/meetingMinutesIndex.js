import { loadImages } from "../lib/loadImages";

const MAX_IMAGES = 14;

const ALT_DESCRIPTIONS = [
  "A mechanical bird attached to an odd apparatus stares at an orb in a desert.",
  "A small figure of a diver with a long cord attached to their helmet clutches a flashlight which reveals a large, reptilian eyeball partially obscured by a mass of concealed tentacles and creatures.",
  "Thin rods with frayed and cut wires wrapped around them are either cut off or bear features of a human face, loosely reconstructing a face of disparate organs.",
  "A spectral figure with long arms and fingers and a tattered cloak with visible, translucent gaps drifts along an icy lake next to sparse, leafless trees under a starry winter night as a small human figure gazes at the scene from a distance in the background.",
  `The words "Habit and Habitat" are written in stylized lettering against an undetailed cliff face under a sun, with the words "Habit and" being written in a curvy, tapered font and the word "Habitat" being written to resemble city buildings, some of which puff clouds of smoke.`,
  `A human figure that has a television displaying video noise instead of a head sits on a bench placed on the sidewalk outside of a closed storefront on a city street as shadowy, slender figures pass by or gaze from an upper-floor window and three birds watch from above.`,
  "A bald, human head with empty eyes rests suspended in liquid inside of the chest of a large diving suit, the head of which is latticed with metal bars, the hand of which grasps a small skull, and whose body is submerged in a body of water rife with aquatic vines, two eels, and a jellyfish.",
  `The character "Hornet" from the game "Hollow Knight" wisps through the air towards the perspective of the viewer with loose details of a viny cave bearing a river behind her.`,
  `Various devices related to keeping time drift aimlessly in space with a planet and moon partially visible in the corner, with lowercase text reading an excerpt of lyrics from the song "I Was a Teenage Hand Model" by Queens of the Stone Age spattered across the stars: "these cities are sprouting / like a spit in the eye. / this world isn't waiting / it's just passing you by."`,
  "Loose, partial, abstract figures sit in front of the background of a glacier in a calm sea with a sixteenth-note sticking out of the top under a starry sky featuring a small flock of birds, a whole rest, and a half rest incorporated into the horizontal lines of the notebook paper: one loosely constructs the right side of a person's face, an eagle, a bass clef, and a treble clef that holds a vertical fishing line whose hook holds a worm that entices a large squid in the foreground, and the other is a winding funnel with a piano pattern descending from the top.",
  `A human figure with unkempt hair and a tattered cloak casts a large, monstrous shadow against a columned wall that bears scrawled text reading "I WILL SHOW YOU FEAR IN A HANDFUL OF DUST" as they pray towards an altar under a stained-glass window resembling a cloaked figure.`,
  "A wooden road with broken supports, a flag, a barren flagpole, and battered rope handrails hovers far above a churning sea with a large, cumulus cloud in the background with a small flock of birds in front of it.",
  `The profile silhouette of a brain attached to wires that conglomerate into an unplugged cord bears the text "This humanist whom no belief constained grew so open-minded he was scatter-brained".`,
  "A decrepit shack with a shoddy door and broken planks boarding its one window sits atop the snowy ground which bears the stump of a tree and a focal indent in the snow next to footprints that trod toward the shed door.",
  "A human figure with an octopus for a head dons a nice suit and sits in a chair."
];

let imagesLoaded = 0;

const init = async () => {
  imagesLoaded = await loadImages(
    8,
    "images",
    imagesLoaded,
    "meeting_minutes",
    MAX_IMAGES,
    ALT_DESCRIPTIONS,
  );
};

const mountBtnListener = () => {
  const loadImageBtn = document.getElementById("load-images-btn");
  if (!loadImageBtn) return;
  loadImageBtn.addEventListener("click", async () => {
    imagesLoaded = await loadImages(
      4,
      "images",
      imagesLoaded,
      "meeting_minutes",
      MAX_IMAGES,
      ALT_DESCRIPTIONS,
    );
  });
};

init();
mountBtnListener();
