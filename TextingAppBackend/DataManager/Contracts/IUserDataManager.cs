using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;

namespace DataManager.Contracts
{
    public interface IUserDataManager
    {
        public Task<ICollection<Person>> GetUserList(int id);

        public Task<Person> GetUserById(int id);
    }
}
