import React, { useCallback, useEffect } from "react";
import styles from "./RecentActivitySection.module.css";
import RecentActivityItem from "../RecentActivityItem";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as InfoSvg } from "../../assets/images/infosvg.svg";
import { useDispatch, useSelector } from "react-redux";
import getUserRecentActivities from "../../redux/actions/getUserRecentActivity";
import Spinner from "../Spinner";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../Pagination";

const RecentActivitySection = () => {
  const dispatch = useDispatch();

  const [currentPage, handleChangePage] = usePaginator();

  const user = useSelector((state) => state.user);

  const userRecentActivities = useCallback(
    () => dispatch(getUserRecentActivities(user?.data?.id, currentPage)),
    [dispatch, user?.data?.id, currentPage]
  );

  useEffect(() => {
    userRecentActivities();
  }, [userRecentActivities, user?.data?.id]);

  const {
    recentActivities,
    pagination,
    isFetchingRecentActivities,
    recentActivitiesFetched,
  } = useSelector((state) => state.userRecentActivitiesReducer);

  const noRecentActivity =
    recentActivities?.length === 0 && recentActivitiesFetched;

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    userRecentActivities();
  };


  return (
    <div className={styles.recentActivity}>
      <h2 className={styles.title}>Recent Activity</h2>

      {isFetchingRecentActivities ? (
        <div className={styles.noActivity}>
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {noRecentActivity ? (
            <div className={styles.noActivity}>
              <InfoSvg />
              <p className={styles.noActivityMessage}>
                No Recent Activity Found
              </p>
            </div>
          ) : (
            recentActivities?.map((item, index) => (
              <React.Fragment key={index}>
                <RecentActivityItem item={item} />
              </React.Fragment>
            ))
          )}

          {!noRecentActivity && pagination?.pages > 1 && (
            <div className="AdminPaginationSection">
              <Pagination
                total={pagination.pages}
                current={currentPage}
                onPageChange={handlePageChange}
              />
            </div>

            // <PrimaryButton className={styles.viewMoreButton}>
            //   View All Activity
            // </PrimaryButton>
          )}
        </>
      )}
    </div>
  );
};

export default RecentActivitySection;
