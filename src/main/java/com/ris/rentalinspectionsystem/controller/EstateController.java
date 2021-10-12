package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.EstateDao;
import com.ris.rentalinspectionsystem.model.Estate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.conversion.DbActionExecutionException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/agent/{agentId}/estates")
public class EstateController {
    private final EstateDao estateDao;

    @Autowired
    public EstateController(EstateDao estateDao) { this.estateDao = estateDao; }

    @GetMapping("")
    public List<Estate> getEstates(
            @PathVariable("agentId") Long agentId,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms,
            @RequestParam(required = false) Integer garages,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) Integer landSqmMin,
            @RequestParam(required = false) Integer landSqmMax,
            @RequestParam(required = false) Integer priceMin,
            @RequestParam(required = false) Integer priceMax,
            @RequestParam(required = false) Boolean open
    ) {
        Map<String, Object> queryParams = new HashMap();
        queryParams.put("bedrooms", bedrooms);
        queryParams.put("bathrooms", bathrooms);
        queryParams.put("garages", garages);
        queryParams.put("property_type", propertyType);
        queryParams.put("land_sqm_min", landSqmMin);
        queryParams.put("land_sqm_max", landSqmMax);
        queryParams.put("price_min", priceMin);
        queryParams.put("price_max", priceMax);
        queryParams.put("open", open);

        queryParams.values().removeAll(Collections.singleton(null));

        return estateDao.getEstates(queryParams, agentId);
    }

    @GetMapping("/{estateId}")
    public Estate getEstate(
            @PathVariable("agentId") Long agentId,
            @PathVariable("estateId") Long estateId
    ) {
        return estateDao.getEstate(agentId, estateId);
    }

    @PostMapping("")
    public Estate createEstate(
            @PathVariable("agentId") Long agentId,
            @Valid @RequestBody Estate estate
    ) {
        try {
            return estateDao.createEstate(agentId, estate);
        } catch (DbActionExecutionException e) { // not sure if it's this exception yet
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("{estateId}")
    public Estate updateEstate (
            @PathVariable("agentId") Long agentId,
            @PathVariable("estateId") Long estateId,
            @Valid @RequestBody Estate estate
    ) {
        try {
            return estateDao.putEstate(agentId, estateId, estate);
        } catch (DbActionExecutionException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}