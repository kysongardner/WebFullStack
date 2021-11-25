var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
var router = express.Router();
var Contact = require('../models/contact');
module.exports = router;

router.get('/', (req, res, next) => {
  Contact.find().populate('group').then(contacts => {
    console.log(contacts);
    res.status(200).json(
      contacts
    )
  }).catch(error => {
    res.status(500).json({
      message: 'contact were not fetched successfully',
      error: error
    })
  });
})


router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");
  console.log(req.body);
  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.groupList
  });
  console.log(contact);

  contact.save()
    .then(createdContact => {
      console.log(createdContact, "created contact");
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
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
  console.log("in route");
  Contact.findOne({
      id: req.params.id
    })
    .then(contact => {
      contact.name = req.body.name;
      contact.description = req.body.description;
      contact.url = req.body.url;

      Contact.updateOne({
          id: req.params.id
        }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
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
        message: 'Contact not found.',
        error: {
          contact: 'Contact not found'
        }
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Contact.findOne({
      id: req.params.id
    })
    .then(contact => {
      Contact.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
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
        message: 'Contact not found.',
        error: {
          contact: 'Contact not found'
        }
      });
    });
});
