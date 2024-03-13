import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/createProducts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Product } from './products.model';
import { Size } from 'src/products-size/size.model';


@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({summary: 'Создание продукта'})
  @ApiResponse({status: 200, type: Product})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(@Body() dto: CreateProductsDto, @UploadedFile() image){
    return this.productsService.createProduct(dto, image)
  }

  @ApiOperation({summary: 'Получение всех продуктов'})
  @ApiResponse({status: 200, type: [Product]})
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @ApiOperation({summary: 'Получение одного продукта'})
  @ApiResponse({status: 200, type: Product})
  @Get('product/:id')
  getProductByPK(@Param('id') id: number) {
    return this.productsService.getProductByPK(id)
  }

  @ApiOperation({summary: 'Удаление одного продукта'})
  @ApiResponse({status: 200})
  @Delete('/:id')
  deleteProductByPK(@Param('id') id: number) {
    return this.productsService.deleteProductByPK(id)
  }

  @ApiOperation({summary: 'Получение всех продуктов в соответствии с заданными параметрами и сортировками'})
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(Product) },
        {
          properties: {
            Size: {
              type: 'array',
              items: { $ref: getSchemaPath(Size) },
            }
          },
        },
      ],
    },
  })
  @Get(':categories/?')
  getSortProducts(@Param('categories') categories: string,
    @Query('size') size?: string[],
    @Query('sort_by') sort_by?: string,
    @Query('page') page?: number,
  ) {
    return this.productsService.getSortProducts(categories, sort_by, size, page);
  }
}

