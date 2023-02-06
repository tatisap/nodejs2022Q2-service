import { ClassConstructor, plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { BaseEntity } from 'lib/entities';
import { Property } from 'lib/types';

export class Repository<T extends BaseEntity> {
  protected db: T[];
  protected entity: ClassConstructor<T>;

  findMany(property?: Property<T>): T[] {
    if (property) {
      const { key, value } = property;
      if (Array.isArray(value)) {
        return this.db.filter((item) => value.includes(item[key]));
      }
      return this.db.filter((item) => item[key] === value);
    }
    return this.db;
  }

  findById(id: string): T | null {
    return this.db.find((item) => item.id === id);
  }

  create(body: Omit<T, keyof BaseEntity>): T {
    const plainItem = { id: uuid(), ...body };
    const item = plainToInstance(this.entity as ClassConstructor<T>, plainItem);
    this.db.push(item);
    return item;
  }

  update(id: string, body: Partial<Omit<T, keyof BaseEntity>>): T {
    const item = this.db.find((item) => item.id === id);
    Object.assign(item, body);
    return item;
  }

  delete(id: string): [T] {
    const itemIndex = this.db.findIndex((item) => item.id === id);
    return this.db.splice(itemIndex, 1) as [T];
  }
}
