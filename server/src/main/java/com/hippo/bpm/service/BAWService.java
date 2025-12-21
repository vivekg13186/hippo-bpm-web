package com.hippo.bpm.service;

import com.hippo.bpm.model.Account;
import com.hippo.bpm.model.TestServiceModel;
import kong.unirest.core.ContentType;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.Unirest;
import kong.unirest.core.UnirestInstance;
import org.springframework.stereotype.Service;


import java.util.Base64;

@Service
public class BAWService {

    public BAWService(){

        Unirest.config() .disableHostNameVerification(true)
                .verifySsl(false);

    }


    public String getToolkits(Account account){

        HttpResponse<String> result;
        if(account.getType().equals("zen")) {
            String base = account.getUsername()+":"+account.getPassword();
            String code  = Base64.getEncoder().encodeToString(base.getBytes());
            result = Unirest
                    .get(account.getUrl() + "/rest/bpm/wle/v1/toolkit")
                    .accept(ContentType.APPLICATION_JSON)
                    .header("Authorization", "ZenApiKey " + code)

                            .asString();
            System.out.println(result.getStatus());
        }else{
            result = Unirest
                    .get(account.getUrl() + "/rest/bpm/wle/v1/processApps")
                    .accept(ContentType.APPLICATION_JSON)
                    .basicAuth(account.getUsername(), account.getPassword())
                            .asString();

        }
        return result.getBody();

    }

public String getInstance(Account account,String instanceId){
    HttpResponse<String> result;
    if(account.getType().equals("zen")) {
        String base = account.getUsername()+":"+account.getPassword();
        String code  = Base64.getEncoder().encodeToString(base.getBytes());
        result = Unirest
                .get(account.getUrl() + "/rest/bpm/wle/v1/process/{instanceId}")
                .routeParam("instanceId",instanceId)
                .queryString("parts","all")
                .accept(ContentType.APPLICATION_JSON)
                .header("Authorization", "ZenApiKey " + code)
                        .asString();

    }else{
        result = Unirest
                .get(account.getUrl() + "/rest/bpm/wle/v1/processApps")
                .accept(ContentType.APPLICATION_JSON)
                .basicAuth(account.getUsername(), account.getPassword())
                .asString();
    }
    return result.getBody();

}

public String executeService(Account account,TestServiceModel testServiceModel){
    HttpResponse<String> result;
    if(account.getType().equals("zen")) {
        String base = account.getUsername()+":"+account.getPassword();
        String code  = Base64.getEncoder().encodeToString(base.getBytes());
        result = Unirest
                .post(account.getUrl() + "/rest/bpm/wle/v1/service/{name}")
                .routeParam("name",testServiceModel.getAppName()+"@"+testServiceModel.getServiceName())
                .field("action","start")
                .field("createTask","false")
                .field("parts","all")
                .field("params",testServiceModel.getInput())
                .accept(ContentType.APPLICATION_JSON)
                .header("Authorization", "ZenApiKey " + code)
                .asString();
    }else{
        result = Unirest
                .post(account.getUrl() + "/rest/bpm/wle/v1/service/{name}")
                .routeParam("name",testServiceModel.getAppName()+"@"+testServiceModel.getServiceName())
                .field("action","start")
                .field("createTask","false")
                .field("parts","all")
                .field("params",testServiceModel.getInput())
                .accept(ContentType.APPLICATION_JSON)
                .basicAuth(account.getUsername(), account.getPassword())
                .asString();
    }
    return result.getBody();

}
    public String getApps(Account account){
        HttpResponse<String> result;
        if(account.getType().equals("zen")) {
            String base = account.getUsername()+":"+account.getPassword();
            String code  = Base64.getEncoder().encodeToString(base.getBytes());
            result = Unirest
                    .get(account.getUrl() + "/rest/bpm/wle/v1/processApps")
                    .accept(ContentType.APPLICATION_JSON)
                    .header("Authorization", "ZenApiKey " + code)
                            .asString();
        }else{
            result = Unirest
                    .get(account.getUrl() + "/rest/bpm/wle/v1/processApps")
                    .accept(ContentType.APPLICATION_JSON)
                    .basicAuth(account.getUsername(), account.getPassword())
                            .asString();
        }
        return result.getBody();

    }
}
