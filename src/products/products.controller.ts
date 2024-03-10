import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/createProducts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(@Body() dto: CreateProductsDto, @UploadedFile() image){
    return this.productsService.createProduct(dto, image)
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get(':categories/?')
  getUsers(@Param('categories') categories: string,
    @Query('size') size?: string,
    @Query('sort_by') sort_by?: string,
  ) {
    return this.productsService.getSortProducts(categories, sort_by, size);
  }
}

