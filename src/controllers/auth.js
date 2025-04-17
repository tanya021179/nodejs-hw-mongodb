
import { loginUser, registerUser } from "../services/auth.js";

export const registerController = async (require, response) => {
    const user = await registerUser(require.body);

    response.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    });
};

export const loginController = async (require, response) => {
    const session = await loginUser(require.body);

    response.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    response.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    response.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    });
}