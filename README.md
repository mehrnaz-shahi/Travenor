## Travenor

A mobile travel discovery app built with **Expo**, **React Native**, and **expo-router**. Travenor showcases beautiful destinations, lets users browse location details with rich hero imagery, manage authentication flows, and includes a simple in‑app messaging experience.

---

## Features

- **Home / Discover**
  - Hero section with highlighted tagline and accent SVG underline.
  - Horizontal carousel of “Best destination” cards using `LocationCard`.
  - “Favorite Places” grid built from the same mock location data.
  - Floating chat shortcut button opening the messages section.

- **Location details**
  - Full‑bleed hero image that extends under a transparent header.
  - Destination metadata (location, rating, price per person).
  - Avatars of other travelers and an “about destination” description.
  - Persistent bottom “Book now” action button.

- **Messaging**
  - **Messages list** (`/messages`) showing recent chats using mock data:
    - Avatar with small online status dot on the bottom‑right edge.
    - User name, last message preview, timestamp, and “seen” icon.
  - **Chat screen** (`/messages/chat`) with a simple conversation layout:
    - Incoming/outgoing bubbles.
    - Keyboard‑aware text input and send button.

- **Authentication flows**
  - Screens under `/login` (sign in, sign up, tips, OTP verification, forget password) wired via a nested router layout.
  - Shared UI components: buttons, text inputs, OTP input, sign‑in form.

- **Navigation & layout**
  - App‑wide stack navigation powered by **expo-router** (`app/_layout.tsx`).
  - Nested stack for location pages (`app/location/_layout.tsx`) with a custom transparent header on the detail view.
  - Nested stack for messages (`app/messages/_layout.tsx`) with its own header.
  - Custom reusable `CustomHeader` component with dynamic left/right content and optional transparent mode.

- **Styling & UI**
  - **NativeWind / Tailwind CSS** classes via `global.css`.
  - Custom fonts configured in `app/_layout.tsx`.
  - SVG icons and avatars via `react-native-svg` and `react-native-svg-transformer`.

---

## Tech Stack

- **Runtime & Framework**
  - [Expo](https://expo.dev/) (`expo` ~54)
  - [React Native](https://reactnative.dev/) 0.81
  - [React](https://react.dev/) 19
  - [expo-router](https://expo.github.io/router/) 6 for file‑based navigation

- **UI & Styling**
  - NativeWind + Tailwind CSS (`tailwind.config.js`, `global.css`)
  - `react-native-svg` and `react-native-svg-transformer` for SVG assets

- **Navigation**
  - `expo-router` stacks and nested layouts
  - `@react-navigation/native` and `@react-navigation/bottom-tabs` (tab navigator currently scaffolded and commented in `app/index.tsx`)

- **Tooling**
  - TypeScript (~5.9) with `strict` mode
  - ESLint (`eslint-config-expo`, `eslint-config-prettier`)
  - Prettier + `prettier-plugin-tailwindcss`

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **Yarn** (the repo is configured with `packageManager: "yarn@4.x"`), or `npm`/`pnpm` if you prefer
- **Expo CLI** (optional) – you can also use `npx expo` directly
- iOS Simulator / Android Emulator, or a physical device with the Expo Go app

### Installation

Clone the repository, then install dependencies:

```bash
yarn install
# or
npm install
```

### Running the app

Start the Expo development server:

```bash
yarn start
# or
npx expo start
```

Then:

- Press `i` to run on **iOS Simulator** (macOS only, requires Xcode), or
- Press `a` to run on **Android Emulator**, or
- Scan the QR code with the **Expo Go** app on your device.

You can also run the prebuild/native projects:

```bash
yarn runandroid    # expo run:android
yarn runios        # expo run:ios
```

### Project structure (app layer)

The most relevant source files are:

- `app/_layout.tsx` – Root stack navigator and global header logic.
- `app/index.tsx` – Home / discover screen with featured destinations and favorites.
- `app/location/_layout.tsx` – Nested stack for location routes.
- `app/location/detail.tsx` – Location detail page with hero image and “Book now” button.
- `app/location/schedule.tsx` – Schedule/itinerary related UI (WIP).
- `app/messages/_layout.tsx` – Messages stack with list and chat screens.
- `app/messages/index.tsx` – Messages list (chat overview).
- `app/messages/chat.tsx` – Single chat conversation screen.
- `app/login/*` – Sign in, sign up, OTP verification, tips, forgot password screens.
- `components/CustomHeader.tsx` – Shared header component.
- `components/LocationCard.tsx` & `components/location/MiniLocationCard.tsx` – Destination cards.
- `components/Button.tsx`, `components/InputText.tsx`, `components/OTPInput.tsx` – Reusable form components.
- `components/user/SigninForm.tsx` – Sign‑in form logic and validation.
- `app/data/mockLocations.ts` & `app/data/mockChats.ts` – Mock data for locations and chats.

Tailwind/NativeWind setup:

- `global.css` – Tailwind base, components, utilities.
- `tailwind.config.js` – Tailwind theme configuration.
- `nativewind-env.d.ts` – NativeWind types.

---

## Usage Highlights

- **Browse destinations**
  - Launch the app and land on the home screen (`/`).
  - Scroll through “Best destination” and tap a card to open `/location/detail?id=...`.

- **View location details**
  - On the detail page, scroll to see description, avatars, and bottom “Book now” button.

- **Messages & chat**
  - From the home screen, tap the circular chat button to navigate to `/messages`.
  - Select a chat row to open the conversation screen (`/messages/chat?id=...`).

- **Auth flows**
  - Navigate to `/login/signin` or `/login/signUp` (e.g., using `router.push`) to interact with sign‑in/sign‑up flows and related screens.

---

## Getting Help

If you run into issues:

- Check the Expo and React Native docs for environment‑specific problems.
- Review `package.json` scripts and configuration files (`app.json`, `metro.config.js`, `babel.config.js`) for build settings.
- Where this repository is hosted (e.g. GitHub/GitLab), open an **issue** describing:
  - Your OS and Node/Expo versions
  - Exact command you ran
  - Full error output



