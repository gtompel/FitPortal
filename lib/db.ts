import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient({
  log: ['query'],
  errorFormat: 'pretty',
  // Включаем кэширование
  __internal: {
    engine: {
      enableQueryCache: true,
      queryCacheSize: 1000
    }
  }
})

if (process.env.NODE_ENV !== "production") globalThis.prisma = db 