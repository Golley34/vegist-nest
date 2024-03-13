import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductAtCartDto } from './dto/ProductAtCart.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Cart } from './cart.model';
import { User } from 'src/users/users.model';
import { Product } from 'src/products/products.model';




@ApiTags('Корзина')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({summary: 'Получение всех корзин'})
  @ApiResponse({status: 200, type: [Cart]})
  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts()
  }

  @ApiOperation({summary: 'Добавление товара в корзину'})
  @ApiResponse({status: 200, type: ProductAtCartDto})
  @Post()
  addProductAtCart(@Body() dto: ProductAtCartDto) {
    return this.cartService.addProductAtCart(dto)
  }

  @ApiOperation({summary: 'Удаление товара из корзины'})
  @ApiResponse({status: 200, type: ProductAtCartDto})
  @Delete()
  removeProductAtCart(@Body() dto: ProductAtCartDto) {
    return this.cartService.removeProductAtCart(dto)
  }

  @ApiOperation({summary: 'Получение корзины по id'})
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(Cart) },
        {
          properties: {
            User: { $ref: getSchemaPath(User) },
            products: {
              type: 'array',
              items: { $ref: getSchemaPath(Product) },
            }
          },
        },
      ],
    },
  })
  @Get('/:id')
  getCartByPK(@Param('id') id: number) {
    return this.cartService.getCartByPK(id)
  }
}
