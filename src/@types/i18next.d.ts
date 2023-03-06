import 'i18next'
import { resources, defaultNs } from 'src/i18n/i18n'

declare module 'i18next' {
  //ke thua (them vao type)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNs
    resources: typeof resources['vi']
  }
}
