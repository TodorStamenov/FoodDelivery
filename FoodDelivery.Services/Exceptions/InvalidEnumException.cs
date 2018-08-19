namespace FoodDelivery.Services.Exceptions
{
    public class InvalidEnumException : BadRequestException
    {
        public InvalidEnumException()
            : this("Not able to cast string to enum")
        {
        }

        public InvalidEnumException(string message)
            : base(message)
        {
        }
    }
}