package com.hippo.bpm.repo;

import com.hippo.bpm.model.TestServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestServiceRepo extends JpaRepository<TestServiceModel,Long> {
}
