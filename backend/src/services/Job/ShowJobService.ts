import Job from '../../models/Job';
import IJobRepository from '../../repositories/IJobRepository'

class ShowJobService {
  private jobsRepository: IJobRepository;

  constructor(jobsRepository: IJobRepository) {
    this.jobsRepository = jobsRepository;
  }

  public async execute(id: number):Promise<Job> {
    const job = await this.jobsRepository.findById(id);

    return job;
  }
}

export default ShowJobService
