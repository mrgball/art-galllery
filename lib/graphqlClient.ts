import { GraphQLClient } from "graphql-request";
import useAuthStore from "./store/authStore";
import { isTokenExpired } from "./helper";
import { url } from "inspector";

const { token, refreshToken } = useAuthStore.getState();

const validToken = !isTokenExpired(token) ? token : refreshToken;

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_X_API_KEY;

export const graphqlClient = () => new GraphQLClient(
    `${baseUrl}/graphql`,
    {
        headers: () => ({
            Authorization: `Bearer ${validToken}`,
            "x-api-key": apiKey || "",
        })
    }
)
