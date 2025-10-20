import { useState, useEffect } from 'react';

interface SolanaTokenData {
  price: number;
  change24h: number;
  marketCap: string;
  rank: number;
  loading: boolean;
  error: string | null;
}

interface SolanaNetworkData {
  avgTPS: number;
  peakTPS: number;
  blockTime: number;
  transactionFee: number;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches live token price data from Jupiter API
 * @param tokenId - Token identifier (e.g., 'SOL' or token mint address)
 * @returns Token price, 24h change, market cap, rank
 * 
 * TODO: After Gold Mafia token launch, replace 'SOL' with your token mint address
 * Example: const { data } = useSolanaTokenData('YOUR_GOLD_MAFIA_MINT_ADDRESS');
 */
export const useSolanaTokenData = (tokenId: string = 'SOL'): SolanaTokenData => {
  const [data, setData] = useState<SolanaTokenData>({
    price: 189.00,
    change24h: -0.8,
    marketCap: '$103.8B',
    rank: 6,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        console.log(`[useSolanaTokenData] Fetching price for ${tokenId}...`);
        
        // Jupiter Price API - Works for any SPL token instantly
        const priceRes = await fetch(`https://price.jup.ag/v4/price?ids=${tokenId}`);
        const priceData = await priceRes.json();

        console.log('[useSolanaTokenData] Response:', priceData);

        if (priceData.data && priceData.data[tokenId]) {
          const tokenPrice = priceData.data[tokenId].price;

          console.log(`[useSolanaTokenData] ✅ Live price: $${tokenPrice}`);

          // TODO: For market cap and rank, integrate CoinGecko API after token listing
          // For now, use fallback data for SOL
          setData({
            price: tokenPrice,
            change24h: -0.8, // Calculate from historical data or use CoinGecko
            marketCap: '$103.8B', // From CoinGecko API after listing
            rank: 6, // From CoinGecko API after listing
            loading: false,
            error: null,
          });
        } else {
          throw new Error('Token data not found');
        }
      } catch (error) {
        console.error('[useSolanaTokenData] ❌ Error fetching token data:', error);
        // Keep fallback data on error
        setData(prev => ({ ...prev, loading: false, error: 'Failed to fetch live data' }));
      }
    };

    fetchTokenData();
    console.log('[useSolanaTokenData] Auto-refresh set to 60 seconds');
    
    // Update every 60 seconds
    const interval = setInterval(fetchTokenData, 60000);
    return () => clearInterval(interval);
  }, [tokenId]);

  return data;
};

/**
 * Fetches live Solana network performance statistics
 * @returns Network TPS, block time, transaction fees
 */
export const useSolanaNetworkData = (): SolanaNetworkData => {
  const [data, setData] = useState<SolanaNetworkData>({
    avgTPS: 65000,
    peakTPS: 100000,
    blockTime: 0.39,
    transactionFee: 0.00025,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        console.log('[useSolanaNetworkData] Fetching Solana network stats...');
        
        // Solana Public RPC - Get recent performance samples
        const rpcRes = await fetch('https://api.mainnet-beta.solana.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getRecentPerformanceSamples',
            params: [60], // Last 60 samples (about 1 hour)
          }),
        });

        const rpcData = await rpcRes.json();

        console.log('[useSolanaNetworkData] Response:', rpcData);

        if (rpcData.result && rpcData.result.length > 0) {
          // Calculate average TPS from recent samples
          const avgTPS = Math.round(
            rpcData.result.reduce((sum: number, sample: any) => {
              return sum + (sample.numTransactions / sample.samplePeriodSecs);
            }, 0) / rpcData.result.length
          );

          console.log(`[useSolanaNetworkData] ✅ Live TPS: ${avgTPS.toLocaleString()}`);

          setData({
            avgTPS: avgTPS || 65000, // Fallback to known average
            peakTPS: 100000, // Known peak from recent tests
            blockTime: 0.39, // Known Solana block time
            transactionFee: 0.00025, // Average fee in USD
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('[useSolanaNetworkData] ❌ Error fetching network data:', error);
        // Keep fallback data on error
        setData(prev => ({ ...prev, loading: false, error: 'Failed to fetch live data' }));
      }
    };

    fetchNetworkData();
    console.log('[useSolanaNetworkData] Auto-refresh set to 120 seconds');
    
    // Update every 2 minutes (network stats change slowly)
    const interval = setInterval(fetchNetworkData, 120000);
    return () => clearInterval(interval);
  }, []);

  return data;
};
