import { Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { IBase } from 'src/interfaces';

@Injectable()
export class BaseService<T extends Document> implements IBase {
  constructor(private readonly model: Model<T>) {}

  async create(entity) {
    const item = await this.model.create(entity);
    return item;
  }

  async update(id, entity) {
    const item = await this.model.findByIdAndUpdate(id, entity, { new: true });
    return item;
  }

  async delete(id, filter) {
    const item = await this.model.findByIdAndDelete(id);
    return item;
  }

  async getAll(
    filter: any,
    page_index: number,
    page_size: number,
  ): Promise<any> {
    const aggregate = [
      ...filter,
      {
        $skip: page_size * (page_index - 1),
      },
      {
        $limit: page_size,
      },
    ];

    const items = await this.model.aggregate(aggregate);

    const total = await this.model.aggregate(filter).count('total').exec();

    const count = total.length === 0 ? 0 : total[0].total;

    return {
      page_index,
      page_size,
      items,
      total: count,
    };
  }

  async getOneById(id: string) {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async getOne(filter: {}) {
    const item = await this.model.findOne(filter).exec();
    return item;
  }

  async getFilter(filter) {
    const item = await this.model.aggregate(filter).exec();
    return item;
  }
}
