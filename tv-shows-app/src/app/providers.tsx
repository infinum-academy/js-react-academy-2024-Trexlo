'use client'

import { ShowPickerContextProvider } from '@/components/features/shows/ShowPicker/components/ShowPickerContextProvider'
import theme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

export function Providers({ children }: { children: React.ReactNode }) {
  return  <SWRConfig>
            <ChakraProvider theme={theme}>
              <ShowPickerContextProvider>
                {children}
              </ShowPickerContextProvider>
            </ChakraProvider>
          </SWRConfig>
}