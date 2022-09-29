using Assessment.CakeShop.Core.Models;
using Assessment.CakeShop.Core.Services.Common;
using Assessment.CakeShop.Core.Services.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment.CakeShop.Services
{
    public class CakeShapeService : ICakeShapeService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CakeShapeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<CakeShape>> GetCakeShapeList()
        {
            var users = (await _unitOfWork.CakeShape.All()).ToList();
            return users;
        }

        public async Task<bool> SaveCakeShape(CakeShape cakeShape)
        {
            cakeShape.Id = Guid.NewGuid();
            var res = await _unitOfWork.CakeShape.Add(cakeShape);
            await _unitOfWork.CompleteAsync();
            return res;
        }
    }
}
