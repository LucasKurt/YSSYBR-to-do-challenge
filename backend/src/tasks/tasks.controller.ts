import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDTO } from 'src/tasks/dtos/task.dto';
import { TaskFinishedDTO } from './dtos/taskFinished.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  insert(@Body() dto: TaskDTO) {
    return this.taskService.insert(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: TaskDTO) {
    return this.taskService.update(id, dto);
  }

  @Patch(':id')
  finished(@Param('id') id: string, @Body() dto: TaskFinishedDTO) {
    return this.taskService.finished(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
