import Head from 'next/head'
import { useEffect, useState } from 'react'
import classname from 'classname'
import toast, { toastConfig } from 'react-simple-toasts';
import styles from '../styles/Home.module.css'
import 'react-simple-toasts/dist/theme/dark.css'; // choose your theme

toastConfig({ theme: 'dark' });

export default function Home() {
  const [agenda, setAgenda] = useState([])
  useEffect(() => {
    getAgenda()
  }, [])

  const getAgenda = () => {
    fetch('/api/agenda')
      .then((res) => res.json())
      .then(({ data }) => {
        if(Array.isArray(data)) 
        setAgenda(data)
      })
  }

  const updateAgenda = (title, status) => {
    fetch(`/api/agenda?title=${title}`, {
      method: "POST",
      body: JSON.stringify({
        done: status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.status)
      .then(() => {
        toast('Agenda Updated!!')
        getAgenda()
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          It's Code Academy Session on<br /><a href="https://kubernetes.io/docs/home/">Kubernetes</a><br /><img width="200px" src='/kicon.png' alt='kicon' />
        </h2>
        <h1>
          Agenda
        </h1>

        <div className={styles.grid}>
          {agenda.map(({ desp, title, done, _id }) => <div key={_id} onClick={() => updateAgenda(title, !done)} className={classname(styles.card, { [styles.active]: done })}>
            <h3>{title}</h3>
            <p>{desp}</p>
          </div>)}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/voda.png" alt="voda" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
