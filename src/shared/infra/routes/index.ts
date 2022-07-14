import express from 'express'
import { ensureAuthenticate } from '../http/middlewares/ensureAuthenticated'
import multer from "multer";


import uploadConfig from "../../../config/upload";

const routes = express.Router()

//CONTROLLERS
const UserController = require('../../../modules/controllers/UsersController')
const AddressController = require('../../../modules/controllers/AddressesController')
const LoginController = require('../../../modules/controllers/LoginsController')
const TypePersonController = require('../../../modules/controllers/TypePersonsController')
const AcessController = require('../../../modules/controllers/AcessController')
const NaturalPersonController = require('../../../modules/controllers/NaturalPersonsController')
const LegalPersonController = require('../../../modules/controllers/LegalPersonsController')
const NotificationController = require('../../../modules/controllers/NotificationsController')
const Responsibles_Technician_Quality_Control = require('../../../modules/controllers/Responsibles_Technician_Quality_ControlController')
const Responsibles_Technician_Quality_Control_Crmv = require('../../../modules/controllers/Responsibles_Technician_Quality_Control_CrmvController')
const ConsultancyController = require('../../../modules/controllers/ConsultancysController')
const TaxAuditorController = require('../../../modules/controllers/TaxAuditorsController') 
const AuthenticationController = require('../../../modules/controllers/AuthenticationController')
const checklistController = require('../../../modules/controllers/checklistController')
const QuestionsController = require('../../../modules/controllers/QuestionsController')
const RespostasController = require('../../../modules/controllers/RespostasController')
const ResponseImagesController = require('../../../modules/controllers/ResponseImagesController')

const uploadResponsesImages = multer(uploadConfig.upload("./tmp/responseImages"));


//LOGINS ROUTES
routes.get("/login", LoginController.index)
routes.post("/login", LoginController.create) 
routes.put("/login/:loginId", LoginController.update)
routes.delete("/login/:loginId", LoginController.delete)

//USER ROUTES
routes.get("/users", UserController.index)
routes.post("/users/:loginId", UserController.create)
routes.put("/users/:userId", UserController.update)
routes.delete("/users/:userId", UserController.delete)

//CHECKLIST ROUTES
routes.get("/checklists", checklistController.index)
routes.post("/checklists/:userId", checklistController.create)
routes.put("/checklists/:checklistId", checklistController.update)
routes.delete("/checklists/:checklistId", checklistController.delete)

//QUESTIONS ROUTES
routes.get("/questions", QuestionsController.index)
routes.post("/questions/:checklistId", QuestionsController.create)
routes.put("/questions/:questionId", QuestionsController.update)
routes.delete("/questions/:questionId", QuestionsController.delete)

//RESPONSES ROUTES
routes.get("/responses", RespostasController.index)
routes.post("/responses/:questionId/:userId", RespostasController.create)
routes.put("/responses/:responseId", RespostasController.update)
routes.delete("/responses/:responseId", RespostasController.delete)

//IMAGES OF RESPONSE
// Ao fazer o upload, o label dos arquivos deve ter o mesmo Nome que esse objeto 
// recebido pela funcao array
routes.post("/responsesImages/:responseId", uploadResponsesImages.array("images"), ResponseImagesController.create)



//ADDRESSES ROUTES
routes.get("/address", AddressController.index)
routes.post("/address/:userId", AddressController.create) 
routes.put("/address/:addressId", AddressController.update)
routes.delete("/address/:addressId", AddressController.delete)


//TYPE PERSON ROUTES
routes.get("/typePerson", TypePersonController.index)
routes.post("/typePerson/:userId", TypePersonController.create) 
routes.put("/typePerson/:typePersonId", TypePersonController.update)
routes.delete("/typePerson/:typePersonId", TypePersonController.delete)

// ACESS ROUTES
routes.get("/acess", AcessController.index)
routes.post("/acess/:loginId", AcessController.create) 
routes.put("/acess/:loginId", AcessController.update)
routes.delete("/acess/:acessId", AcessController.delete)

//NATURAL PERSONS ROUTES
routes.get("/naturalPerson", NaturalPersonController.index)
routes.post("/naturalPerson/:userId", NaturalPersonController.create) 
routes.put("/naturalPerson/:naturalPersonId", NaturalPersonController.update)
routes.delete("/naturalPerson/:naturalPersonId", NaturalPersonController.delete)

//LEGAL PERSONS ROUTES
routes.get("/legalPerson", LegalPersonController.index)
routes.post("/legalPerson/:userId", LegalPersonController.create) 
routes.put("/legalPerson/:legalPersonId", LegalPersonController.update)
routes.delete("/legalPerson/:legalPersonId", LegalPersonController.delete)

// NOTIFICATION ROUTES
routes.get("/notification", NotificationController.index)
routes.post("/notification/:userId", NotificationController.create) 
routes.put("/notification/:notificationId", NotificationController.update)
routes.delete("/notification/:notificationId", NotificationController.delete)

// Responsibles_Technician_Quality_Control ROUTES
routes.get("/rtqc", Responsibles_Technician_Quality_Control.index)
routes.post("/rtqc/:userId", Responsibles_Technician_Quality_Control.create) 
routes.put("/rtqc/:responsibleId", Responsibles_Technician_Quality_Control.update)
routes.delete("/rtqc/:responsibleId", Responsibles_Technician_Quality_Control.delete)

//Responsibles_Technician_Quality_Contro_Crmv ROUTES
routes.get("/rtqccrmv", Responsibles_Technician_Quality_Control_Crmv.index)
routes.post("/rtqccrmv/:userId", Responsibles_Technician_Quality_Control_Crmv.create) 
routes.put("/rtqccrmv/:responsibleId", Responsibles_Technician_Quality_Control_Crmv.update)
routes.delete("/rtqccrmv/:responsibleId", Responsibles_Technician_Quality_Control_Crmv.delete)

// Consultancys ROUTES 
routes.get("/consultancys", ConsultancyController.index)
routes.post("/consultancys/:userId", ConsultancyController.create) 
routes.put("/consultancys/:consultancyId", ConsultancyController.update)
routes.delete("/consultancys/:consultancyId", ConsultancyController.delete)

//TaxAuditors ROUTES
routes.get("/taxauditors", TaxAuditorController.index)
routes.post("/taxAuditor/:userId", TaxAuditorController.create) 
routes.put("/taxAuditor/:taxAuditorId", TaxAuditorController.update)
routes.delete("/taxAuditor/:taxAuditorId", TaxAuditorController.delete)

//ROTAS DE LOGIN
routes.post('/authentication', AuthenticationController.authentication)

module.exports = routes;