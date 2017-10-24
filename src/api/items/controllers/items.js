import jwt from 'jsonwebtoken';
import Item from '../models/items';
import Bucketlist from '../../bucketlists/models/bucketlist';

const itemsController = {
  createItem: (req, res) => {
    console.log("\n\nItems post\n\n", req.body)
    let itemName = req.body.name;
    if(!itemName) {
      return res.status(400).json({
        status: "fail",
        message: "Item name cannot be empty."
      })
    }
    Bucketlist.findOne({ _id: req.params.id}, (err, bucketlist) => {
      if(err) { return res.status(404).json({ status: "fail", message: "Bucketlist not found."})}
      Item.find({name: itemName}, (err, item) => {
        if(item.length) { return res.status(409).json({ status: "fail", message: "An item with a similar name exists."})}
        let newItem = new Item();
        newItem.name = itemName;
        newItem.bucketlist = bucketlist
        newItem.save((err, item) => {
          if(err) {
            return res.status(500).json(err)
          }
          // update bucketlists items
          bucketlist.items.push(item)
          bucketlist.save()
          return res.status(201).json({
            status: "fail",
            data: {
              item: item,
              message: "Item was successfully created."
            }
          })
        })
      })
    })
  },
  fetchSingleItem: (req, res) => {
    console.log("\n\nItems post\n\n", req.body);
    Bucketlist.findOne({_id: req.params.id}, (err, bucketlist) => {
      if(err) { return res.status(404).json({ status: "fail", message: "Bucketlist not found."})}
      Item.findOne({_id: req.params.itemId}, (err, item) => {
        if(err) { return res.status(404).json({ status: "fail", message: "Item not found."})}
        return res.status(200).json({
          status: "fail",
          data: {
            item: item,
            message: "Item was successfully fetched."
          }
        })
      })
    })
  }
}

export default itemsController;
