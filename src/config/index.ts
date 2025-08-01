const sizes = {
  mobileS: '320px',
  mobileM: '576px',
  mobileL: '768px',
  tablet: '992px',
  laptop: '1200px',
  laptopL: '1400px',
  desktop: '1600px',
}

export const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
}

export const themes = {
  main: '#FFF',
  text: '#ffffff',
  backgroundColor: '#121212',
  headerBackgroundColor: '#212020',
  luxury: 'rgb(20, 242, 242)',
}

export const position = {
  heightHeader: '60px',
}

export const apiEndpoints = {
  nextApi: process.env.NEXT_PUBLIC_NEXT_API,
}

export const ADDRESS_SUI = '0x2::sui::SUI'

export const dropdownVariantsFromTop = {
  hidden: {
    opacity: 0,
    scaleY: 0.8,
    transformOrigin: 'top',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    scaleY: 1,

    transformOrigin: 'top',
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    scaleY: 0.8,

    transformOrigin: 'top',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
}

export const dropdownVariantsFromTopFast = {
  hidden: {
    opacity: 0,
    scaleY: 0.8,
    transformOrigin: 'top',
    transition: { duration: 0.1, ease: [0, 0, 1, 1] }, // linear
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: 'top',
    transition: { duration: 0.12, ease: [0, 0, 1, 1] }, // linear
  },
  exit: {
    opacity: 0,
    scaleY: 0.8,
    transformOrigin: 'top',
    transition: { duration: 0.1, ease: [0, 0, 1, 1] }, // linear
  },
}

export const dropdownVariantsFromBot = {
  hidden: {
    opacity: 0,
    scaleY: 0.8,
    transformOrigin: 'bottom',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transformOrigin: 'bottom',
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    scaleY: 0.8,
    transformOrigin: 'bottom',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
}
