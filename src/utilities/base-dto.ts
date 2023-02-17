import { ClassConstructor, plainToClass } from 'class-transformer';

export class BaseDTO<T> {
  constructor(body: T) {
    Object.assign(
      this,
      plainToClass(this.constructor as ClassConstructor<T>, body, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
