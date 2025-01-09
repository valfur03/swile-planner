"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const TokenForm = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const saveToken = () => {
    localStorage.setItem("swileToken", token);
    router.push("/graph");
  };

  return (
    <div className="flex gap-4 flex-col items-start">
      <Input
        type="text"
        name="token"
        placeholder="token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <Button onClick={saveToken}>Sauvegarder</Button>
    </div>
  );
};
