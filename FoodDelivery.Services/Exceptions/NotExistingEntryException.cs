namespace FoodDelivery.Services.Exceptions
{
    public class NotExistingEntryException : BadRequestException
    {
        public NotExistingEntryException()
            : this("Entry not found in database")
        {
        }

        public NotExistingEntryException(string message)
            : base(message)
        {
        }
    }
}