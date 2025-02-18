import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from '@repo/ui/dto/address.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Address } from './entities/address.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/public.decorator';

@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Create address for user' })
  @ApiCreatedResponse({ type: Address })
  @Public()
  @Post()
  create(
    @Request() req,
    @Body(ValidationPipe) createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(createAddressDto, req.user);
  }

  @ApiOperation({ summary: 'Get address for user' })
  @ApiOkResponse({ type: Address, isArray: true })
  @Get()
  getAddressForUser(@Request() req) {
    return this.addressService.getAddressForUser(req.user.id);
  }

  @ApiOperation({ summary: 'Update address for user' })
  @ApiOkResponse({ type: Address })
  @Put(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, req.user.id, updateAddressDto);
  }

  @ApiOperation({ summary: 'Set default address for user' })
  @ApiOkResponse({ type: Address })
  @Patch(':addressId/set-default')
  setDefaultAddress(
    @Request() req,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    return this.addressService.setDefaultAddress(req.user.id, addressId);
  }

  @ApiOperation({ summary: 'Remove address for user' })
  @ApiOkResponse({ description: 'Address successfully removed' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id);
  }
}
