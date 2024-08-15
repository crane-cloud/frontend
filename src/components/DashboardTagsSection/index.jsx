import React, { useState } from "react";
import TagCard from "../TagCard";
import styles from "./TagList.module.css";
import Spinner from "../Spinner";
import PrimaryButton from "../PrimaryButton";
import TagsModal from "../TagsModal";
import { useTags } from "../../hooks/useTags";
import axios from "../../axios";
import { handleDeleteRequest } from "../../apis/apis";

const TagsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [sectionLoad, setSectionLoad] = useState(false);
  const [tagFollowLoading, setTagFollowLoading] = useState(false);

  const { data: tags, isLoadingTags } = useTags();

  const handleFollow = async (id, followsTag) => {
    setSectionLoad(true);
    setTagFollowLoading(true);
    if (followsTag) {
      handleDeleteRequest(`tags/${id}/following`, {})
        .then(() => {
          setSectionLoad(false);
          setTagFollowLoading(false);
        })
        .catch((error) => {
          console.error("Error following tag:", error);
          setSectionLoad(false);
          setTagFollowLoading(false);
        });
    } else {
      try {
        const response = await axios.post(`tags/${id}/following`);
        if (response.status === 201) {
          setSectionLoad(false);
          setTagFollowLoading(false);
        }
      } catch (error) {
        console.error("Error following tag:", error);
        setSectionLoad(false);
        setTagFollowLoading(false);
      }
    }
  };

  const handleViewMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.featuredProjects}>
      <h2>Suggested Tags</h2>
      <div className={styles.grid}>
        {isLoadingTags ? (
          <div className={styles.noActivity}>
            <div className={styles.NoResourcesMessage}>
              <div className={styles.SpinnerWrapper}>
                <Spinner size="big" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {tags?.data?.data?.slice(0, 5).map((tag) => (
              <TagCard
                key={tag.id}
                name={tag.name}
                projects_count={tag.projects_count}
                isFollowing={tag.is_following}
                id={tag.id}
                onFollow={handleFollow}
                isModalTag={false}
                tagFollowLoading={tagFollowLoading}
              />
            ))}
          </>
        )}

        {!isLoadingTags && (
          <PrimaryButton
            className={styles.viewMoreButton}
            onClick={handleViewMore}
          >
            View More
          </PrimaryButton>
        )}
        {showModal && (
          <TagsModal
            tags={tags?.data?.data}
            onClose={handleCloseModal}
            onFollow={handleFollow}
            isModalTag={showModal}
          />
        )}
      </div>
    </div>
  );
};

export default TagsList;
