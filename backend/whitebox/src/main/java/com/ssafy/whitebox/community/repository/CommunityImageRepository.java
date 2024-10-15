// CommunityImageRepository.java
package com.ssafy.whitebox.community.repository;

import com.ssafy.whitebox.community.entity.CommunityImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityImageRepository extends JpaRepository<CommunityImage, Long> {
}
