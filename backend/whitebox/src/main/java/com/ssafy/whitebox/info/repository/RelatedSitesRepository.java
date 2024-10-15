package com.ssafy.whitebox.info.repository;
import com.ssafy.whitebox.info.entity.RelatedSites;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RelatedSitesRepository extends JpaRepository<RelatedSites, Long> {

    List<RelatedSites> findAll();
}
