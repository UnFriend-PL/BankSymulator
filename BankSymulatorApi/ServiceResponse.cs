namespace BankSymulatorApi
{
    public class ServiceResponse<T>
    {
        public T? Data { get; set; }
        public bool Success { get; set; } = true;
        public string[] Errors { get; set; } = Array.Empty<string>();
        public string Message { get; set; } = string.Empty;
    }
}
