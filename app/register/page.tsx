"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при регистрации")
      }

      toast.success("Регистрация успешна")
      router.push("/login")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка при регистрации")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center px-2 sm:px-4">
      <div className="mx-auto flex w-full flex-col justify-center gap-4 sm:w-[350px]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold tracking-tight" style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',lineHeight:'1.2'}}>
            Регистрация
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">Создайте новый аккаунт</p>
        </div>
        <Alert variant="destructive" className="text-xs md:text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Автозаполнение не допускается при регистрации</AlertDescription>
        </Alert>
        <form onSubmit={onSubmit} className="gap-4 flex flex-col">
          <Input
            id="name"
            name="name"
            placeholder="Имя"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            disabled={isLoading}
            required
            className="w-full min-h-[44px] text-base"
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            required
            className="w-full min-h-[44px] text-base"
          />
          <Input
            id="password"
            name="password"
            placeholder="Пароль"
            type="password"
            autoComplete="off"
            disabled={isLoading}
            required
            className="w-full min-h-[44px] text-base"
          />
          <Button className="w-full min-h-[44px] mt-2" type="submit" disabled={isLoading}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>
        <p className="px-2 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Уже есть аккаунт? Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
