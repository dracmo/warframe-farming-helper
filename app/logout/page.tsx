"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const session = useSession(); // Vérifie si l'utilisateur est connecté
  if (!session) {
    window.location.href = "/"; // Redirige l'utilisateur connecté vers la page d'accueil
  }
  const handleSignout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Hi</CardTitle>
          <CardDescription className="text-center">
            Are you sure you want to log out?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col w-full">
          <div className="mx-auto">
            <Button variant={"outline"} onClick={handleSignout}>
              Sign-out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
