import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateJobsTable1624895791289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'jobs',
      columns: [
        {
          name: 'id',
          type: 'integer',
          generationStrategy: 'increment',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'employer_name',
          type: 'varchar',
        },
        {
          name: 'requirements',
          type: 'varchar',
        },
        {
          name: 'pay_range',
          type: 'integer',
        },
        {
          name: 'is_active',
          type: 'boolean',
          default: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('jobs')
  }
}
