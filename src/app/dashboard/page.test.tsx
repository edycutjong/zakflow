import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ZakflowDashboard from './page';

vi.mock('@/lib/palmusd', () => ({
  palmUSDService: {
    getGoldReserveMetrics: vi.fn().mockResolvedValue({ priceOz: 2400, backingRatio: 100 }),
    sendZakatRemittance: vi.fn().mockResolvedValue({ txId: 'tx_123', goldEquivalent: 0.1 }),
  }
}));

describe('ZakflowDashboard', () => {
  it('should render the send view by default', async () => {
    await act(async () => { render(<ZakflowDashboard />); });
    expect(screen.getByText('Send Zakat-Enabled Remittance')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E.g. 7X...aB')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
  });

  it('should switch to gold view', async () => {
    await act(async () => { render(<ZakflowDashboard />); });
    const goldButton = screen.getByText('Gold');
    await userEvent.click(goldButton);
    expect(screen.getByText('GOLD SPOT PRICE (OZ)')).toBeInTheDocument();
  });

  it('should handle send remittance', async () => {
    await act(async () => { render(<ZakflowDashboard />); });
    const addressInput = screen.getByPlaceholderText('E.g. 7X...aB');
    const amountInput = screen.getByPlaceholderText('0.00');
    
    await userEvent.type(addressInput, 'SomeAddress');
    await userEvent.type(amountInput, '100');
    
    const sendButton = screen.getByText('Confirm Transfer');
    expect(sendButton).not.toBeDisabled();
    
    await userEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Remittance Sent Successfully')).toBeInTheDocument();
    });
  });

  it('should handle send another after success', async () => {
    await act(async () => { render(<ZakflowDashboard />); });
    const addressInput = screen.getByPlaceholderText('E.g. 7X...aB');
    const amountInput = screen.getByPlaceholderText('0.00');
    
    await userEvent.type(addressInput, 'SomeAddress');
    await userEvent.type(amountInput, '100');
    
    const sendButton = screen.getByText('Confirm Transfer');
    await userEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Remittance Sent Successfully')).toBeInTheDocument();
    });
    
    const sendAnotherButton = screen.getByText('Send Another');
    await userEvent.click(sendAnotherButton);
    
    expect(screen.getByText('Send Zakat-Enabled Remittance')).toBeInTheDocument();
  });

  it('should not process send if amount or recipient is missing', async () => {
    await act(async () => { render(<ZakflowDashboard />); });
    const sendButton = screen.getByText('Confirm Transfer');
    
    // Remove disabled attribute so we can click it and test the if-statement
    sendButton.removeAttribute('disabled');
    await act(async () => {
      fireEvent.click(sendButton);
    });
    
    // State should still be idle, the inputs should be present
    expect(screen.getByText('Send Zakat-Enabled Remittance')).toBeInTheDocument();
  });
});
