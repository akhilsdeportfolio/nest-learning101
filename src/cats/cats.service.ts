import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { UserData } from 'src/dto/userData.dto';
import { Cat } from 'src/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    @InjectQueue('test') private bull: Queue,
  ) {}

  async createCat(catData: UserData): Promise<{ id: string }> {
    const id = (await this.catModel.create({ ...catData })).id;
    this.bull.add({ ...catData });
    return { id: id };
  }

  async getCats(): Promise<Cat[]> {
    this.eventEmitter.emit('get_cats', this);
    return this.catModel.find({});
  }

  async updateCat(breed, newData: UserData): Promise<Cat> {
    return this.catModel.findOneAndUpdate(
      { breed },
      { ...newData },
      { new: true },
    );
  }
}
