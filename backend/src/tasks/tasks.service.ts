import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from 'src/tasks/dtos/task.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return this.taskRepository.find();
  }

  insert(taskDTO: TaskDTO) {
    const task = this.taskRepository.create({ ...taskDTO, finished: false });
    return this.taskRepository.save(task);
  }

  async update(id: string, taskDTO: TaskDTO) {
    const task = await this.taskRepository.preload({
      id,
      ...taskDTO,
      finished: false,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.taskRepository.save(task);
  }

  async finished(id: string, finished: boolean) {
    const task = await this.taskRepository.preload({
      id,
      finished,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.taskRepository.save(task);
  }

  async delete(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.taskRepository.remove(task);
  }
}
