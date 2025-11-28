# 🎯 Hackathon Demo Guide - Quick Reference

## ⚡ 30-Second Demo Flow

### Perfect Demo Path:
1. **Root** (`/`) → Auto-redirects to Dashboard
2. **Dashboard** (`/dashboard`) → Shows workforce overview, smart alerts, currency needs
3. **Payroll** (`/payroll`) → Click "Upload payroll CSV"
4. **Upload** (`/payroll/upload`) → Click "Use demo file" → See validation results
5. **Summary** (`/payroll/summary`) → Select FX option → "Execute payroll"
6. **Confirmation** (`/payroll/confirmation`) → See success

### Alternative: Smart Budget Flow
1. **Dashboard** → Click "Smart budget" in nav
2. **Smart Budget** (`/smart-budget`) → Enter amount → Click "Budget"
3. **Schedule Table** → Click lock icon → See modal with pre-filled rates
4. **Lock Price** → Enter amount → "Lock Price"

---

## 🎨 Key Features to Highlight

### ✅ What's Working:
- **Full payroll flow**: Upload → Validate → Summary → Execute → Confirm
- **Smart Budget**: Create budgets, lock FX rates, view schedule
- **Currency management**: Multi-currency support, FX planning
- **Team management**: View team members, add new employees
- **Dashboard insights**: Workforce snapshot, cycle health, smart alerts

### 💡 Demo Talking Points:
- "End-to-end payroll orchestration with multi-currency support"
- "Smart FX rate locking - pre-filled with current market rates"
- "CSV validation with 3-tier error handling"
- "Mock data ready to swap with real Wise APIs"
- "Built with Next.js 16, TypeScript, fully responsive"

---

## 🚀 Quick Start Commands

```bash
# Make sure dev server is running
npm run dev

# Open browser to:
http://localhost:3000
```

---

## 📍 Key Routes to Demo

1. `/` - Auto-redirects to dashboard
2. `/dashboard` - Main dashboard with all widgets
3. `/payroll` - Payroll overview with green alert
4. `/payroll/upload` - CSV upload (use demo file!)
5. `/payroll/summary` - FX planner with 3 options
6. `/smart-budget` - Budget planning and rate locking
7. `/team` - Team member management

---

## ⚠️ Demo Safety Tips

- ✅ All mock data is pre-loaded
- ✅ Demo CSV file available (auto-loads)
- ✅ FX rates have fallback (always works)
- ✅ No external dependencies needed
- ✅ All forms validate properly
- ✅ Modal dialogs work smoothly

---

## 🎯 What Makes This Demo Strong

1. **Complete User Journey** - Full flow from upload to confirmation
2. **Multiple Features** - Payroll, Budget, Team management
3. **Real UX** - Forms, validation, modals, feedback
4. **Production-Ready Code** - Clean architecture, TypeScript, error handling
5. **Wise Branding** - Green theme, logo, professional look

---

## 💬 Potential Questions & Answers

**Q: Is this connected to real Wise APIs?**
A: No, currently using mock data. All handlers are ready for API integration - just swap the endpoints.

**Q: What's the tech stack?**
A: Next.js 16 (App Router), TypeScript, Tailwind CSS, React 19. Fully client-side for demo.

**Q: Can this handle real payroll data?**
A: Architecture is ready. Would need: database, Wise API credentials, authentication. The validation and processing logic is already implemented.

**Q: What's unique about this solution?**
A: Smart FX planning with rate locking, multi-currency orchestration, end-to-end validation, and treasury management - all in one platform.

---

## ✨ Final Checklist Before Demo

- [x] Dev server running (`npm run dev`)
- [x] Browser tab open at `http://localhost:3000`
- [x] Demo CSV file exists (`public/demo-payroll.csv`)
- [x] All pages accessible
- [x] Forms working
- [x] Modals working
- [x] Navigation working

**You're ready! 🚀**

