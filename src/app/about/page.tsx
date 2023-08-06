import H1 from '@/components/H1'
import Link from '@/components/Link'
import Prose from '@/components/Prose'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ pathname: '/about', label: 'About' }]} />
      <H1>About</H1>
      <Prose>
        <p>
          Greetings! I am <b>Torleif Berger</b>, and I’m a{' '}
          <b>Software Engineer</b>. I’m a{' '}
          <a href="https://www.adventist.org/en/beliefs/">
            Seventh-Day Adventist
          </a>
          , an{' '}
          <a href="https://www.amazon.com/Quiet-Power-Introverts-World-Talking/dp/0307352153">
            introvert
          </a>
          , an{' '}
          <a href="https://www.16personalities.com/isfj-personality">ISFJ-T</a>,
          and an <a href="https://hsperson.com">HSP</a>.
        </p>
        <p>
          Things I’ve been into recently and in the past includes{' '}
          <b>forest hikes</b> and <b>indoor rock climbing</b>; also dabble a bit
          with <b>indoor rowing</b>, <b>juggling</b>, and other fun activities,
          but most of my time <em>is</em> spent in front of a screen… c”,)
        </p>

        <h2>Me on the web</h2>
        <ul>
          <li>
            <Link href="/">Personal website</Link> (you’re here)
          </li>
          <li>
            <a href="https://github.com/svish">GitHub</a>
          </li>
          <li>
            <a href="https://twitter.com/svish">Twitter</a>
          </li>
          <li>
            <a href="https://stackoverflow.com/users/39321/svish">
              StackOverflow
            </a>
          </li>
        </ul>
      </Prose>
    </>
  )
}
