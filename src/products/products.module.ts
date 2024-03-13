import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from 'src/cart/cart.model';
import { CartProduct } from 'src/cart/cart-product.model';
import { Products_info } from './products_info.model';
import { Products_info_images } from './products_info_images.model';
import { Product } from './products.model';
import { FilesModule } from 'src/files/files.module';
import { Size } from 'src/products-size/size.model';
import { SizeProducts } from 'src/products-size/size-products.model';
import { ProductsSizeModule } from 'src/products-size/products-size.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Cart, CartProduct, Product, Products_info, Products_info_images, Size, SizeProducts]),
    ProductsSizeModule,
    FilesModule
  ],
  exports: [
    ProductsService,
  ]
})
export class ProductsModule {}
