import expressJwt from 'express-jwt';

const api = process.env.API_URL;

/**
 * Мидлвар для проверки jwt токена на запросах, если токена нет или запрос не входит в разрешённый список,
 * возвращает ошибку.
 * @returns 
 */
export function jwtRequestProtect() {
  const secret = process.env.tokenSecret;

  return expressJwt({
    secret,
    algorithms: ['HS256']
    // iRevoked - свойство, которое утсанавливает, валидный ли токен, для этого надо в это значение передать
    // асинхронную функцию, у которой будет доступ к данным, зашифрованным в токине isRevoked(req, payload, done)
  }).unless({
    path: [
      `${api}/user/login`,
      `${api}/user/register`
    ]
  })
}
