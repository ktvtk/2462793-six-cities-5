import {ClassConstructor, plainToInstance} from 'class-transformer';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDto<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
