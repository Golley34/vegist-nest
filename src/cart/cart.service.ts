import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cart } from './cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from 'src/products/products.service';
import { ProductAtCartDto } from './dto/ProductAtCart.dto';




@Injectable()
export class CartService {

    constructor(
        @InjectModel(Cart)
        private cartModel: typeof Cart,
        private productModel: ProductsService,
        private jwtService: JwtService,
    ) {}

    async createCart() {
        try {
            const cart = await this.cartModel.create()
            return cart;
        } catch {
            throw new HttpException('Ошибка при создании корзины', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllCarts() {
        const carts = await this.cartModel.findAll()
        return carts;
    }

    async getCartByPK(id: number) {
        const cart = await this.cartModel.findOne({where: {id}, include: {all: true}})
        return cart;
    }
    
    async addProductAtCart(dto: ProductAtCartDto) {
        const data = this.jwtService.decode(dto.token) as {email: string, id: number, roles: string[]}
        if (!data || !data.id) return
        const userId = data.id
        const cart = await this.cartModel.findOne({where: {userId}, include: {all: true}})
        const product = await this.productModel.getProductByPK(dto.productId)
        if (cart && product) {
            await cart.$add('products', product.id)
            return dto;
        }
        throw new HttpException('Корзина или продукт не найдены', HttpStatus.NOT_FOUND)
    }

    async removeProductAtCart(dto: ProductAtCartDto) {
        const data = this.jwtService.decode(dto.token) as {email: string, id: number, roles: string[]}
        if (!data || !data.id) return
        const userId = data.id
        const cart = await this.cartModel.findOne({where: {userId}, include: {all: true}})
        const product = await this.productModel.getProductByPK(dto.productId)
        if (cart && product) {
            await cart.$remove('products', product.id)
            return dto;
        }
        throw new HttpException('Корзина или продукт не найдены', HttpStatus.NOT_FOUND)
    }
}

