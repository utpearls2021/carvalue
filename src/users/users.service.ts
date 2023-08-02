import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  create(email: any, password: any) {
    const user = this.repo.create({ email: email, password: password });

    return this.repo.save(user);
  }

  findOne(id: any) {
    return this.repo.findOne({ where: id });
  }

  find(query: any) {
    return this.repo.find({ where: query });
  }

  async update(id: any, data: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return await this.repo.save(user);
  }

  async remove(id: any) {
    const user = await this.findOne(id);
    return await this.repo.remove(user);
  }
}
