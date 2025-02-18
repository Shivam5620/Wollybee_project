import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateAddressDto, UpdateAddressDto } from '@repo/ui/dto/address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    private readonly userService: UserService,
  ) {}

  async create(createAddressDto: CreateAddressDto, currentUser?: User) {
    const address = this.addressRepository.create(createAddressDto);
    if (currentUser?.id) {
      const user = await this.userService.findOne({
        where: { id: currentUser.id },
        relations: [],
      });
      if (!user) {
        throw new Error('User not found');
      }
      address.user = user;
    }

    return this.addressRepository.save(address);
  }

  getAddressForUser(userId: number) {
    return this.addressRepository.find({ where: { user: { id: userId } } });
  }

  findOne(options: FindOneOptions<Address>) {
    return this.addressRepository.findOne(options);
  }

  async update(id: number, userId: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address || address.user.id !== userId) {
      throw new Error('Address not found');
    }
    // Merge the updated data
    this.addressRepository.merge(address, updateAddressDto);

    return this.addressRepository.save(address);
  }

  async setDefaultAddress(userId: number, addressId: number): Promise<Address> {
    // Validate if the address belongs to user
    const addressToSetDefault = await this.addressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
    });
    if (!addressToSetDefault) {
      throw new Error('Address not found');
    }

    // Set isDefault to false of all the addresses of user
    await this.addressRepository.update(
      { user: { id: userId }, isDefault: true },
      { isDefault: false },
    );

    // Set the address to be default
    addressToSetDefault.isDefault = true;
    return this.addressRepository.save(addressToSetDefault);
  }

  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}
