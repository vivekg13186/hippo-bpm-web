package com.hippo.bpm.controller;

import com.hippo.bpm.baw.model.ExecuteServiceRequest;
import com.hippo.bpm.baw.model.ViewSnapshotRequest;
import com.hippo.bpm.model.Account;
import com.hippo.bpm.model.TestServiceModel;
import com.hippo.bpm.service.AccountService;
import com.hippo.bpm.service.BAWService;
import com.hippo.bpm.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class RESTController {

    @Autowired
    AccountService accountService;

    @Autowired
    TestService testService;

    @Autowired
    BAWService bawService;

    @GetMapping("/accounts")
    public List<Account> getAccounts(){
        return accountService.getAllAccount();
    }
    @PutMapping("/accounts")
    public Account addAccount(@RequestBody Account account){
        return accountService.insertAccount(account);
    }
    @DeleteMapping("/accounts/{id}")
    public void deleteAccount(@PathVariable Long id){
         accountService.deleteAccount(id);
    }
    @GetMapping("/account/{id}")
    public Account getAccount(@PathVariable Long id){
        return accountService.getAccount(id);
    }
//Test Service
    @GetMapping("/tests")
    public List<TestServiceModel> getTests(){
        return testService.getAllTestService();
    }
    @PutMapping("/tests")
    public TestServiceModel addTs(@RequestBody TestServiceModel tm){
        return testService.insertTestService(tm);
    }
    @DeleteMapping("/tests/{id}")
    public void deleteTS(@PathVariable Long id){
        testService.deleteTestService(id);
    }
    @GetMapping("/tests/{id}")
    public TestServiceModel getTS(@PathVariable Long id){
        return testService.getTestService(id);
    }


    @PostMapping("/apps")
    public  ResponseEntity<String>  getApps(@RequestBody Account account) {
        String result =  bawService.getApps(account);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(result, headers, HttpStatus.OK);

    }
    @PostMapping("/toolkits")
    public ResponseEntity<String> getToolkit(@RequestBody Account account) {
        String result =  bawService.getToolkits(account);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }
    @PostMapping("/instance/{instanceId}")
    public ResponseEntity<String> getInstance(@RequestBody Account account, @PathVariable String instanceId) {
        String result =  bawService.getInstance(account,instanceId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }
    @PostMapping("/snapshot")
    public ResponseEntity<String> getSnapshotInfo(@RequestBody ViewSnapshotRequest input){
        String result = bawService.getSnapshotInfo(input);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }

    @PostMapping("/executeService")
    public ResponseEntity<String> executeService(@RequestBody ExecuteServiceRequest  serviceRequest) {
        String result =  bawService.executeService(serviceRequest.getAccount(),serviceRequest.getTestService());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }
}
