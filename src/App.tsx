import type { JSX } from 'react';
import './App';

function Sidebar(): JSX.Element {
  return (
    <div className='bg-red flex-[0_1_250px]'>p</div>
  )
}

function Content(): JSX.Element {
  return (
    <section className='bg-blue flex-1'>x</section>
  )
}

function App(): JSX.Element {

  return (
    <>
      <header className=''>Perro</header>
      <main className='flex'>
        <Sidebar />
        <Content />
      </main>
    </>
  )
}

export default App
