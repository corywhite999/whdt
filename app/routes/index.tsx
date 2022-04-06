import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { Theme, useTheme } from '../utils/theme'
import { json } from '@remix-run/server-runtime'
import { getMdxListItems } from '~/utils/mdx.server'
import { getSeo } from '~/utils/seo'
import LogoDark from '~/assets/images/white-house-dark.png'
import LogoLight from '~/assets/images/white-house-light.png'

type LoaderData = { blogList: Awaited<ReturnType<typeof getMdxListItems>> }

const [seoMeta, seoLinks] = getSeo()

export const meta: MetaFunction = () => {
  return { ...seoMeta }
}

export const links: LinksFunction = () => {
  return [...seoLinks]
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'cache-control':
      loaderHeaders.get('cache-control') ?? 'private, max-age=60',
    Vary: 'Cookie',
  }
}

export const loader: LoaderFunction = async () => {
  const blogList = await getMdxListItems({ contentDirectory: 'blog' })

  return json<LoaderData>(
    { blogList: blogList.slice(0, 10) },
    { headers: { 'cache-control': 'private, max-age=60' } },
  )
}

export default function Index() {
  const [theme] = useTheme()

  return (
    <article>
      <section className='flex flex-col justify-between mx-auto h-screen max-w-4xl divide-y'>
        <h1 className='flex min-h-[30%] flex-col items-center p-4'>
          <img
            className='h-64'
            src={theme === Theme.dark ? LogoDark : LogoLight}
            alt='Logo'
          />
        </h1>
        <section className='flex min-h-[60%]'>
          <div className='mx-3 my-3 mb-3 flex flex-row'>
            <div className='w-72 h-48 m-3 flex flex-col rounded-lg bg-white shadow border-solid border divide-y'>
              <span className='font-semibold px-2 pt-1 uppercase text-center'>Drums</span>
              <span className='mt-3 mx-2 px-2 pt-4 text-center'>
                Custom drums tracks created with as little or as much direction
                as you want to provide.
              </span>
            </div>
            <div className='w-72 h-48 m-3 flex flex-col rounded-lg bg-white shadow border-solid border divide-y'>
              <span className='font-semibold px-2 pt-1 uppercase text-center'>Percussion</span>
              <span className='mt-3 mx-2 px-2 pt-4 text-center'>
                Shakers, tambourines, the usual. Anything that serves your song
                and gets your vibe happening.
              </span>
            </div>
            <div className='w-72 h-48 m-3 flex flex-col rounded-lg bg-white shadow border-solid border divide-y'>
              <span className='font-semibold px-2 pt-1 uppercase text-center'>Noises</span>
              <span className='mt-3 mx-2 px-2 pt-4 text-center'>
                Coke bottles, pans of wrenches, bleeps and blips, whatever. If
                it makes your song sound cool, I'll hit it with a stick.
              </span>
            </div>
          </div>
        </section>
      </section>
    </article>
  )
}
