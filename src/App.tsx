import { PageShell } from './components/layout/PageShell';
import { useLenis } from './hooks/useLenis';
import { HomeHero } from './sections/HomeHero';

function App() {
  useLenis();

  return (
    <PageShell>
      <HomeHero />
    </PageShell>
  );
}

export default App;
