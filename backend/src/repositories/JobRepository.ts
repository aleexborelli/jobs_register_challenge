import { getRepository, Repository } from 'typeorm';
import CreateJobDTO from '../dtos/CreateJobDTO';
import Job from '../models/Job';
import IJobRepository from './IJobRepository';

class JobRepository implements IJobRepository {
  private ormRepository: Repository<Job>;

  constructor() {
    this.ormRepository = getRepository(Job);
  }

  public async findById(id: number): Promise<Job> {
    return this.ormRepository.findOne({
      where: { id },
    })
  }

  public async findAll(): Promise<Job[]> {
    return this.ormRepository.find();
  }

  public async findByEmployer(employer_name: string): Promise<Job[]> {
    return this.ormRepository.find({
      where: { employee_name: employer_name },
    });
  }

  public async create({
    title,
    description,
    employer_name,
    pay_range,
    requirements,
  }: CreateJobDTO): Promise<Job> {
    const job = this.ormRepository.create({
      title,
      description,
      employer_name,
      pay_range,
      requirements,
    });

    await this.ormRepository.save(job);
    return job;
  }

  public async save(job: Job): Promise<Job> {
    return this.ormRepository.save(job);
  }
}

export default JobRepository;
