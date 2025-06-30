import { GraphQLClient } from "graphql-request";
import useAuthStore from "./store/authStore";
import { isTokenExpired } from "./helper";

const { token, refreshToken } = useAuthStore.getState();

const validToken = !isTokenExpired(token) ? token : refreshToken;

const graphqlClient = () => new GraphQLClient(
    process.env.NEXT_PUBLIC_API_BASE_URL_GRAPHQL as string,
    {
        headers: () => ({
            Authorization: `Bearer ${validToken}`
        })
    }
)

export default graphqlClient;