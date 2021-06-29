import Link from 'next/link';
import Router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import styles from './create.module.scss';

type CreateJobFormData = {
  title: string;
  description: string;
  employer_name: string;
  requirements: string;
  pay_range: string;
};

export default function JobCreate() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const notifySuccess = () => toast('Vaga adicionada com sucesso');

  const handleNewJob: SubmitHandler<CreateJobFormData> = async ({
    title,
    description,
    employer_name,
    requirements,
    pay_range,
  }, event) => {
    event.preventDefault();

    api.post('/jobs', {
      title,
      description,
      employer_name,
      requirements,
      pay_range,
    });    
    
    notifySuccess();

    setTimeout(function () {
      Router.push('/');
    }, 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Cadastrar nova vaga</h2>
        </div>

        <form onSubmit={handleSubmit(handleNewJob)} className={styles.form}>
          <input
            id='title'
            placeholder='Title'
            {...register('title', { required: true })}
          />
          {errors.title && <span>This field is required</span>}

          <input
            id='description'
            placeholder='Description'
            {...register('description', { required: true })}
          />
          {errors.description && <span>This field is required</span>}

          <input
            id='employer_name'
            placeholder='Employer'
            {...register('employer_name', { required: true })}
          />
          {errors.description && <span>This field is required</span>}

          <textarea
            id='requirements'
            placeholder='Requirements'
            {...register('requirements', { required: true })}
          />
          {errors.description && <span>This field is required</span>}

          <input
            id='pay_range'
            placeholder='Pay Range'
            {...register('pay_range', { required: true })}
          />
          {errors.description && <span>This field is required</span>}

          <div className={styles.buttons}>
            <button>
              <Link href="/">
                Cancel
              </Link>
            </button>
            <button type='submit'>Save</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
