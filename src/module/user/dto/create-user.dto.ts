import { UserGender, UserStatus } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '账号名称', example: 'admin' })
  username: string;

  @ApiProperty({ description: '账号名称', example: 'admin', required: false })
  nickname: string;

  @ApiProperty({ description: '账号密码' })
  password: string;

  @ApiProperty({ description: '用户性别', default: UserGender.OTHER })
  gender: UserGender;

  @ApiProperty({ description: '用户头像', required: false })
  avatar: string;

  @ApiProperty({ description: '用户电话', required: false })
  mobile: string;

  @ApiProperty({ description: '用户邮箱', required: false })
  email: string;

  @ApiProperty({ description: '用户权限', required: false })
  role: string[];

  @ApiProperty({ description: '用户状态', default: UserStatus.INACTIVATED })
  userStatus: UserStatus;
}
