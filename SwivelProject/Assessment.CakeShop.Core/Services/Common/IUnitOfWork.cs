using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Core.Services.Common
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        IToppingRepository Topping { get; }
        ICakeShapeRepository CakeShape { get; }
        Task CompleteAsync();

        void Dispose();
    }
}
