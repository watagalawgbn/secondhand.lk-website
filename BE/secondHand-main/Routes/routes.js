const express = require('express');
const router = express.Router();

const testFunction = require('../Components/Test/test');
const adminLogin = require('../Components/AdminLogin/adminLogin')
const adminLogout = require('../Components/AdminLogout/adminLogout')
const adreview = require('../Components/adreview/adreview')
const viewReport = require('../Components/viewReport/viewreport')
const userchat = require('../Components/userchat/userchat')
const acceptad = require('../Components/Acceptad/acceptad');
const { appCheck } = require('firebase-admin');
const banuser = require('../Components/banuser/banuser');

router.get('/test', (req, res) =>{
    testFunction(req, res);
})

router.post('/adminLogin', (req, res) =>{
    adminLogin(req, res);
})

router.get('/adminLogout', (req, res)=>{
    adminLogout(req, res);
})


router.get('/reviewadd', (req, res)=>{
    adreview(req, res);
} )

router.get('/viewreport',(req, res)=>{
    viewReport(req, res);
})
router.get('/userchat',(req,res)=>{
    userchat(req,res);
})
router.put('/acceptad' ,(req,res)=>{
  
    acceptad(req, res);
}) 

router.put('/banuser' ,(req,res)=>{
  
    banuser(req, res);
}) 


module.exports = router;