import Job from '../../models/Job';
import IJobRepository from '../../repositories/IJobRepository';

interface IRequest {
  title: string;
  description: string;
  employer_name: string;
  requirements: string;
  pay_range: number;
}

export default class CreateJobService {
  private jobRepository: IJobRepository;

  constructor(jobsRepository: IJobRepository) {
    this.jobRepository = jobsRepository;
  }

  public async execute({
    title,
    description,
    employer_name,
    requirements,
    pay_range,
  }: IRequest): Promise<Job> {
    const job = await this.jobRepository.create({
      title,
      description,
      employer_name,
      requirements,
      pay_range,
    });

    return job;
  }
}
