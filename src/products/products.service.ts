import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/createProducts.dto';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Products_info } from './products_info.model';
import { ProductsSizeService } from 'src/products-size/products-size.service';
import { Size } from 'src/products-size/size.model';
import { Op } from 'sequelize';




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
        try {
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
        } catch {
            throw new HttpException('Ошибка при создании продукта', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async getProductByPK(id: number) {
        const product = await this.productModel.findByPk(id)
        return product;
    }

    async deleteProductByPK(id: number) {
        const product = await this.productModel.findByPk(id)
        await product.destroy();
    }

    async getAllProducts() {
        const products = await this.productModel.findAll()
        return products;
    }

    async getSortProducts(categories: string, sort_by: string | undefined, size: string[] | undefined, page: number | undefined) {

        let products: Product[] | Product 
        let pageNumber = page || 1
        let limit = 15
        let offset = pageNumber * limit - limit

        if(!sort_by && !size) {
            products = await this.productModel.findAll({where: {categories}, include: {model: Size}, limit, offset})
        }

        if(!sort_by && size) {
            products = await this.productModel.findAll({
                where: {
                    categories,
                }, 
                include: {
                    model: Size,
                    where: {
                        size: {
                            [Op.or]: [size]
                        }
                    }
                },
                limit, offset
            })
        }

        if(sort_by && !size) {
            switch (sort_by) {
                case 'price_ascending':
                    products = await this.productModel.findAll({where: {categories}, order: [['price', 'ASC']],
                    include: {model: Size}, limit, offset})
                    break;
                case 'price_descending':
                    products = await this.productModel.findAll({where: {categories}, order: [['price', 'DESC']],
                    include: {model: Size}, limit, offset})
                    break;
                case 'title_ascending':
                    products = await this.productModel.findAll({where: {categories}, order: [['name', 'ASC']],
                    include: {model: Size}, limit, offset})
                    break;
                case 'title_descending':
                    products = await this.productModel.findAll({where: {categories}, order: [['name', 'DESC']],
                    include: {model: Size}, limit, offset})
                    break;
                default:
                    products = await this.productModel.findAll({where: {categories},
                        include: {model: Size}, limit, offset})
            }
        }

        if(sort_by && size) {
            switch (sort_by) {
                case 'price_ascending':
                    products = await this.productModel.findAll({where: {categories}, 
                        include: {model: Size, where: {size: {[Op.or]: [size]}}},
                        order: [['price', 'ASC']], limit, offset})
                    break;
                case 'price_descending':
                    products = await this.productModel.findAll({where: {categories}, 
                        include: {model: Size, where: {size: {[Op.or]: [size]}}}, 
                        order: [['price', 'DESC']], limit, offset})
                    break;
                case 'title_ascending':
                    products = await this.productModel.findAll({where: {categories}, 
                        include: {model: Size, where: {size: {[Op.or]: [size]}}}, 
                        order: [['name', 'ASC']], limit, offset})
                    break;
                case 'title_descending':
                    products = await this.productModel.findAll({where: {categories}, 
                        include: {model: Size, where: {size: {[Op.or]: [size]}}}, 
                        order: [['name', 'DESC']], limit, offset})
                    break;
                default:
                    products = await this.productModel.findAll({where: {categories}, 
                        include: {model: Size, where: {size: {[Op.or]: [size]}}}, limit, offset})
            }
        }

        return products;
    }

}