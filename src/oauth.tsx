import { showToast, Toast } from "@raycast/api";
import { getPreferenceValues } from "@raycast/api";
import { OAuth } from "@raycast/api";
import fetch from "node-fetch";

interface Preferences {
  clientId: string;
}

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "TimeCrowd",
  providerIcon: "https://timecrowd.net/favicon.ico",
  description: "Connect your TimeCrowd account",
});

const preferences = getPreferenceValues<Preferences>();
const clientId = preferences.clientId;

export async function authorize(): Promise<void> {
  const authRequest = await client.authorizationRequest({
    endpoint:
      "https://oauth.raycast.com/v1/authorize/EKfnyAISK_t0aniuTwXvwubTn3WZf400l28JCvSkP9M9m5LkL8EYsSUFAjOLsNZ3eUb0vxX3IRrXQQHsUvQy59Gx7FSUgwiuUm4MeBa46zuBlCsqb46v-MBOXpZeGpXovRudvVnDnvwVXM1Z31c",
    clientId: clientId,
    scope: "read write",
  });
  const { authorizationCode } = await client.authorize(authRequest);

  await client.setTokens(await fetchTokens(authRequest, authorizationCode));
}

async function fetchTokens(authRequest: OAuth.AuthorizationRequest, authCode: string): Promise<OAuth.TokenResponse> {
  const body = JSON.stringify({
    client_id: clientId,
    code: authCode,
    code_verifier: authRequest.codeVerifier,
    grant_type: "authorization_code",
    redirect_uri: authRequest.redirectURI,
  });
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(
    "https://oauth.raycast.com/v1/token/gh_y5j3SbNHNvmM69PHRruokaeCgPG1Paa2G8Awd_0Lw6FVTY0A20q_7DNYkjQ7V1ffznu12GMXRqTHOhSJBIaj0uzuBD_OhZpZ9rS1k3ML3rqzFb_VgAhTrIxgD_v7QVI1OUxmEtAPzCA",
    { method: "POST", headers, body },
  );
  if (!response.ok) {
    console.error("fetch tokens error:", await response.text());
    throw new Error(response.statusText);
  }
  return (await response.json()) as OAuth.TokenResponse;
}

export default async function Command() {
  await authorize();
  showToast(Toast.Style.Success, "Successfully connected to TimeCrowd");
}
