/*
 * @Author: jett 
 * @Date: 2019-08-27 22:44:48 
 * @Last Modified by: jett
 * @Last Modified time: 2019-08-28 20:09:47
 */

const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'https://cnodejs.org/api/v1';

router.post('/login',function (req,res,next) {
    axios.post(`${baseUrl}/accesstoken`,{
        accesstoken:req.body.accessToken
    }).then(resp => {
        if(resp.status === 200 && resp.data.success){
            req.session.user = {
                accessToken:req.body.accessToken,
                loginname:resp.data.loginname,
                id:resp.data.id,
                avatar_url:resp.data.avatar_url
            }
            res.json({
                success:true,
                data:resp.data
            })
        }else {
            res.json({
                success: false,
                data:resp.data
            })
        }
    }).catch(err => {
        if(err.response){
            res.json({
                success:false,
                data:err.response.data
            })
        }else {
            next(err)
        }
    })
})

module.exports = router;