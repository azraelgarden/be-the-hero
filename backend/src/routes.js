const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SectionController = require('./controllers/SectionController');
const routes = express.Router();

routes
  .post('/session', SectionController.create)

  .get('/ongs', OngController.index)
  .post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(13),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  }), OngController.create)

  .get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }), ProfileController.index)


  .get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }), IncidentController.index)
  
  .post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }), IncidentController.create)
  
  .delete('/incidents/:id',  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }), IncidentController.delete);

module.exports = routes;