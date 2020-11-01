const express = require('express')
const router = express.Router()
const members = require('../../members')
const uuid = require('uuid')

//Get members
router.get('/', (req,res) => {
    res.json(members)
})
//Get member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => parseInt(req.params.id) === member.id))
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})
//Create member
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }    
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include a name and email'})
    }
    members.push(newMember)
    res.redirect('/')
})

//Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updateMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember ? updateMember.name : member.name
                member.email = updateMember ? updateMember.email : member.email

                res.json({msg: 'member updated', member})

            }
        })     
    
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

//Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(
            {
                msg: "Member deleted" ,
                members: members.filter(member => parseInt(req.params.id) !== member.id)
            })
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    } 
}) 

module.exports = router
