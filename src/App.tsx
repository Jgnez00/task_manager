import { useEffect, useState, type JSX } from 'react';

import './App.css';

import {project as projects_data, tasks as tasks_data} from './utils/test_data';


interface Project {
  id: number;
  name: string;
  description: string;
}


interface Task {
  id: number;
  projectId: number;
  title: string;
  num_tasks: number;
  description: string;
  status: string;
}


interface SidebarProps {
  onSelect?: (project: Project) => void | null;
}


interface ProjectProps {
  projects: Project[];
  onClick: (project: Project) => void;
}


interface ProjectDetail {
  project: Project | null;
}


interface TasksList {
  onSelect: (task: Task) => void;
  projectId: number;
}


function Sidebar ({onSelect}: SidebarProps): JSX.Element {
  const [projects] = useState<Project[]>(projects_data);

  const handleClick = (project: Project) => {
    onSelect?.(project);
  }
  
  return (
    <aside className='flex-[0_1_250px] bg-surface-800'>
      <h2 className='tracking-wider text-xs font-semibold text-surface-400'>PROYECTOS( {projects.length} )</h2>
      
      <ProjectItems projects={projects} onClick={handleClick}/>
    </aside>
  );
}


function ProjectItems ({projects, onClick}: ProjectProps): JSX.Element {
  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>
          <button onClick={() => onClick(project)}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}


export function TasksList ({projectId, onSelect}: TasksList) {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const handleClick = (task: Task) => {
    onSelect(task);
    console.log(task);
  }

  useEffect(() => {
    const filtered = tasks_data.filter(task => task.projectId === projectId);
    setTasks(filtered);
  }, [projectId]);
  
  return (
    <>
      <h2>Tareas</h2>
      
      <ul className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'>{
        tasks.length > 0
          ? (
            tasks?.map(task => (
              <li key={task.id} onClick={() => handleClick(task)}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span>{task.status}</span>
              </li>
            ))
          ) : (
            <p>Sele</p>
          )
      }</ul>
    </>
  );
}


function ProjectDetail({project}: ProjectDetail): JSX.Element {
  const [taskseleted, setTaskSeleted] = useState<Task | null>(null);
  
  return (
    <section className='bg-blue flex-1 bg-surface-800 px-5 py-3'>
      {project ? (
        <>
          <div>
            <h2>{project.name} :</h2>
            <p>{project.description}</p>
          </div>
          
          <TasksList projectId={project.id} onSelect={setTaskSeleted} />
        </>
      ) : (
        <p className='text-center'>Selecciona un proyecto</p>
      )}
    </section>
  )
}


function App(): JSX.Element {
  const [projecSelected, setProjectSelected] = useState<Project | null>(null);

  console.log(projecSelected);

  return (
    <>
      <header className='text-center'>Task Manager</header>
      <main className='flex gap-3'>
        <Sidebar onSelect={setProjectSelected}/>
        <ProjectDetail project={projecSelected}/>
      </main>
    </>
  )
}


export default App
