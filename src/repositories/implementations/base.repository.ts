import { Document, Model } from 'mongoose';
import { IBaseRepository } from '../interfaces/base.repository.interface';


export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T | null> {
        try {
            const result = await this.model.findById(id).exec();
            return result;
        } catch (error) {
            console.log(error, 'findById Error');
            return null;
        }
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            const document = new this.model(data);
            return await document.save();
        } catch (error) {
            console.log('Error creating document:', error);
            throw error;
        }
    }
}