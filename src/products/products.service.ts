import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/createProducts.dto';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Products_info } from './products_info.model';
import { ProductsSizeService } from 'src/products-size/products-size.service';


@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(Products_info)
        private productInfo: typeof Products_info,
        private productSize: ProductsSizeService,
        private filesService: FilesService,
    ) {}

    async createProduct(dto: CreateProductsDto, image: any){
        const fileName = await this.filesService.createFile(image)
        const product = await this.productModel.create({name: dto.name, price: dto.price, categories: dto.categories, image: fileName})
        const product_info = await this.productInfo.create({more_detail: dto.more_detail})
       
        await product.$set('info', product_info.id)
        product.info = product_info

        product.size = []
        await Promise.all(dto.size.map(async (item) => {
            const product_size = await this.productSize.getSize(item)
            await product.$add('size', product_size.id)

            
            product.size.push(product_size)
        }));

        return product
    }

    async getAllProducts() {
        const products = await this.productModel.findAll()
        return products;
    }

    async getSortProducts(categories, sort_by, size) {

        let products: Product[]

        if(!sort_by && !size) {
            console.log(1);
             products = await this.productModel.findAll({where: {categories}, include: {all: true}})
            
        }

        if(!sort_by && size) {
            console.log(3);
             products = await this.productModel.findAll({where: {categories}, include: {all: true}})
        }

        if(sort_by && !size) {
            console.log(2);
             products = await this.productModel.findAll({where: {categories}, include: {all: true}})
        }

        if(sort_by && size) {
            console.log(4);
             products = await this.productModel.findAll({where: {categories}, include: {all: true}})
        }


        console.log(categories, sort_by, size);
        
        return products;
    }

}
