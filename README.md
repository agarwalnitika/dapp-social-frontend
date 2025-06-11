# 🐦 Tweetlet - Web3 Social Platform

A decentralized social media platform built on Ethereum, allowing users to post, like, and comment using their Web3 wallet.

## 🚀 Features

- **Web3 Authentication**

  - Connect with MetaMask or any Web3 wallet
  - Sign messages to verify ownership
  - Secure wallet-based authentication

- **Social Features**

  - Create and share posts
  - Like and comment on posts
  - View user profiles
  - Real-time post updates
  - Dark mode support

- **User Profiles**
  - Customizable usernames
  - Profile pictures
  - User bios
  - Wallet address display

## 🛠️ Tech Stack

- **Frontend**

  - Next.js 14 (App Router)
  - React 19
  - TypeScript
  - TailwindCSS
  - RainbowKit (Wallet Connection)
  - Wagmi (Web3 Interactions)

- **Backend**

  - Node.js
  - Express
  - PostgreSQL
  - JWT Authentication

- **Web3**
  - Ethereum (Sepolia Testnet)
  - MetaMask Integration
  - Message Signing

## 🏗️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/agarwalnitika/dapp-social-frontend.git
   cd dapp-social-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 How to Use

1. **Connect Your Wallet**

   - Click "Connect Wallet" button
   - Select your preferred wallet (MetaMask recommended)
   - Sign the connection request

2. **Create a Profile**

   - After connecting, set up your profile
   - Add a username and profile picture
   - Write a bio

3. **Interact with Posts**

   - Create new posts using the compose button
   - Like posts by clicking the heart icon
   - Comment on posts using the comment section
   - View other users' profiles

4. **Navigation**
   - Home: View all posts
   - Profile: Manage your profile and posts
   - Explore: Discover new content

## 🔒 Security Features

- Wallet-based authentication
- Message signing for verification
- Secure API endpoints
- Protected routes for authenticated users

## 🎨 UI/UX Features

- Responsive design
- Dark mode
- Modern, clean interface
- Real-time updates
- Loading states and error handling

---

Built with ❤️ by Nitika
