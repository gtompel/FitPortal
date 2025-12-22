# Реализация PWA в FitPortal

## Проверка требований PWA

### 1. HTTPS

- Включён через `--experimental-https` в Next.js

### 2. Web App Manifest

- Расположен в `public/manifest.json`
- Содержит необходимые поля:
  - `name`: "FitPortal - Ваш персональный фитнес-портал"
  - `short_name`: "FitPortal"
  - `start_url`: "/"
  - `display`: "standalone"
  - `background_color`: "#ffffff"
  - `theme_color`: "#000000"
  - `description`: "Персональный фитнес-портал для достижения ваших целей"
  - `icons`:
    - 192x192: `/android-chrome-192x192.png`
    - 512x512: `/android-chrome-512x512.png`

### 3. Service Worker

- Зарегистрирован в `app/layout.tsx` как `/sw.js`
- Кастомный SW в `public/custom-sw.js` расширяет функциональность:
  - Поддержка push-уведомлений
  - Обработка fetch-запросов для offline-работы

### 4. Подключение в Next.js

- Манифест подключен в метаданных: `manifest: "/manifest.json"`
- Service Worker регистрируется через script в `app/layout.tsx`

## Дополнительные компоненты

### InstallPWAButton

- Компонент для отображения кнопки установки PWA
- Расположен в `app/components/InstallPWAButton.tsx`
- Использует `beforeinstallprompt` событие для показа кнопки установки

## Проверка работоспособности

1. Открыть `https://localhost:3000`
2. DevTools → Application → Manifest
   - Убедиться, что манифест загружен без ошибок
   - Проверить наличие иконок
3. DevTools → Application → Service Workers
   - Убедиться, что SW зарегистрирован и активен
4. Проверить установку:
   - На Android: кнопка установки в адресной строке
   - На iOS: "Поделиться → Добавить на главный экран"
   - На десктопе: меню браузера → "Установить FitPortal"

## Обновления

Последнее обновление: 22.12.2025
