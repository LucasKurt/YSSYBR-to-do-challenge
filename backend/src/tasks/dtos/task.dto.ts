import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class TaskDTO {
  @IsString()
  @MinLength(3, { message: 'A tarefa deve ter somente 3 carácteres' })
  @Transform(({ value }) => value?.trim())
  readonly name: string;
}
