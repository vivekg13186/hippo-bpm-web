package com.hippo.bpm.baw.model;

import com.hippo.bpm.model.Account;
import com.hippo.bpm.model.TestServiceModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ExecuteServiceRequest {

    TestServiceModel testService;
    Account account;
}
