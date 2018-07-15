namespace FoodDelivery.Services.Exceptions
{
    public class DuplicateEntryException : BadRequestException
    {
        public DuplicateEntryException()
            : this("Entry already exists in database")
        {
        }

        public DuplicateEntryException(string message)
            : base(message)
        {
        }
    }
}