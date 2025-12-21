package com.hippo.bpm.service;

import com.hippo.bpm.model.TestServiceModel;
import com.hippo.bpm.repo.TestServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    public TestServiceRepo testServiceRepo;

    public List<TestServiceModel> getAllTestService(){
        return testServiceRepo.findAll();
    }
    public TestServiceModel insertTestService(TestServiceModel account){
        return
                testServiceRepo.save(account);
    }
    public void deleteTestService(Long id){
        testServiceRepo.deleteById(id);
    }

    public TestServiceModel getTestService(Long id){
        return testServiceRepo.findById(id).orElse(null);
    }
}
