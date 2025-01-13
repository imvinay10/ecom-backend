import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'users/entities/user.entity';

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  // You can add custom methods here if needed
}
