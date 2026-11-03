import express from 'express'

const route = express.Router()
import { AddUser,Login,ViewUser,Deleteuser,Updateprofile,Profile} from '../Controller/user_controller.js'
import Uploads from '../Middleware/imageupload.js'
import { AuthUsercheck } from '../Middleware/AuthUser.js'
import {Count} from '../Controller/Count.js'

route.post('/AddUser',Uploads.single('uimage'),AddUser)
route.post('/Login',Login)
route.get('/Profile',AuthUsercheck,Profile)
route.put('/UpdateProfile',AuthUsercheck,Uploads.single('uimage'),Updateprofile)
route.get('/ViewUser',ViewUser)
route.delete('/Deleteuser/:uid',Deleteuser)

route.get('/Count',Count)
export  default route