import {client, urlForImage} from '@/lib/sanity'

import Heading from '#/UI/Heading'
import RoomsSlider from '##/index/RoomsSlider'
import {revalidateOnTime} from '@/lib/utils'

interface Room {
  name: string
  description: string
  specification: any
  images: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<Room[]> {
  const data = await client.fetch<Room>(
    `*[_type == 'rooms'] {
        name,
        description,
        specification,
        images,
        slug
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return Array.isArray(data) ? data : []
}

const Rooms = async () => {
  const rooms: Room[] = await getData()

  if (!rooms) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const sliderData = rooms.map((room) => ({
    name: room.name,
    description: room.description,
    specification: room.specification,
    imageUrls: room.images.map((image) => urlForImage(image.asset).url()),
    slug: room.slug.current,
  }))

  return (
    <section data-section="rooms-index" className="space-y-7 sm:space-y-5">
      <Heading type="title" classes="text-center" text="Номера" />

      <RoomsSlider sliderData={sliderData} classes="w-full rounded-md" />
    </section>
  )
}

export default Rooms
