import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};

export const getUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const user = await User.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};

export const createUser = async (req: Request<{}, {}, { name: string }>, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req: Request<{ id: string }, {}, { name: string }>, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error:any) {
    res.status(500).send(error.message);
  }
};
