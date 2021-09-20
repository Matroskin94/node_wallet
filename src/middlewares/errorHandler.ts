/**
 * Мидлвар для обработки ошибок запросов
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */

export function errorHandler(err, req, res, next){
  if(err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'User not authorized' });
  } else if (err) {
    res.status(500).json({ message: 'Unhandled server'})
  }
}