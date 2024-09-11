import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarageReservationEntity } from '../../../../garage-reservations/infrastructure/persistence/relational/entities/garage-reservation.entity';
import { Repository } from 'typeorm';
import { GarageReservationFactory } from './garage-reservation.factory';

@Injectable()
export class GarageReservationSeedService {
  constructor(
    @InjectRepository(GarageReservationEntity)
    private repository: Repository<GarageReservationEntity>,
    private garageReservationFactory: GarageReservationFactory,
  ) {}

  async run() {
    const garageReservation =
      await this.garageReservationFactory.createRandomGarageReservation();
    await this.repository.save(garageReservation);
  }
}
