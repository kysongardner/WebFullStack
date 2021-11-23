var express = require('express');
const message = require('../models/message');
var router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
    Message.find().then(messages => {
        console.log(messages);
    });
    res.status(200).json({
        message: 'Fetched Messages Successfully',
        messages: messages
    })
    .catch(error => {
        res.status(500).json({
            message: 'Messages were not fetched successfully',
            error: error
        })
    })
})


router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("Messages");
  
    const message = new Message({
      id: maxMessageId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    Message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Message added successfully',
          Message: createdMessage
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  
router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(Message => {
        message.name = req.body.name;
        message.description = req.body.description;
        message.url = req.body.url;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });

  
router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });