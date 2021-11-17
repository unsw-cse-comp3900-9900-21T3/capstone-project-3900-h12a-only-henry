package com.ris.rentalinspectionsystem.repositories;

import com.ris.rentalinspectionsystem.model.Agent;
import com.ris.rentalinspectionsystem.model.History;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentsRepository extends CrudRepository<Agent, Long> {
    List<Agent> findByEmailAndPassword(String email, String password);
}