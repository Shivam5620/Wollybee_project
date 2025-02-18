import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Query,
  Request,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { GetFeedbacksDto, GetFeedbacksQueryDto } from './dto/get-feedback.dto';
import { IFeedback } from '@repo/ui/types/feedback';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { Feedback } from './entities/feedback.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create feedback' })
  @ApiCreatedResponse({ type: Feedback })
  create(@Body(ValidationPipe) createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks' })
  @ApiOkResponse({ type: GetFeedbacksDto, isArray: true })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.feedback.read])
  findAll(
    @Request() req,
    @Query(ValidationPipe) query: GetFeedbacksQueryDto,
  ): Promise<Pagination<IFeedback>> {
    const options: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      route: req.path,
    };
    return this.feedbackService.findAll(options, query);
  }

  @ApiOperation({ summary: 'Update feedback by id' })
  @ApiOkResponse({ type: Feedback })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.feedback.update])
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback by id' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.feedback.delete])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.remove(id);
  }
}
