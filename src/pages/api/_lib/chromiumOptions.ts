import chrome from 'chrome-aws-lambda'

const chromeExecPaths = {
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  aix: '',
  android: '',
  freebsd: '',
  haiku: '',
  openbsd:'',
  sunos: '',
  cygwin: '',
  netbsd: ''
}

const exePath = chromeExecPaths[process.platform]

interface Options {
  args: Array<string>
  executablePath: string
  headless: boolean
}

export const getOptions = async (isDev: boolean):Promise<Options> => {
  let options: Options

  if(isDev){
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  }else{
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    }
  }

  return options
}
