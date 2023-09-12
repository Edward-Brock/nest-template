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
    // 查找数据库中是否包含当前账号信息
    const findOneResult = await this.siteEntityRepository.findOneBy({
      username: createUserDto.username,
    });
    // 判断查找到的信息是否为 null，不为 null 则报错，为 null 则可以进行注册
    if (findOneResult !== null) {
      console.error(`账号名称 ${createUserDto.username} 已存在，请更换重试`);
      throw new HttpException(
        `账号名称 ${createUserDto.username} 已存在，请更换重试`,
        HttpStatus.CREATED,
      );
    }
    // 生成盐
    const salt = await bcrypt.genSalt();
    // 将 createUserDto 中的密码字段替换为已加密的密码字段
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.siteEntityRepository.save(createUserDto);
  }

  findAll() {
    return this.siteEntityRepository.find({
      where: {
        // 排除删除标记为 true 的数据
        isDelete: false,
      },
    });
  }

  findOne(id: number) {
    return this.siteEntityRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      // 生成盐
      const salt = await bcrypt.genSalt();
      // 将 createUserDto 中的密码字段替换为已加密的密码字段
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    return this.siteEntityRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.update(id, { isDelete: true });
  }
}
