import { Repository } from "typeorm";
import { Users } from "../entities/users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from "../utils/validator/users";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary/cloudinary";
import { deleteFile } from "../utils/fileHelper/fileHelper";

export default new (class UserServices {
  private readonly UserRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async findUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.UserRepository.find({
        relations: {
          threads: true,
          likes: true,
          followers: true,
          following: true,
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
          likes: true,
          followers: true,
          following: true,
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

  async getUserByUsername(req: Request, res: Response): Promise<Response> {
    try {
      const username: string = req.params.username;
      const user = await this.UserRepository.findOne({
        where: {
          username: username,
        },
        relations: {
          threads: true,
          likes: true,
          followers: true,
          following: true,
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
      const inputData = req.body;
      let imageResult;
      if (req.file && req.file.filename) {
        const image = req.file.filename;
        imageResult = await uploadToCloudinary(
          image,
          `Circle/profile/${inputData.username}/profile_picture`,
          inputData.username
        );
        deleteFile(req.file.filename);
      }
      const data = {
        username: inputData.username,
        full_name: inputData.full_name,
        email: inputData.email,
        password: inputData.password,
        profile_picture: imageResult,
        profile_description: inputData.profile_description,
      };

      const { error, value } = createUserSchema.validate(data);
      if (error) {
        return res.status(400).json({ code: 400, error: error.message });
      }

      const emailExists = await this.UserRepository.count({
        where: {
          email: value.email,
        },
      });
      if (emailExists > 0) {
        return res
          .status(400)
          .json({ code: 400, error: "Email already exists" });
      }

      const usernameExist = await this.UserRepository.count({
        where: {
          username: value.username,
        },
      });
      if (usernameExist > 0) {
        return res
          .status(400)
          .json({ code: 400, error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      const user = this.UserRepository.create({
        username: value.username,
        full_name: value.full_name,
        email: value.email,
        password: hashedPassword,
        profile_picture: value.profile_picture,
        profile_description: value.profile_description,
        // profile_banner: value.profile_banner
      });

      const createdUser = await this.UserRepository.save(user);
      return res.status(201).json({ code: 201, data: createdUser });
    } catch (error) {
      return res.status(500).json({ code: 500, error: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = loginSchema.validate(data);
      // if (error) {
      //   return res.status(400).json({ code: 400, error: error.message });
      // }
      const checkUser = await this.UserRepository.findOne({
        where: {
          email: value.email,
        },
        select: ["id", "full_name", "username", "email", "password"],
      });

      if (!checkUser) {
        return res.status(404).json({ code: 404, error: "User not found" });
      }

      const isPasswordMatch = await bcrypt.compare(
        value.password,
        checkUser.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ code: 401, error: "Incorrect password" });
      }

      const user = this.UserRepository.create({
        id: checkUser.id,
        full_name: checkUser.full_name,
        username: checkUser.username,
        email: checkUser.email,
      });

      const token = await jwt.sign({ user }, "rahasia-ilahi", {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, user });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        error: error.message,
        message: "errornya di login",
      });
    }
  }

  async checkUser(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      // console.log(loginSession)

      const user = await this.UserRepository.findOne({
        where: { id: loginSession.user.id },
      });

      return res
        .status(200)
        .json({ code: 200, user: user, message: "Login success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.userId);
      const updateUser = req.body;
      if (!updateUser) {
        return res.status(404).json({ code: 404, error: "User not found" });
      }

      let imageResult;
      if (req.file && req.file.filename) {
        const image = req.file.filename;
        imageResult = await uploadToCloudinary(
          image,
          `Circle/profile/${updateUser.username}/profile_picture`,
          updateUser.username
        );
        deleteFile(req.file.filename);
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
        updateUser.username = user.username;
      }
      if (updateUser.full_name == "") {
        updateUser.full_name = user.full_name;
      }
      if (updateUser.email == "") {
        updateUser.email = user.email;
      }
      // if (updateUser.password == "") {
      //   updateUser.password = user[0].password;
      // }
      if (updateUser.profile_picture == "") {
        updateUser.profile_picture = user.profile_picture;
      }
      if (imageResult) {
        updateUser.profile_picture = imageResult;
      }
      if (updateUser.profile_description == "") {
        updateUser.profile_description = user.profile_description;
      }

      const { error, value } = updateUserSchema.validate(updateUser);
      if (error) {
        return res.status(400).json({ code: 400, error: error.message });
      }

      // const emailExists = await this.UserRepository.count({
      //   where: {
      //     email: value.email,
      //   },
      // });
      // if (emailExists > 0) {
      //   return res
      //     .status(400)
      //     .json({ code: 400, error: "Email already exists" });
      // }

      // const usernameExist = await this.UserRepository.count({
      //   where: {
      //     username: value.username,
      //   },
      // });
      // if (usernameExist > 0) {
      //   return res
      //     .status(400)
      //     .json({ code: 400, error: "Username already exists" });
      // }

      // const hashedPassword = await bcrypt.hash(value.password, 10);

      const update = await this.UserRepository.createQueryBuilder()
        .update(Users)
        .set({
          username: value.username,
          full_name: value.full_name,
          email: value.email,
          password: user.password,
          profile_picture: value.profile_picture,
          profile_description: value.profile_description,
        })
        .where("id = :id", { id: userId })
        .execute();

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
