import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import Text from '#/UI/Text'

interface Program {
  name: string
  short_description: string
  type: Array<{name: string; slug: string}>
  images: Array<{asset: {url: string}}>
  slug: {current: string}
}

async function getData(): Promise<Program[]> {
  const data = await client.fetch<Program>(
    `*[_type == 'programs'] {
        name,
        short_description,
        type[] -> { name, slug },
        images,
        slug,
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

const ProgramsPage = async () => {
  const programs: Program[] = await getData()

  if (!programs) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const programCategories = Array.from(new Set(programs.flatMap((program) => program.type.map((type) => type.name))))

  return (
    <Container classes="space-y-7 xl:space-y-5">
      <Heading type="title" text="Программы" />

      {programCategories.map((category, idx) => (
        <section className="space-y-5 bg-custom-light-gray p-3 rounded-md" key={idx}>
          <Text type="title" classes="text-center" text={category} />

          <div className="grid items-start grid-cols-3 gap-3 sm:grid-cols-1">
            {programs
              .filter((program) => program.type.some((type) => type.name === category))
              .map((program, idx) => (
                <Link className="flex flex-col justify-between gap-4 p-3 pb-4 rounded-md xl:gap-3 shadow-card group bg-white" href={`/programs/${program.slug.current}`} key={idx}>
                  <div className="relative self-center w-full overflow-hidden aspect-video group">
                    <Image className="object-cover w-full h-full group-hover:scale-[102%] duration-500 rounded-[4px]" src={urlForImage(program.images[0]).url()} fill={true} sizes="25vw" alt={`program ${idx}`} />
                  </div>

                  <div>
                    <Text type="title" text={program.name} />
                    <Text classes="line-clamp-3" type="caption" text={program.short_description} />
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </Container>
  )
}

export default ProgramsPage
