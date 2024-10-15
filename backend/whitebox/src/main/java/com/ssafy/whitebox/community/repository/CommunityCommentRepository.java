// CommunityCommentRepository.java
package com.ssafy.whitebox.community.repository;

import com.ssafy.whitebox.community.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
}
