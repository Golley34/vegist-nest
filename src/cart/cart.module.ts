import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Product } from 'src/products/products.model';
import { CartProduct } from './cart-product.model';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    SequelizeModule.forFeature([User, Product, CartProduct]),
  ],
})
export class CartModule {}
