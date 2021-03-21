using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;
using Models.DTO;

namespace DataManager.Contracts
{
    public interface IAuthDataManager
    {
        public Task<bool> SignUp(Person person);
        public Task<Person> SignIn(string mail);
    }
}
