import React, { useState } from "react";
import TagCard from "../TagCard";
import styles from "./TagList.module.css";
import Spinner from "../Spinner";
import PrimaryButton from "../PrimaryButton";
import TagsModal from "../TagsModal";
import { useTags } from "../../hooks/useTags";

const TagsList = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: tags, isLoadingTags } = useTags();

  const handleFollow = (id) => {
    console.log(`Follow tag with id: ${id}`);
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
                id={tag.id}
                onFollow={handleFollow}
                isModalTag={false}
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
