import { useState, type JSX } from 'react';

import './App.css';

import {project as projects_data} from './utils/test_data';

interface Project {
  id: number;
  name: string;
  description: string;
}

interface SidebarProps {
  onselect?: (project: Project) => void | null;
}

function Sidebar({onselect}: SidebarProps): JSX.Element {
  const [projects] = useState<Project[]>(projects_data);

  const handleClick = (project: Project) => {
    onselect?.(project);
  }
  
  return (
    <aside className='flex-[0_1_250px]'>
      <h2>Lista de proyectos</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <button onClick={() => handleClick(project)}>
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Content(): JSX.Element {
  return (
    <section className='bg-blue flex-1'>x</section>
  )
}

function App(): JSX.Element {
  const [projecSelected, setProjectSelected] = useState<Project | null>(null);

  console.log(projecSelected);

  return (
    <>
      <header className='text-center'>Perro</header>
      <main className='flex'>
        <Sidebar onselect={setProjectSelected}/>
        <Content />
      </main>
    </>
  )
}

export default App
