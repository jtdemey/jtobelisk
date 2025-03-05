import { ALBUMS } from "./albums";
import { loadImagePreviews } from "../lib/loadImages";

loadImagePreviews(
  4,
  "ttk-images",
  "photos/things_to_know",
  ALBUMS.things_to_know.count,
);
loadImagePreviews(4, "sanctum-images", "photos/sanctum", ALBUMS.sanctum.count);
loadImagePreviews(4, "shelter-images", "photos/shelter", ALBUMS.shelter.count);
