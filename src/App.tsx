import { Connect } from './components/Connect'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Practice } from './components/Practice'
import { useMotion } from './hooks/useMotion'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  const motion = useMotion()

  return (
    <div className="app-shell" data-paused={motion.paused} data-reduced={motion.reduced}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" tabIndex={-1}>
        <Hero theme={theme} motion={motion} />
        <Practice motion={motion} />
        <Connect />
      </main>
      <Footer theme={theme} />
    </div>
  )
}

export default App
