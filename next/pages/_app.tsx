import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { init } from "commandbar";

if (typeof window !== "undefined") {
  init("5ba0a816");
}

function MyApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  const [commandBarReady, setCommandBarReady] = useState(false);

  useEffect(() => {
    window.CommandBar.boot("me").then(() => {
      setCommandBarReady(true);
    });

    return window.CommandBar.shutdown();
  }, []);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addCommand({
        name: "Home",
        text: "Home",
        category: "Navigation",
        template: { type: "link", value: "/", operation: "router" },
      });
      window.CommandBar.addCommand({
        name: "Fop",
        text: "Fop",
        category: "Navigation",
        template: { type: "link", value: "/fop", operation: "router" },
      });
    }
  }, [commandBarReady]);

  useEffect(() => {
    if (commandBarReady) {
      window.CommandBar.addRouter(push);
    }
  }, [push, commandBarReady]);

  return <Component {...pageProps} />;
}

export default MyApp;
