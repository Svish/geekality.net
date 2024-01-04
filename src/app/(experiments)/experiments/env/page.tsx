export default async function Page() {
  return <pre>{JSON.stringify(process.env, undefined, 2)}</pre>
}
