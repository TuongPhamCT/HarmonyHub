import axios from "../../config/axios.js"

export class UserService {
    static setUserImage = async ({
         image,
     }) => {
         try {
             // Tạo FormData để gửi dữ liệu dạng multipart/form-data
             const formData = new FormData();       
             if (image) formData.append("image", image); // Gửi file ảnh
             const { data } = await axios.post('/user/image', formData, {
                 headers: {
                     "Content-Type": "multipart/form-data", // Bắt buộc khi gửi file
                 }
             })
             return data
         } catch (error) {
             console.log(error)
         }
     }
}