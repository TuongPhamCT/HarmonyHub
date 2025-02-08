
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export const getToday = () => {
  const today = new Date(); // Lấy ngày và giờ hiện tại

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  // Trả về định dạng YYYY-M-D HH:mm:ss
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}

export const createDateTime = (day, month, year) => {
  return `${year}-${month}-${day} 00:00:00`;
}

export const getPreviousDate = (n, dateString) => {
  const date = dateString ? new Date(dateString) : new Date(); // Nếu không truyền, lấy ngày hôm nay
  date.setDate(date.getDate() - n);  // Lùi lại n ngày

  // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Trả về định dạng YYYY-M-D HH:mm:ss
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}