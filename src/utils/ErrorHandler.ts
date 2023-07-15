import { Response } from 'express';

export const errorHandler = (res: Response, message: string) => {
  switch (message) {
    case 'MISSING_DATA':
      return res.status(400).json({ code: 400, message: 'Data enviada incorrecta / faltante.' });
    case 'MISSING_ID':
      return res.status(400).json({ code: 400, message: 'ID faltante' });
    case 'INVALID_CODE':
      return res.status(400).json({ code: 400, message: 'El código de recuperación no existe' });
    case 'PASSWORD_NOT_MATCH':
      return res.status(400).json({ code: 400, message: 'Las contraseñas no coinciden' });
    case 'USER_NOT_FOUND':
    case 'INVALID_USER':
      return res.status(400).json({ code: 400, message: 'Usuario no encontrado' });
    case 'UNCONFIRMED_USER':
      return res.status(400).json({ code: 400, message: 'Usuario no confirmado' });
    case 'INVALID_CREDENTIAL':
      return res
        .status(400)
        .json({ code: 400, message: 'Contraseña incorrecta. Intenta nuevamente' });
    case 'USER_ALREADY_EXIST':
      return res
        .status(400)
        .json({ code: 400, message: 'El correo electronico ya se encuentra registrado' });
    case 'CREATE_ERROR':
      return res.status(400).json({ code: 400, message: 'Error al crear. Intente nuevamente' });
    case 'DATA_NOT_FOUND':
      return res
        .status(400)
        .json({ code: 400, message: 'No se encontró lo que estabas buscando.' });
    default:
      return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
};
