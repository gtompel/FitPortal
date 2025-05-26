"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { ArrowLeft, Github } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        toast.error("Неверный email или пароль")
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при входе")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGithubLogin() {
    try {
      await signIn("github", {
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      toast.error("Произошла ошибка при входе через GitHub")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Вход в систему</h1>
          <p className="text-sm text-muted-foreground">
            Введите свои данные для входа в систему
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              name="password"
              placeholder="Пароль"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Или продолжить с
            </span>
          </div>
        </div>

        <Button variant="outline" type="button" onClick={handleGithubLogin}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Нет аккаунта? Зарегистрируйтесь
          </Link>
        </p>
      </div>
    </div>
  )
}
