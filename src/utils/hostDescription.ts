import type { HostTraits } from "../data/hostTraits";
import { getArticle } from "./textUtilities";

export const generateHostDescription = (traits: HostTraits): string => {
  let faceDescription = '';

  if (traits.selectedFacePart === 1) {
    faceDescription = traits.eyes + ' eyes.'
  } else if (traits.selectedFacePart === 2) {
    faceDescription = getArticle(traits.mouth) + ' ' + traits.mouth + ' mouth.'
  } else {
    faceDescription = getArticle(traits.nose) + ' ' + traits.nose + ' nose.'
  }

  return 'Your host is ' + getArticle(traits.physique) + ' ' + traits.physique
    + ' human. They have ' + traits.hair + ' ' + traits.hairColor
    + ' hair and ' + getArticle(traits.face) + ' ' + traits.face + ' face with '
    + faceDescription;
};