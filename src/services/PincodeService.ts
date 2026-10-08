/**
 * PincodeService
 * 
 * Checks delivery availability, estimates delivery dates, and calculates shipping charges.
 * In production, this would integrate with courier APIs (Shiprocket, Delhivery, etc.)
 */

import { PincodeResult } from '../types/extended';

// Indian state/pincode mapping (simplified)
const PINCODE_RANGES: Record<string, { state: string; city: string; zone: string }> = {
  '380': { state: 'Gujarat', city: 'Ahmedabad', zone: 'local' },
  '395': { state: 'Gujarat', city: 'Surat', zone: 'local' },
  '390': { state: 'Gujarat', city: 'Vadodara', zone: 'local' },
  '400': { state: 'Maharashtra', city: 'Mumbai', zone: 'west' },
  '411': { state: 'Maharashtra', city: 'Pune', zone: 'west' },
  '302': { state: 'Rajasthan', city: 'Jaipur', zone: 'north' },
  '110': { state: 'Delhi', city: 'New Delhi', zone: 'north' },
  '121': { state: 'Haryana', city: 'Faridabad', zone: 'north' },
  '560': { state: 'Karnataka', city: 'Bangalore', zone: 'south' },
  '600': { state: 'Tamil Nadu', city: 'Chennai', zone: 'south' },
  '500': { state: 'Telangana', city: 'Hyderabad', zone: 'south' },
  '700': { state: 'West Bengal', city: 'Kolkata', zone: 'east' },
};

// Shipping charges by zone
const ZONE_CHARGES: Record<string, { standard: number; express: number; cod: boolean; days: string }> = {
  'local': { standard: 0, express: 49, cod: true, days: '1-2 business days' },
  'west': { standard: 49, express: 99, cod: true, days: '2-3 business days' },
  'north': { standard: 60, express: 120, cod: true, days: '3-4 business days' },
  'south': { standard: 80, express: 149, cod: true, days: '3-5 business days' },
  'east': { standard: 90, express: 160, cod: false, days: '4-6 business days' },
  'other': { standard: 100, express: 180, cod: false, days: '5-7 business days' },
};

export class PincodeService {
  /**
   * Check pincode validity and delivery details
   * In production: GET /api/pincode/:pincode
   */
  async checkPincode(pincode: string): Promise<PincodeResult> {
    // Validate pincode format
    if (!/^\d{6}$/.test(pincode)) {
      return {
        pincode,
        available: false,
        city: '',
        state: '',
        estimatedDelivery: '',
        codAvailable: false,
        shippingCharge: 0,
        expressAvailable: false,
      };
    }

    // Find zone from pincode prefix
    const prefix = pincode.substring(0, 3);
    const zoneInfo = PINCODE_RANGES[prefix] || { state: 'Other', city: 'Unknown', zone: 'other' };
    const zoneCharges = ZONE_CHARGES[zoneInfo.zone] || ZONE_CHARGES['other'];

    // Calculate estimated delivery date
    const daysMatch = zoneCharges.days.match(/(\d+)-(\d+)/);
    const maxDays = daysMatch ? parseInt(daysMatch[2]) : 5;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + maxDays);

    return {
      pincode,
      available: true,
      city: zoneInfo.city,
      state: zoneInfo.state,
      estimatedDelivery: zoneCharges.days,
      codAvailable: zoneCharges.cod,
      shippingCharge: zoneCharges.standard,
      expressAvailable: true,
    };
  }

  /**
   * Get shipping charge for a pincode
   */
  async getShippingCharge(pincode: string, isExpress: boolean = false): Promise<number> {
    const result = await this.checkPincode(pincode);
    if (!result.available) return 0;

    const prefix = pincode.substring(0, 3);
    const zoneInfo = PINCODE_RANGES[prefix] || { zone: 'other' };
    const zoneCharges = ZONE_CHARGES[zoneInfo.zone] || ZONE_CHARGES['other'];

    return isExpress ? zoneCharges.express : zoneCharges.standard;
  }

  /**
   * Check if COD is available for pincode
   */
  async isCodAvailable(pincode: string): Promise<boolean> {
    const result = await this.checkPincode(pincode);
    return result.codAvailable;
  }
}

export const pincodeService = new PincodeService();
