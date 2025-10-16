"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_CREDENTIALS } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("authToken", ADMIN_CREDENTIALS.token);
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl w-96 space-y-6 shadow-xl border border-gray-200"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border-gray-300"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border-gray-300"
            />
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
