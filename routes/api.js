'use strict';
/**
 * API Routes
 **/
 var Joi = require('joi'),
 ctrl = require('../controllers');

 var apiRoutes = [
  // HTTP GET for getting employee based on ID

  {
    method: 'GET',
    path: '/api/v1.1/company/{id}',
    config: {
      handler: ctrl.company.findById,
      description: 'Finds a Company by id',
      tags: ['api', 'company'],
      validate: {
        params: {
          id: Joi.string().alphanum().trim().min(24).max(24).required()
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
        schema: {
          name: Joi.string().trim().min(2).max(50).required(),
          description: Joi.string().trim().min(40).max(500)
          
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/api/v1.1/company',
    config: {
      handler: ctrl.company.findByName,
      description: 'Finds all Companys or one by name|degree query',
      tags: ['api', 'company'],
      validate: {
        query: {
          name: Joi.string().trim().min(3).max(50)
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
        schema: Joi.array().single().includes(
          Joi.object().keys({
            name: Joi.string().trim().min(2).max(50).required(),
            description: Joi.string().trim().min(40).max(500)
            
          })
          )
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'PUT',
    path: '/api/v1.1/company/{id}',
    config: {
      handler: ctrl.company.updateById,
      description: 'Updates a Company',
      tags: ['api', 'company'],
      validate: {
        params: {
          id: Joi.string().alphanum().trim().min(24).max(24).required()
        },
        payload: {
          name: Joi.string().trim().min(2).max(50),
          description: Joi.string().trim().min(40).max(500)
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  }
  ];

  module.exports = apiRoutes;
