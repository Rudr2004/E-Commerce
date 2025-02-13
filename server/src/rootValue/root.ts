import User from "../User/UserModel";

export const root = {
    users: async () => {
        return await User.find();
    },
    
    addUser: async ({ details }) => {
        try {
            const newUser = await User.create(details);
            console.log("Created user:", newUser);

            if (!newUser) {
                throw new Error("User creation failed");
            }

            return newUser;
        } catch (error) {
            console.error("Error in addUser:", error);
            throw new Error("Internal Server Error");
        }
    },
};
