import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type SupportedLanguagesType = 'fr' | 'en';
export type StageType = 'setup' | 'support' | 'feedback';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  gdpr: boolean;

  @Column({ nullable: true })
  language: SupportedLanguagesType;

  @Column()
  stage: StageType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time_created: Date;
}
