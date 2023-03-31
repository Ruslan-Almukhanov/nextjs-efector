export type IProviderNames = "google";
export type ICodeChallengeMethod = "S256";
export type IAuthProvider = {
  name: IProviderNames;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: ICodeChallengeMethod;
  authUrl: string;
};

export interface IAuthMethods {
  authMethods: {
    usernamePassword: boolean;
    emailPassword: boolean;
    authProviders: IAuthProvider[];
  };
}
