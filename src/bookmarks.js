const BOOKMARKS_LOCALSTORAGE_KEY = "bookmarks";

export function getBookmarks() {
  const bookmarkedStorage = localStorage.getItem(BOOKMARKS_LOCALSTORAGE_KEY);
  let bookmarkedWords = [];

  if (bookmarkedStorage) {
    try {
      bookmarkedWords = JSON.parse(bookmarkedStorage);
    } catch (e) {
      console.error(e);
    }
  }

  return bookmarkedWords;
}

export function addBookmark(word) {
  const bookmarks = getBookmarks();

  if (bookmarks.includes(word) || word.trim() === "") {
    return;
  }

  localStorage.setItem(
    BOOKMARKS_LOCALSTORAGE_KEY,
    JSON.stringify([...bookmarks, word]),
  );
}

export function isBookmarked(word) {
  const bookmarks = getBookmarks();

  return bookmarks.includes(word);
}

export function removeBookmark(word) {
  const words = getBookmarks();

  const filtered = words.filter((one) => {
    return one !== word;
  });

  localStorage.setItem(BOOKMARKS_LOCALSTORAGE_KEY, JSON.stringify(filtered));
}
