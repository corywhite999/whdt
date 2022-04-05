import { useLoaderData } from '@remix-run/react'
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { Theme, useTheme } from '../utils/theme'
import { json } from '@remix-run/server-runtime'
import BlogList from '~/components/blog-list'
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
  const { blogList } = useLoaderData<LoaderData>()
  const [theme] = useTheme()

  return (
    <>
      <section className='mx-auto max-w-4xl'>
        <div className='grid h-[calc(100vh-92px)] place-content-center'>
          <h1 className='flex flex-col items-center p-4'>
            <img className='h-64' src={theme === Theme.dark ? LogoDark : LogoLight} alt='Logo' />
          </h1>
        </div>
      </section>
      <section className='mx-auto mt-32 w-[90vw]'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='text-xl text-gray-800 dark:text-gray-100'>
            Recent Posts
          </h2>
          <BlogList blogList={blogList} />
        </div>
      </section>
    </>
  )
}
