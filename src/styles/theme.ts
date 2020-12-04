export const theme = {
  rootFontSize: '10px',
  fonts: {
    helvetica: '"Helvetica Neue LT W05 55 Roman"',
    rubik: '"Rubik"',
    sneak: '"Sneak"',
  },
  colors: {
    black: '#252525',
    violet: '#545BF1',
    white: '#FFFEF5',
    grey: '#838383',
    lightGrey: '#BBBBBB',
  },
  nav: {
    animationDuration: '150ms',
    padding: {
      top: {
        desktop: '3.5rem',
        mobile: '4rem',
      },
      bottom: {
        desktop: '3.5rem',
        mobile: '4rem',
      },
      sides: {
        desktop: '3.5rem',
        mobile: '1.5rem',
      },
    },
    itemSize: {
      desktop: '3.1rem',
      mobile: '2rem',
    },
    logoWidth: {
      desktop: '16rem',
      mobile: '12rem',
    },
    navHeight: function () {
      return {
        desktop: `calc((${this.padding.top.desktop}+${this.padding.bottom.desktop})+${this.itemSize.desktop})`,
        mobile: `calc((${this.padding.top.mobile}+${this.padding.bottom.mobile})+${this.itemSize.mobile})`,
      }
    },
  },
}

export type Theme = typeof theme
