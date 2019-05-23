import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, PassportLocalDocument } from 'mongoose';
import { User } from './user.base';

@Injectable()
export class AuthService<TUser extends User = User> {
    constructor(@InjectModel("User") private readonly userModel: Model<TUser>) { }

    /*******************************************************
     * Get One User by Id
     *******************************************************/

    public async findById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    public async findByUsername(id: string) {
        return await this.userModel.findOne( {

        } as Partial<TUser>);
    }

    /*******************************************************
     * Create User
     *******************************************************/

    public async createUser(username: string, email: string, password: string) {
        let user = new this.userModel( {
            email,
            username,
            password,
        } as Partial<User>);
        user = await user.save();
        return user;
    }

    /*******************************************************
     * Update User
     *******************************************************/

    public async updateUser(id: string, username: string, email: string, password: string, role: string) {
        let user = await this.findById(id);
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
    }

    // /*******************************************************
    //  * Delete User
    //  *******************************************************/

    // public deleteUser(id: string) {
    //     return new Promise((resolve, reject) => {
    //         db.run(
    //             "DELETE From user WHERE id = ?", [id], (err) => {
    //                 return !err ?
    //                     resolve({ message: 'User ' + id + ' has been deleted' }) :
    //                     reject(new HttpException(err, 500));
    //             });
    //     });
    // }
}
