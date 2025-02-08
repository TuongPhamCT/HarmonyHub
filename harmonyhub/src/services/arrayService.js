export const getRandomItemInArray = (array) => {
    if (array.length === 0) return null; // Tránh lỗi khi mảng rỗng
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};