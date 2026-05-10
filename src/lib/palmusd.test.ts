import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PalmUSDService, palmUSDService } from './palmusd';

// Mock Solana Web3 primitives using class mocks to avoid "new" errors
vi.mock('@solana/web3.js', () => {
  return {
    Connection: vi.fn(function() {
      return {
        getLatestBlockhash: vi.fn().mockResolvedValue({ blockhash: 'mock_blockhash' }),
      };
    }),
    PublicKey: vi.fn(function(key) {
      if (key === 'invalid_key') {
        throw new Error('Invalid public key');
      }
      return { toBase58: () => key };
    }),
    Transaction: vi.fn(function() {
      return {};
    }),
  };
});

// Mock fetch
const originalFetch = global.fetch;

describe('PalmUSDService', () => {
  let service: PalmUSDService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new PalmUSDService();
    global.fetch = vi.fn();
    // Spy on console.log and console.error to keep test output clean
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('init', () => {
    it('should initialize successfully only once', () => {
      service.init();
      // Second init should return early
      service.init();
      expect(service['initialized']).toBe(true);
    });

    it('should use provided NEXT_PUBLIC_RPC_URL', () => {
      process.env.NEXT_PUBLIC_RPC_URL = 'https://custom.rpc.url';
      service.init();
      expect(service['initialized']).toBe(true);
      delete process.env.NEXT_PUBLIC_RPC_URL;
    });
  });

  describe('sendZakatRemittance', () => {
    it('should successfully build transaction and return txId and goldEquivalent', async () => {
      const payer = 'payer123';
      const recipient = 'recipient456';
      const amount = 1000;
      const zakatAmount = 25;

      const result = await service.sendZakatRemittance(payer, recipient, amount, zakatAmount);

      expect(result.txId).toMatch(/^tx_pusd_/);
      expect(result.goldEquivalent).toBe(1000 * 0.00042);
      expect(console.log).toHaveBeenCalledWith(`[Palm USD SDK] Processing remittance of ${amount} PUSD to ${recipient}`);
      expect(console.log).toHaveBeenCalledWith(`[Palm USD SDK] Routing ${zakatAmount} PUSD to verified charity pool`);
      expect(console.log).toHaveBeenCalledWith('[Palm USD SDK] Transaction built for signing');
    });

    it('should hit catch block if connection throws and fallback', async () => {
      // Intentionally pass an invalid key to throw in PublicKey constructor
      const payer = 'invalid_key';
      const recipient = 'recipient456';
      const amount = 1000;
      const zakatAmount = 25;

      const result = await service.sendZakatRemittance(payer, recipient, amount, zakatAmount);

      expect(console.error).toHaveBeenCalledWith(
        '[Palm USD SDK] Failed to build transaction:',
        expect.any(Error)
      );
      expect(result.txId).toMatch(/^tx_pusd_/);
      expect(result.goldEquivalent).toBe(1000 * 0.00042);
    });

    it('should fallback if payerPubkey is empty', async () => {
      const payer = '';
      const recipient = 'recipient456';
      const amount = 500;
      const zakatAmount = 12.5;

      const result = await service.sendZakatRemittance(payer, recipient, amount, zakatAmount);

      expect(result.txId).toMatch(/^tx_pusd_/);
      expect(result.goldEquivalent).toBe(500 * 0.00042);
    });
  });

  describe('getGoldReserveMetrics', () => {
    it('should return metrics when API fetch succeeds', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => ({ price: 2500 }),
      });

      const result = await service.getGoldReserveMetrics();

      expect(result.priceOz).toBe(2500);
      expect(result.backingRatio).toBe(100.12);
      expect(global.fetch).toHaveBeenCalledWith('https://api.gold-api.com/price/XAU', {
        headers: { 'x-api-key': 'demo_key' },
      });
    });

    it('should use GOLD_API_KEY from env if available', async () => {
      process.env.GOLD_API_KEY = 'real_key';
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => ({ price: 2500 }),
      });

      await service.getGoldReserveMetrics();

      expect(global.fetch).toHaveBeenCalledWith('https://api.gold-api.com/price/XAU', {
        headers: { 'x-api-key': 'real_key' },
      });
      delete process.env.GOLD_API_KEY;
    });

    it('should hit fallback if API fetch fails with not ok', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
      });

      const result = await service.getGoldReserveMetrics();

      expect(result.priceOz).toBeGreaterThanOrEqual(2375.5);
      expect(result.priceOz).toBeLessThanOrEqual(2385.5);
      expect(result.backingRatio).toBe(100.12);
    });

    it('should hit fallback if API fetch throws an error', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

      const result = await service.getGoldReserveMetrics();

      expect(result.priceOz).toBeGreaterThanOrEqual(2375.5);
      expect(result.priceOz).toBeLessThanOrEqual(2385.5);
      expect(result.backingRatio).toBe(100.12);
    });
  });

  describe('singleton export', () => {
    it('should export an instance of PalmUSDService', () => {
      expect(palmUSDService).toBeInstanceOf(PalmUSDService);
    });
  });
});
