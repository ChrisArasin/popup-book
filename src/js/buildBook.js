import Book from './Book';
import Spread from './Spread';
import makeHeroSpread from './makeHeroSpread';

export default function buildBook() {
  // make empty cover spreads
  const frontCover = new Spread(true, false);
  const backCover = new Spread(false, true);

  // make hero spread adds popups to spread pages
  const supermanSpread = makeHeroSpread('superman');
  const batmanSpread = makeHeroSpread('batman');

  const book = new Book('book');
  book.addSpread(frontCover)
      .addSpread(supermanSpread)
      .addSpread(batmanSpread)
      .addSpread(backCover)
      .update();
  return book;
}
