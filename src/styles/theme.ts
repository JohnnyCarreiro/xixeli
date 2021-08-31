const defaultTheme = {
  color:{
      gray_100: '#00000F',
      gray_200: '#343940',
      gray_300: '#697380',
      gray_400: '#9DACBF',
      gray_500: '#D1E5FF',
      gray_600: '#DAEAFF',
      gray_700: '#E4EFFF',
      gray_800: '#EDF5FF',
      gray_900: '#F6FAFF',
      gray_1000: '#F7FAFF',

      main:'#7029E1',
      primary: '#1279FF',
      secondary: '#F78D1E',

      alert: '#6BA2F6',
      danger: '#d31e45',
      success:'#45FF29',

  },
  texts:{
    main_title:'900 3rem/4.25rem Roboto, sans-serif',//h1
    title:'700 2rem/3.5rem Roboto, sans-serif',//h2
    sub_title:'700 1.5rem/3rem Roboto, sans-serif',//h3
    main_text:'400 1rem/1.5rem Roboto, sans-serif',//p, a ...
    main_strong:'700 1rem/1.5rem Roboto, sans-serif',//strong
    small_text:'300 0.875rem/1.3125rem Roboto, sans-serif'//p, a, small ..
  }
}

export type ThemeType = typeof defaultTheme
export default defaultTheme
