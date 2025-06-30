import { apiClient } from "./api-client";
import { LDContext } from "launchdarkly-react-client-sdk";

export default async function getUserContext() {
    const response = await apiClient.getRandomUser()
    return response.data as LDContext
}