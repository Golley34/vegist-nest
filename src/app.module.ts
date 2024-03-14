import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { Product } from './products/products.model';
import { ProductsModule } from './products/products.module';
import { Products_info } from './products/products_info.model';
import { Products_info_images } from './products/products_info_images.model';
import { Cart } from './cart/cart.model';
import { CartProduct } from './cart/cart-product.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductsSizeModule } from './products-size/products-size.module';
import * as path from 'path'
import { Size } from './products-size/size.model';
import { SizeProducts } from './products-size/size-products.model';
import { JwtModule } from '@nestjs/jwt';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: String(process.env.POSTGRES_HOST),
            port: Number(process.env.POSTGRES_PORT),
            username: String(process.env.POSTGRES_USER),
            password: `${process.env.POSTGRES_PASSWORD}`,
            database: String(process.env.POSTGRES_DB),
            models: [User, Role, UserRoles, Product, Products_info, Products_info_images, Cart, CartProduct, Size, SizeProducts],
            autoLoadModels: true,
            synchronize: true,
      }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProductsModule,
        CartModule,
        FilesModule,
        ProductsSizeModule,
        JwtModule
    ],
})

export class AppModule {}