export const checkSearchResult = (searchQuery, itemName) => {
  return itemName.toLowerCase().includes(searchQuery.toLowerCase());
}