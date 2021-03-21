using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataManager.Contracts;
using Microsoft.EntityFrameworkCore;
using Models.DTO;
using Models.Entities;

namespace DataManager.Managers
{
    class AuthManager : IAuthDataManager
    {
        private BSChatDBContext _bSChatDBContext;

        public AuthManager(BSChatDBContext bSChatDBContext)
        {
            _bSChatDBContext = bSChatDBContext;
        }

        public async Task<Person> SignIn(string mail)
        {
            var result = await _bSChatDBContext.Person.FirstOrDefaultAsync(a => a.Mail == mail);
            return result;
        }

        public async Task<bool> SignUp(Person person)
        {
            bool isSuccess = false;
            bool emailExist = false;
            if (await _bSChatDBContext.Person.AnyAsync(p => p.Mail.ToLower() == person.Mail.ToLower()))
            {
                emailExist = true;
            }

            if (person != null && !emailExist)
            {
                await _bSChatDBContext.Person.AddAsync(person);
                await _bSChatDBContext.SaveChangesAsync();
                isSuccess = true;
            }
            return isSuccess;
        }
    }
}
