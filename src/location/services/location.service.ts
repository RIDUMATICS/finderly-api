import { HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../entities/location.entity';
import { Location } from '../interfaces/location.interface';
import greatCircleDistance from '../utils/distance';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepo: Repository<LocationEntity>,
  ) {}

  // Create new location
  async create(body: Location) {
    const location = await this.locationRepo.findOne(body.id);

    // location does not exists create
    if (!location) {
      const newLocation = this.locationRepo.create(body);
      return this.locationRepo.save(newLocation);
    }

    // if location exits
    throw new HttpException(
      'Location with the same ID already exist',
      HttpStatus.CONFLICT,
    );
  }

  // Edit Location
  async update(id: string, body: any) {
    const location = await this.locationRepo.findOne(id);

    // if location does not exits
    if (!location) {
      throw new NotFoundException('Location not found');
    }

    this.locationRepo.merge(location, body);
    return this.locationRepo.save(location);
  }

  async delete(id: string) {
    const location = await this.locationRepo.findOne(id);

    // if location does not exits
    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return this.locationRepo.delete(id);
  }

  // Fetch All Locations
  findAllLocations() {
    return this.locationRepo.find();
  }

  // Fetch Specific Location
  async findLocationById(id: string) {
    const location = await this.locationRepo.findOne(id);

    // if location does not exits
    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async calculateDistance(locationAId: string, locationBId: string) {
    const locationA = await this.locationRepo.findOne(locationAId);
    const locationB = await this.locationRepo.findOne(locationBId);

    if (!locationA) {
      throw new NotFoundException(`Location: ${locationAId} not found`);
    } else if (!locationB) {
      throw new NotFoundException(`Location: ${locationBId} not found`);
    }

    return {
      locationA: locationA,
      locationB: locationB,
      distance: greatCircleDistance(locationA, locationB),
    };
  }
}
