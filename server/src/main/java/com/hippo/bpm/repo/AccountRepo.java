package com.hippo.bpm.repo;

import com.hippo.bpm.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account,Long> {
}
