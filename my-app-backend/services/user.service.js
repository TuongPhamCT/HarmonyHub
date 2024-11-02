const { getInfoData } = require("../helpers");
const User = require("../models/user.model")

class UserAccessService {
    static login = async ({ email, password }) => {
        const foundUser = await User.findOne({
            where: {
                email: email
            },
        });
        if (!foundUser) {
            throw new Error("User account not found");
        }
        const match = password === foundUser.password ? true : false;
        if (!match) {
            throw new Error("Invalid password");
        }
        return {
            user: getInfoData({
                fields: ["email"],
                object: foundUser,
            })
        };
    };
}

module.exports = { UserAccessService };