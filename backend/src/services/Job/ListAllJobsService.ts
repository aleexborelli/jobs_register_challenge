import Job from '../../models/Job';
import IJobRepository from '../../repositories/IJobRepository';

class ListAllJobService {
  private jobRepository: IJobRepository;

  constructor(jobRepository: IJobRepository) {
    this.jobRepository = jobRepository;
  }

  public async execute(): Promise<Job[]> {
    const jobs = await this.jobRepository.findAll()

    return jobs;
  }
}

export default ListAllJobService;
