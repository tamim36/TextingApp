using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataManager.Contracts;
using Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataManager.Managers
{
    class UserDataManager : IUserDataManager
    {
        private BSChatDBContext _bSChatDBContext;

        public UserDataManager(BSChatDBContext bSChatDBContext)
        {
            _bSChatDBContext = bSChatDBContext;
        }

        public async Task<Person> GetUserById(int id)
        {
            var result = await _bSChatDBContext.Person.FirstOrDefaultAsync(p => p.Id == id);
            return result;
        }

        public async Task<ICollection<Person>> GetUserList(int id)
        {
            var result = await _bSChatDBContext.Person.Where(user => user.Id != id).ToListAsync();

            return result;
        }
    }
}
