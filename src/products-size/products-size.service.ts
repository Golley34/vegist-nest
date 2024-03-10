import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size } from './size.model';
import { CreateSizeDto } from './dto/createSize.dto';

@Injectable()
export class ProductsSizeService {

    constructor(
        @InjectModel(Size)
        private productSize: typeof Size,
    ) {}

    async createSize(dto: CreateSizeDto) {
        const size = await this.productSize.create(dto)
        return size;
    }

    async getSize(size: string) {
        const productSize = await this.productSize.findOne({where: {size}})
        return productSize;
    }
}
