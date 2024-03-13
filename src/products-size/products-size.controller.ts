import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsSizeService } from './products-size.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Size } from './size.model';
import { CreateSizeDto } from './dto/createSize.dto';


@ApiTags('Веса продуктов')
@Controller('products-size')
export class ProductsSizeController {
  constructor(private readonly productsSizeService: ProductsSizeService) {}

  @ApiOperation({summary: 'Создание размера'})
  @ApiResponse({status: 200, type: Size})
  @Post()
  createRole(@Body() sizeDto: CreateSizeDto) {
    return this.productsSizeService.createSize(sizeDto)
  }

  @ApiOperation({summary: 'Получение размера'})
  @ApiResponse({status: 200, type: [Size]})
  @Get('/:size')
  getRoles(@Param('size') size: string) {
    return this.productsSizeService.getSize(size)
  }
}
