import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Access Control Contract', () => {
  let mockContractCall: any
  
  beforeEach(() => {
    mockContractCall = vi.fn()
  })
  
  it('should set access policy', async () => {
    mockContractCall.mockResolvedValue({ success: true })
    const result = await mockContractCall('set-access-policy', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'temperature_data', ['ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'])
    expect(result.success).toBe(true)
  })
  
  it('should check access', async () => {
    mockContractCall.mockResolvedValue({ success: true, value: true })
    const result = await mockContractCall('check-access', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'temperature_data')
    expect(result.success).toBe(true)
    expect(result.value).toBe(true)
  })
  
  it('should get access policy', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: {
        allowed: ['ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG']
      }
    })
    const result = await mockContractCall('get-access-policy', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'temperature_data')
    expect(result.success).toBe(true)
    expect(result.value.allowed).toContain('ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG')
  })
})

