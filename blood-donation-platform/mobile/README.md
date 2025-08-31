# 🩸 GenAlphaZ Blood Donation Mobile App

[![Expo](https://img.shields.io/badge/Expo-49.0.0-blue?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The **GenAlphaZ Mobile Application** is part of the Blood Donation Management System, designed to **connect donors, and blood banks** in real-time.  
This app empowers donors to track their eligibility and stay motivated with a **gamified points and leaderboard system**.

---

## 📱 Key Features

- **🩸 Dashboard**
  - Urgent donation requests displayed instantly
  - Quick access to eligibility tracker & profile

- **🚨 Urgent Alerts**
  - Filters based on donor’s blood type
  - Donor can know the urgent blood types

- **👤 Donor Profile**
  - Blood type, last donation, eligibility status
  - Full donation history

- **⏳ Eligibility Tracker**
  - Countdown timer until next donation
  - Push notifications

- **💡 Health Tips**
  - Pre- and post-donation advice
  - Lifestyle recommendations for donors

- **🏆 Leaderboard**
  - Monthly & lifetime rankings
  - Earn points, badges, and achievements
  - Encourages healthy donor competition

- **🎯 Points System**
  - +500 points for a donation
  - Bonus for urgent requests and streak donations

---

## 🚀 Getting Started

Follow these steps to set up the app on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/PamudaUposath/iwb25-296-genalphaz.git
cd iwb25-296-genalphaz/mobile


2. Install Dependencies

npm install


3. Run the App

npx expo start
Scan the QR code using the Expo Go app (Android/iOS)

Or press a to run on an Android emulator

Or press i to run on an iOS simulator (Mac only)


⚙️ Configuration
The app connects to the backend API running on port 8082.
Update the BASE_URL in services/api.ts if your server runs on a different port or domain.

Example:

export const BASE_URL = "http://localhost:8082/api";
## 📂 Project Structure

mobile/
├── app/ # Screens & navigation
│ ├── auth/ # Login, signup, logout
│ ├── dashboard/ # Home, urgent alerts, stats
│ └── profile/ # Profile & eligibility
├── assets/ # Images, icons, fonts
├── components/ # Reusable UI components
├── services/ # API services & constants
├── utils/ # Helpers & formatters
├── App.tsx # Entry point
└── package.json # Project metadata


🛠️ Tech Stack
Framework: React Native (Expo Managed Workflow)

Language: TypeScript

Navigation: React Navigation

API Calls: Axios / Fetch API

State Management: Context API / Async Storage

Styling: Styled Components / React Native Paper

🤝 Contributing
We welcome contributions to improve this project!

Fork the repository

Create a new branch (feature/your-feature-name)

Commit your changes

Push to your branch

Submit a Pull Request

👥 Team GenAlphaZ – IWB25-296
Mobile App Lead: Pasidu Chamod


📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
React Native community

Expo for simplifying development

Open-source libraries that made this project possible 