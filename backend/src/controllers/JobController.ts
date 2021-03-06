import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import Job from '../models/Job';
import JobRepository from '../repositories/JobRepository';
import CreateJobService from '../services/Job/CreateJobService';
import ListAllJobService from '../services/Job/ListAllJobsService';
import ShowJobService from '../services/Job/ShowJobService';
import UpdatedJobService from '../services/Job/UpdateJobService';

class JobController {
  public async index(request: Request, response: Response): Promise<Response> {
    const jobRepository = new JobRepository();
    const jobService = new ListAllJobService(jobRepository);

    const jobs = await jobService.execute();

    return response.json(jobs);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const jobRepository = getRepository(Job)

    await jobRepository.delete(id);

    return response.json({ message: 'Job deleted' })
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const jobsRepository = new JobRepository();
    const jobService = new ShowJobService(jobsRepository);

    const job = await jobService.execute(Number(id))

    return response.json(job);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      employer_name,
      requirements,
      pay_range,
    } = request.body;

    const jobRepository = new JobRepository()
    const createJob = new CreateJobService(jobRepository)

    const job = await createJob.execute({
      title,
      description,
      employer_name,
      requirements,
      pay_range,
    })

    return response.status(201).json(job)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      title,
      description,
      employer_name,
      requirements,
      pay_range,
    } = request.body;

    const jobRepository = new JobRepository()
    const updateJob = new UpdatedJobService(jobRepository)

    const job = await updateJob.execute({
      id,
      title,
      description,
      employer_name,
      requirements,
      pay_range,
    })

    return response.status(201).json(job)
  }
}

export default JobController;
