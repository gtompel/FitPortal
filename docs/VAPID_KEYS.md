# VAPID Keys for Push Notifications

To enable push notifications in your PWA, you need to add the following environment variables to your `.env.local` file:

```txt
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BOOkXXCLnvb-4QPd3-oZHT5aNR69Lm8WktLcUXAscRwu0veKCpzhZi6dGfJK01uL2dZqLg_nCGLwVk7NKhCfpNg
VAPID_PRIVATE_KEY=vqmKb_njkhMeRTR0ntO9iTSfgKN-9Q5LmtUsej4A8Vk
```

Replace these keys with your own generated keys using:

```bash
npx web-push generate-vapid-keys
```

These keys are required for the web push functionality to work properly
