import { Module } from '@nestjs/common';
import { ProductsSizeService } from './products-size.service';
import { ProductsSizeController } from './products-size.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { Size } from './size.model';
import { SizeProducts } from './size-products.model';

@Module({
  controllers: [ProductsSizeController],
  providers: [ProductsSizeService],
  imports: [
    SequelizeModule.forFeature([Product, Size, SizeProducts])
  ],
  exports: [ProductsSizeService]
})
export class ProductsSizeModule {}
