import express from 'express';
import authController from './auth.controller';

export default express
  .Router()
  .post('/login', authController.login)
  .post('/register', authController.register);
