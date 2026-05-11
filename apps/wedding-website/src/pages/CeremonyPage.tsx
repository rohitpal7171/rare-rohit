import type { FC } from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { Footer } from '@app/components/layout/Footer'
import { Navbar } from '@app/components/layout/Navbar'
import { PageWrapper } from '@app/components/layout/PageWrapper'
import { Baraat } from '@app/components/ceremonies/Baraat'
import { Haldi } from '@app/components/ceremonies/Haldi'
import { Mehendi } from '@app/components/ceremonies/Mehendi'
import { Pheras } from '@app/components/ceremonies/Pheras'
import { Reception } from '@app/components/ceremonies/Reception'
import { Sangeet } from '@app/components/ceremonies/Sangeet'
import { Vidaai } from '@app/components/ceremonies/Vidaai'
import type { CeremonySlug } from '@shared/utils'

const ceremonyMap: Record<CeremonySlug, FC> = {
  haldi:     Haldi,
  mehendi:   Mehendi,
  sangeet:   Sangeet,
  baraat:    Baraat,
  pheras:    Pheras,
  vidaai:    Vidaai,
  reception: Reception,
}

const VALID_SLUGS = new Set<string>(Object.keys(ceremonyMap))

export const CeremonyPage = () => {
  const { slug } = useParams<{ slug: string }>()

  if (slug === undefined || !VALID_SLUGS.has(slug)) {
    return <Navigate to="/" replace />
  }

  const Component = ceremonyMap[slug as CeremonySlug] as FC

  return (
    <>
      <Navbar />
      <PageWrapper>
        <Component />
      </PageWrapper>
      <Footer />
    </>
  )
}
