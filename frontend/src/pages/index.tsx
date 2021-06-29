import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../services/api';

import styles from './home.module.scss';
import { useRouter } from 'next/router';

type Job = {
  id: string;
  title: string;
  description: string;
  pay_range: string;
  employer_name: number;
  createdAt: string;
  requirements: string;
};

type HomeProps = {
  allJobs: Job[];
};

export default function Home({ allJobs }: HomeProps) {
  const router = useRouter();

  async function handleDeleteJob(id: string) { 
    await api.delete(`/jobs/${id}`);
 
    router.replace(router.asPath);
  }

  return (
    <div className={styles.homepage}>
      <div className={styles.homepageHeader}>
        <h2>Todas as vagas</h2>

        <Link href='/jobs/create'>Nova Vaga</Link>
      </div>
      <section className={styles.allJobs}>
        {allJobs.map((job) => (
          <div className={styles.jobs} key={job.id}>
            <div className={styles.jobsTitle}>
              <h1>{job.title}</h1>

              <button type='button' onClick={() => handleDeleteJob(job.id)}>
                x
              </button>
            </div>
            <div className={styles.jobsContent}>
              <p>Level: Engineer </p>
              <p>R$ {job.pay_range},00 </p>
            </div>

            <div className={styles.jobsFooter}>
              <p> {job.employer_name} </p>
              <div className={styles.jobsButtons}>
                <button type='button'> Apply </button>
                <Link href={`/jobs/${job.id}`}>
                  <button type='button'> See </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('jobs');

  const jobs = data.map((job: any) => {
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      pay_range: job.pay_range,
      createdAt: format(parseISO(job.created_at), 'd MMM yy', {
        locale: ptBR,
      }),
      employer_name: job.employer_name,
    };
  });

  const allJobs = jobs;

  return {
    props: {
      allJobs,
    },
    revalidate: 60 * 60 * 8, // atualizando a API a cada 8hrs
  };
};
