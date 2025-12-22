# Testing PWA Functionality

## Prerequisites

1. Ensure you have added the VAPID keys to your `.env.local` file as described in `VAPID_KEYS.md`
2. Make sure all the code changes have been implemented

## Local Testing Steps

### 1. Start the Development Server with HTTPS

Run the following command to start the development server with HTTPS support:

```bash
next dev --experimental-https
```

### 2. Access the Application

Open your browser and navigate to `https://localhost:3000`

### 3. Test PWA Features

#### Web App Manifest

1. Open Chrome DevTools
2. Go to Application tab
3. Check that the manifest is properly loaded
4. Verify that all manifest properties are correct

#### Service Worker

1. In Chrome DevTools Application tab, check that the service worker is registered
2. Verify that it's activated and running

#### Push Notifications

1. Scroll down to the "Push Notifications" section on the homepage
2. You should see options to subscribe to push notifications
3. Click "Subscribe" to register for push notifications
4. Enter a test message and click "Send Test"
5. You should receive a push notification in your browser

#### Add to Home Screen

1. On mobile devices, you should see an "Add to Home Screen" option
2. On iOS, follow the instructions to add the app to your home screen
3. On Android, you should see an install prompt

### 4. Offline Testing

1. In Chrome DevTools Network tab, enable "Offline" mode
2. Refresh the page to test offline functionality
3. The app should still load and display cached content

## Production Testing

1. Build the application:

   ```bash
   next build
   ```

2. Start the production server:

   ```bash
   next start
   ```

3. Test all PWA features in production mode

## Troubleshooting

1. If push notifications don't work, check that:
   - VAPID keys are correctly set in environment variables
   - The service worker is properly registered
   - Browser permissions for notifications are granted

2. If the app doesn't install as a PWA:
   - Check that all required manifest properties are present
   - Ensure the site is served over HTTPS
   - Verify that the service worker is registered correctly

3. If offline functionality doesn't work:
   - Check the service worker caching strategies in `next.config.mjs`
   - Verify that all required assets are being cached
