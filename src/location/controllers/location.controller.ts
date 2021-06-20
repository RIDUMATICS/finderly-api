import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateLocationDto,
  DistanceQueryDto,
  LocationParamDto,
  UpdateLocationDto,
} from '../dtos/location.dto';
import { Location } from '../interfaces/location.interface';
import { LocationService } from '../services/location.service';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  findAll() {
    return this.locationService.findAllLocations();
  }

  @Get('/distance')
  distance(@Query() query: DistanceQueryDto) {
    return this.locationService.calculateDistance(
      query.locationA,
      query.locationB,
    );
  }

  @Get(':id')
  findById(@Param() params: LocationParamDto) {
    return this.locationService.findLocationById(params.id);
  }

  @Post()
  create(@Body() newLocation: CreateLocationDto) {
    return this.locationService.create(newLocation);
  }

  @Patch('/:id')
  update(@Param() params: LocationParamDto, @Body() body: UpdateLocationDto) {
    return this.locationService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param() params: LocationParamDto) {
    return this.locationService.delete(params.id);
  }
}
