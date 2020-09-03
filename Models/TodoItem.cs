namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public bool IsComplete { get; set; }
    }
}