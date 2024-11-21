"use client";
import SignGoogle from "@/components/schema/signGoogle";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Login() {
  const session = useSession(); // Vérifie si l'utilisateur est connecté
  if (session) {
    window.location.href = "/"; // Redirige l'utilisateur connecté vers la page d'accueil
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Log in to access your account and save your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col w-full">
          <div className="mx-auto">
            <SignGoogle />
          </div>
        </CardContent>
        {/* <CardFooter className="text-center text-sm text-muted-foreground">
          En vous connectant, vous acceptez nos{" "}
          <a href="#" className="underline text-primary">
            conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="#" className="underline text-primary">
            politique de confidentialité
          </a>
          .
        </CardFooter> */}
      </Card>
    </div>
  );
}
