import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class TaskDTO {
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value?.trim())
  readonly name: string;
}
