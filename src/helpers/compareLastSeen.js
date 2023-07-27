export const compareLastSeen = (userA, userB) => {
  const lastSeenA = new Date(userA.last_seen);
  const lastSeenB = new Date(userB.last_seen);

  if (lastSeenA > lastSeenB) {
    return -1;
  } else if (lastSeenA < lastSeenB) {
    return 1;
  } else {
    return 0;
  }
};
