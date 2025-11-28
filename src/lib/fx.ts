// Simple FX helper that tries an external API and falls back to static demo rates.

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  INR: 0.012,
  BRL: 0.19,
  SGD: 0.74,
};

export type FxRateMap = Record<string, number>;

export function getFallbackFxRates(): FxRateMap {
  return FALLBACK_RATES;
}

// NOTE: updated to match FigJam LikeWise flow.
// TODO: point this to a real Wise FX quote endpoint when credentials are available.
export async function fetchFxRates(): Promise<FxRateMap> {
  const apiUrl = process.env.NEXT_PUBLIC_FX_API_URL;

  if (!apiUrl) {
    return FALLBACK_RATES;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`FX API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      rates?: Record<string, number>;
    };

    if (!data.rates) {
      return FALLBACK_RATES;
    }

    // Prefer remote rates but always keep our demo defaults as a baseline.
    return {
      ...FALLBACK_RATES,
      ...data.rates,
    };
  } catch {
    // If the API is down or misconfigured, silently fall back to demo rates.
    return FALLBACK_RATES;
  }
}


