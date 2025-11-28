// Currency mapping and exchange rates helper

// Map currency names to currency codes
export const currencyNameToCode: Record<string, string> = {
  'Hong kong Dollar': 'HKD',
  'Hong Kong Dollar': 'HKD',
  'Kenyan Shilling': 'KES',
  'Argentine Peso': 'ARS',
  'US Dollar': 'USD',
  'Euro': 'EUR',
  'British Pound': 'GBP',
  'Indian Rupee': 'INR',
  'Brazilian Real': 'BRL',
  'Singapore Dollar': 'SGD',
};

// Exchange rates from GBP (base currency) to other currencies
// These are the rates shown in the budget (since budget is in £)
// Format: 1 GBP = X units of target currency
const GBP_TO_CURRENCY_RATES: Record<string, number> = {
  HKD: 9.8500, // 1 GBP = 9.85 HKD
  KES: 163.5000, // 1 GBP = 163.5 KES  
  ARS: 173.7200, // 1 GBP = 173.72 ARS (calculated from schedule payout data)
  USD: 1.2700,
  EUR: 1.1700,
  GBP: 1.0,
  INR: 105.5000,
  BRL: 6.4000,
  SGD: 1.7100,
};

/**
 * Get the current exchange rate from GBP to the target currency
 * @param currencyName - The full currency name (e.g., "Hong kong Dollar")
 * @returns The exchange rate (how many units of target currency per 1 GBP)
 */
export function getCurrencyRate(currencyName: string): number | null {
  const code = currencyNameToCode[currencyName];
  if (!code) {
    // Try to extract currency code if name contains it
    const upperName = currencyName.toUpperCase();
    for (const [key, value] of Object.entries(currencyNameToCode)) {
      if (upperName.includes(key.toUpperCase()) || upperName.includes(value)) {
        return GBP_TO_CURRENCY_RATES[value] || null;
      }
    }
    return null;
  }
  return GBP_TO_CURRENCY_RATES[code] || null;
}

/**
 * Format exchange rate for display
 */
export function formatExchangeRate(rate: number | null, currencyCode: string): string {
  if (rate === null) return '';
  // Format to 4 decimal places for exchange rates
  return rate.toFixed(4);
}

