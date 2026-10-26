import express from 'express'

const route = express.Router()
import { AddUser,Login,ViewUser,Deleteuser,Updateprofile,Profile} from '../Controller/user_controller.js'
import Uploads from '../Middleware/imageupload.js'

route.post('/AddUser',Uploads.single('uimage'),AddUser)
route.post('/Login',Login)
route.get('/ViewUser',ViewUser)
route.delete('/Deleteuser/:uid',Deleteuser)


export  default route