import { inter } from '@/fonts'
import { ThemeVars } from '@mysten/dapp-kit'

export const darkTheme: ThemeVars = {
  blurs: {
    modalOverlay: 'blur(12px)',
  },
  backgroundColors: {
    primaryButton: '#011631',
    primaryButtonHover: '#011227',
    outlineButtonHover: 'rgba(255,255,255,0.05)',
    modalOverlay: 'rgba(2,2,2,0.4)',
    modalPrimary: 'rgba(23,37,52,0.8)',
    modalSecondary: 'rgba(255,255,255,0.05)',
    iconButton: 'transparent',
    iconButtonHover: 'rgba(255,255,255,0.1)',
    dropdownMenu: '#011631',
    dropdownMenuSeparator: '#052852',
    walletItemSelected: '#011631',
    walletItemHover: 'rgba(255,255,255,0.1)',
  },
  borderColors: {
    outlineButton: 'rgba(255,255,255,0.1)',
  },
  colors: {
    primaryButton: '#F6F7F9',
    outlineButton: '#F6F7F9',
    iconButton: '#F6F7F9',
    body: '#F6F7F9',
    bodyMuted: 'rgba(246, 247, 249, 0.7)',
    bodyDanger: '#FF794B',
  },
  radii: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
  shadows: {
    primaryButton: '0px 4px 12px rgba(1, 22, 49, 0.1)',
    walletItemSelected: '0px 2px 6px rgba(1, 22, 49, 0.05)',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '600',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: '1',
  },
}
