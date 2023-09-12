import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly siteEntityRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findOneResult = await this.siteEntityRepository.findOneBy({
      username: createUserDto.username,
    });
    if (findOneResult !== null) {
      console.error(`用户 ${createUserDto.username} 已存在，请更换重试`);
      throw new HttpException(
        `用户 ${createUserDto.username} 已存在，请更换重试`,
        HttpStatus.CREATED,
      );
    }
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.siteEntityRepository.save(createUserDto);
  }

  findAll() {
    return this.siteEntityRepository.find({
      where: {
        isDelete: false,
      },
    });
  }

  findOne(id: number) {
    return this.siteEntityRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.siteEntityRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.siteEntityRepository.delete(id);
  }
}
