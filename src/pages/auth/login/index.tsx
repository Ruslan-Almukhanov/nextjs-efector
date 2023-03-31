import Link from "next/link";
import PocketBase, { AuthProviderInfo } from "pocketbase";
import { useEffect, useState } from "react";

const pb = new PocketBase("http://127.0.0.1:8090");
const redirectUrl = "http://localhost:3000/auth/redirect";

const LoginPage = () => {
  const [authProviders, setAuthProviders] = useState<AuthProviderInfo[]>([]);

  async function loadLinks() {
    const authMethods = await pb
      .collection("users")
      .listAuthMethods({ $autoCancel: false });

    setAuthProviders(authMethods.authProviders);
  }

  function handleProviderClick(provider: AuthProviderInfo) {
    localStorage.setItem("provider", JSON.stringify(provider));
    console.log("handleProviderClick", authProviders);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div>
      {authProviders.length ? (
        authProviders.map((authProvider: AuthProviderInfo) => (
          <li
            key={authProvider.state}
            onClick={() => handleProviderClick(authProvider)}
          >
            <Link href={authProvider.authUrl + redirectUrl}>
              {authProvider.name}
            </Link>
          </li>
        ))
      ) : (
        <li>No providers</li>
      )}
    </div>
  );
};

export default LoginPage;
