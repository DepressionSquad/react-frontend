import { post } from "../fetchJSON";
import { User, UserLogin } from "../../components/types";
import routes from "./routes";

export type AuthServiceTypes = {
  login: {
    request: UserLogin;
    response: User;
  };
};

export const AuthService = {
  login: async (
    request: AuthServiceTypes["login"]["request"],
  ): Promise<AuthServiceTypes["login"]["response"]> => {
    // TODO: Remove commenting/remove mock data when BE is ready
    // return await post(routes.auth.login, request);
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const success = Math.random() < 0.5;
        console.log("success", success);
        if (success)
          resolve({
            id: "0",
            email: "temp@temp.com",
            firstName: "User",
            lastName: "Name",
            dateOfBirth: new Date(),
            role: "USER",
          });
        else reject("An error occured");
      }, 1000),
    );
  },
};

export default AuthService;
