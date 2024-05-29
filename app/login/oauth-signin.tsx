"use client";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
// Importa el icono de Google si lo tienes. Puedes usar cualquier icono que prefieras.
// Por ejemplo, si usas react-icons:
import { FcGoogle } from "react-icons/fc"; // Este es solo un ejemplo, asegúrate de tenerlo instalado y configurado.

import { oAuthSignIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "google",
      displayName: "Google",
      icon: <FcGoogle className="size-5" />, // Usa el icono que prefieras
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name} // Añadir una key para evitar advertencias de React
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}