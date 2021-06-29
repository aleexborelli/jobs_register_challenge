import CreateJobDTO from '../dtos/CreateJobDTO';
import Job from '../models/Job';

export default interface IJobRepository {
  findAll(): Promise<Job[]>;
  findById(id: number): Promise<Job>;
  create(createJobDTO: CreateJobDTO): Promise<Job>;
  save(job: Job): Promise<Job>;
};
