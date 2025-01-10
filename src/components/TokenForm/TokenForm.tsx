"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/contexts/session/hook";

export const TokenForm = () => {
  const { setToken } = useSession();
  const [tokenField, setTokenField] = useState("");
  const router = useRouter();

  const saveToken = () => {
    setToken(tokenField);
    router.push("/graph");
  };

  return (
    <div className="flex gap-4 flex-col items-start">
      <Input
        type="text"
        name="token"
        placeholder="token"
        value={tokenField}
        onChange={(e) => setTokenField(e.target.value)}
      />
      <Button onClick={saveToken}>Sauvegarder</Button>
    </div>
  );
};
