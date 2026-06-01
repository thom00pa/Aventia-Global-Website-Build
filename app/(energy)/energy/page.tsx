// app/(energy)/energy/page.tsx
import EnergyHero        from '@/components/sections/energy/EnergyHero'
import SavingsCalculator from '@/components/sections/energy/SavingsCalculator'
import PlanComparison    from '@/components/sections/energy/PlanComparison'
import EnrollmentForm    from '@/components/sections/energy/EnrollmentForm'
import CommercialQuote   from '@/components/sections/energy/CommercialQuote'
import BilingualContact  from '@/components/sections/energy/BilingualContact'

export default function EnergyPage() {
  return (
    <>
      <EnergyHero />
      <SavingsCalculator />
      <PlanComparison />
      <EnrollmentForm />
      <CommercialQuote />
      <BilingualContact />
    </>
  )
}
