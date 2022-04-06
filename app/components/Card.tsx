interface CardProps {
  title: string
  children: React.ReactNode
}

export default function Card(props: CardProps) {
  return (
    <div className='m-3 flex h-48 w-64 flex-col divide-y rounded-lg border border-solid bg-white shadow'>
      <span className='self-center px-2 pt-1 text-center font-semibold uppercase'>
        {props.title}
      </span>
      <span className='mx-2 mt-3 px-2 pt-4 text-center'>{props.children}</span>
    </div>
  )
}
