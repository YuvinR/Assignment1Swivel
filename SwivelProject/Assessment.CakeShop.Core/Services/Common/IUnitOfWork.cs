using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Services.Common
{
    public interface IUnitOfWork
    {
        IToppingRepository Topping { get; }
        ICakeShapeRepository CakeShape { get; }
        IUserRepository UserForm { get; }
        Task CompleteAsync();

        void Dispose();
    }
}
