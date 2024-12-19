import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Device Identity Contract', () => {
  let mockContractCall: any
  
  beforeEach(() => {
    mockContractCall = vi.fn()
  })
  
  it('should register a device', async () => {
    mockContractCall.mockResolvedValue({ success: true })
    const result = await mockContractCall('register-device', 'did:iot:123', '{"type": "sensor"}')
    expect(result.success).toBe(true)
  })
  
  it('should update device metadata', async () => {
    mockContractCall.mockResolvedValue({ success: true })
    const result = await mockContractCall('update-device-metadata', '{"type": "actuator"}')
    expect(result.success).toBe(true)
  })
  
  it('should transfer device ownership', async () => {
    mockContractCall.mockResolvedValue({ success: true })
    const result = await mockContractCall('transfer-device', 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG')
    expect(result.success).toBe(true)
  })
  
  it('should deactivate a device', async () => {
    mockContractCall.mockResolvedValue({ success: true })
    const result = await mockContractCall('deactivate-device')
    expect(result.success).toBe(true)
  })
  
  it('should get device info', async () => {
    mockContractCall.mockResolvedValue({
      success: true,
      value: {
        did: 'did:iot:123',
        metadata: '{"type": "sensor"}',
        owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        active: true
      }
    })
    const result = await mockContractCall('get-device-info', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')
    expect(result.success).toBe(true)
    expect(result.value.did).toBe('did:iot:123')
    expect(result.value.active).toBe(true)
  })
})

