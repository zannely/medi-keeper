using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using TodoApi.Models;

using TodoApi.Services;

namespace TodoApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*" )]
    [Route("api/[controller]")] 
    [ApiController]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;
        
        private readonly CrudService _crudService;
        private readonly MaxPriceService _maxPriceService;

        public TodoController(TodoContext context, CrudService crudService, MaxPriceService maxPriceService)
        {
            _context = context;
            _crudService = crudService;
            _maxPriceService = maxPriceService;
        }

        // GET: api/Todo
        [HttpGet]
        public ActionResult<List<TodoItem>> GetTodoItem() => 
            _crudService.GetTodoItem();


        // GET: api/Todo/MaxPrice/itemName
        [HttpGet("MaxPrice/{name}")]
        public ActionResult<TodoItem> GetMaxPrice(string name)
        {
            var cost = _maxPriceService.GetMaxPrice(name);
            if (!TodoItemNameExists(name))
            {
                return NotFound();
            }
            return cost;
        }

        // verify if item name exists
        private bool TodoItemNameExists(string name)
        {
            return _context.TodoItems.Any(n => n.Name == name);
        }

        // GET: api/Todo/MaxPrices
        [HttpGet("MaxPrices")]
        public ActionResult<List<TodoItem>> GetMaxPrices() => 
            _maxPriceService.GetMaxPrices();

        // POST: api/Todo
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/Todo/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        // PUT: api/Todo/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }

        // // GET: api/Todo
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItem()
        // {
        //     return await _context.TodoItems.ToListAsync();
        // }

        // // GET: api/Todo/id
        // [HttpGet("{id}")]
        // public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        // {
        //     var todoItem = await _context.TodoItems.FindAsync(id);

        //     if (todoItem == null)
        //     {
        //         return NotFound();
        //     }

        //     return todoItem;
        // }

        // // PUT: api/Todo/id
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        // {
        //     if (id != todoItem.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(todoItem).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!TodoItemExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // // POST: api/Todo
        // [HttpPost]
        // public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        // {
        //     _context.TodoItems.Add(todoItem);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        // }

        // // DELETE: api/Todo/id
        // [HttpDelete("{id}")]
        // public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        // {
        //     var todoItem = await _context.TodoItems.FindAsync(id);
        //     if (todoItem == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.TodoItems.Remove(todoItem);
        //     await _context.SaveChangesAsync();

        //     return todoItem;
        // }

        // private bool TodoItemExists(long id)
        // {
        //     return _context.TodoItems.Any(e => e.Id == id);
        // }

        // private bool TodoItemNameExists(string name)
        // {
        //     return _context.TodoItems.Any(n => n.Name == name);
        // }

        // // GET: api/Todo/MaxPrice/itemName
        // [HttpGet("MaxPrice/{name}")]
        // public ActionResult<TodoItem> GetMaxPrice(string name)
        // {
        //     var cost = _context.TodoItems.OrderByDescending(c => c.Cost).FirstOrDefault(n => n.Name == name);

        //     if (!TodoItemNameExists(name))
        //     {
        //         return NotFound();
        //     }

        //     return cost;
        // }

        // // GET: api/Todo/MaxPrices
        // [HttpGet("MaxPrices")]
        // public ActionResult<List<TodoItem>> GetMaxPrices()
        // {
        //     return NonDuplicatePrice(_context.TodoItems
        //     .OrderByDescending(c => c.Cost)
        //     .ToList());
        // }

        // public List<TodoItem> NonDuplicatePrice(List<TodoItem> sortedList)
        // {
        //     List<TodoItem> maxPriceList = new List<TodoItem>();
        //     foreach(TodoItem item in sortedList)
        //     {
        //         bool nonDuplicate = true;
        //         foreach(TodoItem noDupItem in maxPriceList)
        //         {
        //             if (noDupItem.Name == item.Name)
        //             {
        //                 nonDuplicate = false;
        //                 break;
        //             }
        //         }
        //         if (nonDuplicate)
        //             maxPriceList.Add(item);
        //     }
        //     return maxPriceList;
        // }


    }
}
