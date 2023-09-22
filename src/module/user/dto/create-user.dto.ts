import { UserGender, UserStatus } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(1, 128, { message: '账号需大于 1 位，小于 128 位' })
  @IsString({ message: '账户必须为字符串类型' })
  @IsNotEmpty({ message: '账号不能为空' })
  @ApiProperty({ description: '账号名称', example: 'admin' })
  username: string;

  @Length(1, 128, { message: '昵称需大于 1 位，小于 128 位' })
  @IsOptional()
  @ApiProperty({ description: '账号昵称', example: 'admin', required: false })
  nickname: string;

  @Length(6, 128, { message: '密码需大于 6 位，小于 128 位' })
  @IsString({ message: '密码必须为字符串类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({ description: '账号密码' })
  password: string;

  @IsEnum(UserGender)
  @IsOptional()
  @ApiProperty({ description: '用户性别', default: UserGender.OTHER })
  gender: UserGender;

  @IsString({ message: '用户头像必须为字符串类型' })
  @IsOptional()
  @ApiProperty({ description: '用户头像', required: false })
  avatar: string;

  @IsMobilePhone('zh-CN')
  @IsOptional()
  @ApiProperty({ description: '用户电话', required: false })
  mobile: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: '用户邮箱', required: false })
  email: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: '用户权限', required: false })
  role: string[];

  @IsEnum(UserStatus)
  @IsOptional()
  @ApiProperty({ description: '用户状态', default: UserStatus.INACTIVATED })
  userStatus: UserStatus;
}
