/**
 * Utility for generating QR codes for MUVER recruitment
 */

// Generate a recruitment URL with the MUVER's ID
export const generateRecruitmentUrl = (muverId: string): string => {
  // Base URL will be different in each environment
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.EXPO_PUBLIC_APP_URL || 'https://app.muvoapp.com';
  return `${baseUrl}/register?referrer=${muverId}`;
};

// Generate a QR code data URL (for web)
export const generateQrCodeDataUrl = async (muverId: string): Promise<string> => {
  // This function is used in the web app with qrcode.react
  // The actual QR code generation happens in the component
  return generateRecruitmentUrl(muverId);
};

// Get QR code options for React Native
export const getQrCodeOptions = (size: number = 256) => {
  return {
    size,
    color: '#2E7D32', // Primary green color
    backgroundColor: '#FFFFFF',
    enableLinearGradient: false,
    quietZone: 10,
  };
};

export default {
  generateRecruitmentUrl,
  generateQrCodeDataUrl,
  getQrCodeOptions,
};
