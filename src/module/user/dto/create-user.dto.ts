import { UserGender, UserStatus } from '../entities/user.entity';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ description: '账号名称', example: 'admin' })
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ description: '账号名称', example: 'admin', required: false })
  nickname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @ApiProperty({ description: '账号密码' })
  password: string;

  @IsEnum(UserGender, {
    each: true,
    message: `must be a valid role value`,
  })
  @ApiProperty({ description: '用户性别', default: UserGender.OTHER })
  gender: UserGender;

  @IsString()
  @ApiProperty({ description: '用户头像', required: false })
  avatar: string;

  @IsMobilePhone('zh-CN')
  @ApiProperty({ description: '用户电话', required: false })
  mobile: string;

  @IsEmail()
  @ApiProperty({ description: '用户邮箱', required: false })
  email: string;

  @ApiProperty({ description: '用户权限', required: false })
  role: string[];

  @IsEnum(UserStatus, {
    each: true,
    message: `must be a valid role value`,
  })
  @ApiProperty({ description: '用户状态', default: UserStatus.INACTIVATED })
  userStatus: UserStatus;
}
