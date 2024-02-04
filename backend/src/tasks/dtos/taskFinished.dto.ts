import { IsBoolean } from 'class-validator';

export class TaskFinishedDTO {
  @IsBoolean()
  readonly finished: boolean;
}
