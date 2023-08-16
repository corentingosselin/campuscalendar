import { BaseEntity, User, UserRole } from '@campuscalendar/shared/api-interfaces';
import { BeforeCreate, BeforeUpdate, Entity, Property } from '@mikro-orm/core';
import * as argon2 from "argon2";


@Entity()
export class UserEntity extends BaseEntity implements User {
  
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role: UserRole = UserRole.STUDENT;
  
  @BeforeCreate()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
  
}
