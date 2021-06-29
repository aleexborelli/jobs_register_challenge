import AppError from '../../errors/AppError';
import Job from '../../models/Job';
import IJobRepository from '../../repositories/IJobRepository';

interface IRequest {
  id: string;
  title: string;
  description: string;
  employer_name: string;
  requirements: string;
  pay_range: number;
}

class UpdatedJobService {
  private jobRepository: IJobRepository;

  constructor(jobRepository: IJobRepository) {
    this.jobRepository = jobRepository;
  }

  public async execute({
    id,
    title,
    description,
    employer_name,
    requirements,
    pay_range,
  }: IRequest): Promise<Job> {
    const job = await this.jobRepository.findById(Number(id))

    if (!job) {
      throw new AppError('Job not found', 400)
    }

    job.title = title;
    job.description = description;
    job.employer_name = employer_name;
    job.requirements = requirements;
    job.pay_range = pay_range;

    await this.jobRepository.save(job)

    return job;
  }
}

export default UpdatedJobService;
