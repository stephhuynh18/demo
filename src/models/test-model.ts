import TypeORM from 'typeorm';
const { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } = TypeORM;

@Entity()
export class TestModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  message: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
