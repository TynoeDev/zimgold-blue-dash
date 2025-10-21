# Gold Mafia - Business Networking Platform

## Project Info
- **Project Name**: Gold Mafia
- **Description**: A sophisticated business networking platform that leverages AI and blockchain technology to connect professionals in a secure and innovative environment.
- **Target Audience**: Business professionals, entrepreneurs, and organizations seeking to enhance their networking and collaboration efforts.
- **Key Features**:
  - NFT-based authentication for secure access
  - AI-driven business insights and sentiment analysis
  - Interactive community lounge for discussions and networking
  - Personalized command room for managing business strategies and assets
- **Technologies Used**: React 18, TypeScript, Tailwind CSS, Supabase, IPFS/Pinata, Solana
- **Future Enhancements**: Plans for additional features and integrations based on user feedback and technological advancements.

**URL**: https://lgoldmafia.org

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm installed
- Supabase account ([sign up](https://supabase.com))
- Pinata account ([sign up](https://pinata.cloud))
- Solana wallet (Phantom or Solflare recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zimgold-blue-dash
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your keys:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
   - `VITE_PINATA_JWT` - Your Pinata JWT token
   - `VITE_PINATA_GATEWAY` - Your Pinata gateway URL
   - `VITE_SOLANA_NETWORK` - Solana network (devnet/testnet/mainnet-beta)

4. **Set up Supabase database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the script to create all tables, policies, and functions

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
zimgold-blue-dash/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── DashboardSidebar.tsx
│   │   ├── DealCard.tsx
│   │   ├── RightSidebar.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Main application pages
│   │   ├── Dashboard.tsx    # User dashboard
│   │   ├── Lounge.tsx       # Chat & networking
│   │   ├── CommandRoom.tsx  # Deal management
│   │   └── Index.tsx        # Landing page
│   ├── lib/                 # Core utilities
│   │   ├── supabase.ts      # Supabase client & helpers
│   │   ├── pinata.ts        # IPFS/Pinata integration
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── assets/              # Static assets
│   └── index.css            # Global styles (Tailwind + custom)
├── supabase/
│   └── schema.sql           # Complete database schema
├── .env.example             # Environment variables template
└── package.json
```

---

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

- **profiles** - User profiles with membership tiers, stats, and wallet info
- **channels** - Lounge chat channels
- **messages** - Chat messages with IPFS attachments
- **deals** - Command Room deals/projects
- **deal_assignments** - Team member assignments to deals
- **activity_log** - User activity tracking
- **achievements** - Gamification system

Full schema with RLS policies available in `supabase/schema.sql`.

---

## 🎨 Design System

### Color Themes
- **Amber** - Lounge, achievements, warm interactions
- **Cyan** - Command Room, deals, professional actions
- **Purple** - NFT features, premium elements

### Visual Effects
- **Glassmorphism** - Frosted glass cards with backdrop blur
- **Glows** - Soft colored shadows for depth
- **Animations** - Gentle floating, smooth transitions, fade-ins

### Responsive Layout
- Mobile-first design with Tailwind breakpoints
- 12-column CSS Grid for dashboard layouts
- Sidebar navigation with collapsible states

---

## What is this project 

Let's break it down step-by-step review of the core elements and how they tie into the overall vision for goldmafia.org

---

### **1. Core Purpose & Vision**

Gold Mafia is designed as a **community-driven platform** where business professionals can **connect, collaborate, and leverage AI and blockchain technology** to drive business growth and networking.

### **2. Key Components & Features**

#### **The Lounge**

* **Purpose:** A social and collaborative space for members.
* **Features:**

  * **Discussion Forums:** Topic-based threads for business insights, deals, and networking.
  * **Sentiment Analysis:** AI-driven tools to gauge community mood and trends.
  * **Networking Spaces:** Virtual meetups, deal rooms, and member introductions.

#### **The Command Room**

* **Purpose:** A personalized control center for each member.
* **Features:**

  * **AI Business Assistant:** Tools to help plan trades, analyze market trends, and manage business strategies.
  * **Portfolio Management:** Secure storage and authentication of NFTs, documents, and data.
  * **Analytics Dashboards:** Real-time insights into market conditions, community engagement, and personal performance.

### **3. Technology Integration**

* **NFT Authentication:** Ensuring that all members and their assets are verified and secure.
* **AI-Driven Insights:** Using AI to provide actionable business intelligence, market sentiment, and strategic recommendations.
* **IPFS Backend:** Decentralized storage for documents, NFTs, and other data, ensuring security and transparency.

### **4. User Experience & Design**

* **Luxury Aesthetics:** A sleek, gold and black color scheme that evokes elegance and exclusivity.
* **Intuitive Navigation:** Clear, easy-to-use interfaces with a focus on user engagement and seamless access.
* **Personalization:** Customizable dashboards and user profiles to reflect individual preferences and business needs.

---

### **5. Community & Growth**

* **Verified Network:** Ensuring all members are vetted through NFT authentication to maintain trust and security.
* **Sentiment Analysis:** Real-time feedback and AI insights to help users adapt and thrive.
* **Business Ecosystem:** A platform that evolves with its users, adding new features and capabilities as the community grows.

---


UI/UX specs

- **Color Palette:** Gold, black, and white tones for a luxurious feel.
- **Typography:** Elegant serif fonts for headings and clean sans-serif fonts for body text.
- **Button Styles:** Rounded buttons with subtle shadows and hover effects.
- **Card Designs:** Elevated cards with images, text, and action buttons for easy interaction.

Absolutely! Let’s break down the specific tips and subpages for both The Lounge and The Command Room to ensure that users have a seamless and intuitive experience.

The Lounge Tips & Subpages
1. Discussion Forums

Tip: "Engage with fellow professionals in topic-based forums where ideas and deals are shared."

Subpages:

General Business Insights: A hub for industry trends and news.

Deal Rooms: Private or public spaces for deal-making and partnership discussions.

Topic Threads: Specific areas for niche topics like market trends, investment strategies, and technology innovations.

2. Networking Spaces

Tip: "Build valuable connections by joining virtual meetups and engaging in real-time discussions."

Subpages:

Member Introductions: A space for new members to introduce themselves and connect.

Virtual Meetups: Scheduled events, webinars, and roundtable discussions.

Interest Groups: Focused communities around specific industries or topics.

3. Sentiment Analysis

Tip: "Stay ahead of the curve by understanding community mood and market sentiment."

Subpages:

Trend Analysis: Visual representations of community sentiment on different topics.

Feedback Loop: Mechanisms for users to provide feedback and influence AI-driven insights.

Sector Reports: In-depth analyses of specific industries and their current status.

The Command Room Tips & Subpages
1. AI Business Assistant

Tip: "Leverage AI to gain actionable insights and optimize your business strategies."

Subpages:

Market Analysis: AI-generated reports on market trends and opportunities.

Trade Planning: Tools to simulate and plan trades with AI recommendations.

Document Vault: Secure storage and authentication for business documents and NFTs.

2. Analytics Dashboards

Tip: "Monitor your performance and market conditions in real-time with personalized analytics."

Subpages:

Performance Metrics: Detailed analytics on your business growth and engagement.

Market Insights: Live data feeds on industry trends, competitor analysis, and forecasts.

AI Recommendations: Custom suggestions and alerts based on AI analysis.

3. Portfolio Management

Tip: "Securely manage and verify your digital assets and documents in one centralized location."

Subpages:

Asset Vault: Secure storage for NFTs, documents, and business records.

Authentication Center: Tools to verify and authenticate documents and assets.

Portfolio Overview: A comprehensive dashboard displaying asset performance and growth.



**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ad007de8-611b-40b3-88fb-568c077f40ea) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
