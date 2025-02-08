export const getRandomItemInArray = (array) => {
    if (array.length === 0) return null; // Tránh lỗi khi mảng rỗng
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // Chọn một chỉ số ngẫu nhiên từ 0 đến i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Hoán đổi các phần tử ở vị trí i và j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}