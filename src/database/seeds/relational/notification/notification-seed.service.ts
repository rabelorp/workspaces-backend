import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../../../notifications/infrastructure/persistence/relational/entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationSeedService {
  constructor(
    @InjectRepository(NotificationEntity)
    private repository: Repository<NotificationEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      // await this.repository.save(this.repository.create({}));
    }
  }
}
