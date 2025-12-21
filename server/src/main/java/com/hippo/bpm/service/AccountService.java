package com.hippo.bpm.service;

import com.hippo.bpm.model.Account;
import com.hippo.bpm.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    public AccountRepo accountRepo;

    public List<Account> getAllAccount(){
        return accountRepo.findAll();
    }
    public Account insertAccount(Account account){
        return  accountRepo.save(account);
    }
    public void deleteAccount(Long id){
           accountRepo.deleteById(id);
    }

    public Account getAccount(Long id){
        return accountRepo.findById(id).orElse(null);
    }
}
