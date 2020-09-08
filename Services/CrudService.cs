using TodoApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace TodoApi.Services
{
    public class CrudService
    {
        private readonly TodoContext _context;

        public CrudService(TodoContext context)
        {
            _context = context;
        }

        public ActionResult<List<TodoItem>> GetTodoItem()
        {
            return _context.TodoItems.ToList();
        }


        // public ActionResult<TodoItem> GetMaxPrice(string name)
        // {
        //    return _context.TodoItems.OrderByDescending(c => c.Cost).FirstOrDefault(n => n.Name == name);
        // }


        // public ActionResult<List<TodoItem>> GetMaxPrices()
        // {
        //     return NonDuplicatePrice(_context.TodoItems
        //     .OrderByDescending(c => c.Cost)
        //     .ToList());
        // }


    // public List<TodoItem> NonDuplicatePrice(List<TodoItem> sortedList)
    //     {
    //         List<TodoItem> maxPriceList = new List<TodoItem>();
    //         foreach(TodoItem item in sortedList)
    //         {
    //             bool nonDuplicate = true;
    //             foreach(TodoItem noDupItem in maxPriceList)
    //             {
    //                 if (noDupItem.Name == item.Name)
    //                 {
    //                     nonDuplicate = false;
    //                     break;
    //                 }
    //             }
    //             if (nonDuplicate)
    //                 maxPriceList.Add(item);
    //         }
    //         return maxPriceList;
        // }

        // public TodoItem Get(string id)
        // {
        //     ObjectId internalId = GetInternalId(id);
        //     return _context.Find(item => item.ItemID == id || item.internalId == internalId).FirstOrDefault();
        // }
        // public TodoItem Create(TodoItem item)
        // {
        //     _context.InsertOne(item);
        //     return item;
        // }

        // public void UpdateItemName(string id, TodoItem itemIn){
        //     var filter = Builders<TodoItem>.Filter.Eq(itemId => itemId.ItemID, id); //filter by itemid
        //     var update = Builders<TodoItem>.Update.Set("ItemName", itemIn.ItemName);
        //     _context.UpdateOne(filter, update);
        // }

        // public void UpdateCost(string id, TodoItem itemIn){
        //     var filter = Builders<TodoItem>.Filter.Eq(itemId => itemId.ItemID, id); //filter by itemid
        //     var update = Builders<TodoItem>.Update.Set("Cost", itemIn.Cost);
        //     _context.UpdateOne(filter, update);
        // }

        // public void UpdateItemId(string id, TodoItem itemIn){
        //     var filter = Builders<TodoItem>.Filter.Eq(itemId => itemId.ItemID, id); //filter by itemid
        //     var update = Builders<TodoItem>.Update.Set("ItemID", itemIn.ItemID);
        //     _context.UpdateOne(filter, update);
        // }
        // public void Remove(TodoItem itemIn){
        //     _context.DeleteOne(item => item.ItemID == itemIn.ItemID);
        // }
        // public void Remove(string id){
        //     _context.DeleteOne(item => item.ItemID == id);
        // }
    }
}