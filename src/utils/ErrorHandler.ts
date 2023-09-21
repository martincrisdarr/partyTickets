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
    case 'NO_TICKETS_FOUND':
      return res.status(400).json({ code: 400, message: 'No se encontraron tickets del evento' });
    case 'NO_TICKETS_FOUND_BY_SELLER':
      return res.status(400).json({ code: 400, message: 'No se encontraron tickets del vendedor' });
    case 'NO_TICKETS_REMAINING':
      return res.status(400).json({ code: 400, message: 'No quedaron tickets para entregar' });
    case 'NOT_TICKETS_POSSESING':
      return res.status(400).json({ code: 400, message: 'Este vendedor no posee tantos tickets' });
    case 'NO_QUANTITY_TICKETS_AVAILABLE_GIVE':
      return res
        .status(400)
        .json({ code: 400, message: 'No tienes los tickets suficientes para entregarle' });
    case 'NO_QUANTITY_TICKETS_AVAILABLE_RECEIVE':
      return res
        .status(400)
        .json({ code: 400, message: 'No tiene los tickets suficientes para recibirle' });
    case 'NO_EVENT_UPDATED':
      return res.status(400).json({ code: 400, message: 'No se pudo actualizar el evento' });
    case 'GET_ONE_SELLER':
      return res.status(400).json({ code: 400, message: 'No existe el vendedor' });
    case 'NOT_SELLER_REMOVE':
      return res.status(400).json({ code: 400, message: 'No se pudo eliminar el vendedor' });
    case 'DATA_NOT_FOUND':
      return res
        .status(400)
        .json({ code: 400, message: 'No se encontró lo que estabas buscando.' });
    case 'DELETE_EVENT_WITH_TICKETS':
      return res
        .status(400)
        .json({ code: 400, message: 'No se puede borrar una fiesta con tickets.' });
    default:
      return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
};
