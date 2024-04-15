import Container from '#/UI/Container'
import Promo from '@/components/App/index/Promo'
import Programs from '##/index/Programs'
import Medicine from '##/index/Medicine'

export default function Home() {
  return (
    <>
      <Promo classes="w-full h-[65vh] sm:!h-[100svh] sm:h-[100vh]" />
      <Container last={true}>
        <Medicine classes="w-full h-[50vh] xl:h-[55vh]" />
        <Programs />
      </Container>
    </>
  )
}
