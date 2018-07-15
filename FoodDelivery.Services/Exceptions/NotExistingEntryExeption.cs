namespace FoodDelivery.Services.Exceptions
{
    public class NotExistingEntryExeption : BadRequestException
    {
        public NotExistingEntryExeption()
            : this("Entry not found in database")
        {
        }

        public NotExistingEntryExeption(string message)
            : base(message)
        {
        }
    }
}