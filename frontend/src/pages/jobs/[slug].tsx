import { GetStaticPaths, GetStaticProps } from 'next';
import api from '../../services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './jobs.module.scss';

type Job = {
  id: string;
  title: string;
  description: string;
  employer_name: string;
  requirements: string;
  pay_range: number;
  created_at: string;
};

type JobProps = {
  job: Job;
};

export default function Job({ job }: JobProps) {
  return (
    <div className={styles.job}>
      <header>
        <h1>{job.title}</h1>
        <span>{job.employer_name}</span>
        <span>Published: {job.created_at}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: job.requirements }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const { data } = await api.get(`/jobs/${slug}`);

  const job = {
    id: data.id,
    title: data.title,
    description: data.description,
    employer_name: data.employer_name,
    requirements: data.requirements,
    pay_range: data.pay_range,
    created_at: format(parseISO(data.created_at), 'dd/MM/yyyy', {
      locale: ptBR,
    }),
  };

  return {
    props: {
      job,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
