type Props = {
  param: string
  defaultValue: string
}

export default function SearchInput({ param, defaultValue }: Props) {
  return (
    <form method="GET">
      <input
        className="w-full px-4 py-2 rounded-full"
        name={param}
        type="search"
        autoFocus
        defaultValue={defaultValue}
      />
    </form>
  )
}
