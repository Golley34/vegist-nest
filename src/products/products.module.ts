import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from 'src/cart/cart.model';
import { CartProduct } from 'src/cart/cart-product.model';
import { Products_info } from './products_info.model';
import { Products_info_images } from './products_info_images.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Cart, CartProduct, Products_info, Products_info_images]),
  ],
})
export class ProductsModule {}
