import { loadImagePreviews } from "../lib/loadImages";

export const ALBUMS = {
  sanctum: {
    alts: [],
    background: "hsl(48, 15%, 13%)",
    count: 31,
    name: "I Bid You Ladew",
  },
  shelter: {
    alts: [],
    background: "hsl(354, 22%, 17%)",
    count: 18,
    name: "Shelter",
  },
  things_to_know: {
    alts: [
      `A flagpole with an illegible stone plaque sits in the center of the photo, the base of which is surrounded by grass atop which lies a path made of bricks, some of which are inscribed with text, as a windowless, ornate building sits in the background bearing the insignia of the Freemasons and the text "MT. ARARAT LODGE NO. 44" and "A.F. & A.M.".`,
      "An SUV sits at an intersection of a twisting, tree-lined street in front of a large, brutalist, brick parking building.",
      "An old building with Roman-esque columns and a crooked, narrow chimney stands on the side of an empty road.",
      `A bright turquoise staircase with a railing ascends along an ivy-encrusted brick wall adorned with an encased fluorescent light above a white and red sign reading "AUTHORIZED PARKING PATRONS ONLY NO TRESPASSING / Violators subject to arrest".`,
      "The view from atop a brick-arched stairwell reveals a street laced with trees, manicured lawns, telephone poles, and quaint building roofs.",
      "An old building with Roman-esque columns and a broken chain insignia at the top features a trash can on the veranda, a railed, exterior staircase on the right of the building, and a dark, shadowy door with a desire path leading to it in the bottom center.",
      "An alleyway with a parked car, scuffed road paint over a crosswalk, stacks of boxes on dirty concrete rests beneath brick buildings with chipped and stained paint.",
      "A parking lot under a hazy dusk features three white arrows directing traffic, rows of parked cars on both sides, and a painted mural of an eagle against a blue sky with illegible text inscribed in the corner.",
      `Three brick arches guard the entrance to a small plaza with trees drooping overhead, a couple lampposts, and a benched table, all of which is between "ONE WAY" and "NO PARKING ANY TIME" signs.`,
      "A two-story storefront building with an empty parking lot is partially masked by a tree.",
      "Across the street from the perspective of the viewer and between two green-leafed trees sits a daunting, four-story brick complex with a car parked askew out front and parking cones laid out around the entrance.",
      `Behind a couple empty parking spaces reserved for those with disabilities sits a parked police car in the lawn next to a residential-resembling building with signs on it reading "BAIL BONDS STATEWIDE 24 HOURS" and "HOWARD GREENBERG Attorney At Law, LLC".`,
      "Concrete parking barriers sit at the edge of an empty parking lot with trees and buildings loosely visible in the background, and a bit of grass and weeds creeps out from the parking barrier in the foreground.",
      "A cubed, tinted glass building stands next to an empty parking lot and street with one truck visible in the distance.",
      "A residential street leads to trees in the distance, as a couple cars are parked on either side of it, and a few buildings are visible next to clear lawns.",
    ],
    background: "hsl(240, 24%, 14%)",
    count: 15,
    name: "TOP THINGS TO KNOW BEFORE YOU MOVE TO BEL AIR",
  },
};

loadImagePreviews(
  4,
  "ttk-images",
  "photos/things_to_know",
  ALBUMS.things_to_know.count,
);
loadImagePreviews(4, "sanctum-images", "photos/sanctum", ALBUMS.sanctum.count);
loadImagePreviews(4, "shelter-images", "photos/shelter", ALBUMS.shelter.count);
