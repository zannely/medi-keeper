using TodoApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace TodoApi.Services
{
    public class MaxPriceService
    {
        private readonly TodoContext _context;

        public MaxPriceService(TodoContext context)
        {
            _context = context;
        }


        public ActionResult<TodoItem> GetMaxPrice(string name)
        {
           return _context.TodoItems.OrderByDescending(c => c.Cost).FirstOrDefault(n => n.Name == name);
        }


        public ActionResult<List<TodoItem>> GetMaxPrices()
        {
            return NonDuplicatePrice(_context.TodoItems
            .OrderByDescending(c => c.Cost)
            .ToList());
        }

        public List<TodoItem> NonDuplicatePrice(List<TodoItem> sortedList)
        {
            List<TodoItem> maxPriceList = new List<TodoItem>();
            foreach(TodoItem item in sortedList)
            {
                bool nonDuplicate = true;
                foreach(TodoItem noDupItem in maxPriceList)
                {
                    if (noDupItem.Name == item.Name)
                    {
                        nonDuplicate = false;
                        break;
                    }
                }
                if (nonDuplicate)
                    maxPriceList.Add(item);
            }
            return maxPriceList;
        }
    }
}