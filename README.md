# 🏆 LikeWise - Global Payroll Orchestration Platform

> **🏅 Wise Hackathon 2025 - Second Place Winner**

A comprehensive admin dashboard for global payroll orchestration and treasury management. Built for the Wise Hackathon, this platform provides end-to-end payroll processing, smart FX rate locking, multi-currency support, and intelligent budget planning.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [User Flows](#user-flows)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Features in Detail](#features-in-detail)
- [Demo Guide](#demo-guide)

## 🎯 Overview

LikeWise is a production-ready platform designed to help global companies manage payroll across multiple countries and currencies. The platform streamlines the entire payroll process from CSV upload to execution, while providing intelligent FX rate management and budget planning tools.

### Problem Solved

Managing global payroll is complex:
- Multiple currencies and exchange rates
- Compliance across different countries
- FX rate volatility affecting costs
- Lack of visibility into payroll cycles
- Manual validation and error-prone processes

### Our Solution

LikeWise provides:
- **End-to-end payroll orchestration** with automated validation
- **Smart FX rate locking** to protect against volatility
- **Multi-currency support** with real-time rate tracking
- **Budget planning tools** with predictive analytics
- **Comprehensive dashboard** with workforce insights
- **Team management** for employee lifecycle

## ✨ Key Features

### 1. **Complete Payroll Workflow**
- CSV upload with drag-and-drop interface
- Automated validation (errors, warnings, valid entries)
- Payment summary with multi-currency breakdown
- FX planning with three strategic options
- Execution confirmation with detailed results

### 2. **Smart Budget Planning**
- Create budgets for future payroll cycles
- FX rate locking with pre-filled market rates
- Schedule table showing currency trends
- Savings alerts and recommendations
- Quarterly budget tracking

### 3. **Intelligent FX Management**
- Real-time exchange rate tracking
- Three FX strategy options:
  - **Convert now** - Immediate conversion at current rates
  - **Lock rate** - Reserve rate for future conversion
  - **Convert on payroll date** - Market rate at execution
- Rate comparison and savings calculations
- Multi-currency support (GBP, USD, HKD, KES, ARS, and more)

### 4. **Comprehensive Dashboard**
- Workforce snapshot with employee overview
- Payroll cycle health monitoring
- Smart alerts with actionable insights
- Currency needs tracking
- Team member management

### 5. **Employee Management**
- Detailed employee profiles
- Salary management with multi-currency support
- Transaction history
- Compliance tracking
- Leave management

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Lucide React icons
- **State Management**: React Context API
- **Validation**: Custom validation engine
- **CSV Processing**: Client-side parsing

### Development Tools

- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety

## 🔄 User Flows

### Primary Flow: Payroll Execution

```
Dashboard → Start Payroll Run → Upload CSV → Validation → 
Summary → FX Planning → Execute → Confirmation
```

1. **Dashboard** (`/dashboard`)
   - View workforce snapshot
   - Check payroll cycle health
   - Review smart alerts
   - Click "Start payroll run"

2. **Payroll Upload** (`/payroll/upload`)
   - Upload CSV file or use demo file
   - Automatic validation runs
   - View errors, warnings, and valid entries
   - Proceed to summary

3. **Payment Summary** (`/payroll/summary`)
   - Review totals by currency and country
   - See Wise fees and settlement times
   - Choose FX strategy:
     - Convert now
     - Lock rate
     - Convert on payroll date
   - Execute payroll

4. **Confirmation** (`/payroll/confirmation`)
   - View execution results
   - See success/failure counts
   - Review FX decision applied

### Secondary Flow: Smart Budget Planning

```
Dashboard → Smart Budget → Create Budget → 
View Schedule → Lock FX Rates → Track Savings
```

1. **Smart Budget** (`/smart-budget`)
   - Select quarter filter
   - View current budget overview
   - Enter new budget amount
   - See savings recommendations

2. **Rate Locking**
   - View schedule table with currency trends
   - Click lock icon on any currency
   - Modal opens with pre-filled current rate
   - Lock rate for future payroll

3. **Savings Tracking**
   - View potential savings alerts
   - Compare locked vs. market rates
   - Track budget utilization

### Additional Flows

- **Team Management**: View team members, add employees, manage details
- **Employee Details**: View individual employee profiles, update salaries
- **Transactions**: Track payment history
- **Insights**: Analytics and reporting

> 📐 **Design Flows**: For detailed user flow diagrams, see our [Figma board](https://www.figma.com/board/1oqz0Uo38HmSRVn9W2shi8/LikeWise?node-id=0-1&p=f&t=YjsZD4BUbcwSC44u-0)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd WiseHackathon

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to the dashboard.

### Quick Demo

1. Navigate to Dashboard (auto-redirects from root)
2. Click "Start payroll run"
3. On upload page, click "Use demo file"
4. Review validation results
5. Proceed to summary and select FX option
6. Execute payroll and view confirmation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (mock endpoints)
│   │   ├── dashboard/     # Dashboard data
│   │   ├── execute/       # Payroll execution
│   │   ├── fx-rates/      # FX rate data
│   │   ├── validate/      # CSV validation
│   │   └── ...
│   ├── dashboard/         # Main dashboard page
│   ├── payroll/           # Payroll workflow pages
│   │   ├── upload/        # CSV upload
│   │   ├── summary/       # Payment summary
│   │   └── confirmation/  # Execution confirmation
│   ├── smart-budget/      # Budget planning
│   ├── team/              # Team management
│   └── ...
├── components/            # React components
│   ├── dashboard/         # Dashboard widgets
│   ├── payroll/           # Payroll components
│   ├── smart-budget/      # Budget components
│   ├── employees/         # Employee components
│   └── navigation/        # Navigation components
├── context/               # React Context providers
│   └── PayrunContext.tsx  # Payroll run state management
└── lib/                   # Utility functions
    ├── csv.ts             # CSV parsing
    ├── validation.ts      # Validation logic
    ├── summary.ts         # Payment summary calculations
    ├── fx.ts              # FX rate handling
    ├── mockData.ts        # Mock data
    └── types.ts           # TypeScript types
```

## 🔌 API Integration

The platform is architected for easy integration with Wise APIs. Currently using mock data, but all handlers are ready for production API integration.

### Ready for Integration

- **Payroll Execution**: `/api/execute` - Ready for Wise Transfer API
- **FX Rates**: `/api/fx-rates` - Ready for Wise Exchange Rate API
- **Validation**: `/api/validate` - Can be enhanced with Wise validation rules
- **Dashboard Data**: `/api/dashboard` - Ready for Wise Account API

### Integration Points

1. **Replace mock data** in `src/lib/mockData.ts` with API calls
2. **Update API routes** in `src/app/api/` to call Wise endpoints
3. **Add authentication** using Wise API credentials
4. **Implement error handling** for API failures
5. **Add rate limiting** and retry logic

### Example Integration

```typescript
// src/app/api/fx-rates/route.ts
export async function GET() {
  const response = await fetch('https://api.wise.com/v1/rates', {
    headers: {
      'Authorization': `Bearer ${process.env.WISE_API_KEY}`
    }
  });
  return Response.json(await response.json());
}
```

## 📊 Features in Detail

### CSV Validation

Three-tier validation system:
- **Errors**: Critical issues that prevent processing (invalid format, missing required fields)
- **Warnings**: Potential issues that should be reviewed (unusual amounts, new employees)
- **Valid**: Entries ready for processing

### FX Planning Options

1. **Convert Now**
   - Immediate conversion at current market rate
   - Best for: Stable currencies, immediate needs

2. **Lock Rate**
   - Reserve current rate for future conversion
   - Best for: Volatile currencies, budget planning

3. **Convert on Payroll Date**
   - Use market rate at execution time
   - Best for: Flexible timing, market following

### Smart Alerts

The dashboard provides intelligent alerts:
- Currency needs (running low, surplus)
- FX savings opportunities
- Payroll cycle reminders
- Compliance warnings

### Multi-Currency Support

Supported currencies include:
- GBP (British Pound)
- USD (US Dollar)
- HKD (Hong Kong Dollar)
- KES (Kenyan Shilling)
- ARS (Argentine Peso)
- And more...

## 🎬 Demo Guide

### Quick Demo Path (2-3 minutes)

1. **Dashboard Overview** (30s)
   - Show workforce snapshot
   - Highlight smart alerts
   - Display currency needs

2. **Payroll Flow** (1.5 min)
   - Upload demo CSV
   - Show validation results
   - Select FX option
   - Execute and confirm

3. **Smart Budget** (1 min)
   - Create budget
   - Show rate locking modal
   - Display savings alert

### Key Talking Points

- "End-to-end payroll orchestration with multi-currency support"
- "Smart FX rate locking saves 2%+ on volatile currencies"
- "Production-ready architecture, ready for Wise API integration"
- "Built with Next.js 16, TypeScript, fully responsive"
- "Complete validation pipeline with 3-tier error handling"

## 🎨 Design & Branding

- **Color Scheme**: Wise green theme (#00B9FF variations)
- **Typography**: Clean, modern sans-serif
- **Icons**: Lucide React icon library
- **Layout**: Responsive grid system
- **Components**: Reusable, accessible components

## 🔒 Security Considerations

For production deployment:
- Add authentication (OAuth, API keys)
- Implement role-based access control
- Encrypt sensitive data
- Add audit logging
- Implement rate limiting
- Add CSRF protection

## 🚧 Future Enhancements

- [ ] Real-time Wise API integration
- [ ] Database persistence
- [ ] User authentication
- [ ] Advanced analytics and reporting
- [ ] Email notifications
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced compliance checking
- [ ] Automated reconciliation
- [ ] API webhooks

## 📝 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- Component-based architecture
- Reusable utility functions

## 🤝 Contributing

This project was built for the Wise Hackathon 2024. For questions or contributions, please reach out to the team.

## 📄 License

This project was created for the Wise Hackathon 2024.

## 🏆 Acknowledgments

- **Wise** for hosting the hackathon
- **Team** for the amazing collaboration
- **Second Place** - Thank you to the judges!

---

**Built with ❤️ for the Wise Hackathon 2025**


For detailed user flows and design mockups, check out our [Figma board](https://www.figma.com/board/1oqz0Uo38HmSRVn9W2shi8/LikeWise?node-id=0-1&p=f&t=YjsZD4BUbcwSC44u-0).
