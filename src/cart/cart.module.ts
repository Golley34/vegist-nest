import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Product } from 'src/products/products.model';
import { CartProduct } from './cart-product.model';
import { Cart } from './cart.model';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from 'src/products/products.module';


@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    SequelizeModule.forFeature([Cart, User, Product, CartProduct]),
    JwtModule.register({ secret: process.env.PRIVATE_KEY }),
    JwtModule,
    ProductsModule,
  ],
  exports: [CartService]
})
export class CartModule {}
