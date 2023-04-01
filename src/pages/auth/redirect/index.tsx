import { useRouter } from "next/router";
import PocketBase, { AuthProviderInfo } from "pocketbase";
import { useEffect, useState } from "react";

const pb = new PocketBase("http://127.0.0.1:8090");
const redirectUrl = "http://localhost:3000/auth/redirect";

interface IPageQuery {
  state: string;
  code: string;
  scope: string;
  authuser: string;
  hd: string;
  prompt: string;
}

const RedirectPage = ({ query }: any) => {
  const [status, setStatus] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const query: any = router.query;
    function authWithOAuth(provider: AuthProviderInfo) {
      console.log({ provider, query, router });
      const authData = pb
        .collection("users")
        .authWithOAuth2(
          provider.name,
          query.code,
          provider.codeVerifier,
          redirectUrl,
          {},
          {},
          { $autoCancel: false }
        )
        .then((authData: any) => {
          authData ? setStatus("Success") : setStatus("Failed");
        })
        .catch((err) => {
          setStatus("error");
        });
    }
    let provider: any = JSON.parse(localStorage.getItem("provider") as any);
    if (!provider) return;
    if (provider?.state !== query?.state) {
      throw "State parameters don't match.";
    }

    authWithOAuth(provider);
  }, [router.isReady, router]);

  return <div>Status {status}</div>;
};

export default RedirectPage;
