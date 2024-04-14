import {unstable_noStore as noStore} from 'next/cache'
import {client, urlForImage} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'

import Text from '#/UI/Text'

interface Program {
  name: string
  duration: string
  description: string
  images: Array<{asset: {url: string}}>
  pdf: {asset: {url: string}}
  slug: {current: string}
}

const getData = async (): Promise<Program[]> => {
  noStore()

  const query = `
    *[_type == 'program'] {
        name,
        duration,
        description,
        images,
        pdf,
        slug
    }`

  const data: Program[] = await client.fetch(query)
  return data
}

const Program = async () => {
  const programs: Program[] = await getData()

  if (!programs) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section data-section="programs-index" className="mt-20 space-y-7 text-center">
      <Text type="heading" text="Программы" />

      <div className="grid grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 items-start gap-5">
        {programs.map(
          (program, idx) =>
            program.slug &&
            program.slug.current && (
              <Link key={idx} href={`/program/${program.slug.current}`} className="flex flex-col justify-between h-[500px] w-full gap-5 p-5 border-2 border-custom-teal group">
                {program.images && program.images.length > 0 && (
                  <div className="w-full h-[250px] relative self-center">
                    <Image src={urlForImage(program.images[0]).url()} className="object-cover" fill={true} alt={`program 0`} />
                  </div>
                )}

                <div className="space-y-2">
                  <h1 className="text-2xl font-medium ">{program.name}</h1>
                  <h2 className="line-clamp-3">{program.description}</h2>
                </div>
                <button title="Подробнее" className="w-full py-2 text-white duration-300 bg-custom-teal group-hover:bg-custom-teal/85">
                  Подробнее
                </button>
              </Link>
            ),
        )}
      </div>
    </section>
  )
}

export default Program