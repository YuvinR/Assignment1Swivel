namespace Assessment.CakeShop.Core.Services.IService
{
    public interface IHashService
    {
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        (byte[] passwordHash, byte[] passwordSalt) CreatePasswordHash(string password);
    }
}
