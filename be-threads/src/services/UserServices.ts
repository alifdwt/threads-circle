import { Repository } from "typeorm";
import { Users } from "../entities/users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import createUserSchema from "../utils/validator/users";

export default new (class UserServices {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async findUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.UserRepository.find({
        relations: {
          threads: true,
        },
      });

      if (users.length <= 0) {
        return res.status(404).json({ code: 404, message: "Users not found" });
      }

      return res.status(200).json({ code: 200, data: users });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.userId);
      const user = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          threads: true,
        },
      });

      if (!user) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }

      return res.status(200).json({ code: 200, data: user });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      //   const image = req.file.filename;

      const { error, value } = createUserSchema.validate(data);
      if (error) {
        return res.status(400).json({ code: 400, error: error.message });
      }

      const user = this.UserRepository.create({
        username: value.username,
        full_name: value.full_name,
        email: value.email,
        password: value.password,
        profile_picture: value.profile_picture,
        profile_description: value.profile_description,
      });

      const createdUser = await this.UserRepository.save(user);
      return res.status(201).json({ code: 201, data: createdUser });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.userId);
      const updateUser = req.body;
      if (!updateUser) {
        return res.status(404).json({ code: 404, error: "User not found" });
      }

      const user = await this.UserRepository.findOne({
        relations: {
          threads: true,
        },
        where: {
          id: userId,
        },
      });

      if (updateUser.username == "") {
        updateUser.username = user[0].username;
      }
      if (updateUser.full_name == "") {
        updateUser.full_name = user[0].full_name;
      }
      if (updateUser.email == "") {
        updateUser.email = user[0].email;
      }
      if (updateUser.password == "") {
        updateUser.password = user[0].password;
      }
      if (updateUser.profile_picture == "") {
        updateUser.profile_picture = user[0].profile_picture;
      }
      if (updateUser.profile_description == "") {
        updateUser.profile_description = user[0].profile_description;
      }

      const update = await this.UserRepository.update(user, updateUser);
      return res.status(200).json({ code: 200, data: update });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.userId);
      const userToDelete = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!userToDelete) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }

      await this.UserRepository.remove(userToDelete);
      return res
        .status(200)
        .json({ code: 200, message: `User with id ${userId} deleted` });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }
})();
