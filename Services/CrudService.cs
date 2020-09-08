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

    }
}